import React from "react"
// import { XYFrame } from "semiotic"
import Card from "./../Card"
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend } from "recharts"

/*
  Card, or no card?
  that - is the question
*/ 
// https://semiotic.nteract.io/guides/line-chart
export default function SentimentScoreLine({ data, isLoading }) {
  // frameProps
  return (
    <Card loading={isLoading} title="Sentence Sentiment Scores">
      {/* {!isLoading && <XYFrame {...frameProps} />} */}
      {!isLoading && (
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="num" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      )}
    </Card>
  )
}
