import React from 'react';

export default function Legend({ colorScale }) {
  const legendProps = {
    className: "legendBox",
    x: 5,
    y: 300,
    width: 264,
    height: "195",
    fill: "rgba(255,255,255,.8)",
    rx: 25,
    ry: 25,
  }

  return (
    <>
      <rect {...legendProps} />
      <g className="colorLegendG" transform="translate(25,325)">
        {colorScale.domain().map((itm, idx) => {
          const gProps = {
            x: -10 * 2,
            y: -10 * 2,
            rx: 10 * 2,
            // width: backgroundRectWidth,
            height: 25 * colorScale.domain().length + 10 * 2,
            fill: "white",
            opacity: 0.8,
            className: "tick",
            transform: `translate(0, ${idx * 25})`,
            // opacity: d => {
            //   return !selectedLegendVal || d === selectedLegendVal ? 1 : 0.25
            // },
          }

          const circleProps = {
            stroke: "black",
            strokeOpacity: 0.5,
            r: 10,
            fill: colorScale.range()[idx],
          }

          const textProps = {
            dy: "0.32em",
            x: 15,
            fontSize: ".4em",
            fill: "#635F5D",
            fontFamily: "sans-serif",
          }

          return (
            <g key={`legend-item-${idx}`} {...gProps} className="legend-item">
              <circle {...circleProps} />
              <text {...textProps}>{colorScale.domain()[idx]}</text>
            </g>
          )
        })}
      </g>
    </>
  )
}
