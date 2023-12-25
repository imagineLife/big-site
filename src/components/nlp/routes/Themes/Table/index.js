import React, { useState, useContext } from "react"
import { NlpContext } from "./../../../state/Provider"
import { useMutation } from "react-query"
import Badge from "react-bootstrap/Badge"

// import CloseButton from "react-bootstrap/CloseButton"
import Stack from "react-bootstrap/Stack"
import Table from "react-bootstrap/Table"
import "./index.scss"
import EditableRow from "./EditableRow"

async function updateMutation({ email, theme, value, newValue }) {
  let fetchUrl = `http://localhost:3000/api/users/${email}/themes/${theme}/values/${value}`
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: newValue }),
    credentials: "include",
  })

  return response.status === 200
}

function ThemeRow({ theme, words, updateLocalThemeData }) {
  const { authorized } = useContext(NlpContext)
  const [rowAction, setRowAction] = useState({})

  const updateThemeMutation = useMutation({
    mutationFn: updateMutation,
    onSuccess: () => {
      updateLocalThemeData(rowAction)
      setRowAction({})
    },
  })

  const onInputChange = val => {
    setRowAction(d => ({ ...d, word: val }))
  }

  const onCancel = () => {
    setRowAction({})
  }

  const onEditSave = () => {
    updateThemeMutation.mutate({
      email: authorized,
      theme: rowAction.theme,
      value: rowAction.originalWord,
      newValue: rowAction.word,
    })
  }
  // const selectedRowStyles = {
  //   // backgroundColor: "rgba(var(--bs-secondary-rgb))",
  //   // color: "white",
  // }

  return (
    <tr key={`theme-row-${theme}`}>
      <th>{theme}</th>
      {/* <td style={!rowAction?.word ? {} : selectedRowStyles}> */}
      <td>
        {/* Editable Row */}
        {rowAction?.type && (
          <EditableRow
            val={rowAction.word}
            onInputChange={onInputChange}
            onCancel={onCancel}
            onEditSave={onEditSave}
          />
        )}

        {/* show all themes */}
        {!rowAction?.type && (
          <Stack
            direction="horizontal"
            gap={2}
            style={{ flexWrap: "wrap", padding: "10px 5px" }}
          >
            {words.map(w => (
              <Badge
                bg="secondary"
                className="theme-word"
                key={`badge-${theme}-${w}`}
                onClick={() =>
                  setRowAction({
                    type: "edit-theme-word",
                    theme,
                    word: w,
                    originalWord: w,
                  })
                }
                pill
                style={{
                  width: "fit-content",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "1em",
                }}
              >
                <span>{w}</span>

                {/* <CloseButton
                onClick={() => {
                  setRowAction({ type: "delete-theme-word", theme, word: w })
                }}
                style={{
                  width: "20px",
                  backgroundSize: "50%",
                  boxSizing: "border-box",
                  // border: "1px solid darkgray",
                  borderRadius: "40%",
                  backgroundColor: "rgba(255,255,255,.2)",
                }}
              /> */}
              </Badge>
            ))}
          </Stack>
        )}
      </td>
    </tr>
  )
}

function ThemesTable({ themes, updateLocalThemeData }) {
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
            {...{ theme, words, updateLocalThemeData }}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default ThemesTable
