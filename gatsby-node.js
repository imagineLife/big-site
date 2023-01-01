/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
// const blogPost = path.resolve(`./src/templates/blog-post.js`)
const mdTemplate = path.resolve(`./src/templates/markdown/index.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  /*
    allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
  */
  const result = await graphql(`
    {
      k8s: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: { frontmatter: { order: { gt: 0 }, slug: { regex: "/k8s/" } } }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              parentDir
              order
            }
          }
        }
      }
      febs: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: { frontmatter: { order: { gt: 0 }, slug: { regex: "/febs/" } } }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              parentDir
            }
          }
        }
      }
      mongo: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/^mongo/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              parentDir
            }
          }
        }
      }
      mongosectioncontent: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: { frontmatter: { slug: { regex: "/^mongo//" } } }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              parentDir
            }
          }
        }
      }
      node: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/^node/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              parentDir
            }
          }
        }
      }
      httpserver: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/http-server/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              parentDir
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const {
    data: {
      k8s: { pages: k8sPages },
      febs: { pages: febsPages },
      mongo: { pages: mongoPages },
      node: { pages: nodePages },
      httpserver: { pages: httpServerPages },
      mongosectioncontent: { pages: mongoSectionContent },
    },
  } = result

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  // let posts = []
  // if (posts.length > 0) {
  //   posts.forEach((post, index) => {
  const pages = [...k8sPages, ...febsPages, ...mongoPages, ...nodePages, ...httpServerPages, ...mongoSectionContent]
  pages.forEach(({ page }, index) => {
    //     // const previousPostId = index === 0 ? null : posts[index - 1].id
    //     // const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    createPage({
      path: page.overview.slug,
      component: mdTemplate, //blogPost,
      context: {
        slug: page.overview.slug,
        parentDir: page.overview.parentDir || page.overview.slug,
        className: page.overview.parentDir || "",
      },
    })
  })
  // }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      slug: String
      parentDir: String
      author: String
      excerpt: String
      tags: String
      order: Int
    }

    type Fields {
      slug: String
    }
  `)
}
