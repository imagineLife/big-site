import React, { useState, useEffect } from "react"
import defaultSpeech from "./../default.json"

function useSpeechData(speechId) {
  const [speechData, setSpeechData] = useState(defaultSpeech)

  useEffect(() => {
    if (speechId !== "default") console.log("NEED TO FETCH SPEECH DATA!")
  }, [])

  return speechData
}

export default useSpeechData
