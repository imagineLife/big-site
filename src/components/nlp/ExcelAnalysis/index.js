import React from "react"
import "./index.scss"
// components
import Table from "../../Table"
import Card from "../../Card"
import SentimentPie from "../../SentimentPie"
import WordLists from "./../components/WordLists"

function SentimentSummary({ stats, pieData }) {
  return (
    <section id="stats-summary">
      <h4>Sentiment Aggregates</h4>
      <p>
        Based on{" "}
        <a
          href="http://www2.imm.dtu.dk/pubdb/pubs/6010-full.html"
          _target="blank"
        >
          the AFINN lexicon
        </a>{" "}
        and research done by Finn Årup Nielsen, -5 represents the most negative
        sentiment score and 5 represents the most positive sentiment score.
      </p>
      <section id="stats-box">
        {Object.keys(stats).map(stat => (
          <Card key={stat} title={stat} content={stats[stat]} />
        ))}
        <SentimentPie data={pieData} small />
      </section>
    </section>
  )
}

export default function ExcelAnalysis({ data, isLoading }) {
  return (
    <section className="excel">
      {isLoading && <p>loading...</p>}
      {!isLoading &&
        data?.map(
          ({
            question,
            answers,
            sentimentStats,
            sentimentCounts,
            themes,
            wordsByCount,
          }) => {
            const answerTableData = {
              columns: [
                {
                  Header: "Sentiment Score",
                  accessor: "sentimentScore",
                },
                {
                  Header: "Themes",
                  // accessor: "themes",
                  accessor: data => data.themes.sort().join(", "),
                },
                {
                  Header: "answer",
                  accessor: "text",
                  className: "answer",
                },
              ],
              data: [answers],
            }

            const sentimentSummaryData = Object.keys(sentimentCounts)
              .map(k => ({ name: k, ...sentimentCounts[k] }))
              .filter(d => d.count !== 0)

            return (
              <section key={question}>
                <h3 className="question">{question}</h3>

                <SentimentSummary
                  stats={sentimentStats}
                  pieData={sentimentSummaryData}
                />

                <WordLists themes={themes} wordsByCount={wordsByCount} />
                <h4>Answer-By-Answer</h4>
                <Table
                  data={answerTableData.data}
                  columns={answerTableData.columns}
                />
              </section>
            )
          }
        )}
    </section>
  )
}
