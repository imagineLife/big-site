import React, { useRef, useContext, useEffect } from "react"

import * as XLSX from "xlsx"
import "./../../pages/nlp/index.scss"

// components
import DragNDropForm from "./../DragNDropForm"
// import TextAnalysis from "./TextAnalysis"
import BrowserAnalytics from "./components/BrowserAnalytics"
import { NlpContext } from "./state/Provider"
import { useSessionStorage } from "./hooks/useStorage"

export default function UploadPreview() {
  console.log(
    "%c UploadPreview / nlpUi",
    "background-color: green; color: white;"
  )
  const { dispatch, authorized, email } = useContext(NlpContext) //apiReadyKey, apiInitKey, fileData, fileType
  console.log("authorized")
  console.log(authorized)

  const [fileData, setFileData] = useSessionStorage("nlp-data")
  const inputRef = useRef(null)

  function loadExcelFile(e) {
    const data = e.target.result
    const workbook = XLSX.read(data, {
      type: "binary",
    })

    const convertedToArr = workbook.SheetNames.map(function (sheetName) {
      const XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName]
      )
      return XL_row_object
    })
    setFileData(convertedToArr)
  }

  function readWithFileReader(files) {
    let theFile = files[0]
    const reader = new FileReader()

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

  console.log("%c --- ---", "background-color: green; color: white;")

  if (!authorized) {
    return <p>loading...</p>
  }
  return (
    <section id="nlp-wrapper">
      {/* WAS older content no text data yet */}
      {/* {fileData === null && ( */}
      {fileData === undefined && (
        <DragNDropForm
          setLoaded={d => dispatch({ type: "fileData", payload: d })}
          onButtonClick={onButtonClick}
          ref={inputRef}
          handleFile={readWithFileReader}
        />
      )}

      {/* text data present */}
      {/* {fileData !== null && ( */}
      {fileData !== undefined && (
        // <TableWithData data={fileData} />
        <BrowserAnalytics data={fileData} />

        // <TextAnalysis
        //   reset={() => dispatch({ type: "reset", payload: null })}
        //   fileData={fileData}
        //   fileType={fileType}
        // />
      )}
      <sub>
        <a href="/">go to my website</a>
      </sub>
    </section>
  )
}
