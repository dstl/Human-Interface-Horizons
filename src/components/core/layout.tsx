import React, { Fragment } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { PageHeader } from '../PageHeader'
import '../../styles/layout.scss'
import { graphql, useStaticQuery } from 'gatsby'

interface Breadcrumb {
  label: string
  link: string
}
interface Props {
  className?: string
  title?: string
  breadcrumb?: Breadcrumb
  pageHeader?: string
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const { title, breadcrumb, children, pageHeader, className } = props
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return (
    <div className={className ? className : ' layout-grid'}>
      <Header
        siteTitle={title || site.siteMetadata.title}
        PageHeader={pageHeader ? <PageHeader text={pageHeader} breadcrumb={breadcrumb} /> : <Fragment></Fragment>}
      />
      {/* {pageHeader && <PageHeader text={pageHeader} breadcrumb={breadcrumb} />} */}
      <div className="main-container">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
