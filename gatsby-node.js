const path = require("path")

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
