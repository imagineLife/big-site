import React from "react"

import Badge from "react-bootstrap/Badge"
import CloseButton from "react-bootstrap/CloseButton"
import Stack from "react-bootstrap/Stack"
import Table from "react-bootstrap/Table"

function ThemesTable({ themes }) {
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
          <tr key={`theme-row-${theme}`}>
            <th>{theme}</th>
            <td>
              <Stack
                direction="horizontal"
                gap={2}
                style={{ flexWrap: "wrap", padding: "10px 5px" }}
              >
                {words.map(w => (
                  <Badge
                    key={`badge-${theme}-${w}`}
                    // onClick={() => console.log(`CLICKED BADGE!`)}
                    pill
                    style={{
                      width: "fit-content",
                      padding: "0.5em 0.8em",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "1em",
                    }}
                  >
                    <span>{w}</span>
                    <CloseButton
                      onClick={() => console.log(`THEME: ${theme}, word: ${w}`)}
                      style={{ width: "5px" }}
                    />
                  </Badge>
                ))}
              </Stack>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ThemesTable
