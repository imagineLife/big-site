import React, { useEffect, useState } from "react"
import loadAndProcessData from "./load-and-process-data"
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
    </main>
  )
}
