import { useState, useEffect } from 'react';
import { scaleOrdinal } from 'd3-scale';
import { schemeSpectral } from 'd3-scale-chromatic';

export default function useColorData(countryData) {
  const [colorData, setColorData] = useState(null);
  const colorCodeCount = 7
  useEffect(() => {
    if (countryData?.features && !colorData) {
      const countryEconomyCodes = countryData.features.map(d => {
        return d.properties.economy
      })

      const colorScale = scaleOrdinal()
        .domain(countryEconomyCodes.sort().reverse())
        .range(schemeSpectral[colorCodeCount])
    } else {
      console.log("no color data yet...")
    }
  }, [countryData, colorData, setColorData])
  return colorData;
}