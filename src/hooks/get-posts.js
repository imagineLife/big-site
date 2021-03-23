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
            coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          excerpt
        }
      }
    }
  `);

  return nodes.map(
    ({ frontmatter: { title, author, slug, coverImage, coverAlt } }) => ({
      title,
      author,
      slug,
      coverImage,
      coverAlt,
    }),
  );
};

export default usePosts;
/*
  fluid can get content like...
  (
    maxWidth: 100
    maxHeight: 100
    duotone: { shadow: "#663399", highlight: "#ddbbff" }
  )
  before the {}
*/
