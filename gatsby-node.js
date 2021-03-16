exports.createPages = async ({ actions, graphql, reporter }) => {
  // reporter is a console interface
  const res = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (res.errors) {
    reporter.panic(`failed to create posts ->`, res.errors);
  }

  // pull post nodes from graphql obj
  const posts = res.data.allMdx.nodes;

  posts.forEach(post => {
    actions.createPage({
      // where the browser can access the page
      path: post.frontmatter.slug,
      // What component will pass the mdx file to
      component: require.resolve('./src/templates/post.js'),
      // name the url slug
      context: {
        slug: post.frontmatter.slug,
      },
    });
  });
};
