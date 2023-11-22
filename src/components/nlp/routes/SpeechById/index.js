import React from "react"
import useSpeechData from "../../hooks/useSpeechData"
import CardSmall from "../../components/CardSmall"
import CardMedium from "../../components/CardMedium"
import SentimentPie from "../../../SentimentPie"
import WordCountBySentenceLine from "../../../WordCountBySentenceLine"
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

  const areaData = speechData.analytics.sentences.map((s, idx) => ({
    name: idx,
    count: s.length,
    text: s.sentence,
  }))

  let speechDate = new Date(speechData.date)
  let formattedDate = new Intl.DateTimeFormat("en-US").format(speechDate)

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
            <CardSmall
              title="Words"
              value={speechData.analytics.wordCount.toLocaleString()}
            />
          </Row>

          {/* 2nd row */}
          <Row>
            <CardMedium title="Sentiments">
              <SentimentPie data={pieData} small legend />
            </CardMedium>

            <CardMedium title="Sentence Overview">
              <WordCountBySentenceLine data={areaData} small legend />
            </CardMedium>
          </Row>
        </div>
      )}
    </>
  )
}

export default SpeechDetail
