import React, { Suspense, lazy } from "react"
import { useQuery } from "react-query"

// import WordsPerSentenceLine from "./../../wordsPerSentenceLine"
import WordsPerSentenceScatter from "./../../WordsPerSentenceScatter"
import SentimentScoreLine from "./../../sentimentScoreLine/"
import SentimentPie from "./../../SentimentPie"
import Scalar from "../../../components/Scalar"
import ExcelAnalysis from "../ExcelAnalysis"
import WordLists from "./../WordLists"
import "./index.scss"

// const Table = lazy(() => import("../../../components/Table"))

function ResetPreviewForm({ reset, content, fileType }) {
  return (
    <section id="reset-preview">
      {/* <form>
        <button type="button" onClick={() => reset()}>
          Start Over
        </button>
      </form> */}
      {fileType === "text" && (
        <figure>
          <p>{content}</p>
        </figure>
      )}
    </section>
  )
}

function fetchTextAnalysis({ data, type }) {
  const SENTIMENT_PATH =
    type === "text" ? "/api/nlp/sentiment" : "/api/nlp/sentiment/excel"
  const FETCH = {
    URL: `${process.env.GATSBY_NLP_API_URL}${SENTIMENT_PATH}`,
    METHOD: "post",
    HEADERS: {
      "Content-Type": "application/json",
    },
  }

  return () =>
    fetch(FETCH.URL, {
      method: FETCH.METHOD,
      headers: FETCH.HEADERS,
      body: JSON.stringify({ text: data }),
    })
      .then(d => d.json().then(d => d))
      .catch(e => {
        console.log("fetch error")
        console.log(e)
      })
}

/*
  <SentimentScoreScatter
    data={data?.sentenceAnalysis.map((d, idx) => ({
      idx: idx + 1,
      d: d.sentimentScore,
    }))}
    isLoading={isLoading}
  />
*/

function TextBlockOption({ data, isLoading }) {
  const sentimentPercentages = Object.keys(data?.summary?.sentiments).map(
    k => ({ name: k, ...data.summary.sentiments[k] })
  )

  return (
    <div className="text-block-analysis">
      <section id="scalar-wrapper">
        <Scalar
          title={"Words"}
          isLoading={isLoading}
          value={data?.summary?.words}
        />
        <Scalar
          title={"Sentences"}
          isLoading={isLoading}
          value={data?.summary?.sentences}
        />
        <SentimentPie data={sentimentPercentages} small />
      </section>

      <WordLists
        themes={data?.summary?.themes.map(t => t.theme)}
        wordsByCount={data?.summary?.wordsByCount.slice(0, 20)}
        longest={data?.summary?.longestThirty}
      />
      {/* <WordsPerSentenceLine
        data={data?.sentenceAnalysis.map((d, idx) => ({
          idx: idx + 1,
          d: d.length,
        }))}
        isLoading={isLoading}
      /> */}
      <WordsPerSentenceScatter
        data={data?.sentenceAnalysis.map((d, didx) => ({
          idx: didx + 1,
          s: d.sentence,
          words: d.length,
        }))}
      />

      <SentimentScoreLine
        isLoading={isLoading}
        data={data?.sentenceAnalysis.map((d, idx) => ({
          num: idx + 1,
          text: d.sentence,
          score: d.sentimentScore.toFixed(1),
        }))}
      />
    </div>
  )
}

export default function TextAnalysis({ fileData, reset, fileType }) {
  const useQOpts = {
    enabled: !!fileData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  }
  // Queries
  const { isLoading, data } = useQuery(
    "textAnalysis",
    fetchTextAnalysis({ data: fileData, type: fileType }),
    useQOpts
  )

  return (
    <section id="text-analysis">
      <ResetPreviewForm
        reset={() => reset()}
        content={fileData}
        fileType={fileType}
      />
      {fileType === "text" && !isLoading && <TextBlockOption data={data} />}
      {fileType === "excel" && !isLoading && <ExcelAnalysis data={data} />}
    </section>
  )
}
