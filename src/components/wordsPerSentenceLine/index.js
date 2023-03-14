import React, { useRef, useEffect } from "react"
import Card from "./../Card"
import { VegaLite } from 'react-vega'

export default function WordsPerSentenceLine({ data, isLoading }) {
  const vegaConfig = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Words Per Sentence",
    data: { name: "chartData" },
    width: 1200,
    height: 600,
    // transform: [{ filter: "datum.symbol==='GOOG'" }],
    mark: "point",
    encoding: {
      x: { field: "idx", type: "quantitative" },
      y: { field: "d", type: "quantitative" },
    },
  }

  console.log('isLoading?! ',isLoading)
  

  return (
    <Card loading={isLoading} title="Words Per Sentence">
      {!isLoading && <VegaLite spec={vegaConfig} data={{chartData: data}} />}
    </Card>
  )
}
