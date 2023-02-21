import React from 'react';
import './legend.css';

function LegendItem({gProps, circleProps, textProps, text}) { 
  return (
    <g {...gProps} className="legend-item">
      <circle {...circleProps} />
      <text {...textProps}>{text}</text>
    </g>
  )
}

export default function Legend({ colorScale, itemClick, selectedLegendItem }) {
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
          const itemOpacity =
            !selectedLegendItem ||
            (selectedLegendItem && selectedLegendItem === itm)
              ? 1
              : 0.25
          
          const gProps = {
            x: -10 * 2,
            y: -10 * 2,
            rx: 10 * 2,
            // width: backgroundRectWidth,
            height: 25 * colorScale.domain().length + 10 * 2,
            fill: "white",
            className: "tick",
            transform: `translate(0, ${idx * 25})`,
            opacity: itemOpacity,
          }

          const circleProps = {
            stroke: "black",
            strokeOpacity: 0.5,
            r: 10,
            fill: colorScale.range()[idx],
            onClick: () => itemClick(itm),
          }

          const textProps = {
            dy: "0.32em",
            x: 15,
            fontSize: ".4em",
            fill: "#635F5D",
            fontFamily: "sans-serif",
            opacity: itemOpacity,
            onClick: () => itemClick(itm),
          }

          return (
            <LegendItem
              key={`legend-item-${idx}`}
              gProps={gProps}
              circleProps={circleProps}
              textProps={textProps}
              text={colorScale.domain()[idx]}
            />
          )
        })}
      </g>
    </>
  )
}
