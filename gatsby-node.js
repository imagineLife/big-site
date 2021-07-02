const path = require('path');
exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  /*
    fragment postpart on PostsJson {
      slug
      title
      excerpt
    }

    fragment recipepart on RecipesJson {
      slug
      title
      excerpt
    }

    fragment febspart on FebsJson {
      slug
      title
      sections {
        class
        title
        subTitle
        listitems {
          itmTitle: title
          itmTxt: content
        }
      }
      footer {
        link {
          text
          url
        }
      }
    }

    query {
      posts: allPostsJson {
        data: nodes {
          ...postpart
        }
      }
      recipes: allRecipesJson {
        data: nodes {
          ...recipepart
        }
      }
      febs: allFebsJson {
        data: nodes {
          ...febspart
        }
      }
    }
  */
  // const res = await graphql(`
  //   query {
  //     scrum: allMdx(filter: { frontmatter: { slug: { regex: "/scrum/" } } }) {
  //       nodes {
  //         frontmatter {
  //           slug
  //           title
  //           excerpt
  //         }
  //       }
  //     }
  //   }
  // `);
  /*
    fragment febspart on FebsJson {
      slug
      title
      sections {
        class
        title
        subTitle
        listitems {
          itmTitle: title
          itmTxt: content
        }
      }
      footer {
        link {
          text
          url
        }
      }
    }
  */
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
    },
  } = res;

  const mdTemplate = path.resolve(`src/templates/markdown/index.js`);
  [...scrumPages, ...recipePages, ...febsPages].forEach(({ page }) => {
    createPage({
      path: page.overview.slug,
      component: mdTemplate,
      context: {
        slug: page.overview.slug,
      },
    });
  });

  // const febsTemplate = path.resolve('src/templates/febs/index.js');
  // febsPages.forEach(febPage => {
  //   createPage({
  //     path: febPage.slug,
  //     component: febsTemplate,
  //     context: {
  //       slug: febPage.slug,
  //     },
  //   });
  // });

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

  // [
  //   // ...postData,
  //   // ...recipeData,
  //   // ...strengthsData.map(d => d.frontmatter),
  //   // ...febsData,
  //   // ...chartsData,
  //   ...scrumData.map(d => d.frontmatter),
  // ].forEach(post => {
  //   console.log('looping posts');
  //   console.log(post.slug);
  //   console.log('// - - - - - //');

  //   let thisComponent = post.slug.includes('recipes')
  //     ? require.resolve('./src/templates/recipe')
  //     : post.slug.includes('febs')
  //     ? require.resolve('./src/templates/febs')
  //     : post.slug.includes('charts')
  //     ? require.resolve('./src/templates/chart')
  //     : require.resolve('./src/templates/post');

  //   createPage({
  //     // where the browser can access the page
  //     path: post.slug,
  //     // What component will pass the mdx file to
  //     component: thisComponent,
  //     // name the url slug
  //     context: {
  //       slug: post.slug,
  //     },
  //   });
  // });
};
