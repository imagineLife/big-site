import React, { useState, useContext } from "react"
import { NlpContext } from "./../../../state/Provider"
import { useMutation } from "react-query"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import EditableRow from "./EditableRow"
import { useSessionStorage } from "./../../../hooks/useStorage"
import updateThemeValueFetch from "./updateThemeValueFetch"
import deleteThemeValueFetch from "./deleteThemeValueFetch"
import { Pencil, Trash3 } from "react-bootstrap-icons"
// import CloseButton from "react-bootstrap/CloseButton"

function ThemeRow({ theme, words, updateLocalThemeData }) {
  const [tokenVal] = useSessionStorage("nlp-token")
  const { authorized } = useContext(NlpContext)
  const [rowAction, setRowAction] = useState({})

  const updateThemeValueMutation = useMutation({
    mutationFn: updateThemeValueFetch,
    onSuccess: () => {
      updateLocalThemeData(rowAction)
      setRowAction({})
    },
  })

  const deleteThemeValueMutation = useMutation({
    mutationFn: deleteThemeValueFetch,
    onSuccess: () => {
      updateLocalThemeData({ ...rowAction, method: "delete" })
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
    updateThemeValueMutation.mutate({
      email: authorized,
      theme: rowAction.theme,
      value: rowAction.originalWord,
      newValue: rowAction.word,
      jwt: tokenVal,
    })
  }

  const onEditDelete = () => {
    deleteThemeValueMutation.mutate({
      email: authorized,
      theme: rowAction.theme,
      value: rowAction.originalWord,
      jwt: tokenVal,
    })
  }

  return (
    //
    // Row
    //
    <tr key={`theme-row-${theme}`}>
      {/* 
        Theme Keyword 
      */}
      <th>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ width: "fit-content" }}>{theme}</p>
          <div
            style={{
              justifyContent: "space-around",
              display: "flex",
              minWidth: "75px",
            }}
          >
            <Pencil
              onClick={() => {
                console.log(`POINTER CLICKED`)
              }}
            />
            <Trash3
              size="1.25em"
              onClick={() => {
                console.log(`TRASH CLICKED`)
              }}
            />
          </div>
        </div>
      </th>
      <td>
        {/* Editable Row */}
        {rowAction?.type && (
          <EditableRow
            val={rowAction.word}
            onInputChange={onInputChange}
            onCancel={onCancel}
            onEditSave={onEditSave}
            onEditDelete={onEditDelete}
          />
        )}

        {/* show all theme values */}
        {!rowAction?.type && (
          <Stack
            direction="horizontal"
            gap={2}
            style={{ flexWrap: "wrap", padding: "10px 5px" }}
          >
            {words.map(w => (
              <Badge
                bg="light"
                className="theme-pill"
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

export default ThemeRow
