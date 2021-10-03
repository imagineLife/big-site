import { graphql, useStaticQuery } from 'gatsby';

const useSections = () => {
  const {
    allSections: { sections },
  } = useStaticQuery(graphql`
    query {
      allSections: allSectionsJson {
        sections: nodes {
          title
          snippet
          to
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return sections;
};

export default useSections;
