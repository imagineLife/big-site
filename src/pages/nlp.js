import React, { useState, useRef } from "react"
import "./nlp.scss"
import DragDDropFile from "../components/DragNDropForm"

// drag drop file component
function DragDropFile() {
  // ref
  const inputRef = useRef(null)

  const [loadedFileData, setLoadedFileData] = useState(null)
  console.log('Boolean(loadedFileData)')
  console.log(Boolean(loadedFileData))
  
  
  function handleFile(files) {
    let theFile = files[0]
    const reader = new FileReader()
    reader.onload = loadFile
    reader.readAsText(theFile)
  }

  function loadFile(e) {
    // this is the original contents
    // const contents = e.target.result

    // replace new-line with no space
    const ct = this.result.replace(/\n/g, "")

    // const words = ct.split(" ")

    setLoadedFileData(ct)
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <DragDDropFile
      setLoaded={setLoadedFileData}
      onButtonClick={onButtonClick}
      ref={inputRef}
      handleFile={handleFile}
    />
  )
}

export default function Nlp() {
  return (
    <section id="nlp-wrapper">
      <h2>NLP Here</h2>
      <DragDropFile />
    </section>
  )
}
