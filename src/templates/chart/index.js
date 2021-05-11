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
      explanations
    }
  }
`;

export default function ChartsTemplate(apiData) {
  const {
    data: {
      chartsJson: { title, sections, explanations },
    },
  } = apiData;

  return (
    <main className="chart-detail">
      <h1>{title || 'A Chart'}</h1>
      {explanations && (
        <section className="explanation">
          {explanations?.map((txt, txtIdx) => (
            <p key={`explanation-${txtIdx}`}>{txt}</p>
          ))}
        </section>
      )}
      <ChartScrollBox {...{ title, explanations, sections }} />
    </main>
  );
}
