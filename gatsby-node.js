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
const tagTemplate = path.resolve(`./src/templates/tags.js`)

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
              tags
              parentDir
              shortSlug
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
              tags
              parentDir
              shortSlug
            }
          }
        }
      }
      k8s: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: {
            order: { gt: 0 }
            slug: { regex: "/^k8s(?!.*(docker|examples)).*/" }
            title: { ne: null }
          }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              tags
              parentDir
              shortSlug
              order
            }
          }
        }
      }
      linux: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/linux/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              tags
              parentDir
              shortSlug
            }
          }
        }
      }
      misc: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/^misc/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              tags
              parentDir
              shortSlug
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
              tags
              parentDir
              shortSlug
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
              tags
              parentDir
              shortSlug
            }
          }
        }
      }
      nginx: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: {
            order: { gt: 0 }
            slug: { regex: "/nginx/" }
            title: { ne: null }
          }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              tags
              parentDir
              shortSlug
              order
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
              tags
              parentDir
              shortSlug
            }
          }
        }
      }
      scrum: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/scrum/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              tags
              parentDir
              shortSlug
            }
          }
        }
      }
      socials: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/^the-social/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              tags
              parentDir
              shortSlug
            }
          }
        }
      }
      strengths: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/strengths/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
              tags
              parentDir
              shortSlug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
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
      httpserver: { pages: httpServerPages },
      k8s: { pages: k8sPages },
      febs: { pages: febsPages },
      linux: { pages: linuxPages },
      misc: { pages: miscPages },
      mongo: { pages: mongoPages },
      mongosectioncontent: { pages: mongoSectionContent },
      nginx: { pages: nginxPages },
      node: { pages: nodePages },
      scrum: { pages: scrumPages },
      socials: { pages: socialPages },
      strengths: { pages: strengthsPages },
      tagsGroup: { group: groupOfTags },
    },
  } = result

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  const pages = [
    ...febsPages,
    ...httpServerPages,
    ...k8sPages,
    ...linuxPages,
    ...miscPages,
    ...mongoPages,
    ...nginxPages,
    ...nodePages,
    ...mongoSectionContent,
    ...scrumPages,
    ...socialPages,
    ...strengthsPages,
  ]
  pages.forEach(({ page }, index) => {
    let pageObj = {
      path: page.overview.slug,
      component: mdTemplate,
      context: {
        slug: page.overview.slug,
        parentDir: page.overview.parentDir || page.overview.slug,
        shortSlug: page.overview.shortSlug,
        className: page.overview.parentDir || "",
      },
    }
    if(page?.overview?.shortSlug) pageObj.context.shortSlug = page.overview.shortSlug
    createPage(pageObj)
  })

  groupOfTags.forEach(({ fieldValue }) => {
    createPage({
      path: `/tags/${fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: fieldValue,
      },
    })
  })
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
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",

    // Setting default field type on shortSlug
    // https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#setting-default-field-values
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        shortSlug: {
          type: "String",
          resolve(source) {
            const { shortSlug } = source
            if (source.shortSlug == null) {
              const thisShortSlug = source.slug?.split("/")[1]
              if (!thisShortSlug) { 
                if (!source.slug) { 
                  return 'missing'
                } else {
                  return source.slug 
                }
              } 
              return thisShortSlug
            } else return shortSlug
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.txt/,
          type: "asset/source",
        },
      ],
    },
  })
}

// delete the pages that match the collection routing provided by gatsby
// BUT aren't what I want: here remove all docker/* that aren't supposed to be there
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const dockerShortSlugs = ['cli-overview', 'dockerfile-intro', 'a-frontend', 'node-on-docker-intro', 'node-server-with-user', 'node-server-with-deps', 'setup-docker', 'node-server-containerized', 'a-smaller-node-image', 'why-containers'];

  if (page.path.includes("docker") && page.path !== "/docker" && !dockerShortSlugs.includes(page.context.frontmatter__shortSlug)) {
      console.log("deleting page: ", page.path)
      deletePage(page)
  }
}