import React, { useState, useRef, useEffect } from "react"
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import "./nlp.scss"
import DragDDropFile from "../components/DragNDropForm"
import Card from "../components/Card";
function ResetPreviewForm({ reset, content }) {
  return (
    <section id="reset-preview">
      <form>
        <button type="button" onClick={() => reset()}>
          Start Over
        </button>
      </form>
      <figure>
        <p>{content}</p>
      </figure>
    </section>
  )
}

function TextAnalysis({textContent, reset}) {
  return (
    <section id="text-analysis">
      <ResetPreviewForm reset={() => reset()} content={textContent} />
      <Card>Words-PerSentence Line</Card>
      <Card>Sentence Sentiment Score Line</Card>
    </section>
  )
}



export default function Nlp() {
  const inputRef = useRef(null)
  const [loadedFileData, setLoadedFileData] = useState(null)
  // const apiRes = useNlpApi(loadedFileData);
  
  useEffect(() => { 
    // console.log('Object.keys(process.env)')
    // console.log(Object.keys(process.env))
    // console.log('THIS: ',process.env.GATSBY_NLP_API_URL)
    
    
    // fetch(process.env.GATSBY_NLP_API_URL).then(res => {
    //   res
    //     .json()
    //     .then(d => {
    //       console.log("d")
    //       console.log(d)
    //     })
    //     .catch(e => {
    //       console.log("FETCH ERROR")
    //       console.log(e)
    //     })
    // })

    return () => { 
      console.log(
        "%c useEffect NLP cleanup....",
        "background-color: pink; color: black;"
      )
      
      
    }
  },[])
  
  function readWithFileReader(files) {
    let theFile = files[0]
    const reader = new FileReader()
    reader.onload = loadFile
    reader.readAsText(theFile)
  }

  function loadFile(e) {
    // original form contents acessible at e.target.result

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
    <section id="nlp-wrapper">
      <h2>NLP Here</h2>
      <sub><a href="/">go to my website</a></sub>
      {/* no text data yet */}
      {loadedFileData === null && (
        <DragDDropFile
          setLoaded={setLoadedFileData}
          onButtonClick={onButtonClick}
          ref={inputRef}
          handleFile={readWithFileReader}
        />
      )}

      {/* text data present */}
      {loadedFileData !== null && (
        <TextAnalysis
          reset={() => setLoadedFileData(null)}
          textContent={loadedFileData}
        />
      )}
    </section>
  )
}
