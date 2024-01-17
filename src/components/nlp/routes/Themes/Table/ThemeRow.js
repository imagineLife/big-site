import React, { useState, useContext } from "react"
import { NlpContext } from "./../../../state/Provider"
import { useMutation } from "react-query"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import EditableRow from "./EditableRow"
import { useSessionStorage } from "./../../../hooks/useStorage"
import updateThemeValueFetch from "../../../fetches/updateThemeValue"
import updateThemeFetch from "../../../fetches/updateTheme"
import deleteThemeValueFetch from "../../../fetches/deleteThemeValue"
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
    onSuccess: (data, vars) => {
      updateLocalThemeData({
        method: "edit-theme",
        theme: vars.theme,
        newTheme: vars.newValue,
      })
      setRowAction({})
    },
  })

  const deleteThemeValueMutation = useMutation({
    mutationFn: deleteThemeValueFetch,
    onSuccess: () => {
      updateLocalThemeData({ ...rowAction, type: "delete-value" })
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
      updateThemeMutation.mutate({
        email: authorized,
        theme: rowAction.theme,
        newValue: rowAction.word,
        jwt: tokenVal,
      })
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
      {/* {!(rowAction.type === "delete-theme") && ( */}
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
              </Badge>
            ))}
          </Stack>
        )}
      </td>
      {/* )} */}
    </tr>
  )
}

export default ThemeRow
