import React from 'react'
import { Technology } from '../../../types/Global'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'

interface Props {
  technology: Technology
  technologyImage: FileNode
  isTechDisabled: boolean
  isExplicitlyDisabled?: boolean
  isExplicitlyEnabled: boolean
  onPress: (techId: string) => void
  onPressLink: (techId: string) => void
}

export const TechnologyCard = (props: Props) => {
  const { technology, isTechDisabled, isExplicitlyEnabled, isExplicitlyDisabled, onPress, onPressLink } = props

  const showHideIcon = `tech-container-icon${isTechDisabled ? ' disabled' : ''}${
    isExplicitlyDisabled ? ' explicit' : ''
  }${isExplicitlyEnabled ? ' explicit-enabled' : ''}`

  let imageData = getImage(props.technologyImage)!

  return (
    <div className="tech-container" key={technology.id}>
      <div onClick={() => onPress(technology.id)} data-tip={technology.title || ''} data-iscapture="true">
        <GatsbyImage className={showHideIcon} image={imageData} alt={technology.title} />
      </div>
      <button className="tech-click-button" onClick={() => onPressLink(technology.slug)}>
        {technology.title}
      </button>
    </div>
  )
}
