import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import './index.scss';
import { scaleBand, scaleLinear } from 'd3-scale';

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

  const [barWidthPercentage] = useState(0.5);
  const [xDomain] = useState(xdomain);
  const [yDomain] = useState(ydomain);
  const [localVals, setLocalVals] = useState(values);
  const [margins, setMargins] = useState({
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  });

  const [vizBoxDims, setVizBoxDims] = useState({ w: null, h: 350 });
  const vizBoxRef = useRef();

  function getBoxDims(refItm, setDimsFn) {
    if (refItm) {
      let dims = { w: refItm.offsetWidth };
      setDimsFn(curDims => ({ ...curDims, ...dims }));
    }
  }

  //gets && sets vixBoxDims after the vizBox element is rendered to the dom
  useEffect(() => {
    if (!vizBoxRef || !vizBoxRef.current || vizBoxDims.w !== null) return;
    getBoxDims(vizBoxRef.current, setVizBoxDims);
  }, [vizBoxRef, vizBoxDims]);

  const xScale = scaleBand()
    .range([0, vizBoxDims.w])
    .domain(xDomain);

  const yScale = scaleLinear()
    .domain([yDomain[0], yDomain[1]])
    .range([vizBoxDims.h, 0]);

  return (
    <main className="chart-detail">
      <h1>{title || 'A Chart'}</h1>
      <section className="scroll-box">
        {/* Left Column */}
        <section className="chart-column d-ib b-dev">
          <div id="viz-box" ref={vizBoxRef}>
            <svg
              className="chart-detail"
              width={vizBoxDims.w}
              height={vizBoxDims.h}
            >
              <g
                className="bar-group"
                transform={`translate(${margins.left},${margins.top})`}
              >
                {localVals.map((d, idx) => {
                  // calc bar props
                  const barProps = {
                    width: !barWidthPercentage
                      ? xScale.bandwidth()
                      : xScale.bandwidth() * barWidthPercentage,
                    height: yScale(0) - yScale(d.y),
                    y: yScale(d.y),
                    fill: 'lightgray',
                    x: !barWidthPercentage
                      ? xScale(d.x)
                      : xScale(d.x) +
                        xScale.bandwidth() * (barWidthPercentage / 2),
                  };
                  return <rect key={`rect-${d.x}-${idx}`} {...barProps} />;
                })}
              </g>
            </svg>
          </div>
        </section>

        {/* Right Column */}
        <section className="chart-description-column d-ib b-dev">
          <h3>Chart Props</h3>
          {/* Data Values */}
          <article className="chart-prop">
            <h4>Data Values</h4>
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
            <p>
              Here, the data is such that each dat 'element' has a 'value'.
              Looking at the chart, each bar has a height.{' '}
            </p>
          </article>
          {/* Domains */}
          <article className="chart-prop">
            <h4>Data Domains</h4>
            <label className={`y-domain`} htmlFor="y-domain">
              Y Domain
            </label>
            <input
              className={`y-domain`}
              type="text"
              name="y-domain"
              id="y-domain"
              value={yDomain.map((elm, elmIdx) => `${elm}`)}
              onChange={() => {}}
            />
            <br />
            <dfn>
              The Y Domain represents the minimin and maximum values that the
              y-axis displays.
            </dfn>
            <br />
            {/* X-Domain */}
            <label className={`x-domain`} htmlFor="x-domain">
              X Domain
            </label>
            <input
              className={`x-domain`}
              type="text"
              name="x-domain"
              id="x-domain"
              value={xDomain.map((elm, elmIdx) => `${elm}`)}
              onChange={() => {}}
            />
            <br />
            <dfn>
              The X Domain represents the categories, or bars, that the chart is
              displaying. This chart shows these categories in the order they
              are displayed in the input.
            </dfn>
          </article>
          {/* Ranges */}
          <article className="chart-prop">
            <h4>Data Ranges</h4>
            <label className={`y-range`} htmlFor="y-range">
              Y Range
            </label>
            <input
              className={`y-range`}
              type="text"
              name="y-range"
              id="y-range"
              value={JSON.stringify(yScale.range())}
              onChange={() => {}}
            />
            <br />
            <dfn>
              The Y Range represents the screen placement across the Y 'plane'.
              Here, the Y range represents the relative starting & ending y
              coordinates on the screen that the bars can consume.
            </dfn>
            <br />
            {/* X-Range */}
            <label className={`x-range`} htmlFor="x-range">
              X Range
            </label>
            <input
              className={`x-range`}
              type="text"
              name="x-range"
              id="x-range"
              value={JSON.stringify(xScale.range())}
              onChange={() => {}}
            />
            <br />
            <dfn>
              The X Range represents the screen placement across the X 'plane'.
              Here, the X range represents the starting & ending X coordinates
              on the screen tha the bars can consume.
            </dfn>
          </article>
        </section>
      </section>
    </main>
  );
}
