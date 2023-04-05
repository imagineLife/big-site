import React, { useRef, useReducer, useEffect } from "react" // lazy, Suspense

import * as XLSX from "xlsx"
import { useQuery } from "react-query"
import "./index.scss"

// components
import DragDDropFile from "../../components/DragNDropForm"
import TextAnalysis from "../../components/nlp/TextAnalysis"
import nlpReducer from "./reducer"

const initialReducerState = {
  fileData: null,
  tileType: null,
  apiInitialized: false,
}

export default function NlpUi() {
  const inputRef = useRef(null)
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  // console.log('state?.apiInitialized')
  // console.log(state?.apiInitialized)
  
  const useQOpts = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    retry: false,
  }

  const API_HANDSHAKE_START_API = `${process.env.GATSBY_NLP_API_URL}/app/init?id=local-gats`
  function startApiHandshake() { return fetch(API_HANDSHAKE_START_API).then(d => d.json()) }
  function finishApiHandshake() {
    return fetch(API_HANDSHAKE_FINISH_API).then(d => d.json())
  }
  const { data: apiInitKey } = useQuery("apiInit", startApiHandshake, {
    ...useQOpts,
    enabled: state?.apiInitialized === "started",
  })

  const API_HANDSHAKE_FINISH_API = `${process.env.GATSBY_NLP_API_URL}/app/allow-access?id=${apiInitKey?.id}`
  const { data: apiReadyKey } = useQuery("apiReady", finishApiHandshake, {...useQOpts, enabled: apiInitKey?.id !== undefined})
  
  // START the api-handshake workflow
  useEffect(() => {
    if (state.apiInitialized === false) {
      dispatch({ type: "startApiHandshake" })
    }
  }, [state.apiInitialized])

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

  function getDotColor({ state, apiData: { initialized, ready} }) {
    if (ready) return 'green';
    if (initialized) return 'goldenrod';
    if (state == 'started') return 'orange'
    return 'red';
  }
  const connectedDotBg = {
    backgroundColor: getDotColor({
      state: state.apiInitialized,
      apiData: { initialized: apiInitKey?.id, ready: apiReadyKey?.id },
    }),
  }

  return (
    <section id="nlp-wrapper">
      <div className="page-head">
        <h2>NLP Here</h2>
        <span className="connected-dot" style={{ ...connectedDotBg }}></span>
      </div>
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
      <sub>
        <a href="/">go to my website</a>
      </sub>
    </section>
  )
}