import React from 'react'
import { TechnologyCard } from './TechnologyCard'
import { Technology } from '../../../types/Global'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'

interface Props {
  enabledTechIds: string[]
  technologies: Technology[]
  technologyImages: FileNode[]
  onClickTechItem: (techId: string) => void
  explicitlyDisabledIds: string[]
  explicitlyEnabledIds: string[]
  onClickTechLink: (techId: string) => void
}

export default function TechnologyCards(props: Props) {
  return (
    <div className="tech-grid-wrapper">
      {props.technologies.map((tech) => {
        const technologyImage = props.technologyImages.find((image: any) => image.name === tech.icon)
        if (!technologyImage) {
          return null;
        }
        return (
          <TechnologyCard
            key={tech.id}
            onPress={props.onClickTechItem}
            onPressLink={props.onClickTechLink}
            technology={tech}
            technologyImage={technologyImage}
            isExplicitlyDisabled={props.explicitlyDisabledIds.includes(tech.id)}
            isExplicitlyEnabled={props.explicitlyEnabledIds.includes(tech.id)}
            isTechDisabled={!props.enabledTechIds.some((id) => id === tech.id)}
          />
        )
      })}
    </div>
  )
}
