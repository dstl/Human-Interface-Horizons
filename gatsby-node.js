const path = require('path')

async function createTechDetailsPagesFromCSV(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allTechnologiesCsv {
        edges {
          node {
            id
            slug
            image {
              relativePath
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  result.data.allTechnologiesCsv.edges.forEach(({ node }) => {
    let relativePath = (node.image) ? node.image.relativePath : undefined;
    createPage({
      path: `/technology/${node.slug}`,
      component: path.resolve(`./src/templates/tech-details-page-template.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        id: node.id,
        imageRelativePath: relativePath
      },
    })
  })
}

async function createVisualisationPages(graphql, actions, reporter) {
  const { createPage } = actions

  const result = await graphql(`
    query VisualisationQuery {
      allVisualisationsJson {
        edges {
          node {
            route
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  result.data.allVisualisationsJson.edges.forEach(({ node }) => {
    if (node.route && node.route !== '') {
      createPage({
        path: `/${node.route}`,
        component: path.resolve(`./src/templates/visualisation-page-template.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          route: node.route,
        },
      })
    }
  })
}

async function createPagesFromMarkdown(graphql, actions, reporter) {
  const { createPage } = actions

  const sitePageTemplate = require.resolve(`./src/templates/site-page.tsx`)
  const scenarioPageTemplate = require.resolve(`./src/templates/scenario-template.tsx`)

  let pageTemplate

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              style
              image {
                relativePath
              }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const style = node.frontmatter.style

    // This checks the style of the page e.g "site" would be about, privacy pages e.g
    // "scenarios" would be e.g "good uav operator" or "bad dismounted patrol" pages
    switch (style) {
      case 'scenario':
        pageTemplate = scenarioPageTemplate
        break
      case 'site':
        pageTemplate = sitePageTemplate
        break

      default:
        pageTemplate = sitePageTemplate
        break
    }

    let relativePath = (node.frontmatter.image) ? node.frontmatter.image.relativePath : undefined;

    createPage({
      path: node.frontmatter.slug,
      component: pageTemplate,
      context: { slug: node.frontmatter.slug, imageRelativePath: relativePath },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createTechDetailsPagesFromCSV(graphql, actions, reporter)
  await createPagesFromMarkdown(graphql, actions, reporter)
  await createVisualisationPages(graphql, actions, reporter)
}
