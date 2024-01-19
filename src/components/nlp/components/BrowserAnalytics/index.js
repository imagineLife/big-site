import React, { Fragment, useState, useEffect, useMemo, memo } from "react"
import Table from "./../../../../components/Table"

function useInputSeparator(data) {
  const [answersByQuestion, setAnswersByQuestion] = useState([])
  const [processingState, setProcessingState] = useState("processing")
  const questions = useMemo(
    () => Object.keys(data[0]).filter((d, idx) => idx !== 0),
    [data]
  )

  useEffect(() => {
    console.log(
      "%c useInputSeparator",
      "background-color: orange; color: black;"
    )
    console.log("data")
    console.log(data)
    console.log("questions")
    console.log(questions)
    if (answersByQuestion.length < questions.length) {
      const whichQuestionIndexToDo = answersByQuestion.length
      console.log("whichQuestionIndexToDo")
      console.log(whichQuestionIndexToDo)
      setAnswersByQuestion(curArr => {
        return [
          ...curArr,
          {
            question: questions[whichQuestionIndexToDo],
            answers: data.map(d => questions[whichQuestionIndexToDo]),
          },
        ]
      })
    } else {
      console.log("DONE?!")
    }
  }, [answersByQuestion])
  return [answersByQuestion, processingState]
}

const MemoTable = memo(function InnerTable({ data }) {
  return <Table data={data} className="nlp" firstFive />
})

function BrowserAnalytics({ data }) {
  /*
    break columns + answers into separate "datasets"
  */
  const [answersByQuestion, processingState] = useInputSeparator(data[0])

  return (
    <Fragment>
      <h2>Data Preview</h2>
      <sub>
        <i>(header + first 5 rows)</i>
      </sub>
      <MemoTable data={data} />

      {answersByQuestion.length < 1 && <p>preparing data</p>}
      {answersByQuestion.length > 0 &&
        answersByQuestion.map((abq, abxIdx) => (
          <Fragment key={`abq-${abq.question}`}>
            <h3>{abq.question}</h3>
          </Fragment>
        ))}
    </Fragment>
  )
}

export default BrowserAnalytics
