import React from "react"
import useSpeechData from "../../hooks/useSpeechData"
import CardSmall from "../../components/CardSmall"
import SentimentPie from "../../../SentimentPie"
import Card from "../../../Card"
import { Row } from "react-bootstrap"
import "./index.scss"
const SpeechDetail = p => {
  const { speechId, ...params } = p

  const speechData = useSpeechData(speechId)

  const pieData = Object.keys(speechData.analytics.sentiments).map(
    sentimentKey => ({
      name: sentimentKey,
      count: speechData.analytics.sentiments[sentimentKey].count,
    })
  )

  let speechDate = new Date(speechData.date)
  let formattedDate = new Intl.DateTimeFormat("en-US").format(speechDate)
  console.log("formattedDate")
  console.log(formattedDate)

  return (
    <>
      {!speechData && <p>loading...</p>}
      {speechData && (
        <div className="speech-by-id container">
          {/* 
          Top Row?!
        */}
          <Row>
            <CardSmall title="Author" value={speechData.author} />
            <CardSmall title="Date" value={formattedDate} />
            <CardSmall
              title="Sentences"
              value={speechData.analytics.sentenceCount}
            />
            <CardSmall title="Words" value={speechData.analytics.wordCount} />
          </Row>
          <Row>
            <Card>
              <SentimentPie data={pieData} small legend />
            </Card>
          </Row>
        </div>
      )}
    </>
  )
}

export default SpeechDetail
