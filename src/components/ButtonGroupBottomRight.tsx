import React from 'react'

interface Props {
  backToParentPath: string
  backToButtonTxt: string
  onClickNavigate: (path: string) => void
}
//TODO: DELETE IF UNUSED
export const ButtonGroupBottomRight = (props: Props) => {
  const { backToParentPath, backToButtonTxt, onClickNavigate } = props
  return (
    <div className="button-group">
      <button className="button" onClick={() => onClickNavigate(backToParentPath)}>
        {backToButtonTxt}
      </button>
      <button className="button" onClick={() => onClickNavigate('/')}>
        Home
      </button>
    </div>
  )
}
