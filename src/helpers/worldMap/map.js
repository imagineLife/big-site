import React from "react"
import Legend from './legend'
import { geoPath, geoNaturalEarth1 } from 'd3-geo';

function colorVal(d) {
  return d.properties.economy
}

function GlobeSphere() {
  const thisProjection = geoNaturalEarth1()
  const pathGenerator = geoPath().projection(thisProjection)
  const spherePath = pathGenerator({ type: 'Sphere' })
  
  const props = {
    className: "globeSpherePath",
    d: spherePath,
    opacity: 1,
    fill: 'darkblue'
  }
  return (
    <path {...props}></path>
  )
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
      <g className="map-g" pointerEvents={"all"}>
        <GlobeSphere />
      </g>
      <Legend colorScale={colorScale} />
    </svg>
  )
}
