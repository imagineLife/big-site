import React, {  useRef, useReducer } from "react" // lazy, Suspense

import * as XLSX from "xlsx"
import { QueryClient } from "react-query"
import "./nlp.scss"

// components
import DragDDropFile from "../components/DragNDropForm"
import ReactQueryWrapper from '../components/ReactQueryWrapper'
import TextAnalysis from "../components/nlp/TextAnalysis"

// Create a client
const nlpQueryClient = new QueryClient()

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
    <ReactQueryWrapper queryClient={nlpQueryClient}>
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
