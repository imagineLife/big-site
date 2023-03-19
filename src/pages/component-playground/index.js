import React from "react"
import SentimentScoreLine from "../../components/sentimentScoreLine"
import "./index.scss"

import mockSentimentScoreLineProps, {
  mockSentimentLineData,
} from "./../../components/sentimentLineProps"

export default function ComponentPlayground() {
  return (
    <div id="component-playground">
      <SentimentScoreLine
        frameProps={mockSentimentScoreLineProps}
        data={mockSentimentLineData}
      />
    </div>
  )
}
