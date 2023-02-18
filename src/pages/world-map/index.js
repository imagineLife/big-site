import React, { Suspense, lazy } from "react"
import useMapData from './../../hooks/worldMap/useMapData';
import useColorData from "./../../hooks/worldMap/useColorData"
const Map = lazy(() => import("../../helpers/worldMap/map"))

function PageWrapper({ children }) {
  return (
    <main>
      <h1>This is a world map!</h1>
      {!children && <span>loading...</span>}
      {children && children}
    </main>
  )
}

export default function WorldMap() {
  const countryData = useMapData();
  const colorData = useColorData(countryData)

  return (
    <PageWrapper>
      {countryData && (
        <Suspense fallback={<span />}>
          <Map countries={countryData} />
        </Suspense>
      )}
    </PageWrapper>
  )
}
