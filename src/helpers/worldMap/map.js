import React, { useEffect } from "react"
import Legend from "../../components/worldMap/legend"
import { geoPath, geoNaturalEarth1 } from "d3-geo"
// import { zoom } from "d3-zoom"
import CountryPaths from './../../components/worldMap/countryPaths'
import GlobeSphere from "./../../components/worldMap/globeSphere"

function SvgWrapper({ children, legend, colorScale }) {
  const svgProps = {
    height: "100vh",
    width: " 100%",
    fontSize: " 32pt",
    fontFamily: " sans-serif",
  }

  return (
    <svg className="svgWrapper" {...svgProps}>
      <g className="map-g" pointerEvents={"all"}>
        <g className="zoom-g">{children}</g>
      </g>
      {legend && <Legend colorScale={colorScale} />}
    </svg>
  )
}

export default function Map({ countries, colorScale }) {
  // https://github.com/d3/d3-geo#projections
  const thisProjection = geoNaturalEarth1()

  // https://github.com/d3/d3-geo#paths
  const pathGenerator = geoPath().projection(thisProjection)
  console.log("pathGenerator.scale")
  console.log(pathGenerator.scale)

  useEffect(() => {
    console.log("Map ue onLoad")
  }, [])
  const svgProps = {
    height: "100vh",
    width: "1000vw",
    fontSize: " 32pt",
    fontFamily: "sans-serif",
  }

  return (
    <SvgWrapper legend colorScale={colorScale}>
      <GlobeSphere pathGenerator={pathGenerator} />
      <CountryPaths
        countries={countries?.features}
        colorScale={colorScale}
        pathGenerator={pathGenerator}
      />
    </SvgWrapper>
  )
}
