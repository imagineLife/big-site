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

  const [xDomain, setXdomain] = useState(xdomain);
  const [yDomain, setYdomain] = useState(ydomain);
  const [localVals, setLocalVals] = useState(values);
  const [margins, setMargins] = useState({
    top: 20,
    right: 5,
    bottom: 20,
    left: 20,
  });

  return (
    <main className="chart-detail">
      <h1>{title || 'A Chart'}</h1>
      <section className="scroll-box">
        {/* Left Column */}
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

        {/* Right Column */}
        <section className="chart-description-column d-ib b-dev">
          <h3>Chart Props</h3>
          {/* Data Values */}
          <article className="chart-prop">
            <p>Data Values</p>
            <table>
              <tbody>
                <tr>
                  <td>X</td>
                  <td>Y</td>
                </tr>
                {localVals.map((val, vIdx) => (
                  <tr key={`data-val-${vIdx}`}>
                    <td>{val.x}</td>
                    <td>{val.y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <dfn>
              The Y Domain represents the minimin and maximum values that the
              y-axis displays.
            </dfn>
          </article>
          ;{/* Y-Domain */}
          <article className="chart-prop">
            <label className={`y-domain`} htmlFor="y-domain">
              Y Domain
            </label>
            <input
              className={`y-domain`}
              type="text"
              name="y-domain"
              id="y-domain"
              value={yDomain.map((elm, elmIdx) => `${elm}`)}
            />
            <br />
            <dfn>
              The Y Domain represents the minimin and maximum values that the
              y-axis displays.
            </dfn>
          </article>
          {/* X-Domain */}
          <article className="chart-prop">
            <label className={`x-domain`} htmlFor="x-domain">
              X Domain
            </label>
            <input
              className={`x-domain`}
              type="text"
              name="x-domain"
              id="x-domain"
              value={xDomain.map((elm, elmIdx) => `${elm}`)}
            />
            <br />
            <dfn>
              The X Domain represents the categories, or bars, that the chart is
              displaying. This chart shows these categories in the order they
              are displayed in the input.
            </dfn>
          </article>
        </section>
      </section>
    </main>
  );
}
