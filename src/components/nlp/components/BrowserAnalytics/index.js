import React, { useState, useEffect, useContext, memo } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Table from "./../../../../components/Table"
import QuestionAnalysis from "../QuestionAnalysis"
import useInputSeparator from "../../hooks/useInputSeparator"
import { useSessionStorage } from "../../hooks/useStorage"
import { NlpContext } from "./../../state/Provider"
import { useMutation } from "react-query"
import addThemeValueFetch from "./../../fetches/addThemeValue"

const MemoTable = memo(function InnerTable({ data }) {
  return <Table data={data} className="nlp" firstFive />
})

const useMyThemes = (emailString, jwt) => {
  // const [localThemes, setLocalThemes] = useSessionStorage("nlp-themes")
  const [localThemes, setLocalThemes] = useState([])

  useEffect(async () => {
    const res = await fetch(
      `${process.env.GATSBY_NLP_API_URL}/api/users/${emailString}/themes`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    const jsonRes = await res.json()
    setLocalThemes(jsonRes)
  }, [])

  return localThemes
}

const AddToThemeModal = ({ selectedWord, handleModalClose, themes }) => {
  const { authorized } = useContext(NlpContext)
  const [selectedThemes, setSelectedThemes] = useState(null)
  const [jwt] = useSessionStorage("nlp-token")

  const addThemeValueMutation = useMutation({
    mutationFn: addThemeValueFetch,
    mutationKey: `add-theme-value-${selectedThemes}-${selectedWord}`,
    onSuccess: (data, vars) => {
      setSelectedThemes([])
      handleModalClose()
    },
  })
  useEffect(() => {
    return () => setSelectedThemes([])
  }, [])

  const clickedTheme = theme => {
    setSelectedThemes(theme)
  }

  const handleConfirmClick = () => {
    console.log("will do something with themes here")
    console.log({
      selectedThemes,
      selectedWord,
    })
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
            <p>
              select a theme to add <b>"{selectedWord}"</b> to
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
          </Tab>
          <Tab eventKey="new" title="New Theme" disabled>
            Tab content for New Theme
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

function BrowserAnalytics({ data }) {
  /*
    break columns + answers into separate "datasets"
  */
  const { authorized } = useContext(NlpContext)
  const [answersByQuestion] = useInputSeparator(data[0])

  const [selectedWord, setSelectedWord] = useState(null)
  const [jwt] = useSessionStorage("nlp-token")
  const myThemes = useMyThemes(authorized, jwt)

  const handleModalClose = () => {
    setSelectedWord(null)
  }

  const handleMouseUp = e => {
    if (window.getSelection().toString().length > 0) {
      setSelectedWord(window.getSelection().toString())
    }
  }

  return (
    <>
      <section>
        <h2>Data Preview</h2>
        <sub>
          <i>(header + first 5 rows)</i>
        </sub>
        <MemoTable data={data} />

        {answersByQuestion.length < 1 && <p>preparing data</p>}
        {answersByQuestion.length > 0 &&
          answersByQuestion.map((qObj, abxIdx) => (
            <QuestionAnalysis
              key={`qObj-${qObj.question}`}
              onMouseUp={handleMouseUp}
              {...qObj}
            />
          ))}
      </section>
      {selectedWord && (
        <AddToThemeModal
          selectedWord={selectedWord}
          handleModalClose={handleModalClose}
          themes={myThemes.map(t => t.theme)}
        />
      )}
    </>
  )
}

export default BrowserAnalytics
