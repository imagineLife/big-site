import React from "react"
import "./index.scss"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

function PieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
  percent,
  name,
  // ...rest
}) {
  const RADIAN = Math.PI / 180
  const radius = 8 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="14px"
    >
      {Math.round(percent * 100)}%
    </text>
  )
}

/*
  data: {name,count}[]
*/
export default function SentimentPie({ data, small, legend }) {
  const COLORS = {
    positive: "green",
    negative: "darkred",
    neutral: "gray",
  }

  const dims = small
    ? {
        width: "100%",
        height: 150,
      }
    : {
        width: "100%",
        height: 400,
      }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tt">
          <span>{label}</span>
          <span>{payload}</span>
        </div>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer {...dims}>
      <PieChart width="50%" height="50%">
        <Pie
          dataKey="count"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={dims.width * 0.5}
          fill="#8884d8"
          label={<PieLabel />}
          labelLine={false}
          Tooltip={<CustomTooltip />}
        >
          {data.map((slice, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[slice.name]} />
          ))}
        </Pie>
        <Tooltip />
        {legend && (
          <Legend
            iconSize="8"
            align="right"
            verticalAlign="top"
            layout="vertical"
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}
