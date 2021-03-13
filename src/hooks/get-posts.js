import { graphql, useStaticQuery } from 'gatsby';

const usePosts = () => {
  const {
    allMdx: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);

  return nodes.map(({ frontmatter: { title, author, slug } }) => ({
    title,
    author,
    slug,
  }));
};

export default usePosts;
