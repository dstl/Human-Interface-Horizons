import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { mapEdgesToNodes } from '../lib/helpers'
import Layout from '../components/core/layout'
import SEO from '../components/core/seo'
import { AllLandingPageCsvData } from '../../types/Global'
import '../styles/index-page.scss'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import { FixedHeaderOffset } from '../components/core/fixed-header-offset'
const comparisonTimelinesA = require('../images/landing/index-page-main/comparison-timelines-a.svg')
const comparisonTimelinesB = require('../images/landing/index-page-main/comparison-timelines-b.svg')
interface Props {
  data: AllLandingPageCsvData
}
export default function Index(props: Props) {
  const data = props.data.allLandingPageCsv.edges
  const landingImagesSmall = mapEdgesToNodes(props.data.landingImagesSmall)
  const landingImages = landingImagesSmall

  console.log(landingImages)

  return (
    <Layout mainContainerClassName="main-container-index-page">
      <SEO title="Home" />
      <FixedHeaderOffset hasNavbar={false} />
      <div className="landing__text-content-block"></div>

      <div className="landing__images-grid">
        <div className="landing__center-text-block">
          This tool aims to help users understand potential impacts and developments relating to human machine
          interfaces (HMIs) over the next 20 years from a Defence perspective. There are a number of different
          visualisations and resources which are designed to help you explore different aspects of future HMI
          technologies. Select from the options below.
        </div>
        {data.map((item) => {
          const { id, imageAltTxt, imageName, name, title, subtitle } = item.node
          const landingImage = landingImages.find((image: FileNode) => image.name === imageName)

          let imageData = getImage(landingImage)!
          return (
            <div key={id} className={`landing__${name}`}>
              <Link to={`/${name}`}>
                {name === 'technology-selector' && (
                  <>
                    <img src={comparisonTimelinesB} alt={imageAltTxt} />
                    <p />
                  </>
                )}
                {name !== 'technology-selector' && <GatsbyImage image={imageData} alt={imageAltTxt} />}

                <div className="landing__image-title">{title}</div>
              </Link>
              <div className="landing__image-subtitle">{subtitle}</div>
            </div>
          )
        })}
      </div>
      <FixedHeaderOffset hasNavbar={false} />
    </Layout>
  )
}

export const landingData = graphql`
  query landingData {
    allLandingPageCsv {
      edges {
        node {
          id
          imageAltTxt
          name
          title
          subtitle
          imageName
        }
      }
    }
    landingImagesSmall: allFile(filter: { relativePath: { regex: "/landing/index-page-small/" } }) {
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
// landingImagesMain: allFile(filter: { relativePath: { regex: "/landing/index-page-main/" } }) {
//   edges {
//     node {
//       name
//       childImageSharp {
//         gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
//       }
//     }
//   }
// }
