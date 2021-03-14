exports.createPages = async ({ actions, graphql, reporter }) => {
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

  const posts = res.data.allMdx.nodes;

  posts.forEach(post => {
    actions.createPage({
      path: post.frontmatter.slug,
      component: require.resolve('./src/templates/post.js'),
      context: {
        slug: post.frontmatter.slug,
      },
    });
  });
};
