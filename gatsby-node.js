const path = require('path');
exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  const res = await graphql(`
    fragment chartparts on ChartsJson {
      slug
      title
      explanations
      chartdata {
        xdomain
        ydomain
        values {
          x
          y
        }
      }
      sections {
        box {
          data
          itm
        }
        column {
          data
          itm
        }
        className
        interactiveStateWrapper
      }
      footer {
        text
        link {
          text
          url
        }
      }
    }
    query {
      scrum: allMarkdownRemark(
        sort: { fields: frontmatter___order }
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
        sort: { fields: frontmatter___order }
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
        sort: { fields: frontmatter___order }
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
        sort: { fields: frontmatter___order }
        filter: { frontmatter: { order: { gt: 0 }, slug: { regex: "/febs/" } } }
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
      charts: allChartsJson {
        data: nodes {
          ...chartparts
        }
      }
      mongo: allMarkdownRemark(
        sort: { fields: frontmatter___order }
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
      httpserver: allMarkdownRemark(
        sort: { fields: frontmatter___order }
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
      charts: { data: chartsData },
      febs: { pages: febsPages },
      strengths: { pages: strengthsPages },
      mongo: { pages: mongoPages },
      httpserver: { pages: httpServerPages },
    },
  } = res;

  const mdTemplate = path.resolve(`src/templates/markdown/index.js`);
  [
    ...scrumPages,
    ...recipePages,
    ...febsPages,
    ...strengthsPages,
    ...mongoPages,
    ...httpServerPages,
  ].forEach(({ page }) => {
    createPage({
      path: page.overview.slug,
      component: mdTemplate,
      context: {
        slug: page.overview.slug,
        parentDir: page.overview.parentDir || page.overview.slug,
      },
    });
  });

  const chartsTemplate = path.resolve('src/templates/chart/index.js');
  chartsData.forEach(chartPage => {
    createPage({
      path: chartPage.slug,
      component: chartsTemplate,
      context: {
        slug: chartPage.slug,
      },
    });
  });
};
