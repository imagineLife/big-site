import React, { useMemo, useState, useEffect, useCallback } from "react"
import { useQuery } from "react-query"
import Table from "./../../../../components/Table"
import { useSessionStorage } from "../../hooks/useStorage"
import Spinner from "react-bootstrap/Spinner"
import { QuestionDiamond } from "react-bootstrap-icons"
// import CardSmall from "./../CardSmall"
import {
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts"
import "./index.scss"

function ValueOrSpinner({ value }) {
  if (value !== null) return String(value)
  return (
    <Spinner animation="border" variant="secondary" style={{ scale: "50%" }} />
  )
}

function SentimentScoreViz({ scores }) {
  return (
    <div style={{ width: "100%", height: "100px" }}>
      {/* border: "1px solid gray" */}
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 10,
            right: 50,
            bottom: 0,
            left: 0,
          }}
        >
          <Scatter data={scores.map(d => ({ point: d, y: 0 }))} fill="blue" />
          <YAxis type="number" dataKey="y" tickCount={0} />
          <XAxis dataKey="point" type="number" domain={[-5, 5]} tickCount={11}>
            <Label value="Negative" position="insideTopLeft" offset={-30} />
            <Label value="Positive" position="insideTopRight" offset={-30} />
          </XAxis>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
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

const NLP_API = `${process.env.GATSBY_NLP_API_URL}/api/nlp`
function getSentenceSentimentScore(text, jwt) {
  return fetch(`${NLP_API}/sentiment/ad-hoc/${encodeURI(text)}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  }).then(d => d.json())
}

function getSentenceThemes(text, jwt) {
  return fetch(`${NLP_API}/themes/ad-hoc/${encodeURI(text)}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  }).then(d => d.json())
}

function QuestionAnalysis({ question, answers }) {
  console.log(
    "%c QuestionAnalysis",
    "background-color: darkgreen; color: white;"
  )
  console.log(`question: ${question}`)

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
  }, [localAnswers, sentimentIdxToFetch])

  // const tableRows = useMemo(() => localAnswers, [localAnswers])

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
        <h5>Tabular</h5>
        <Table
          columns={qaColumns}
          data={[localAnswers]}
          className="nlp"
          selectionHandler
        />
      </section>
    </section>
  )
}

export default QuestionAnalysis
