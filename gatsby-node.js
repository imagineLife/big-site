/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const { execSync } = require("child_process")
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
// const blogPost = path.resolve(`./src/templates/blog-post.js`)
const mdTemplate = path.resolve(`./src/templates/markdown/index.js`)
const tagTemplate = path.resolve(`./src/templates/tags.js`)
const nestedNavTemplate = path.resolve("./src/templates/nestedNav/index.js")

const sidebarNestedSections = {
  /*
    blogSection (by-url-string): {
      sectionName: "friendly name here",
      items: [], array for logic later,
      parentDir: hmm...
    }
  */
  k8s: {
    "in-depth": {
      sectionName: "In Depth",
      items: [],
      parentDir: "k8s/in-depth",
    },
    "networking-intro": {
      sectionName: "Networking Intro",
      items: [],
      parentDir: "k8s",
    },
    "architecture-intro": {
      sectionName: "Architecture Intro",
      items: [],
      parentDir: "k8s",
    },
    "": {
      sectionName: "Getting Started",
      items: [],
      parentDir: "k8s",
    },
    findOrder: ["networking-intro", "architecture-intro", "in-depth", ""],
    order: ["", "networking-intro", "architecture-intro", "in-depth"],
    finished: false,
  },
  node: {
    "using-the-cli": {
      sectionName: "Using The CLI",
      items: [],
      parentDir: "node",
    },
    "": {
      sectionName: "More",
      items: [],
      parentDir: "node",
    },
    findOrder: ["using-the-cli", ""],
    order: ["using-the-cli", ""],
    finished: false,
  },
  js: {
    intro: {
      sectionName: "Intro",
      items: [],
      parentDir: "js",
    },
    fp: {
      sectionName: "Functions",
      items: [],
      parentDir: "js",
    },
    deps: {
      sectionName: "Dependencies",
      items: [],
      parentDir: "js",
    },
    mods: {
      sectionName: "Modules",
      items: [],
      parentDir: "js",
    },
    "": {
      sectionName: "More",
      items: [],
      parentDir: "js",
    },
    findOrder: ["intro", "fp", "deps", "mods", ""],
    order: ["intro", "fp", "deps", "mods", ""],
    finished: false,
  },
}

/*
  output extected to be shaped
  [
    {
      sectionName: "In Depth",
      items: [
        {
          frontmatter: { shortSlug, title, slug }
        }
      ]
    }
  ]
*/
function prepOtherPages({ pages, nestingRules }) {
  // FLAT
  if (!nestingRules) return pages

  if (nestingRules.finished === true)
    return nestingRules.order.map(
      sectionToUse => nestingRules[`${sectionToUse}`]
    )

  pages.forEach(({ page }) => {
    const theSectionThisPageIsPartOf = nestingRules.findOrder.find(
      sectionString => page.overview.slug.includes(sectionString)
    )

    if (theSectionThisPageIsPartOf) {
      nestingRules[theSectionThisPageIsPartOf].items.push(page)
    } else {
      nestingRules[""].items.push(page)
    }
  })
  nestingRules.finished = true
  return nestingRules.order.map(sectionToUse => nestingRules[`${sectionToUse}`])
}

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
}
      

  */
  const result = await graphql(`
    {
      docker: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/docker/" } }
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
            content: html
          }
        }
        otherPages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              shortSlug
              parentDir
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
      js: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: { frontmatter: { order: { gt: 0 }, slug: { regex: "/^js/" } } }
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
            content: html
          }
        }
        otherPages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              shortSlug
              parentDir
            }
          }
        }
      }
      k8s: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: {
            order: { gt: 0 }
            slug: { regex: "/^k8s/((?!examples).)/" }
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
            }
            content: html
          }
        }
        otherPages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              shortSlug
              parentDir
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
            content: html
          }
        }
        otherPages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              shortSlug
              parentDir
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
          frontmatter: { order: { gt: 0 }, slug: { regex: "/nginx/" } }
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
            content: html
          }
        }
        otherPages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              shortSlug
              parentDir
            }
          }
        }
      }
      node: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: { frontmatter: { slug: { regex: "/^node/" } } }
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
            content: html
          }
        }
        otherPages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              shortSlug
              parentDir
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
            content: html
          }
        }
        otherPages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              shortSlug
              parentDir
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
      tagsGroup: { group: groupOfTags },
    },
  } = result

  // loop through graphql sections (docker, k8s, linux, etc)
  Object.keys(result.data).forEach(sectionName => {
    if (sectionName !== "tagsGroup") {
      const thisSectionPages = result.data[`${sectionName}`].pages

      thisSectionPages.forEach(({ page }) => {
        const thisParent = page.overview.parentDir || page.overview.slug
        let pageObj = {
          path: page.overview.slug,
          component:
            page.overview.slug.startsWith("docker") ||
            page.overview.slug.startsWith("js") ||
            page.overview.slug.startsWith("k8s") ||
            page.overview.slug.startsWith("linux") ||
            page.overview.slug.startsWith("nginx") ||
            page.overview.slug.startsWith("node") ||
            page.overview.slug.startsWith("scrum")
              ? nestedNavTemplate
              : mdTemplate,
          context: {
            title: page.overview.title,
            excerpt: page.overview.excerpt,
            tags: page.overview.tags,
            slug: page.overview.slug,
            parentDir: thisParent,
            shortSlug: page.overview.shortSlug,
            className: page.overview.parentDir || "",
          },
        }

        if (page?.overview?.shortSlug)
          pageObj.context.shortSlug = page.overview.shortSlug

        //
        // more all-inclusive nested-layout accommodations
        //
        if (
          page.overview.slug.startsWith("docker") ||
          page.overview.slug.startsWith("js") ||
          page.overview.slug.startsWith("k8s") ||
          page.overview.slug.startsWith("linux") ||
          page.overview.slug.startsWith("nginx") ||
          page.overview.slug.startsWith("node") ||
          page.overview.slug.startsWith("scrum")
        ) {
          pageObj.context.content = page.content
          pageObj.context.otherPages = prepOtherPages({
            pages: result.data[`${sectionName}`].otherPages,
            nestingRules:
              sidebarNestedSections[page.overview.slug.split("/")[0]],
          })
        }
        createPage(pageObj)
      })
    }
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
    const gitAuthorTime = execSync(
      `git log -1 --pretty=format:%aI ${node.fileAbsolutePath}`
    ).toString()

    createNodeField({
      node,
      name: "gitAuthorTime",
      value: gitAuthorTime,
    })

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
                  return "missing"
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
// exports.onCreatePage = ({ page, actions }) => {
// const { createPage, deletePage } = actions

/*
    docker cleanup
  */
// const dockerShortSlugs = ['cli-overview', 'dockerfile-intro', 'a-frontend', 'node-on-docker-intro', 'node-server-with-user', 'node-server-with-deps', 'setup-docker', 'node-server-containerized', 'a-smaller-node-image', 'why-containers'];

// if (page.path.includes("docker") && page.path !== "/docker" && !dockerShortSlugs.includes(page.context.frontmatter__shortSlug)) {
//     console.log("deleting page: ", page.path)
//     deletePage(page)
// }
// }
