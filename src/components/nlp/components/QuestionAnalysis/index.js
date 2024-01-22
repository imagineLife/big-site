import React, { useMemo, useState, useEffect, useCallback } from "react"
import { useQuery } from "react-query"
import Spinner from "react-bootstrap/Spinner"
import { QuestionDiamond } from "react-bootstrap-icons"

import SentimentScoreViz from "../SentimentScoreViz"
import ThemesSummary from "../ThemesSummary"
import Table from "./../../../../components/Table"
import { useSessionStorage } from "../../hooks/useStorage"
import getSentenceSentimentScore from "../../fetches/getAdHocSentiment"
import getSentenceThemes from "../../fetches/getAdHocTheme"

import "./index.scss"

function ValueOrSpinner({ value }) {
  if (value !== null) return String(value)
  return (
    <Spinner animation="border" variant="secondary" style={{ scale: "50%" }} />
  )
}

const qaColumns = [
  {
    Header: "Sent.",
    accessor: "sentimentScore",
    Cell: ValueOrSpinner,
  },
  {
    Header: "Sent. Less Stopwords",
    accessor: "sentimenScoreLessStopwords",
    Cell: ValueOrSpinner,
  },
  {
    Header: "Themes",
    accessor: "themes",
    Cell: ValueOrSpinner,
  },
  {
    Header: "answer",
    accessor: "answer",
  },
]

function QuestionAnalysis({ question, answers, onMouseUp }) {
  const [jwt] = useSessionStorage("nlp-token")
  const [localAnswers, setLocalAnswers] = useState(
    answers.map(a => ({
      answer: a,
      sentimentScore: null,
      sentimenScoreLessStopwords: null,
      themes: null,
    }))
  )
  const [sentimentIdxToFetch, setSentimentIdxToFetch] = useState(0)
  const [themeIdxToFetch, setThemeIdxToFetch] = useState(null)
  const [doneSentiments, setDoneSentiments] = useState(false)
  const [doneThemes, setDoneThemes] = useState(false)

  const onSentimentQuerySucces = useCallback(
    data => {
      setLocalAnswers(curAnswers =>
        curAnswers.map((a, aIdx) => {
          if (aIdx !== sentimentIdxToFetch) return a
          a.sentimentScore = data.sentimentScore
          a.sentimenScoreLessStopwords = data.sentimenScoreLessStopwords
          return a
        })
      )
      setSentimentIdxToFetch(x => x + 1)
    },
    [setLocalAnswers, sentimentIdxToFetch, setSentimentIdxToFetch]
  )

  const onThemeQuerySuccess = useCallback(
    data => {
      setLocalAnswers(curAnswers =>
        curAnswers.map((a, aIdx) => {
          if (aIdx !== themeIdxToFetch) return a
          a.themes = data
          return a
        })
      )
      setThemeIdxToFetch(x => x + 1)
    },
    [setLocalAnswers, setThemeIdxToFetch, themeIdxToFetch]
  )

  //
  // fetch sentiment details
  //
  const enabled = Boolean(sentimentIdxToFetch < localAnswers.length)

  useQuery(
    `answer-sentiment-${question}-${sentimentIdxToFetch}`,
    () =>
      getSentenceSentimentScore(localAnswers[sentimentIdxToFetch].answer, jwt),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
      refetchOnReconnect: false,
      staleTime: 3000,
      retry: false,
      enabled: Boolean(sentimentIdxToFetch < localAnswers.length),
      onSuccess: onSentimentQuerySucces,
    }
  )

  //
  // fetch THEME details
  //
  useQuery(
    `answer-themes-${question}-${themeIdxToFetch}`,
    () => getSentenceThemes(localAnswers[themeIdxToFetch].answer, jwt),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
      refetchOnReconnect: false,
      staleTime: 3000,
      retry: false,
      enabled: Boolean(
        typeof themeIdxToFetch === "number" &&
          themeIdxToFetch < localAnswers.length
      ),
      onSuccess: onThemeQuerySuccess,
    }
  )

  useEffect(() => {
    if (sentimentIdxToFetch === localAnswers.length - 1) {
      setDoneSentiments(true)
      setThemeIdxToFetch(0)
    }
  }, [localAnswers, sentimentIdxToFetch, setDoneSentiments, setThemeIdxToFetch])

  useEffect(() => {
    if (themeIdxToFetch === localAnswers.length - 1) {
      setDoneThemes(true)
    }
  }, [localAnswers, themeIdxToFetch, setDoneThemes])

  return (
    <section className="question-analysis">
      <header>
        <QuestionDiamond size={50} color="rgb(25,25,200)" />
        <h3>{question}</h3>
      </header>

      <section>
        <h5>Sentiment Summary</h5>
        {!doneSentiments && <p>loading...</p>}
        {doneSentiments && (
          <SentimentScoreViz
            scores={localAnswers.map(a => a.sentimentScore).sort()}
          />
        )}
      </section>

      <section>
        <h5>Theme Summary</h5>
        {!doneThemes && <p>loading...</p>}
        {doneThemes && (
          <ThemesSummary
            key={`Theme-Summary-${question}`}
            themes={localAnswers
              .map(o => o.themes)
              .flat()
              .sort()}
            question={question}
          />
        )}
      </section>

      <section>
        <h5>Tabular</h5>
        <Table
          columns={qaColumns}
          data={[localAnswers]}
          className="nlp"
          onMouseUp={onMouseUp}
          selectionHandler
        />
      </section>
    </section>
  )
}

export default QuestionAnalysis
