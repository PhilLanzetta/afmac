/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query GetData {
      allContentfulWorkshopEntry {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const workshops = result.data.allContentfulWorkshopEntry.edges

  workshops.forEach(({ node }) => {
    const workshopSlug = node.slug
    createPage({
      path: `/journal/${workshopSlug}`,
      component: require.resolve("./src/templates/workshop-template.js"),
      context: { slug: workshopSlug },
      defer: true,
    })
  })
}
