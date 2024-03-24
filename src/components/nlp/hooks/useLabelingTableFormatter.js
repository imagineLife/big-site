import React, { useState, useEffect } from "react"

function wordWithOptionalSpace(word, idx, arrLength) {
  // first word
  if (idx === 0 || idx === arrLength - 1) {
    return word
  }
  return ` ${word} `
}

function doTheWork(data, remappedThemes) {
  let localRes = []
  data.forEach(personObj => {
    delete personObj.person_id
    const questionKeys = Object.keys(personObj)
    questionKeys.forEach(questionText => {
      let thisAnswerObject = {
        labels: [],
        text: null,
      }
      const answerText = personObj[questionText]
      const answerTextWordsArr = answerText.split(" ")
      const formattedAnswerText = answerTextWordsArr.map(
        (originalWord, wordIdx) => {
          let word
          let wordWithoutPunc = originalWord.replace(/[^\w\s]/g, "")
          const calculatedWord = wordWithOptionalSpace(
            originalWord,
            wordIdx,
            answerTextWordsArr.length
          )

          const shouldHighlight = Boolean(
            remappedThemes[wordWithoutPunc.toLowerCase()]
          )
          if (shouldHighlight) {
            word = (
              <mark key={`${originalWord}-${wordIdx}`}>{calculatedWord}</mark>
            )
            if (
              !thisAnswerObject.labels.includes(
                remappedThemes[wordWithoutPunc.toLowerCase()]
              )
            ) {
              thisAnswerObject.labels.push(
                remappedThemes[wordWithoutPunc.toLowerCase()]
              )
            }
          } else {
            word = (
              <span key={`${originalWord}-${wordIdx}`}>{calculatedWord}</span>
            )
          }
          return word
        }
      )
      thisAnswerObject.text = <p>{formattedAnswerText}</p>
      localRes.push(thisAnswerObject)
    })
  })

  return localRes
}
export default function useLabelingTableFormatter(
  { data, remappedThemes },
  newUpdatedCount
) {
  let [res, setRes] = useState(() => {
    return doTheWork(data, remappedThemes)
  })

  useEffect(() => {
    setRes(doTheWork(data, remappedThemes))
  }, [newUpdatedCount])

  return res
}
