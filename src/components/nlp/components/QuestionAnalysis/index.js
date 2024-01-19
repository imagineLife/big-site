import React, { Fragment, useMemo } from "react"
import Table from "./../../../../components/Table"

function QuestionAnalysis({ question, answers }) {
  const qaColumns = [
    {
      Header: "answer",
      accessor: "answer",
    },
  ]

  const tableRows = useMemo(() => answers.map(s => ({ answer: s })), [answers])

  return (
    <Fragment>
      <h3>{question}</h3>
      <Table columns={qaColumns} data={[tableRows]} />
    </Fragment>
  )
}

export default QuestionAnalysis
