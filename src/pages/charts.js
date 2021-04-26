import React from 'react';
import { Link } from 'gatsby';
import getCharts from './../hooks/get-charts';
import PostPreview from './../components/PostPreview';
export default function Charts() {
  const charts = getCharts();

  return (
    <main id="chart-page">
      <h1>Charts</h1>
      <p>Some Chart Types</p>
      <ul>
        {charts?.map((ch, idx) => (
          <PostPreview key={`chart-${ch.slug}`} {...ch} />
        ))}
      </ul>
    </main>
  );
}
