import React, { useState } from "react"
import { Badge, Modal, Button, Alert } from "react-bootstrap"
import { useSessionStorage } from "../../hooks/useStorage"
import Table from "./../../../../components/Table"
import useRemappedThemes from "../../hooks/useRemappedThemes"
import useLabelingTableFormatter from "../../hooks/useLabelingTableFormatter"

const columns = [
  {
    Header: "Labels",
    accessor: "labels",
    Cell: ({ value }) => (
      <>
        {value.map((label, index) => (
          <Badge key={index} bg="light" className="theme-pill mr-1">
            {label}
          </Badge>
        ))}
      </>
    ),
  },
  { Header: "Text", accessor: "text" },
]

const Labeler = ({ data: propsData }) => {
  const [themes] = useSessionStorage("nlp-themes")
  const [selectedWord, setSelectedWord] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)

  const remappedThemes = useRemappedThemes({ themes })

  const formattedTableData = useLabelingTableFormatter({
    data: propsData[0],
    remappedThemes,
  })

  const handleCloseModal = () => {
    setShowModal(false)
    setSuccessAlert(true)
    setTimeout(() => setSuccessAlert(false), 2000) // Hide success alert after 2 seconds
  }

  const handleMouseUp = e => {
    if (window.getSelection().toString().length > 0) {
      setSelectedWord(window.getSelection().toString())
      setShowModal(true)
    }
  }
  return (
    <>
      <Table
        columns={columns}
        data={[formattedTableData]}
        className="nlp"
        onMouseUp={handleMouseUp}
        selectionHandler
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Label</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>{selectedWord}</b>
          </p>

          {/* Add your label selection UI here */}
          {themes.map((themeObj, index) => (
            <Badge
              key={`asign-label-${themeObj.theme}`}
              variant="primary"
              bg="light"
              className="theme-pill"
            >
              {themeObj.theme}
            </Badge>
          ))}
          <Button variant="primary" onClick={handleCloseModal}>
            Assign
          </Button>
        </Modal.Body>
      </Modal>

      {successAlert && (
        <Alert
          variant="success"
          onClose={() => setSuccessAlert(false)}
          dismissible
        >
          Label assigned successfully!
        </Alert>
      )}
    </>
  )
}

export default Labeler
