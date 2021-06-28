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
            author
            coverAlt
          }
          excerpt
        }
      }
    }
  `);

  /*
  coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
*/

  return nodes.map(({ frontmatter: { title, author, slug, coverAlt } }) => ({
    //coverImage
    title,
    author,
    slug,
    coverAlt,
  }));
};
// coverImage,

export default usePosts;
