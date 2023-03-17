import React, { Suspense, lazy } from 'react';
import { useQuery } from 'react-query';
import WordsPerSentenceLine from "./../../wordsPerSentenceLine"
import SentimentScoreLine from "../../../components/sentimentScoreLine"
import Scalar from "../../../components/Scalar"
import ExcelAnalysis from "../ExcelAnalysis"
const Table = lazy(() => import("../../../components/Table")) 

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

function fetchTextAnalysis({data, type}) {
  const SENTIMENT_PATH = type === "text" ? "/nlp/sentiment" : "/nlp/sentiment/excel"
  const FETCH = {
    URL: `${process.env.GATSBY_NLP_API_URL}${SENTIMENT_PATH}`,
    METHOD: 'post',
    HEADERS: {
        "Content-Type": "application/json",
      }
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

function TextBlockOption({data, isLoading}) {
  return (
    <>
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
        <Scalar title={"Sentiment Summary"} isLoading={isLoading}>
          <span>
            Positive: {data?.summary?.sentiments?.positive.count} (
            {data?.summary?.sentiments?.positive.percent}%)
          </span>
          <br />
          <span>
            Negative: {data?.summary?.sentiments?.negative.count} (
            {data?.summary?.sentiments?.negative.percent}%)
          </span>
          <br />
          <span>
            Neutral: {data?.summary?.sentiments?.neutral.count} (
            {data?.summary?.sentiments?.neutral.percent}%)
          </span>
        </Scalar>
      </section>
      <WordsPerSentenceLine
        data={data?.sentenceAnalysis.map((d, idx) => ({
          idx: idx + 1,
          d: d.length,
        }))}
        isLoading={isLoading}
      />
      <SentimentScoreLine
        data={data?.sentenceAnalysis.map((d, idx) => ({
          idx: idx + 1,
          d: d.sentimentScore,
        }))}
        isLoading={isLoading}
      />
    </>
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
    fetchTextAnalysis({data: fileData, type: fileType}),
    useQOpts
  )
  

  return (
    <section id="text-analysis">
      <ResetPreviewForm
        reset={() => reset()}
        content={fileData}
        fileType={fileType}
      />
      {fileType === "text" && !isLoading && (
        <TextBlockOption data={data} />
      )}
      {fileType === "excel" && !isLoading && <ExcelAnalysis data={data} />}
    </section>
  )
}
