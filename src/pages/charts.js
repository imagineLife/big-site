import React from 'react';
import getCharts from './../hooks/get-charts';
import BlogSectionPreview from './../components/BlogSectionPreview';
export default function Charts() {
  const chartsArr = getCharts();
  console.log('chartsArr');
  console.log(chartsArr);

  return (
    <main id="chart-page">
      <h1>Charts</h1>
      <p>Here, A Brief overview of some Chart Types</p>
      <ul>
        {chartsArr?.map((ch, idx) => (
          <BlogSectionPreview key={`charts-${idx}`} {...ch} />
        ))}
      </ul>
    </main>
  );
}
