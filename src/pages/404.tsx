import React from 'react'
import styled from 'styled-components'
import Layout from '../components/core/layout'
import SEO from '../components/core/seo'

const NotFoundPage = () => (
  <Layout pageHeader={'NOT FOUND'}>
    <SEO title="404: Not found" />
    <PositionCenter>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </PositionCenter>
  </Layout>
)

const PositionCenter = styled.div`
  margin: 100px auto 10px auto;
  width: fit-content;
  text-align: center;
`

export default NotFoundPage
