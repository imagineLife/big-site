import React, { useContext, useState } from "react"
import { useQuery } from "react-query"
import { NlpContext } from "./../../state/Provider"

import Table from "react-bootstrap/Table"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import CloseButton from "react-bootstrap/CloseButton"

import "./themes.scss"

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
              <Stack direction="horizontal" gap={2}>
                {words.map(w => (
                  <Badge
                    // onClick={() => console.log(`CLICKED BADGE!`)}
                    pill
                    style={{
                      width: "fit-content",
                      padding: "0.5em 0.8em",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    flex
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

const API_HOST = "http://localhost:3000"
const userThemesApi = email => `${API_HOST}/api/users/${email}/themes`
function Themes() {
  const { authorized } = useContext(NlpContext)
  console.log("%c authorized", "background-color: pink; color: black;")
  console.log(authorized)

  const userThemes = useQuery(
    `${authorized}-themes`,
    () =>
      fetch(userThemesApi(authorized), {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then(d => d.json()),
    {
      enabled: Boolean(authorized),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      retry: false,
    }
  )

  return (
    <section id="theme-editor">
      <h2>Theme Editor</h2>
      {!authorized || (!userThemes?.data && <p>loading...</p>)}
      {authorized && userThemes?.data && (
        <ThemesTable themes={userThemes.data} />
      )}
    </section>
  )
}

export default Themes
