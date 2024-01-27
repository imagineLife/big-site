import React, { useState, useEffect, useContext, memo } from "react"
import Table from "./../../../../components/Table"
import QuestionAnalysis from "../QuestionAnalysis"
import useInputSeparator from "../../hooks/useInputSeparator"
import { useSessionStorage } from "../../hooks/useStorage"
import { NlpContext } from "./../../state/Provider"
import AddToThemeModal from "../AddToThemeModal"

const MemoTable = memo(function InnerTable({ data }) {
  return <Table data={data} className="nlp" firstFive />
})

const useMyThemes = (emailString, jwt) => {
  // const [localThemes, setLocalThemes] = useSessionStorage("nlp-themes")
  const [localThemes, setLocalThemes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
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
    }
    fetchData()
  }, [])

  return localThemes
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
