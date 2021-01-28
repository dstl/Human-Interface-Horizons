import React from 'react'

interface Props {
  onClickReset(): void
  isResetDisabled: boolean
  buttonText: string
}

export default function SubmitButton(props: Props) {
  const { onClickReset, isResetDisabled, buttonText } = props

  return (
    <button
      disabled={isResetDisabled}
      className="reset-button-tech-page"
      onClick={() => onClickReset()}
      style={{ opacity: isResetDisabled ? 0.3 : 1 }}
    >
      {buttonText}
    </button>
  )
}
