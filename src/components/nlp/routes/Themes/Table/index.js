import React from "react"
import Table from "react-bootstrap/Table"
import "./index.scss"
import ThemeRow from "./ThemeRow"

function ThemesTable({ themes, updateLocalThemeData, editTheme }) {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Theme</th>
          <th>Keywords</th>
        </tr>
      </thead>
      <tbody>
        {themes.map(({ theme, words }) => (
          <ThemeRow
            key={`Theme-Row-${theme}`}
            {...{ theme, words, updateLocalThemeData, editTheme }}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default ThemesTable
