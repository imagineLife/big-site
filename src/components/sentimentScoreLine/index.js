import React from "react"
import { XYFrame } from "semiotic"
import Card from "./../Card"

/*
  Card, or no card?
  that - is the question
*/ 
export default function SentimentScoreLine({ frameProps, isLoading }) {  
  return (
    <Card loading={isLoading} title="Sentence Sentiment Scores">
      {!isLoading && <XYFrame {...frameProps} />}
    </Card>
  )
}
