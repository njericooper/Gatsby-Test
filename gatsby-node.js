const path = require(`path`)

const BLOG_POST_LIMIT = 1000
const BLOG_POST_COVER_IMAGE_MAX_WIDTH = 800


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  return graphql(`
  {
    allContentfulPost {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
  
  `).then(result => {
    // Create blog pages
    result.data.allContentfulPost.edges.forEach(({ node }) => {
      createPage({
        path: post.node.slug,
        component: path.resolve(`./src/templates/blog-post-contentful.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: post.node.slug,
          coverImageMaxWidth: BLOG_POST_COVER_IMAGE_MAX_WIDTH,
        },
      })
    })
  })
}
