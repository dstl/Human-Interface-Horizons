import React from 'react'

export interface Props {
  hasNavbar: boolean
}

export const FixedHeaderOffset = (props: Props) => {
  const { hasNavbar } = props
  return <div className={hasNavbar ? 'fixed-header-offset-with-navbar' : 'fixed-header-offset'}></div>
}
