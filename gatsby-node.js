exports.createPages = async ({ actions, graphql, reporter }) => {
  // reporter is a console interface
  const res = await graphql(`
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

    fragment strengthspart on StrengthsJson {
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
      chartdata {
        xdomain
        ydomain
        values {
          x
          y
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

      strengths: allStrengthsJson {
        data: nodes {
          ...strengthspart
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
  `);

  if (res.errors) {
    reporter.panic(`failed to create posts ->`, res.errors);
  }

  const {
    recipes: { data: recipeData },
    posts: { data: postData },
    strengths: { data: strengthsData },
    febs: { data: febsData },
    charts: { data: chartsData },
  } = res.data;

  [
    ...postData,
    ...recipeData,
    ...strengthsData,
    ...febsData,
    ...chartsData,
  ].forEach(post => {
    console.log('post.slug');
    console.log(post.slug);
    let thisComponent = ['post', 'strengths'].includes(post.slug)
      ? require.resolve('./src/templates/post')
      : post.slug.includes('febs')
      ? require.resolve('./src/templates/febs')
      : post.slug.includes('charts')
      ? require.resolve('./src/templates/chart')
      : require.resolve('./src/templates/recipe');

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
