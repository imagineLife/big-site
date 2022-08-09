import React from 'react';
import { graphql, Link } from 'gatsby';
import './index.scss';
import ChartScrollBox from './../../components/chartScrollBox';

// export const chartQuery = graphql`
//   query ChartsByType($slug: String) {
//     chartsJson(slug: { eq: $slug }) {
//       slug
//       title
//       usefor
//       excerpt
//       chartdata {
//         xdomain
//         ydomain
//         values {
//           x
//           y
//         }
//       }
//     }
//   }
// `;

export default function ChartsTemplate(apiData) {
  return (
    <main className="chart-detail">
      <h1>{title || 'A Chart'}</h1>
    </main>
  );
}
