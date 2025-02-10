import { useMemo } from 'react';
import { scaleOrdinal } from 'd3-scale';
import { schemeSpectral } from 'd3-scale-chromatic';

export default function useColorScale(countryData) {
  let innerScale = null
  return useMemo(() => { 
    const colorCodeCount = 7
    if (countryData?.features && !innerScale) {
      const countryEconomyCodes = countryData.features.map(d => {
        return d.properties.economy
      })

      innerScale = scaleOrdinal().domain(countryEconomyCodes)

      innerScale
        .domain(innerScale.domain().sort().reverse())
        .range(schemeSpectral[colorCodeCount])
    }
    return innerScale
  }, [countryData])
}