const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query GetData {
      allContentfulWorkshopEntry(
        filter: {
          title: { ne: "Placeholder (do not delete)" }
        }
      ) {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulSupplementalContent {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const workshops = result.data.allContentfulWorkshopEntry.edges
  const supplemental = result.data.allContentfulSupplementalContent.edges

  workshops.forEach(({ node }) => {
    const workshopSlug = node.slug
    createPage({
      path: `/journal/${workshopSlug}`,
      component: require.resolve("./src/templates/workshop-template.js"),
      context: { slug: workshopSlug },
    })
  })

  supplemental.forEach(({ node }) => {
    const supplementalSlug = node.slug
    createPage({
      path: `/journal/${supplementalSlug}`,
      component: require.resolve("./src/templates/supplemental-template.js"),
      context: { slug: supplementalSlug },
    })
  })
}
