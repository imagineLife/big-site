import React from 'react';
import Country from "./country"

export default function CountryPaths({ countries, colorScale, pathGenerator, selectedClassification }) {
  console.log('selectedClassification')
  console.log(selectedClassification)
  console.log('countries[0].properties.economy')
  console.log(countries[0].properties.economy)
  
  return (
    <>
      {countries?.map((d, idx) => (
        <Country
          key={`country-${idx}`}
          pathGenerator={pathGenerator}
          colorScale={colorScale}
          d={d}
          idx={idx}
          selectedClassification={selectedClassification}
        />
      ))}
    </>
  )
}