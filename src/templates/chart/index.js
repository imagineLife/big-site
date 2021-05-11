import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import './index.scss';
import { scaleBand, scaleLinear } from 'd3-scale';
import ChartScrollBox from './../../components/chartScrollBox';
export const chartQuery = graphql`
  query ChartsBySlug($slug: String!) {
    chartsJson(slug: { eq: $slug }) {
      title
      slug
      excerpt
      sections {
        box {
          data
        }
        column {
          data
        }
        className
      }
    }
  }
`;

export default function ChartsTemplate(apiData) {
  const {
    data: {
      chartsJson: { title, sections },
    },
  } = apiData;

  return (
    <main className="chart-detail">
      <h1>{title || 'A Chart'}</h1>
      <ChartScrollBox sections={sections} />
    </main>
  );
}
