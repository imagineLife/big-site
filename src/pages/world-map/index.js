import React, { useEffect, useState, Suspense, lazy } from "react"
import loadAndProcessData from "./load-and-process-data"
const Map = lazy(() => import('./map'))
export default function WorldMap() {
  const [countryData, setCountryData] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const res = await loadAndProcessData()
      setCountryData(res)
    }
    
    if (countryData === null) { 
      fetchData()
    }
  }, [countryData, setCountryData])

  return (
    <main>
      <h1>This is a world map!</h1>
      {countryData && (
        <Suspense fallback={<span />}>
          <Map countries={countryData} />
        </Suspense>
      )}
    </main>
  )
}
