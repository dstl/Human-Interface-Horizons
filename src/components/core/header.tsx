import React from 'react'
import { Link } from 'gatsby'
import '../../styles/header.scss'
const aiLogoSvg = require('../../images/brand-images/AI-logo-text-light-bgTransparent-withoutTrim.svg')
const dstLogoSvg = require('../../images/brand-images/dstl-logo-lockup-inline-negative.svg')

interface Props {
  siteTitle: string
  PageHeader: JSX.Element
}

export const Header = ({ siteTitle, PageHeader }: Props) => {
  return (
    <header>
      <div className="nav-container">
        <div className="nav-logo-left">
          <img className="ai-header-logo" alt="Aleph Insights Logo" src={aiLogoSvg} />
        </div>
        <div className="nav-title-center">{siteTitle}</div>
        <div className="nav-logo-right">
          <img className="dstl-header-logo" alt="DSTL Logo" src={dstLogoSvg} />
        </div>
      </div>
      {PageHeader}
    </header>
  )
}
