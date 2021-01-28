import React from 'react'

interface ToggleProps {
  id: string
  label: string
  type: string
  groupId: string
  functionName: string
  isToggledOn: boolean
  isDisabled: boolean
  onClickToggle: (id: string, groupId: string, state: boolean) => void
}

export const ToggleButton = (props: ToggleProps) => {
  const { id, label, groupId, onClickToggle, isToggledOn, type, isDisabled } = props
  return (
    <button
      id={id}
      className={`${isToggledOn ? 'toggle-on' : 'toggle-off'}`}
      onClick={() => onClickToggle(id, groupId, !isToggledOn)}
      disabled={isDisabled}
    >
      {label}
    </button>
  )
}

interface SubmitProps {
  label: string
  groupId: string
  toggledStates: object[]
  orderedIds: string[]
  submitHandler: (groupId: string, toggledStates: object[], orderedIds: string[]) => void
}

export const SubmitButton = (props: SubmitProps) => {
  const { label, groupId, toggledStates, orderedIds, submitHandler } = props
  return <button onClick={() => submitHandler(groupId, toggledStates, orderedIds)}>{`${label}`}</button>
}

interface NavProps {
  id: string
  type: string
  label: string
  groupId: string
  navigateLink: string
  navigateHandler: (navigateLink: string, groupId: string) => Promise<void>
}

export const NavigateButton = (props: NavProps) => {
  const { label, groupId, navigateLink, navigateHandler } = props
  return <button onClick={() => navigateHandler(navigateLink, groupId)}>{`${label}`}</button>
}

interface FuncProps {
  id: string
  type: string
  label: string
  groupId: string
  functionName: string
  functionHandler: (functionName: string, groupId: string) => void
}

export const FunctionButton = (props: FuncProps) => {
  const { label, groupId, functionName, functionHandler } = props
  return <button onClick={() => functionHandler(functionName, groupId)}>{`${label}`}</button>
}

interface ClearProps {
  label: string
  groupId: string
  clearHandler: (groupId: string) => void
}

export const ClearButton = (props: ClearProps) => {
  const { label, groupId, clearHandler } = props
  return <button onClick={() => clearHandler(groupId)}>{`${label}`}</button>
}
