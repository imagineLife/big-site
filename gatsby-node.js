exports.createPages = async ({ actions, graphql, reporter }) => {
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
      charts: allChartsJson {
        data: nodes {
          ...chartparts
        }
      }
    }
  */
  const res = await graphql(`
    query {
      scrum: allMdx(filter: { frontmatter: { slug: { regex: "/scrum/" } } }) {
        nodes {
          frontmatter {
            slug
            title
            excerpt
          }
        }
      }
    }
  `);

  if (res.errors) {
    reporter.panic(`failed to create posts ->`, res.errors);
  }

  console.log('res.data.scrum');
  console.log(res.data.scrum);

  const {
    // recipes: { data: recipeData },
    // posts: { data: postData },
    // febs: { data: febsData },
    // charts: { data: chartsData },
    // strengths: { nodes: strengthsData },
    scrum: { nodes: scrumData },
  } = res.data;

  console.log('scrumData');
  console.log(scrumData);

  [
    // ...postData,
    // ...recipeData,
    // ...strengthsData.map(d => d.frontmatter),
    // ...febsData,
    // ...chartsData,
    ...scrumData.map(d => d.frontmatter),
  ].forEach(post => {
    console.log('looping posts');
    console.log(post.slug);
    console.log('// - - - - - //');

    let thisComponent = post.slug.includes('recipes')
      ? require.resolve('./src/templates/recipe')
      : post.slug.includes('febs')
      ? require.resolve('./src/templates/febs')
      : post.slug.includes('charts')
      ? require.resolve('./src/templates/chart')
      : require.resolve('./src/templates/post');

    actions.createPage({
      // where the browser can access the page
      path: post.slug,
      // What component will pass the mdx file to
      component: thisComponent,
      // name the url slug
      context: {
        slug: post.slug,
      },
    });
  });
};
