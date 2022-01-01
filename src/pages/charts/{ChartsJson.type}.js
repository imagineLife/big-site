import React from 'react';
import { graphql } from 'gatsby';
export default function ChartName(props) {
  console.log('HUH?!');
  console.log('props');
  console.log(props);

  return <main className="chart">Chart Name Here</main>;
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

/*
  query ChartBySlug($slug: String) {
    chartsJson(slug: { eq: $slug }) {
      slug
      title
      usefor
      excerpt
      chartdata {
        xdomain
        ydomain
        values {
          x
          y
        }
      }
    }
  }

  query allCharts {
    allChartsJson {
      nodes {
        slug
        title
        usefor
        excerpt
        chartdata {
          xdomain
          ydomain
          values {
            x
            y
          }
        }
      }
    }
  }
*/
