import React from "react"
import './index.scss'
// components
import Table from "../../Table"
import Card from '../../Card';
function SentimentSummary({ stats }) { 
  return (
    <section id="stats-summary">
      {Object.keys(stats).map(stat => (
        <Card key={stat} title={stat} content={stats[stat]} />
      ))}
    </section>
  )
}

export default function ExcelAnalysis({ data, isLoading }) {
  return (
    <section id="excel">
      {!isLoading && data?.map(({ question, answers, sentimentStats }) => {
        const answerTableData = {
          columns: [
            {
              Header: "Sentiment Score",
              accessor: "sentimentScore",
            },
            {
              Header: "Themes",
              // accessor: "themes",
              accessor: data => data.themes.sort().join(", ")
            },
            {
              Header: "answer",
              accessor: "text",
              className: "answer",
            },
          ],
          data: [answers],
        }
        
        return (
          <section key={question}>
            <h3>{question}</h3>
            <SentimentSummary stats={sentimentStats} />
            <Table data={answerTableData.data} columns={answerTableData.columns} />
          </section>
        )
      })}
    </section>
  )
}
