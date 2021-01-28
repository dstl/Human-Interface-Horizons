import React from 'react'
import SEO from '../components/core/seo'
import { graphql, navigate } from 'gatsby'
import Layout from '../components/core/layout'
import { Technology } from '../../types/Global'
import { mapEdgesToNodes } from '../lib/helpers'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import '../styles/tech-lib.scss'

interface Props {
  data: { allTechnologiesCsv: { edges: Technology[] }; technologyImages: FileNode[] }
}

export default function TechnologyLibrary(props: Props) {
  const data = props.data.allTechnologiesCsv.edges
  const techImages = mapEdgesToNodes(props.data.technologyImages)

  return (
    <Layout title-="Aleph HMI" pageHeader={'HMI Technology Catalogue'}>
      <SEO title="HMI Technology Catalogue" />
      <div className="tech-selector-guidance">
        Select from the HMI technologies below to see more detailed information about a given technology.
      </div>

      <div className="tech-grid-wrapper tech-lib-wrapper" style={{ justifyContent: 'center' }}>
        {data.map((item: any, i: number) => {
          const techImage = techImages.find((image: any) => image.name === item.node.icon)
          let imageData = getImage(techImage)!

          return (
            <div
              key={i}
              data-iscapture="true"
              className="tech-container"
              data-tip={item.node.title || ''}
              onClick={() => navigate(`/technology/${item.node.slug}`)}
            >
              <div>
                <GatsbyImage className={'tech-container-icon'} image={imageData} alt={item.node.title} />
              </div>
              <button className="tech-click-button">{item.node.title}</button>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const IndexQuery = graphql`
  query {
    allTechnologiesCsv {
      edges {
        node {
          slug
          title
          icon
        }
      }
    }
    technologyImages: allFile(filter: { relativePath: { regex: "/tech-images/icons/black/" } }) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`
