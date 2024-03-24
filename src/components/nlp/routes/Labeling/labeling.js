import React, { useState, useEffect, useContext } from "react"
import { Badge, Modal, Button, Alert, Spinner } from "react-bootstrap"
import { useSessionStorage } from "../../hooks/useStorage"
import Table from "./../../../../components/Table"
import useRemappedThemes from "../../hooks/useRemappedThemes"
import useLabelingTableFormatter from "../../hooks/useLabelingTableFormatter"
import { useMutation } from "react-query"
import addThemeValueFetch from "../../fetches/addThemeValue"
import { NlpContext } from "../../state/Provider"

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
  const { authorized } = useContext(NlpContext)
  const [themes, setStorageThemes] = useSessionStorage("nlp-themes")
  const [jwt] = useSessionStorage("nlp-token")
  const [selectedWord, setSelectedWord] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  const [selectedLabelAssignment, setSelectedLabelAssignment] = useState(false)
  const remappedThemes = useRemappedThemes({ themes })
  const [updatedCount, setUpdatedCount] = useState(0)
  const formattedTableData = useLabelingTableFormatter(
    {
      data: propsData[0],
      remappedThemes,
    },
    updatedCount
  )

  // useEffect(() => {
  //   setFormattedTableData(
  //     useLabelingTableFormatter({
  //       data: propsData[0],
  //       remappedThemes,
  //     })
  //   )
  // }, [updatedCount])

  const addThemeValueMutation = useMutation({
    mutationFn: addThemeValueFetch,
    mutationKey: `add-theme-value-${selectedLabelAssignment}-${selectedWord}`,
    onSuccess: (data, vars) => {
      setStorageThemes(
        themes.map(themeObj => {
          if (themeObj.theme !== vars.theme) {
            return themeObj
          }
          let newThemeObj = themeObj
          newThemeObj.words.push(vars.value)
          return newThemeObj
        })
      )
      setShowModal(false)
      setUpdatedCount(curCount => curCount + 1)
      // setSuccessAlert(true)
      // setTimeout(() => setSuccessAlert(false), 2000) // Hide success alert after 2 seconds
    },
  })

  function assignLabel() {
    addThemeValueMutation.mutate({
      email: authorized,
      theme: selectedLabelAssignment,
      value: selectedWord,
      jwt,
    })
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
            Assign <b>{selectedWord}</b> with{" "}
            {selectedLabelAssignment && (
              <Badge
                variant="primary"
                bg="light"
                className="theme-pill d-inline-block"
              >
                {selectedLabelAssignment}
              </Badge>
            )}
          </p>

          <br />
          <p>Pick a label</p>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              rowGap: "10px",
            }}
          >
            {themes.map((themeObj, index) => (
              <Badge
                key={`asign-label-${themeObj.theme}`}
                variant="primary"
                bg="light"
                className="theme-pill"
                onClick={() => setSelectedLabelAssignment(themeObj.theme)}
              >
                {themeObj.theme}
              </Badge>
            ))}
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={assignLabel}
            disabled={
              !selectedLabelAssignment ||
              addThemeValueMutation.status === "loading"
            }
          >
            {addThemeValueMutation.status === "loading" ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Assign"
            )}
          </Button>
        </Modal.Footer>
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
