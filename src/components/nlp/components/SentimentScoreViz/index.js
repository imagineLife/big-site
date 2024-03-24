import React from "react"
import {
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts"

function SentimentScoreViz({ scores }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        minWidth: "100px",
        minHeight: "30px",
      }}
    >
      {/* border: "1px solid gray" */}
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 0,
            right: 50,
            bottom: 0,
            left: 0,
          }}
        >
          <Scatter data={scores.map(d => ({ point: d, y: 0 }))} fill="blue" />
          <YAxis type="number" dataKey="y" tickCount={0} />
          <XAxis dataKey="point" type="number" domain={[-5, 5]} tickCount={11}>
            <Label value="Negative" position="insideTopLeft" offset={-30} />
            <Label value="Positive" position="insideTopRight" offset={-30} />
          </XAxis>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SentimentScoreViz
