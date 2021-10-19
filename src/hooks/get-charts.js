import { graphql, useStaticQuery } from 'gatsby';

const useCharts = () => {
  const {
    chartTypes: { charts },
  } = useStaticQuery(graphql`
    query {
      chartTypes: allDatavizsectionsJson {
        charts: nodes {
          title
          snippet
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
  return charts;
};

export default useCharts;
