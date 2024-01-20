import React, { Fragment, useMemo, useState, useEffect } from "react"
import { useQuery } from "react-query"
import Table from "./../../../../components/Table"
import { useSessionStorage } from "../../hooks/useStorage"
import Spinner from "react-bootstrap/Spinner"
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
    Header: "answer",
    accessor: "answer",
  },
]

const API_HANDSHAKE_START_API = `${process.env.GATSBY_NLP_API_URL}/api/nlp/sentiment/ad-hoc`
function getSentenceSentimentScore(text, jwt) {
  return fetch(`${API_HANDSHAKE_START_API}/${encodeURI(text)}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  }).then(d => d.json())
}

function QuestionAnalysis({ question, answers }) {
  const [jwt] = useSessionStorage("nlp-token")
  const [localAnswers, setLocalAnswers] = useState(
    answers.map(a => ({
      answer: a,
      sentimentScore: null,
      sentimenScoreLessStopwords: null,
    }))
  )
  const [aIdxToFetch, setAIdxToFetch] = useState(0)

  const useQOpts = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    retry: false,
  }

  useQuery(
    `answer-sentiment-${question}-${aIdxToFetch}`,
    () => getSentenceSentimentScore(localAnswers[aIdxToFetch].answer, jwt),
    {
      ...useQOpts,
      enabled: Boolean(aIdxToFetch < localAnswers.length),
      onSuccess: data => {
        setLocalAnswers(curAnswers =>
          curAnswers.map((a, aIdx) => {
            if (aIdx !== aIdxToFetch) return a
            a.sentimentScore = data.sentimentScore
            a.sentimenScoreLessStopwords = data.sentimenScoreLessStopwords
            return a
          })
        )
        setAIdxToFetch(x => x + 1)
      },
    }
  )
  const tableRows = useMemo(() => localAnswers, [localAnswers])

  console.log("localAnswers")
  console.log(localAnswers)

  return (
    <section className="question-analysis">
      <h3>{question}</h3>
      <h4>Summary</h4>
      {}
      <Table columns={qaColumns} data={[tableRows]} className="nlp" />
    </section>
  )
}

export default QuestionAnalysis
