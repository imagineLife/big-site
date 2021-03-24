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
            excerpt
            coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  return nodes.map(
    ({
      frontmatter: { title, author, slug, coverImage, coverAlt, excerpt },
    }) => ({
      title,
      author,
      slug,
      coverImage,
      coverAlt,
      excerpt,
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
