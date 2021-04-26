import { graphql, useStaticQuery } from 'gatsby';

const useCharts = () => {
  const { chartsJson } = useStaticQuery(graphql`
    query {
      chartsJson {
        title
        slug
      }
    }
  `);

  return [chartsJson];
};

export default useCharts;
