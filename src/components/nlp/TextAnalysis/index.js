import React, { Suspense, lazy } from 'react';
import { useQuery } from 'react-query';
import { ResponsiveContainer, Pie, PieChart, Tooltip, Cell } from 'recharts'

import WordsPerSentenceLine from "./../../wordsPerSentenceLine"
import SentimentScoreScatter from "../../../components/SentimentScoreScatter"
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

function SentimentSummary({ data }) {
  
  const COLORS = {
    positive: 'green',
    negative: 'darkred',
    neutral: 'gray'
  }
   return (
     <ResponsiveContainer width={300} height={300}>
       <PieChart width={100} height={100}>
         <Pie
           dataKey="value"
           isAnimationActive={false}
           data={data}
           cx="50%"
           cy="50%"
           outerRadius={80}
           fill="#8884d8"
           label
         >
           {data.map((slice, index) => (
             <Cell key={`cell-${index}`} fill={COLORS[slice.name]} />
           ))}
         </Pie>
         <Tooltip />
       </PieChart>
     </ResponsiveContainer>
   )
}

function TextBlockOption({ data, isLoading }) {
  const sentimentSummaryData = Object.keys(
    data?.summary?.sentiments
  ).map(k => ({ name: k, value: data.summary.sentiments[k].count }))
  console.log('sentimentSummaryData')
  console.log(sentimentSummaryData)
  
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
        <SentimentSummary data={sentimentSummaryData} />
      </section>

      <WordsPerSentenceLine
        data={data?.sentenceAnalysis.map((d, idx) => ({
          idx: idx + 1,
          d: d.length,
        }))}
        isLoading={isLoading}
      />
      <SentimentScoreScatter
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
