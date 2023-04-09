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
const nestedNavTemplate = path.resolve('./src/templates/nestedNav/index.js')

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

  Object.keys(result.data).forEach(sectionName => {
    if (sectionName !== 'tagsGroup') {
      const thisSectionPages = result.data[`${sectionName}`].pages
      thisSectionPages.forEach(({ page }) => {
        const thisParent = page.overview.parentDir || page.overview.slug;
        let pageObj = {
          path: page.overview.slug,
          component: ["docker", "scrum", "nginx", "linux"].includes(thisParent)
            ? nestedNavTemplate
            : mdTemplate,
          context: {
            tags: page.overview.tags,
            slug: page.overview.slug,
            parentDir: thisParent,
            shortSlug: page.overview.shortSlug,
            className: page.overview.parentDir || "",
          },
        }
        if (page?.overview?.shortSlug)
          pageObj.context.shortSlug = page.overview.shortSlug;

        //
        // more all-inclusive nested-layout accommodations
        //
        if (
          page.overview.slug.includes("docker") ||
          page.overview.slug.includes("scrum") ||
          page.overview.slug.includes("nginx") ||
          page.overview.slug.includes("linux")
        ) {
          pageObj.context.content = page.content
          pageObj.context.otherPages = result.data[`${sectionName}`].otherPages
        }

        createPage(pageObj)
      })
    }
  })
  

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  // pages.forEach(({ page }, index) => {
  //   const thisParent = page.overview.parentDir || page.overview.slug; 
  //   let pageObj = {
  //     path: page.overview.slug,
  //     component: thisParent.includes("docker")
  //       ? nestedNavTemplate
  //       : mdTemplate,
  //     context: {
  //       slug: page.overview.slug,
  //       parentDir: thisParent,
  //       shortSlug: page.overview.shortSlug,
  //       className: page.overview.parentDir || "",
  //     },
  //   }
  //   if (page?.overview?.shortSlug)
  //     pageObj.context.shortSlug = page.overview.shortSlug;
    
  //   // 
  //   // more all-inclusive nested-layout accommodations
  //   // 
  //   if (page.overview.slug.includes("docker")) { 
  //     pageObj.context.content = page.content
  //     pageObj.context.otherPages = otherdockerPages
  //   }

  //   createPage(pageObj)
  // })

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

  /*
    docker cleanup
  */ 
  const dockerShortSlugs = ['cli-overview', 'dockerfile-intro', 'a-frontend', 'node-on-docker-intro', 'node-server-with-user', 'node-server-with-deps', 'setup-docker', 'node-server-containerized', 'a-smaller-node-image', 'why-containers'];


  if (page.path.includes("docker") && page.path !== "/docker" && !dockerShortSlugs.includes(page.context.frontmatter__shortSlug)) {
      console.log("deleting page: ", page.path)
      deletePage(page)
  }

  /*
    scrum cleanup
  */ 
  const scrumShortSlugs = ['a-checklist','on-adoption', 'the-artifacts', 'the-ceremonies', 'the-increment', 'the-team', 'the-theories', 'the-values']
  if (
    page.path.includes("scrum") &&
    page.path !== "/scrum" &&
    !scrumShortSlugs.includes(page.context.frontmatter__shortSlug)
  ) {
    console.log("deleting page: ", page.path)
    deletePage(page)
  }


  /*
    k8s cleanup
  */ 
  const k8sShortSlugs = [
    "node-port-service",
    "cluster-ip-service",
    "architecture-overview",
    "microservice-case-study",
    "containers-first",
    "intro-to-k8s-in-the-cloud",
    "k8s-app-arch",
    "load-balancer-service",
    "microservice-demo",
    "microservice-with-deployments",
    "replica-controllers",
    "node-port-service",
    "deployments",
    "on-pods",
    "networking-intro",
    "intro-to-services",
    "setup-overview",
    "admission-controllers",
    "admission-controllers",
    "api-server",
    "authentication",
    "authorization",
    "commands-and-args",
    "commands",
    "containers-and-more",
    "debugging-workflow",
    "custom-resources",
    "deployment-strategies",
    "security-with-containers",
    "env-vars",
    "headless-services",
    "helm",
    "imperative-commands",
    "ingress",
    "jobs",
    "labels-and-selectors",
    "logging-and-monitoring",
    "liveliness",
    "more-resources",
    "namespaces",
    "multi-container-pods",
    "network-policies",
    "node-affinity",
    "node-selectors",
    "persistent-volume-lifecycle",
    "readiness",
    "pod-security-standards",
    "on-resources",
    "service-mesh",
    "service-accounts",
    "stateful-sets",
    "k8s-on-gce-vms",
    "storage-classes",
    "taints-and-tolerations",
    "topics",
    "why-ingress",
    "vols-and-claims",
  ]

  if (
    page.path.includes("k8s") &&
    page.path !== "/k8s" &&
    !k8sShortSlugs.includes(page.context.frontmatter__shortSlug)
  ) {
    console.log("deleting page: ", page.path)
    deletePage(page)
  }


  /*
  
    linux+bash cleanup

  */
 
  const linuxShortSlugs = [
    "a-kernel",
    "a-kernel",
    "arrays",
    "cli-tools",
    "dns",
    "env",
    "file-system",
    "conditions-and-cases",
    "file-interaction",
    "flags-and-args",
    "groups",
    "heredoc",
    "create-an-nfs",
    "interacting-with-ubuntu",
    "more-scripts",
    "npm-outdated-script",
    "pkgs",
    "permissions",
    "processes",
    "script-writing",
    "sftp",
    "ssh",
    "ctrl-and-signals",
    "starting-with-unix",
    "text-editors",
    "streams-pipes",
    "template",
    "users",
    "wordcount",
    "wget-curl",
  ]

  if (
    page.path.includes("linux") &&
    page.path !== "/linux" &&
    !linuxShortSlugs.includes(page.context.frontmatter__shortSlug)
  ) {
    console.log("deleting page: ", page.path)
    deletePage(page)
  }
}