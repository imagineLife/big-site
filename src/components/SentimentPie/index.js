import React from 'react';
import './index.scss';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

function PieLabel({ x, y, cx, percent }) {
  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >{`${percent} %`}</text>
  )
}

export default function SentimentPie({ data, small }) {
  const COLORS = {
    positive: "green",
    negative: "darkred",
    neutral: "gray",
  }

  const dims = small ? {
    width: 100,
    height: 100
  } : {
      width: 300,
    height: 300
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
    <ResponsiveContainer {...dims} >
      <PieChart width="50%" height="50%">
        <Pie
          dataKey="count"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={dims.width * .5}
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
      </PieChart>
    </ResponsiveContainer>
  )
}