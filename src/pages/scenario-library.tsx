import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/core/layout'
import SEO from '../components/core/seo'
import { ScenarioLink } from '../components/scenarios-lib/LinkToScenario'
import { ScenarioData, ScenarioTitles } from '../../types/Global'
import '../styles/scenario-lib.scss'
import { FileNode, getImage } from 'gatsby-plugin-image/dist/src/components/hooks'
import { mapEdgesToNodes } from '../lib/helpers'

interface Props {
  data: {
    allScenarioLibCsv: ScenarioData
    scenarioLibCsv: ScenarioTitles
    scenarioImages: FileNode[]
  }
}

export default function ScenarioLibrary(props: Props) {
  const titles = props.data.scenarioLibCsv
  const scenarios = props.data.allScenarioLibCsv
  const scenarioImages = mapEdgesToNodes(props.data.scenarioImages)

  return (
    <Layout title-="Aleph HMI" pageHeader={'Future Scenarios'}>
      <SEO title="Scenario Library" />
      <div className="s-l-p__container">
        <div className="s-l-p__grid-container">
          <div className="s-l-p__x-title-left">{titles.xTitleLeft}</div>
          <div className="s-l-p__x-title-center">{titles.xTitleCenter}</div>
          <div className="s-l-p__x-title-right">{titles.xTitleRight}</div>
          <div className="s-l-p__y-title-top">
            <div className="s-l-p__scenario-title-container">
              <div className="s-l-p__scenario-title">{titles.yTitleTop}</div>
              <div className="s-l-p__scenario-subtitle">{titles.ySubtitleTop}</div>
            </div>
          </div>
          <div className="s-l-p__y-title-middle">
            <div className="s-l-p__scenario-title-container">
              <div className="s-l-p__scenario-title">{titles.yTitleMiddle}</div>
              <div className="s-l-p__scenario-subtitle">{titles.ySubtitleMiddle}</div>
            </div>
          </div>
          <div className="s-l-p__y-title-bottom">
            <div className="s-l-p__scenario-title-container">
              <div className="s-l-p__scenario-title">{titles.yTitleBottom}</div>
              <div className="s-l-p__scenario-subtitle">{titles.ySubtitleBottom}</div>
            </div>
          </div>

          {scenarios.edges.map((item) => {
            const scenarioImage = scenarioImages.find((image: any) => image.name === item.node.imageName)
            return (
              <div key={item.node.id} className={`s-l-p__${item.node.className}`}>
                <ScenarioLink path={item.node.slug} scenarioImage={scenarioImage} imageTitle={item.node.imageTitle} />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allScenarioLibCsv {
      edges {
        node {
          id
          className
          imageTitle
          slug
          imageName
        }
      }
    }
    scenarioLibCsv(id: { eq: "1" }) {
      xTitleLeft
      xTitleRight
      xTitleCenter
      yTitleTop
      ySubtitleTop
      yTitleMiddle
      ySubtitleMiddle
      yTitleBottom
      ySubtitleBottom
    }
    scenarioImages: allFile(filter: { relativePath: { regex: "/scenarios/preview/" } }) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 250, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`
