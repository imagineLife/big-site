import { graphql, useStaticQuery } from 'gatsby';

const useCharts = () => {
  const {
    allChartsJson: { data },
  } = useStaticQuery(graphql`
    query {
      allChartsJson(sort: { fields: order, order: ASC }) {
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
