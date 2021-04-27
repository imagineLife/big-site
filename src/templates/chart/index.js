import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import './index.scss';

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

  const [xDomain, setXdomain] = useState(xdomain);
  console.log('xDomain');
  console.log(xDomain);

  return (
    <main className="chart-detail">
      <h1>{title || 'A Chart'}</h1>
      <section className="scroll-box">
        <section className="chart-column d-ib b-dev">
          <div id="viz-box">
            <svg className="chart-detail" width="400" height="400">
              {xDomain.map((itm, idx) => (
                <text key={`x-domain-${idx}`} y={(idx + 1) * 25}>
                  {itm}
                </text>
              ))}
            </svg>
          </div>
        </section>
        <section className="chart-description-column d-ib b-dev">
          <h3>Chart Props</h3>
          <article className="chart-prop">
            <label htmlFor="x-domain">X Domain</label>
            <input
              type="text"
              name="x-domain"
              id="x-domain"
              value={xDomain.map((elm, elmIdx) => `${elm}`)}
              onChange={e => {
                setXdomain([e.target.value]);
              }}
            ></input>
          </article>
        </section>
      </section>
    </main>
  );
}
