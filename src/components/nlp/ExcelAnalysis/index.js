import React from "react"

// components
import Table from "../../Table"
export default function ExcelAnalysis({ data, isLoading }) {

  return (
    <section id="excel">
      {!isLoading && data?.map(({ question, answers }) => {
        const answerTableData = {
          columns: [
            {
              Header: "Sentiment Score",
              accessor: "sentimentScore",
            },
            {
              Header: "answer",
              accessor: "text",
              className: 'answer'
            },
          ],
          data: [answers],
        }
        
        return (
          <section key={question}>
            <h3>{question}</h3>
            <p><i>summary stats coming soon...</i></p>
            <Table data={answerTableData.data} columns={answerTableData.columns} />
          </section>
        )
      })}
    </section>
  )
}
