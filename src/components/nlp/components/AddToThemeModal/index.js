import React, { useContext, useState, useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Form from "react-bootstrap/Form"
import addThemeValueFetch from "./../../fetches/addThemeValue"
import { useSessionStorage } from "../../hooks/useStorage"
import { NlpContext } from "./../../state/Provider"
import { useForm, Controller } from "react-hook-form"
import createThemeFetch from "../../fetches/createTheme"

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

const CreateThemeTabContent = ({
  authorized,
  jwt,
  selectedWord,
  handleModalClose,
}) => {
  const qc = useQueryClient()

  const {
    handleSubmit: handleFormSubmit,
    errors,
    control,
  } = useForm({ email: "", password: "" })

  const createThemeMutation = useMutation({
    mutationFn: createThemeFetch,
    onSuccess: (data, vars) => {
      handleModalClose()
      // CREATED THEME!
      // qc.setQueryData(`${authorized}-themes`, curData => {
      //   return [...curData, { theme: vars.theme, words: vars.words }].sort(
      //     (a, b) => {
      //       if (a.theme < b.theme) return -1
      //       return 1
      //     }
      //   )
      // })
    },
  })

  const createTheme = obj => {
    createThemeMutation.mutate({
      email: authorized,
      jwt: jwt,
      theme: obj.theme,
      words: [selectedWord],
    })
  }

  return (
    <>
      <p>Create a new theme & this word will be associated with it</p>
      <Form onSubmit={handleFormSubmit(createTheme)}>
        <Form.Group controlId="theme">
          <Form.Label>Theme</Form.Label>
          <Controller
            control={control}
            name="theme"
            defaultValue=""
            disabled={createThemeMutation.isSuccess}
            render={({ field: { onChange, value, ref, disabled } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                type="theme"
                placeholder="Enter theme"
                name="theme"
                disabled={disabled}
              />
            )}
          />
          <Form.Text className="text-danger">
            {errors?.theme?.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

const AddToThemeModal = ({ selectedWord, handleModalClose, themes }) => {
  const { authorized } = useContext(NlpContext)
  const [selectedThemes, setSelectedThemes] = useState(null)
  const [jwt] = useSessionStorage("nlp-token")
  const [showConfirmUi, setShowConfirmUi] = useState(false)
  const addThemeValueMutation = useMutation({
    mutationFn: addThemeValueFetch,
    mutationKey: `add-theme-value-${selectedThemes}-${selectedWord}`,
    onSuccess: () => {
      // TODO: change to show new "confirm" modal
      setSelectedThemes([])
      setShowConfirmUi(true)
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

  //
  // "confirmation" modal
  //
  if (showConfirmUi === true) {
    return (
      <Modal show>
        <Modal.Header>Done!</Modal.Header>
        <Modal.Body>
          <p>Your keyword-to-theme association is done.</p>
          <p>
            <b>Refresh</b> to see updated theme analysis applied, <br />
            or
            <br />
            <b>Close</b> to continue editing before refreshing.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleModalClose()
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              window.location.reload()
            }}
          >
            Refresh
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
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
              <CreateThemeTabContent
                authorized={authorized}
                jwt={jwt}
                selectedWord={selectedWord}
                handleModalClose={handleModalClose}
              />
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
}

export default AddToThemeModal
