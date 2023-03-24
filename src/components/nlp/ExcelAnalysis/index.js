import React from "react"
import "./index.scss"
// components
import Table from "../../Table"
import Card from "../../Card"
function SentimentSummary({ stats }) {
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
        and research done by Finn Årup Nielsen, -5 represents the most negative sentiment score and 5 represents the most positive sentiment score.
      </p>
      <section id="stats-box">
        {Object.keys(stats).map(stat => (
          <Card key={stat} title={stat} content={stats[stat]} />
        ))}
      </section>
    </section>
  )
}

function WordLists({ themes, wordsByCount }) {
  console.log("themes")
  console.log(themes)

  return (
    <section className="word-lists">
      <section id="themes">
        <h4>Common Themes</h4>
        <ul>
          {!themes ||
            (themes.length === 0 && (
              <p>
                <i>no themes found for this question</i>
              </p>
            ))}
          {themes.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
      <section id="words-by-count">
        <h4>Words By Count</h4>
        <Table
          data={[wordsByCount]}
          columns={[
            {
              Header: "Count",
              accessor: "occurrences",
            },
            {
              Header: "Word",
              accessor: "word",
            },
          ]}
        />
      </section>
    </section>
  )
}

export default function ExcelAnalysis({ data, isLoading }) {
  return (
    <section id="excel">
      {isLoading && <p>loading...</p>}
      {!isLoading &&
        data?.map(({ question, answers, sentimentStats, themes, wordsByCount }) => {
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

          return (
            <section key={question}>
              <h3 className="question">{question}</h3>


              <SentimentSummary stats={sentimentStats} />

              <WordLists themes={themes} wordsByCount={wordsByCount} />
              <h4>Answer-By-Answer</h4>
              <Table
                data={answerTableData.data}
                columns={answerTableData.columns}
              />
            </section>
          )
        })}
    </section>
  )
}
