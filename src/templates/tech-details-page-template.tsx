import React from 'react'
import SEO from '../components/core/seo'
import { graphql } from 'gatsby'
import Layout from '../components/core/layout'
import { createTabContent } from '../lib/helpers'
import { MetaTabs } from '../components/tech-details/Tabs'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Technology, TechnologyMetaData } from '../../types/Global'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import { Visualisation } from '../components/visualisations/Visualisation'
import '../styles/tech-details.scss'

interface Props {
  data: {
    technologiesCsv: Technology
    visualisationsJson: any
    technologyImage: FileNode
  }
}

const TechDetailsPageTemplate = (props: Props) => {
  const tech = props.data && props.data.technologiesCsv
  const visualisationsJson = props.data && props.data.visualisationsJson

  let techMetaData: TechnologyMetaData = createTabContent(tech)
  let imageData = getImage(props.data.technologyImage)!

  return (
    <Layout
      title-="Aleph HMI"
      pageHeader={tech.title}
      breadcrumb={{ label: 'Technology Library', link: '/technology-library' }}
      className={'ignore-gatsby-wrapper'}
    >
      <SEO title="Technology Library" />
      <div className="tech-details-container">
        <div className="tech-details-grid">
          <MetaTabs techMetaData={techMetaData} />
          <div className="tech-details-image-grid">
            <div>
              <GatsbyImage className={'stech-details-image'} image={imageData} alt={tech.title + ' Image'} />
            </div>
          </div>

          <div className="tech-details-vis-grid">
            <Visualisation {...visualisationsJson} params={{ technologies: tech.id }} isTechDetails={true} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TechDetailsPageTemplate

export const technologyDetailsQuery = graphql`
  query($id: String!, $imageRelativePath: String!) {
    technologiesCsv(id: { eq: $id }) {
      id
      title
      slug
      summary
      timetoeffect_optimistic
      timetoeffect_likely
      timetoeffect_pessimistic
      example_applications
      references
      implicationsDefenceSecurity
      softwareAndAiRequirements
      legalEthicalImplications
      strategicImpactAssessment
      typeOfTechnology
      prominentDevelopers
      disruptiveness
      sensory
      environment
      overview
      image {
        publicURL
      }
    }
    technologyImage: file(relativePath: { eq: $imageRelativePath }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
    }
    visualisationsJson(route: { eq: "single-technology-comparison-visualisation" }) {
      route
      title
      width
      height
      heightRatio
      rootPath
      renderFunction
      scripts {
        file
      }
      css {
        file
      }
      settings {
        groups {
          id
          title
          settings {
            toggle {
              maxToggled
              minToggled
              orderImportant
              positionLabels
            }
            submitButton {
              id
              labelOn
              labelOff
            }
            clearButton {
              id
              labelOn
              labelOff
            }
          }
          buttons {
            id
            type
            label
            labelOn
            labelOff
            action
            isToggled
            isDisabled
          }
        }
      }
    }
  }
`
