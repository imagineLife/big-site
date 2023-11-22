import React from "react"
import "./index.scss"

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

/*
  data: { count, idx }[]
*/
export default function WordCountBySentenceLine({ data, small, legend }) {
  const dims = small
    ? {
        width: "100%",
        height: 150,
      }
    : {
        width: "100%",
        height: 400,
      }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "100%",
            padding: "5px",
          }}
        >
          <span>{payload[0].payload.text}</span>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer {...dims}>
      <AreaChart
        // width={730}
        // height={250}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
