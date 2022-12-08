const path = require('path');
exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  const res = await graphql(`
    query {
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
              parentDir
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
              parentDir
            }
          }
        }
      }
      recipes: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/recipes/" } }
        }
      ) {
        pages: edges {
          page: node {
            overview: frontmatter {
              slug
              title
              excerpt
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
              parentDir
            }
          }
        }
      }
      py: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: { frontmatter: { order: { gt: 0 }, slug: { regex: "/py/" } } }
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
      charts: allChartsJson {
        chartList: nodes {
          title
          slug
          type
          usefor
          excerpt
          chartdata {
            xdomain
            ydomain
            values {
              x
              y
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
  `);

  if (res.errors) {
    reporter.panic(`failed to create posts ->`, res.errors);
  }

  //destructure markdown/gql results
  const {
    data: {
      scrum: { pages: scrumPages },
      recipes: { pages: recipePages },
      charts: { chartList: chartsPages },
      febs: { pages: febsPages },
      k8s: { pages: k8sPages },
      linux: { pages: linuxPages },
      py: { pages: pythonPages },
      strengths: { pages: strengthsPages },
      misc: { pages: miscPages },
      mongo: { pages: mongoPages },
      node: { pages: nodePages },
      httpserver: { pages: httpServerPages },
      mongosectioncontent: { pages: mongoSectionContent },
    },
  } = res;

  const mdTemplate = path.resolve(`src/templates/markdown/index.js`);

  [
    ...febsPages,
    ...httpServerPages,
    ...k8sPages,
    ...linuxPages,
    ...miscPages,
    ...mongoPages,
    ...mongoSectionContent,
    ...nodePages,
    ...pythonPages,
    ...recipePages,
    ...scrumPages,
    ...strengthsPages,
  ].forEach(({ page }) => {
    createPage({
      path: page.overview.slug || null,
      component: `${mdTemplate}`,
      context: {
        slug: page.overview.slug,
        parentDir: page.overview.parentDir || page.overview.slug,
        className: page.overview.parentDir || '',
      },
    });
  });
};
