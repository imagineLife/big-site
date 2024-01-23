import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  LabelList,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function ThemesSummary({ themes, question }) {
  const stackIdMap = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
    9: "i",
    10: "j",
  }

  const idxToColorMap = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
  ]

  let formatOne = {}
  for (let themeIdx = 0; themeIdx < themes.length; themeIdx++) {
    const thisTheme = themes[themeIdx]
    if (!formatOne[thisTheme]) {
      formatOne[thisTheme] = 1
    } else {
      formatOne[thisTheme] = formatOne[thisTheme] + 1
    }
  }

  const themesArr = []
  Object.keys(formatOne).forEach(k => {
    themesArr.push({ theme: [k], count: formatOne[k] })
  })
  themesArr.sort((a, b) => b.count - a.count)

  const chartableFormat = { name: "themes" }
  themesArr.forEach(t => {
    chartableFormat[t.theme] = t.count
  })
  return (
    <div style={{ width: "100%", height: "100px" }} className="themes-summary">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={100}
          height={100}
          data={[chartableFormat]}
          layout="vertical"
          // margin={{
          //   top: 20,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis hide type="number" domain={[0, themes.length]} />
          <YAxis hide dataKey="theme" type="category" />
          {/* <Tooltip /> */}
          <Legend />
          {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
          {Object.keys(chartableFormat)
            .map((k, tIdx) => {
              if (k === "name") return null
              return (
                <Bar
                  dataKey={k}
                  stackId="a"
                  fill={idxToColorMap[tIdx]}
                  key={`question-${k}-bar`}
                >
                  <LabelList dataKey={k} position="inside" />
                </Bar>
              )
            })
            .filter(d => d)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
