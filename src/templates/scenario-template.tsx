import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'
import { MarkdownQueryData } from '../../types/Global'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import '../styles/scenario-pages.scss'

export default function ScenarioTemplate({ data }: { data: MarkdownQueryData }) {
  const { frontmatter, html } = data.markdownRemark

  let imageData = getImage(data.scenarioImage)!

  return (
    <Layout pageHeader={frontmatter.title} breadcrumb={{ label: 'Scenario Library', link: '/scenario-library' }}>
      <SEO title={frontmatter.title} />
      <div className="scen__container">
        <GatsbyImage className={'scen__image'} image={imageData} alt={frontmatter.title + ' Image'} />
        <div className="scen__content" dangerouslySetInnerHTML={{ __html: `<div>${html}</div>` }}></div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $imageRelativePath: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        image {
          publicURL
        }
      }
    }
    scenarioImage: file(relativePath: { eq: $imageRelativePath }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 700, placeholder: TRACED_SVG)
      }
    }
  }
`
