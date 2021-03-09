import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/core/layout'
import SEO from '../components/core/seo'
import { MarkdownQueryData } from '../../types/Global'
import '../styles/site-pages.scss'
import { FixedHeaderOffset } from '../components/core/fixed-header-offset'

export default function SitePageTemplate({ data }: { data: MarkdownQueryData }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <Layout pageHeader={frontmatter.title}>
      <FixedHeaderOffset hasNavbar={true} />
      <SEO title={frontmatter.title} />
      <div style={{ margin: '20px' }}>
        <div className="site-page-content" dangerouslySetInnerHTML={{ __html: `${html}` }} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`
