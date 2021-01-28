import React, { useState, useMemo, useRef } from 'react'
import { ToggleState, ToggleConstraints, VisualisationSettings, ToggledOrderStates } from '../../../types/Global'
import { renderButtonGroupsFunc, setInitialToggleState, toggleHandler, handleClearGroup } from './menu-functions'
import { detectResize } from '../../lib/detect-resize'
import '../../styles/slider-styles.scss'

interface Props {
  settings: VisualisationSettings
  toggleButtonTitle: string
  whenOpenWidth?: string
  backGround?: string
  isTechDetails: boolean
  sideBarToggleCallback: (id: string, groupId: string, state: boolean) => void
  sideBarNavCallback: (id: string, groupId: string) => Promise<void>
  sideBarFuncCallback: (id: string, groupId: string) => void
  onClickSubmit: (groupId: string, toggledStates: object[], orderedIds: string[]) => void
  onClickClear: (groupId: string) => void
}

const hideMenu = (container: HTMLDivElement, mainMenu: HTMLDivElement, menuComponents: HTMLDivElement[]) => {
  if (container && container.style) {
    container.style.width = '0'
    mainMenu.style.border = 'unset'
    mainMenu.style.padding = 'unset'

    if (menuComponents) {
      for (let i = 0; i < menuComponents.length; i++) {
        if (menuComponents[i]) menuComponents[i].style.display = 'none'
      }
    }
  }
}

const showMenu = (container: CSSStyleDeclaration, mainMenu: CSSStyleDeclaration | undefined, menuComponents: any) => {
  let screenWidth = typeof window != 'undefined' ? window.innerWidth : 0
  let setWidth: number

  if (screenWidth < 1920) setWidth = 330
  else if (screenWidth < 2560) setWidth = 330
  else if (screenWidth < 3200) setWidth = 420
  else if (screenWidth < 3840) setWidth = 500
  else setWidth = 580

  container.width = setWidth + 'px'
  mainMenu!.border = 'solid 1px black'
  mainMenu!.padding = '10px'

  if (menuComponents) {
    for (let i = 0; i < menuComponents.length; i++) {
      if (menuComponents[i]) menuComponents[i].style.display = 'block'
    }
  }
}

export const SliderMenuLeft = (props: Props) => {
  const {
    toggleButtonTitle,
    settings,
    sideBarToggleCallback,
    sideBarNavCallback,
    sideBarFuncCallback,
    isTechDetails,
    onClickSubmit,
    onClickClear,
  } = props

  let resizeOccured = false

  // Manage States
  const [techDetailsPage, setTechDetailsPage] = useState(false)
  const [currentSize, setCurrentSize] = useState(0)
  const [toggleStates, setToggleStates] = useState<ToggleState>()
  const [toggleConstraints, setToggleConstraints] = useState<ToggleConstraints>()
  const [toggledOrderArrays, setToggledOrderArrays] = useState<ToggledOrderStates>({})

  // Initialise toggledStates on first render. IF ANY
  if (!toggleStates && settings && settings.groups) {
    const { toggles, constraints } = setInitialToggleState(settings.groups)
    setToggleStates(toggles)
    setToggleConstraints(constraints)
  }

  if (!techDetailsPage && isTechDetails) setTechDetailsPage(true)

  let isWindow = typeof window !== 'undefined' ? window : false
  const newSize = isWindow ? detectResize(window) : 0

  if (currentSize !== newSize && newSize !== 0) {
    resizeOccured = true
    setCurrentSize(newSize)
  }

  const onClickToggle = (buttonId: string, groupId: string, state: boolean) => {
    if (toggleStates && toggleConstraints) {
      const { consState, togState, orderedStates } = toggleHandler(
        buttonId,
        groupId,
        toggleStates,
        toggleConstraints,
        toggledOrderArrays
      )
      setToggleConstraints(consState)
      setToggleStates(togState)
      sideBarToggleCallback(buttonId, groupId, state)
      setToggledOrderArrays(orderedStates)
    }
  }

  const onClickClearGroup = (groupId: string) => {
    let newToggles = {}
    let newConstraints = toggleConstraints

    // Clear position ids for this group only
    if (toggledOrderArrays[groupId]) {
      let removeGroupsPositionIds = { ...toggledOrderArrays }
      removeGroupsPositionIds[groupId] = []
      setToggledOrderArrays(removeGroupsPositionIds)
    }

    const cleared = handleClearGroup(groupId, settings.groups)

    newConstraints![groupId] = cleared.constraints[groupId]

    setToggleConstraints(newConstraints)

    // Remove older toggleStates
    Object.keys(toggleStates!).forEach((id) => {
      if (id.charAt(0) !== groupId.toString()) newToggles = { ...newToggles, [id]: toggleStates![id] }
    })

    // Add the new clear toggle states
    newToggles = { ...newToggles, ...cleared.toggles }

    setToggleStates(newToggles)

    onClickClear(groupId)
  }

  const userClickedSubmit = (groupId: string, toggledStates: object[], orderedIds: string[]) => {
    onClickMenuToggle()
    onClickSubmit(groupId, toggledStates, orderedIds)
  }

  const sideBarMenuComponents = useMemo(() => {
    if (settings && toggleStates) {
      return renderButtonGroupsFunc(
        settings.groups,
        sideBarNavCallback,
        sideBarFuncCallback,
        onClickToggle,
        userClickedSubmit,
        onClickClearGroup,
        toggleStates,
        toggledOrderArrays
      )
    } else return { groupsAndButtons: [], toggledStates: {} }
  }, [toggleStates])

  const containerRef = useRef<HTMLDivElement>(null)
  const mainMenuRef = useRef<HTMLDivElement>(null)
  const menuComponentsRefs = useRef<HTMLDivElement[]>([])

  const onClickMenuToggle = () => {
    if (containerRef.current!.getBoundingClientRect().width > 0)
      hideMenu(containerRef.current!, mainMenuRef.current!, menuComponentsRefs.current!)
    else showMenu(containerRef.current!.style, mainMenuRef.current!.style, menuComponentsRefs.current!)
  }

  return (
    <div ref={containerRef} className="slider-side-menu-container scroller-settings">
      <div
        className={`slider-side-menu-toggle-title ${techDetailsPage ? 'tech-detail-visualisation-page-tab' : ''}`}
        onClick={() => onClickMenuToggle()}
      >
        <div className="slider-side-menu-text">{toggleButtonTitle}</div>
      </div>
      <div
        ref={mainMenuRef}
        className={`slider-menu-left-menu ${techDetailsPage ? 'tech-detail-visualisation-page-menu' : ''}`}
      >
        <div style={{ paddingTop: '10px' }}></div>
        <div className="slider-side-menu-components">
          {sideBarMenuComponents.groupsAndButtons.map((component, i) => {
            return (
              <div
                ref={(singleComponent) =>
                  menuComponentsRefs.current ? menuComponentsRefs.current.push(singleComponent!) : null
                }
                key={i}
                className="single-menu-component"
              >
                {component}
              </div>
            )
          })}
        </div>
      </div>
      {resizeOccured && hideMenu(containerRef.current!, mainMenuRef.current!, menuComponentsRefs.current)}
    </div>
  )
}
