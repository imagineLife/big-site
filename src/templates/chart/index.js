import React from 'react';
import { graphql } from 'gatsby';

export const chartQuery = graphql`
  query ChartsBySlug($slug: String!) {
    chartsJson(slug: { eq: $slug }) {
      title
      slug
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
`;

export default function ChartsTemplate(apiData) {
  const {
    data: {
      chartsJson: {
        title,
        chartdata: { xdomain, ydomain, values },
      },
    },
  } = apiData;
  console.log(
    '%c Charts Template here!',
    'background-color: blue; color: white;',
  );
  return (
    <main>
      <h1>{title || 'A Chart'}</h1>
    </main>
  );
}
