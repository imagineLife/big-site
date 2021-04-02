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
    }
  `);
  /*
    allMDX Query
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  */

  if (res.errors) {
    reporter.panic(`failed to create posts ->`, res.errors);
  }

  const {
    recipes: { data: recipeData },
    posts: { data: postData },
  } = res.data;
  console.log('recipeData');
  console.log(recipeData);
  console.log('postData');
  console.log(postData);

  // pull post nodes from graphql obj
  // const posts = res.data.allMdx.nodes;

  [...postData, ...recipeData].forEach(post => {
    // console.log('post');
    // console.log(post)

    actions.createPage({
      // where the browser can access the page
      path: post.slug,
      // What component will pass the mdx file to
      component: post.slug.includes('post') 
        ? require.resolve('./src/templates/post')
        : ? require.resolve('./src/templates/recipe'),
      // name the url slug
      context: {
        slug: post.slug,
      },
    });
  });
};
