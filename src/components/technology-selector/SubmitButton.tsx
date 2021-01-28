import React from 'react'

interface Props {
  onClickSubmit(): void
  isSubmitDisabled: boolean
  buttonText: string
}

export default function SubmitButton(props: Props) {
  const { onClickSubmit, isSubmitDisabled, buttonText } = props

  return (
    <button
      disabled={isSubmitDisabled}
      className="submit-button-tech-page"
      onClick={() => onClickSubmit()}
      style={{ opacity: isSubmitDisabled ? 0.3 : 1 }}
    >
      {buttonText}
    </button>
  )
}
