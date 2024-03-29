import { graphql, useStaticQuery } from 'gatsby';

const useMisc = () => {
  const {
    misc: { pages },
  } = useStaticQuery(graphql`
    query {
      misc: allMarkdownRemark(
        sort: { frontmatter: { order: ASC } }
        filter: {
          frontmatter: { order: { gt: 0 }, slug: { regex: "/^misc/" } }
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
    }
  `)

  return pages;
};

export default useMisc;
