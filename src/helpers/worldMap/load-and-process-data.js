import { tsv, json as d3Json } from 'd3-fetch'
import { feature } from 'topojson-client'

export default async function loadAndProcessData() {
  const WORLD_MAP_TSV_URL = "https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"
  const WORLD_MAP_JSON_URL =
    "https://unpkg.com/world-atlas@1.1.4/world/50m.json"
  
  const tsvData = await tsv(WORLD_MAP_TSV_URL);
  const jsonData = await d3Json(WORLD_MAP_JSON_URL);

  /*
    take loaded data and convert to a 'countries' var
    get row-by-ID lookup fn
    make countries from json data
    adding the country row data to a 'properties' key
  */
  
  const getRowById = tsvData.reduce((resultObj, d) => {
    resultObj[d.iso_n3] = d
    return resultObj
  }, {})

  //define countries from json Data
  const countries = feature(
    jsonData,
    jsonData.objects.countries
  )

  countries.features.forEach(d => {
    Object.assign(d.properties, getRowById[d.id])
  })

  return countries
}
