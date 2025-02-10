import React, { useEffect, useState } from "react"
import Legend from "./legend"
import { geoPath, geoNaturalEarth1 } from "d3-geo"
// import { zoom } from "d3-zoom"
import CountryPaths from './countryPaths'
import GlobeSphere from "./globeSphere"

function SvgWrapper({
  children,
  legend,
  colorScale,
  legendItemClick,
  selectedLegendItem,
}) {

  const svgProps = {
    height: "100vh",
    width: "1000vw",
    fontSize: " 32pt",
    fontFamily: "sans-serif",
  }
  
  return (
    <svg className="svgWrapper" {...svgProps}>
      <g className="map-g" pointerEvents={"all"}>
        <g className="zoom-g">{children}</g>
      </g>
      {legend && (
        <Legend
          colorScale={colorScale}
          itemClick={legendItemClick}
          selectedLegendItem={selectedLegendItem}
        />
      )}
    </svg>
  )
}

export default function Map({ countries, colorScale }) {
  const [selectedClassification, setSelectedClassification] = useState(null)

  // https://github.com/d3/d3-geo#projections
  const thisProjection = geoNaturalEarth1()

  // https://github.com/d3/d3-geo#paths
  const pathGenerator = geoPath().projection(thisProjection)

  useEffect(() => {
    console.log("Map ue onLoad")
  }, [])

  function legendItemClick(d) {
    if (selectedClassification === null || selectedClassification !== d) { 
      setSelectedClassification(d)
    }
    else {
      setSelectedClassification(null)
    }
  }
  
  return (
    <SvgWrapper
      legend
      colorScale={colorScale}
      legendItemClick={legendItemClick}
      selectedLegendItem={selectedClassification}
    >
      <GlobeSphere pathGenerator={pathGenerator} />
      <CountryPaths
        countries={countries?.features}
        colorScale={colorScale}
        pathGenerator={pathGenerator}
        selectedClassification={selectedClassification}
      />
    </SvgWrapper>
  )
}
