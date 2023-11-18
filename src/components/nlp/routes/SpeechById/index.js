import React, { useState, useEffect } from "react"
import defaultSpeech from "./default.json"
function useSpeechData(speechId) {
  console.log("%c useSpeechData", "background-color: orange; color: white;")
  const [speechData, setSpeechData] = useState(defaultSpeech)

  useEffect(() => {
    if (speechId !== "default") console.log("NEED TO FETCH SPEECH DATAb!")
  }, [])

  return [speechData]
}
const SpeechDetail = p => {
  const { speechId, ...params } = p
  console.log("params")
  console.log(params)

  const speechData = useSpeechData(speechId)
  console.log("speechData")
  console.log(speechData)

  return <div>Speech Detail for speech {speechId}</div>
}

export default SpeechDetail
