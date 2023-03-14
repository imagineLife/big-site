import React from "react"
import Card from "./../Card"
import { VegaLite } from 'react-vega'

export default function SentimentScoreLine({ data, isLoading }) {
  // const vegaConfig = {
  //   $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  //   description: "Sentence Sentiment Scores",
  //   data: { name: "chartData" },
  //   width: 800,
  //   height: 200,
  //   marks: "line",
  //   encoding: {
  //     x: { field: "idx", type: "quantitative" },
  //     y: { field: "d", type: "quantitative", impute: { value: null } },
  //     color: { field: "good", type: "nominal" },
  //   },
  //   transform: [{ calculate: "datum.d>0", as: "good" }],
  // }

  const vegaConfig = {
    description: "Sentence Sentiment Scores",
    data: { name: "chartData" },
    width: 1200,
    height: 500,
    mark: "point",
    encoding: {
      x: { field: "idx", type: "quantitative" },
      y: { field: "d", type: "quantitative" },
      color: {
        field: "d",
        type: "quantitative",
        scale: {
          domainMid: 0,
          range: "diverging",
        },
      },
    },
  }
  

  return (
    <Card loading={isLoading} title="Sentence Sentiment Scores">
      {!isLoading && <VegaLite spec={vegaConfig} data={{chartData: data}} />}
    </Card>
  )
}
