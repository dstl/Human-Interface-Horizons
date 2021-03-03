import React, { useState } from 'react'
import Layout from '../components/core/layout'
import SEO from '../components/core/seo'
import { graphql, navigate, withPrefix } from 'gatsby'
import { Technology, TechnologyQueryData } from '../../types/Global'
import { mapEdgesToNodes } from '../lib/helpers'
import { simpleFilterTechnologies } from '../components/technology-selector/filter-tech'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import '../styles/tech-convergance.scss'
import { FixedHeaderOffset } from '../components/core/fixed-header-offset'
interface Props {
  data: {
    allTechnologiesCsv: TechnologyQueryData[]
    technologyImages: FileNode[]
  }
}

export default function TechnologyConvergence(props: Props) {
  const { data } = props
  // This is the max and min number of tech to compare
  const techCompareMax = 5
  const techCompareMin = 1

  const technologies: Technology[] = mapEdgesToNodes(data.allTechnologiesCsv)
  const technologyImages = mapEdgesToNodes(props.data.technologyImages)

  const [explicitlyEnabledIds, setExplicitlyEnabled] = useState<string[]>([])

  // Calculate the current available techs
  const enabledTechnologies = simpleFilterTechnologies(technologies, explicitlyEnabledIds)

  const submitEnabled = enabledTechnologies.length >= techCompareMin && enabledTechnologies.length <= techCompareMax
  const resetEnabled = enabledTechnologies.length > 0

  /**
   * When a specific technology is selected - remove it from view
   * @param techId
   */
  const onClickTechItem = (techId: string): void => {
    const isExplicityEnabled = explicitlyEnabledIds.includes(techId)

    if (isExplicityEnabled) {
      setExplicitlyEnabled(explicitlyEnabledIds.filter((c) => c !== techId))
    } else {
      setExplicitlyEnabled([...explicitlyEnabledIds, techId])
    }
  }

  /**
   * Send user to the tech details page when they click on "To Library Page"
   * @param navToTechPage Tech name to link to page
   */
  const onClickTechLink = (navToTechPage: string) => {
    window.open(withPrefix(`/technology/${navToTechPage}`), '_blank')
  }

  const onClickSubmit = () => {
    let params: string = ''

    enabledTechnologies.forEach((id) => {
      params = params.concat(`${id},`)
    })
    params = params.replace(/\,$/, '')
    navigate(`/technology-convergence-visualisation?technologies=${params}`)
  }

  const onClickReset = () => {
    setExplicitlyEnabled([])
  }

  return (
    <Layout title-="Aleph HMI" pageHeader={'Technology Convergence Timeline'}>
      <SEO title="Technology Convergence" />
      <FixedHeaderOffset hasNavbar={true} />
      <div className="tech-conver">
        <div className="tech-conver__header-GI">
          Choose from technologies below to generate a visualisation showing how these technologies could combine with
          others to produce new integrated capabilities in the future. Select up to five technologies and then submit.
        </div>

        <div className={'tech-conver__main-GI'}>
          {technologies.map((tech) => {
            const technologyImage = technologyImages.find((image: any) => image.name === tech.icon)

            if (!technologyImage) return null

            let imageData = getImage(technologyImage)!

            return (
              <div key={tech.id} className="tech-conver__grid-item">
                <div className="tech-conver__tech-container">
                  <div onClick={() => onClickTechItem(tech.id)} data-tip={tech.title || ''} data-iscapture="true">
                    <GatsbyImage
                      style={{ opacity: explicitlyEnabledIds.includes(tech.id) ? 1 : 0.2 }}
                      image={imageData}
                      alt={tech.title}
                    />
                  </div>
                  <button
                    className="tech-conver__tech-click-button"
                    onClick={() => onClickTechLink(tech.slug)}
                    disabled={!enabledTechnologies.some((id) => id === tech.id)}
                  >
                    {tech.title}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="tech-conver__buttons-right">
        <button disabled={!resetEnabled} onClick={() => onClickReset()} style={{ opacity: !resetEnabled ? 0.3 : 1 }}>
          Reset
        </button>
        <button disabled={!submitEnabled} onClick={() => onClickSubmit()} style={{ opacity: !submitEnabled ? 0.3 : 1 }}>
          Submit
        </button>
      </div>
    </Layout>
  )
}

export const TechnologyQuery = graphql`
  query {
    allTechnologiesCsv {
      edges {
        node {
          id
          icon
          title
          slug
        }
      }
    }
    technologyImages: allFile(filter: { relativePath: { regex: "image/black/png/" } }) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`
