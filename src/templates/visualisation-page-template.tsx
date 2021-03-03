import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/core/layout'
import SEO from '../components/core/seo'
import { Visualisation } from '../components/visualisations/Visualisation'
import { useLocation } from '@reach/router'
import queryString from 'query-string'

export const query = graphql`
  query VisualisationPageTemplateQuery($route: String!) {
    visualisationsJson(route: { eq: $route }) {
      route
      breadcrumb {
        label
        link
      }
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
              isDisabled
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

const VisualisationPageTemplateQuery = (props: any) => {
  const location = useLocation()
  const queryParams = location.search ? queryString.parse(location.search) : {}
  const { data } = props
  const visualisationsJson = data.visualisationsJson

  return (
    <Layout title-="Aleph HMI" pageHeader={visualisationsJson.title} breadcrumb={visualisationsJson.breadcrumb}>
      <SEO title={visualisationsJson.title} />
      <Visualisation {...visualisationsJson} params={queryParams} />
    </Layout>
    //
  )
}

export default VisualisationPageTemplateQuery
