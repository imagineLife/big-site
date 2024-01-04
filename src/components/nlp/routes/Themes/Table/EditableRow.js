import React, { useEffect } from "react"
import { Check2, X, Trash3 } from "react-bootstrap-icons"
import Button from "react-bootstrap/Button"

function EditableRow({
  val,
  onInputChange,
  onCancel,
  onEditSave,
  onEditDelete,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <input
        autoFocus
        onChange={e => {
          e.preventDefault()
          onInputChange(e.target.value)
        }}
        style={{
          fontSize: "1em",
          fontWeight: 700,
          borderStyle: "groove",
          borderTop: "unset",
          borderRight: "unset",
          borderLeft: "unset",
          padding: "5px",
        }}
        value={val}
      ></input>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          verticalAlign: "center",
        }}
      >
        <Button variant="secondary" onClick={() => onEditSave()}>
          Save
          <Check2 size="1.5em" />
        </Button>
        <Button variant="secondary" onClick={() => onEditDelete()}>
          Delete
          <Trash3 size="1.25em" />
        </Button>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
          <X size="1.5em" />
        </Button>
      </div>
    </div>
  )
}

export default EditableRow
