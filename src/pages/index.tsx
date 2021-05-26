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
const comparisonTimelinesB = require('../images/landing/index-page-main/comparison-timelines-b.svg')
interface Props {
  data: AllLandingPageCsvData
}
export default function Index(props: Props) {
  const data = props.data.allLandingPageCsv.edges
  const landingImagesSmall = mapEdgesToNodes(props.data.landingImagesSmall)
  const landingImages = landingImagesSmall

  return (
    <Layout mainContainerClassName="main-container-index-page">
      <SEO title="Home" />
      <FixedHeaderOffset hasNavbar={false} />
      <div className="landing__text-content-block"></div>

      <div className="landing__images-grid">
        <div className="landing__center-text-block">
          <p>
            This tool aims to help users understand potential impacts and developments relating to human-machine
            interfaces (HMIs) over the next 20 years from a Defence perspective. There are a number of different
            visualisations and resources which are designed to help you explore different aspects of future HMI
            technologies. These can be selected using the surrounding tiles.
          </p>
          <p>
            The best place to start is probably the HMI Technology Catalogue, which will provide you with an
            introduction to the different technologies that were analysed. The other tiles on the left cover potential
            cognitive challenges associated with the future operating environment. The tiles below and to the right
            allow you to explore how HMI technologies might develop over time, how they might be categorised and how
            they could end up being used in the future.
          </p>
          <p>
            An instructional video explaining the various elements of the tool and how to use them can be downloaded using <a href="https://github.com/dstl/Human-Interface-Horizons/blob/test/docs/HIH_Tool_Guidance_Video.mp4?raw=true">this link</a>.
          </p>
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
