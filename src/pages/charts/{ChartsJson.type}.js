import React from 'react';
import { graphql } from 'gatsby';
import 'chart-by-type.scss';

export default function ChartName(props) {
  console.log('HUH?!');
  console.log('props');
  console.log(props);

  return <main className="chart-wrapper">
    <>
  </main>;
}

export const chartQuery = graphql`
  query ChartBySlug($slug: String) {
    chartData: chartsJson(slug: { eq: $slug }) {
      slug
      title
      usefor
      excerpt
      data: chartdata {
        xdomain
        ydomain
        values {
          x
          y
        }
      }
    }
    chartsSummary: allChartsJson {
      chart: nodes {
        slug
        title
      }
    }
  }
`;
