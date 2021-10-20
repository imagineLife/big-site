import React from 'react';
import getCharts from './../hooks/get-charts';
import BlogSectionPreview from './../components/BlogSectionPreview';
import './charts.scss';

export default function Charts() {
  const chartsArr = getCharts();
  console.log('chartsArr');
  console.log(chartsArr);

  return (
    <main id="chart-page">
      <h1>Charts</h1>
      <p>Here, A Brief overview of some Chart Types</p>
      <ul className="alternating">
        {chartsArr?.map((ch, idx) => (
          <li key={`charts-${idx}`}>
            <BlogSectionPreview {...ch} />
          </li>
        ))}
      </ul>
    </main>
  );
}
