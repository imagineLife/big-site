import React, { useState, useRef, useEffect, useReducer } from "react"
import { useTable } from "react-table"

import * as XLSX from "xlsx"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query"
import "./nlp.scss"

// components
import DragDDropFile from "../components/DragNDropForm"
import Scalar from "../components/Scalar"
import WordsPerSentenceLine from "../components/wordsPerSentenceLine"
import SentimentScoreLine from "../components/sentimentScoreLine"

// Create a client
const nlpQueryClient = new QueryClient()

function Table({ data }) {
  const columns = Object.keys(data[0][0]).map(d => ({
    Header: d,
    accessor: d,
  }))

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data[0],
    })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function ResetPreviewForm({ reset, content, fileType }) {
  return (
    <section id="reset-preview">
      <form>
        <button type="button" onClick={() => reset()}>
          Start Over
        </button>
      </form>
      {fileType === "text" && (
        <figure>
          <p>{content}</p>
        </figure>
      )}
      {fileType === "excel" && <Table data={content} />}
    </section>
  )
}

function fetchTextAnalysis(text) {
  const SENTIMENT_PATH = "/nlp/sentiment"
  return () =>
    fetch(`${process.env.GATSBY_NLP_API_URL}${SENTIMENT_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then(d => d.json().then(d => d))
      .catch(e => {
        console.log("fetch error")
        console.log(e)
      })
  // return fetch(``)
}

function TextAnalysis({ fileData, reset, fileType }) {
  // Access the client
  const nlpQueryClient = useQueryClient()

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
    fetchTextAnalysis(fileData),
    useQOpts
  )

  return (
    <section id="text-analysis">
      <ResetPreviewForm
        reset={() => reset()}
        content={fileData}
        fileType={fileType}
      />
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
        {/* <Scalar
          title={"Avg W.P.S"}
          isLoading={isLoading}
          value={data?.summary?.agvWordsPerSentence}
        /> */}
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
    </section>
  )
}

const initialReducerState = {
  fileData: null,
  tileType: null,
}

function nlpReducer(a, b) {
  switch (b.type) {
    case "text":
      return {
        fileType: "text",
        fileData: b.payload,
      }
    case "excel":
      return {
        fileType: "excel",
        fileData: b.payload,
      }
    case "reset":
      return {
        fileType: null,
        fileData: null,
      }
    default:
      return a
  }
}

export default function Nlp() {
  const inputRef = useRef(null)
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  // const apiRes = useNlpApi(loadedFileData);

  function loadExcelFile(e) {
    const data = e.target.result
    const workbook = XLSX.read(data, {
      type: "binary",
    })

    const convertedToArr = workbook.SheetNames.map(function (sheetName) {
      // Here is your object
      const XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName]
      )
      return XL_row_object
    })

    dispatch({ type: "excel", payload: convertedToArr })
  }

  function readWithFileReader(files) {
    let theFile = files[0]
    const reader = new FileReader()
    // console.log('theFile')
    // console.log(theFile.name)

    if (theFile.name.includes("txt")) {
      // pass reader for a hack "this" workaround for now...
      reader.onload = e => loadTextFile(reader, theFile.name)
      reader.readAsText(theFile)
      return
    }

    if (theFile.name.includes("xl")) {
      reader.onload = loadExcelFile
      reader.onerror = function (ex) {
        console.log(ex)
      }
      reader.readAsBinaryString(theFile)
    }
  }

  function loadTextFile(item, fileName) {
    // original form contents acessible at e.target.result

    // replace new-line with no space
    const ct = item.result.replace(/\n/g, " ")

    // const words = ct.split(" ")

    dispatch({ type: "text", payload: ct })
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <ReactQueryWrapper>
      <section id="nlp-wrapper">
        <h2>NLP Here</h2>
        <sub>
          <a href="/">go to my website</a>
        </sub>
        {/* no text data yet */}
        {state.fileData === null && (
          <DragDDropFile
            setLoaded={d => dispatch({ type: "fileData", payload: d })}
            onButtonClick={onButtonClick}
            ref={inputRef}
            handleFile={readWithFileReader}
          />
        )}

        {/* text data present */}
        {state.fileData !== null && (
          <TextAnalysis
            reset={() => dispatch({ type: "reset", payload: null })}
            fileData={state.fileData}
            fileType={state.fileType}
          />
        )}
      </section>
    </ReactQueryWrapper>
  )
}

function ReactQueryWrapper({ children }) {
  return (
    <QueryClientProvider client={nlpQueryClient}>
      {children}
    </QueryClientProvider>
  )
}
