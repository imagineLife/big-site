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
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `);

  return sections;
};

export default useSections;
