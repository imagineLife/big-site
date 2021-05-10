import { graphql, useStaticQuery } from 'gatsby';

const useCharts = () => {
  const {
    allChartsJson: { data },
  } = useStaticQuery(graphql`
    query {
      allChartsJson {
        data: nodes {
          title
          excerpt
          slug
        }
      }
    }
  `);

  return data;
};

export default useCharts;
