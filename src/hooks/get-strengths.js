import { graphql, useStaticQuery } from 'gatsby';

const useStrengths = () => {
  const {
    allMdx: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMdx(filter: { slug: { regex: "/strengths/" } }) {
        nodes {
          frontmatter {
            title
            slug
            excerpt
          }
        }
      }
    }
  `);

  return nodes.map(({ frontmatter: { slug, excerpt, title } }) => ({
    slug,
    excerpt,
    title,
  }));
};

export default useStrengths;
