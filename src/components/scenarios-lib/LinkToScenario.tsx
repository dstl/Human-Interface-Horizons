import React from 'react'
import { Link } from 'gatsby'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

interface Props {
  path: string
  imageTitle: string,
  scenarioImage: FileNode
}

export const ScenarioLink = (props: Props) => {
  let imageData = getImage(props.scenarioImage)!

  return (
    <Link className="s-l-p__link" to={`/${props.path}`}>
      <div className="s-l-p__scenario-image-container">
        <GatsbyImage
          className={'s-l-p__icon'}
          image={imageData}
          alt={props.path + ' Image'}
        />
        <div className="s-l-p__scenario-image-title">{props.imageTitle}</div>
      </div>
    </Link>
  )
}
