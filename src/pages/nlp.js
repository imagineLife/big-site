import React from "react"
import "./nlp.scss"
import DragDDropFile from "../components/DragNDropForm"

function loadFile(e) {
  // this is the original contents
  // const contents = e.target.result
  console.log('this')
  console.log(this)
  
  const ct = this.result.replace(/\n/g, "")
  // const words = ct.split(" ")
  console.log("ct")
  console.log(ct)
  console.timeEnd("fileReader")
}

function handleFile(files) {
  console.time("fileReader")

  let theFile = files[0]
  const reader = new FileReader()
  reader.onload = loadFile
  reader.readAsText(theFile)
}

// drag drop file component
function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = React.useState(false)
  // ref
  const inputRef = React.useRef(null)

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e?.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files)
    }
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <DragDDropFile
      handleDrag={handleDrag}
      handleDrop={handleDrop}
      onButtonClick={onButtonClick}
      dragActive={dragActive}
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
