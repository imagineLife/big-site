import React, { useEffect } from "react"
import Legend from "./legend"
import { geoPath, geoNaturalEarth1 } from "d3-geo"
// import { zoom } from "d3-zoom"
import CountryPaths from './../../components/worldMap/countryPaths'
import GlobeSphere from "./../../components/worldMap/globeSphere"


export default function Map({ countries, colorScale }) {
  const thisProjection = geoNaturalEarth1()
  const pathGenerator = geoPath().projection(thisProjection)
  
  useEffect(() => { 
    console.log('Map ue onLoad')
    
  }, [])
  const svgProps = {
    height: "100vh",
    width: " 100%",
    fontSize: " 32pt",
    fontFamily: " sans-serif",
  }

  return (
    <svg className="svgWrapper" {...svgProps}>
      <g className="map-g" pointerEvents={"all"}>
        <g className="zoom-g">
          <GlobeSphere pathGenerator={pathGenerator} />
          <CountryPaths
            countries={countries?.features}
            colorScale={colorScale}
            pathGenerator={pathGenerator}
          />
        </g>
      </g>
      <Legend colorScale={colorScale} />
    </svg>
  )
}
