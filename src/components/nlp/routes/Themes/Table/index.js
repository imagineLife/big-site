import React from "react"
import Table from "react-bootstrap/Table"
import "./index.scss"
import ThemeRow from "./ThemeRow"
import { PlusCircle } from "react-bootstrap-icons"

function ThemesTable({
  themes,
  updateLocalThemeData,
  editTheme,
  startAddingTheme,
}) {
  return (
    <Table bordered hover responsive className="theme">
      <thead>
        <tr>
          <th>
            <span>Theme</span> <PlusCircle onClick={startAddingTheme} />
          </th>
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
