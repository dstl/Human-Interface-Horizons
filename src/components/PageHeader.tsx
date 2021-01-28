import { Link } from 'gatsby'
import React from 'react'

interface Breadcrumb {
  label: string
  link: string
}
interface Props {
  text: string
  breadcrumb?: Breadcrumb
}

export const PageHeader = (props: Props) => {
  return (
    <div className="main-title">
      <div className="main-title__home">
        <Link to="/">Home</Link>
        {props.breadcrumb && (
          <span>
            {' > '}
            <Link to={props.breadcrumb.link}>{props.breadcrumb.label}</Link>
          </span>
        )}
      </div>
      <div className="main-title__header">{props.text}</div>
      <div className="main-title__right"></div>
    </div>
  )
}
