import React, { Suspense, lazy } from "react"
import useMapData from './../../hooks/worldMap/useMapData';
import useColorData from "./../../hooks/worldMap/useColorData"
const Map = lazy(() => import("../../helpers/worldMap/map"))
const Legend = lazy(() => import("../../helpers/worldMap/legend"))

function PageWrapper({ children }) {
  return (
    <main style={{backgroundColor: 'black', maxWidth: 'unset', margin: 0}}>
      {!children && <span>loading...</span>}
      {children && children}
    </main>
  )
}

export default function WorldMap() {
  const countryData = useMapData();
  const colorScale = useColorData(countryData)
  
  return (
    <PageWrapper>
      {countryData && (
        <Suspense fallback={<span />}>
          {/* includes 
            - legend 
            - GlobeSphere
            - Countries
          */}
          <Map countries={countryData} colorScale={colorScale} />
        </Suspense>
      )}
    </PageWrapper>
  )
}
