import React, { Fragment } from 'react'
import { ToggleState, ToggleConstraints, VisSettingsGroup, ToggledOrderStates } from '../../../types/Global'
import { FunctionButton, NavigateButton, ToggleButton, SubmitButton, ClearButton } from './menu-buttons'

/**
 * Creates an Array of Buttons for a group depending on the button type
 * Also applies toggle state to manage state of toggled buttons
 * @param group
 * @param onClickNav
 * @param onClickFunc
 * @param onClickToggle
 */
export const renderButtons = (
  group: VisSettingsGroup,
  onClickNav: (id: string, groupId: string) => Promise<void>,
  onClickFunc: (id: string, groupId: string) => void,
  onClickToggle: (id: string, groupId: string, state: boolean) => void,
  onClickSubmit: (groupId: string, toggledStates: object[], orderedIds: string[]) => void,
  onClickClear: (groupId: string) => void,
  currentToggleStates: ToggleState,
  toggledOrderArrays: ToggledOrderStates
) => {
  let isToggled: boolean
  let isDisabled: boolean
  let groupToggleStates: ToggleState = {}
  let activeButtons: object[] = []

  const createdGroupButtons: JSX.Element[] = group.buttons.map((button, i) => {
    const { type, label, action, id, labelOn, labelOff } = button
    switch (type) {
      case 'link':
        return (
          <NavigateButton
            id={id}
            type={type}
            key={id}
            label={label}
            groupId={group.id}
            navigateLink={action}
            navigateHandler={onClickNav}
          />
        )
      case 'function':
        return (
          <FunctionButton
            id={id}
            type={type}
            key={id}
            label={label}
            groupId={group.id}
            functionName={action}
            functionHandler={onClickFunc}
          />
        )
      case 'toggle':
        let stateLabel: string = ''
        const buttonId = `${group.id}-${id}`

        if (currentToggleStates[buttonId] && currentToggleStates[buttonId].isToggledOn) isToggled = true
        else isToggled = false

        if (currentToggleStates[buttonId] && currentToggleStates[buttonId].isDisabled) isDisabled = true
        else isDisabled = false

        if (isToggled) {
          activeButtons.push({ button: id, toggled: true })
          stateLabel = labelOn || 'label'
        } else {
          activeButtons.push({ button: id, toggled: false })
          stateLabel = labelOff || 'label'
        }

        // Add position id to label only if positionLabels is enabled in the settings
        if (currentToggleStates[buttonId].positionLabels) {
          const orderedId = toggledOrderArrays[group.id] ? toggledOrderArrays[group.id].indexOf(id) : -1
          if (orderedId > -1) stateLabel = `${stateLabel} (${orderedId + 1})`
        }

        return (
          <ToggleButton
            id={id}
            key={id}
            type={type}
            label={stateLabel}
            groupId={group.id}
            functionName={action}
            isToggledOn={isToggled}
            isDisabled={isDisabled}
            onClickToggle={onClickToggle}
          />
        )
      default:
        return <Fragment />
    }
  })

  // Add line if either SUBMIT or CLEAR buttons are present
  if (group.settings && (group.settings.submitButton || group.settings.clearButton)) {
    createdGroupButtons.push(<hr key={group.id} />)
  }

  // Add SUBMIT button to the group IF present in settings
  if (group.settings && group.settings.submitButton) {
    const label = group.settings.submitButton.labelOff || 'Error'
    const orderedIds = toggledOrderArrays[group.id] ? toggledOrderArrays[group.id] : []
    createdGroupButtons.push(
      <SubmitButton
        key={label}
        label={label}
        groupId={group.id}
        toggledStates={activeButtons}
        orderedIds={orderedIds}
        submitHandler={onClickSubmit}
      />
    )
  }

  // Add CLEAR button to the group IF present in settings
  if (group.settings && group.settings.clearButton) {
    const label = group.settings.clearButton.labelOff || 'Error'
    createdGroupButtons.push(<ClearButton key={label} label={label} groupId={group.id} clearHandler={onClickClear} />)
  }

  return { createdGroupButtons, groupToggleStates }
}

export const renderButtonGroupsFunc = (
  groups: VisSettingsGroup[],
  onClickNav: (id: string, groupId: string) => Promise<void>,
  onClickFunc: (id: string, groupId: string) => void,
  onClickToggle: (id: string, groupId: string, state: boolean) => void,
  onClickSubmit: (groupId: string, toggledStates: object[], orderedIds: string[]) => void,
  onClickClear: (groupId: string) => void,
  currentToggleStates: ToggleState,
  toggledOrderArrays: ToggledOrderStates
) => {
  let groupsAndButtons: JSX.Element[][] = []
  let toggledStates: ToggleState = {}
  if (groups) {
    groups.forEach((group, i) => {
      if (group.buttons) {
        const { createdGroupButtons, groupToggleStates } = renderButtons(
          group,
          onClickNav,
          onClickFunc,
          onClickToggle,
          onClickSubmit,
          onClickClear,
          currentToggleStates,
          toggledOrderArrays
        )
        if (group.title) {
          groupsAndButtons.push([
            <p key={i} className="slider-side-menu-group-title">
              {group.title}
            </p>,
          ])
        }
        groupsAndButtons.push(createdGroupButtons)
        toggledStates = { ...toggledStates, ...groupToggleStates }
      }
      if (i < groups.length - 1) groupsAndButtons.push([<hr key={i} />])
    })
  }
  return { groupsAndButtons, toggledStates }
}

/**
 * Creates the initial state of all toggle buttons by the value set in the json
 * This func is only called on first render
 * @param groups
 */
export const setInitialToggleState = (
  groups: VisSettingsGroup[]
): { toggles: ToggleState; constraints: ToggleConstraints } => {
  let state: ToggleState = {}
  let constraints: ToggleConstraints = {}

  if (groups) {
    for (let x = 0; x < groups.length; x++) {
      let enabledIds: string[] = []
      let buttonCount: number = 0
      const group = groups[x]

      if (group && group.id && group.buttons) {
        const buttons = group.buttons
        let groupType = ''
        for (let y = 0; y < buttons.length; y++) {
          const { id, type } = buttons[y]
          groupType = type

          // Function and Link buttons have no state so are ignored
          if (type !== 'function' && type !== 'link') {
            const maxToggled = parseInt(group.settings.toggle.maxToggled)
            const minToggled = parseInt(group.settings.toggle.minToggled)

            // Handles sorting buttons
            if (maxToggled === 1 && minToggled === 1) {
              let newCounter = [...enabledIds]
              newCounter.push(id)
              enabledIds = newCounter

              // Handles toggle buttons
            } else if (type === 'toggle') {
              buttonCount++
              if (!buttons[y].isToggled) {
                let newCounter = [...enabledIds]
                newCounter.push(id)
                enabledIds = newCounter
              }
            }

            // Set toggle state from the data json
            state[`${group.id}-${id}`] = {
              isToggledOn: buttons[y].isToggled || false,
              isDisabled: buttons[y].isDisabled || false,
              type: buttons[y].type,
              positionLabels: group.settings.toggle.positionLabels ? true : false,
            }
            // Set the initial constraints
            constraints[group.id] = {
              type: groupType,
              maxToggled: group.settings.toggle.maxToggled,
              minToggled: group.settings.toggle.minToggled,
              enabledIds: enabledIds,
              numberOfButtons: buttonCount,
              orderImportant: group.settings.toggle.orderImportant,
            }
          }
        }
      }
    }
  }
  return { toggles: state, constraints: constraints }
}

/**
 * Adds or removes ids from an ordered array string
 * @param currentStates
 * @param groupId
 * @param buttonId
 */
function handleToggleOrder(currentStates: ToggledOrderStates, groupId: string, buttonId: string) {
  // Amend existing array
  if (currentStates[groupId]) {
    const i = currentStates[groupId].indexOf(buttonId)

    if (i > -1) {
      // Remove it already exist in array
      currentStates[groupId].splice(i, 1)
    } else {
      // Add the new id if not present
      currentStates[groupId].push(buttonId)
    }
    // Create group order array
  } else currentStates[groupId] = [buttonId]

  return currentStates
}

/**
 * Handles the state of the toggle groups as they are selected and deselected
 * @param buttonId
 * @param groupId
 * @param togStates
 * @param toggleConstraints
 */
export const toggleHandler = (
  buttonId: string,
  groupId: string,
  togStates: ToggleState,
  toggleConstraints: ToggleConstraints,
  toggledOrderArrays: ToggledOrderStates
): { consState: ToggleConstraints; togState: ToggleState; orderedStates: ToggledOrderStates } => {
  let togState: ToggleState = { ...togStates }
  let conState: ToggleConstraints = { ...toggleConstraints }
  let orderedStates: ToggledOrderStates = { ...toggledOrderArrays }
  let idsList = conState[groupId].enabledIds.length ? conState[groupId].enabledIds : false

  if (conState[groupId].orderImportant) orderedStates = handleToggleOrder(orderedStates, groupId, buttonId)

  // This handles the deselction of the sorting toggle
  if (parseInt(conState[groupId].maxToggled) === 1 && parseInt(conState[groupId].minToggled) === 1) {
    togState[`${groupId}-${buttonId}`].isToggledOn = true
    if (idsList) {
      for (let i = 0; i < idsList.length; i++) {
        if (buttonId !== idsList[i]) {
          togState[`${groupId}-${idsList[i]}`].isToggledOn = false
        }
      }
    }
  } else {
    // Toggle Off & Remove if in list
    if (togState[`${groupId}-${buttonId}`].isToggledOn) {
      togState[`${groupId}-${buttonId}`].isToggledOn = false
      conState[groupId].enabledIds.push(buttonId)
    } else {
      // Toogle On & Add id to list
      togState[`${groupId}-${buttonId}`].isToggledOn = true
      if (idsList && idsList.includes(buttonId)) {
        conState[groupId].enabledIds = idsList.filter((id) => id !== buttonId)
      }
    }

    const maxNum = parseInt(conState[groupId].maxToggled)
    const currentNum = conState[groupId].numberOfButtons - conState[groupId].enabledIds.length
    const excludeIds = conState[groupId].enabledIds

    // Max selected reached
    if (maxNum && currentNum === maxNum) {
      for (let i = 0; i < excludeIds.length; i++) {
        togState[`${groupId}-${excludeIds[i]}`].isDisabled = true
      }
    } else for (let i = 0; i < excludeIds.length; i++) togState[`${groupId}-${excludeIds[i]}`].isDisabled = false
  }

  return { consState: conState, togState: togState, orderedStates: orderedStates }
}

/**
 * Clears the group of all selected options when CLEAR SELECTION is clicked
 */
export const handleClearGroup = (groupId: string, groups: VisSettingsGroup[]) => {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].id === groupId) return setInitialToggleState([groups[i]])
  }
  return { toggles: {}, constraints: {} }
}
