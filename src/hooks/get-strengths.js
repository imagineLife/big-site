import { graphql, useStaticQuery } from 'gatsby';

const useStrengths = () => {
  const {
    allMdx: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMdx(filter: { slug: { regex: "/strengths/" } }) {
        nodes {
          slug
        }
      }
    }
  `);

  return nodes.map(n => n.slug);
};

export default useStrengths;
