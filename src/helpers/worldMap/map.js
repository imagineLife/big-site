import React, { Fragment } from "react"
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

function CountryPaths({ countries, colorScale }) {
  const thisProjection = geoNaturalEarth1()
  const pathGenerator = geoPath().projection(thisProjection)
    
  return (
    <> {countries?.map((d, idx) => { 
      const props = {
        className: "countryPath",
        opacity: 1,
        d: pathGenerator(d),
        fill: colorScale(colorVal(d)),
        key: `${d.id}-${d.properties.abbrev}-${idx}`,
      }
      return <path {...props} />
    }) }</>
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
        <CountryPaths countries={countries?.features} colorScale={colorScale} />
      </g>
      <Legend colorScale={colorScale} />
    </svg>
  )
}
