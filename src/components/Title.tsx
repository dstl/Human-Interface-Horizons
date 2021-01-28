import React from 'react'

interface Props {
  text: string
}

export const Title = (props: Props) => {
  return <h2 className="page-title">{props.text}</h2>
}
