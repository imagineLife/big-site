import React, { useState, useContext } from "react"
import { NlpContext } from "./../../../state/Provider"
import { useMutation } from "react-query"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import EditableRow from "./EditableRow"
import { useSessionStorage } from "./../../../hooks/useStorage"
import updateThemeValueFetch from "./updateThemeValueFetch"
import updateThemeFetch from "./updateTheme"
import deleteThemeValueFetch from "./deleteThemeValueFetch"
import ThemeCell from "./ThemeCell"
// import CloseButton from "react-bootstrap/CloseButton"

function ThemeRow({ theme, words, updateLocalThemeData, editTheme }) {
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

  const updateThemeMutation = useMutation({
    mutationFn: updateThemeFetch,
    onSuccess: () => {
      console.log("THEME UPDATED: need to update localThemeData")
      // updateLocalThemeData(rowAction)
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
    if (rowAction.type === "edit-theme-word") {
      updateThemeValueMutation.mutate({
        email: authorized,
        theme: rowAction.theme,
        value: rowAction.originalWord,
        newValue: rowAction.word,
        jwt: tokenVal,
      })
      //
    } else {
      console.log("NEED TO FINISH UPDATE_THEME functionality")
      console.log("rowAction")
      console.log(rowAction)
      // TODO: finish update-theme request
      // updateThemeMutation.mutate({
      //   email: authorized,
      //   theme: rowAction.theme,
      //   value: rowAction.originalWord,
      //   newValue: rowAction.word,
      //   jwt: tokenVal,
      // })
    }
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
      <ThemeCell
        editTheme={editTheme}
        theme={theme}
        setRowAction={setRowAction}
        rowAction={rowAction}
      />

      {/* theme values */}
      {!(rowAction.type === "delete-theme") && (
        <td>
          {/* Edit view */}
          {rowAction?.type && (
            <EditableRow
              val={rowAction.word}
              onInputChange={onInputChange}
              onCancel={onCancel}
              onEditSave={onEditSave}
              onEditDelete={onEditDelete}
            />
          )}

          {/* Pills-List view */}
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
      )}
    </tr>
  )
}

export default ThemeRow
