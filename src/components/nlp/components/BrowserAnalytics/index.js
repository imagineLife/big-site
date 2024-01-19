import React, { Fragment, useState, useEffect, useMemo, memo } from "react"
import Table from "./../../../../components/Table"
import QuestionAnalysis from "../QuestionAnalysis"
import useInputSeparator from "../../hooks/useInputSeparator"

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
        answersByQuestion.map((qObj, abxIdx) => (
          <QuestionAnalysis key={`qObj-${qObj.question}`} {...qObj} />
        ))}
    </Fragment>
  )
}

export default BrowserAnalytics
