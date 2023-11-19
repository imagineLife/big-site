import React, { useState, useEffect } from "react"
import defaultSpeech from "./../default.json"

function useSpeechData(speechId) {
  console.log("%c useSpeechData", "background-color: orange; color: white;")
  const [speechData, setSpeechData] = useState(defaultSpeech)

  useEffect(() => {
    if (speechId !== "default") console.log("NEED TO FETCH SPEECH DATAb!")
  }, [])

  return speechData
}

export default useSpeechData
