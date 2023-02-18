import React from "react"
import Legend from './legend'
function colorVal(d) {
  return d.properties.economy
}

export default function Map({ countries, colorScale }) {
  const svgProps = {
    height: "100vh",
    width: " 100%",
    fontSize: " 32pt",
    fontFamily: " sans-serif",
  }

  return (
    <svg className="svgWrapper" {...svgProps}>
      <g className="map-g" pointerEvents={"all"}></g>
      <Legend colorScale={colorScale} />
    </svg>
  )
}
