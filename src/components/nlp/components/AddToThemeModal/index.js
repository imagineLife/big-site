import React, { useContext, useState, useEffect } from "react"
import { useMutation } from "react-query"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import addThemeValueFetch from "./../../fetches/addThemeValue"
import { useSessionStorage } from "../../hooks/useStorage"
import { NlpContext } from "./../../state/Provider"

const AddThemeTabContent = ({
  selectedWord,
  themes,
  clickedTheme,
  selectedThemes,
}) => {
  return (
    <>
      <p>
        select a theme to add <b>"{selectedWord}"</b> to{" "}
        {selectedThemes ? <b>{selectedThemes}</b> : "..."}
      </p>
      <section
        id="theme-selector-wrapper"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          flexWrap: "wrap",
          gap: "0.25em",
        }}
      >
        {themes.map(t => (
          <Button
            key={`add-to-theme-list-${t}`}
            onClick={() => clickedTheme(t)}
          >
            {t}
          </Button>
        ))}
      </section>
    </>
  )
}

const CreateThemeTabContent = () => {
  return <p>Create a new theme & this word will be associated with it</p>
}

const AddToThemeModal = ({ selectedWord, handleModalClose, themes }) => {
  const { authorized } = useContext(NlpContext)
  const [selectedThemes, setSelectedThemes] = useState(null)
  const [jwt] = useSessionStorage("nlp-token")

  const addThemeValueMutation = useMutation({
    mutationFn: addThemeValueFetch,
    mutationKey: `add-theme-value-${selectedThemes}-${selectedWord}`,
    onSuccess: () => {
      setSelectedThemes([])
      handleModalClose()
    },
  })

  // "cleanup" onClose
  useEffect(() => {
    return () => setSelectedThemes([])
  }, [])

  const clickedTheme = theme => {
    setSelectedThemes(theme)
  }

  const handleConfirmClick = () => {
    addThemeValueMutation.mutate({
      email: authorized,
      theme: selectedThemes,
      value: selectedWord,
      jwt,
    })
  }

  return (
    <Modal show>
      <Modal.Header>
        <p>
          Associate <b>"{selectedWord}"</b> With A Theme
        </p>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="existing"
          // id="uncontrolled-tab-example"
          className="mb-3"
          variant="underline"
        >
          <Tab eventKey="existing" title="Existing Theme">
            <AddThemeTabContent
              selectedWord={selectedWord}
              themes={themes}
              clickedTheme={clickedTheme}
              selectedThemes={selectedThemes}
            />
          </Tab>
          <Tab eventKey="new" title="New Theme">
            <CreateThemeTabContent />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirmClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddToThemeModal
