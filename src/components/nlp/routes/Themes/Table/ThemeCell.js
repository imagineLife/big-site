import React from "react"
import { Pencil, Trash3 } from "react-bootstrap-icons"

export default function ThemeCell({
  editTheme,
  setRowAction,
  rowAction,
  theme,
}) {
  return (
    <th>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {!(rowAction?.type === "edit-theme") && (
          <>
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
                  // editTheme({ theme, editOrDelete: "Edit" })
                  setRowAction({
                    type: "edit-theme",
                    theme,
                    originalWord: theme,
                    word: theme,
                  })
                }}
              />
              <Trash3
                size="1.25em"
                onClick={() => {
                  editTheme({ theme, editOrDelete: "Delete" })
                  // setRowAction({
                  //   type: "delete-theme",
                  //   theme,
                  //   originalWord: theme,
                  //   word: theme,
                  // })
                }}
              />
            </div>
          </>
        )}
        {rowAction?.type === "edit-theme" && (
          <span>
            <i>{theme}</i>
          </span>
        )}
      </div>
    </th>
  )
}
