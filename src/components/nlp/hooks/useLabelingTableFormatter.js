import React from "react"

function wordWithOptionalSpace(word, idx, arrLength) {
  // first word
  if (idx === 0 || idx === arrLength - 1) {
    return word
  }
  return ` ${word} `
}

export default function useLabelingTableFormatter({ data, remappedThemes }) {
  let res = []
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

          const calculatedWord = wordWithOptionalSpace(
            originalWord,
            wordIdx,
            answerTextWordsArr.length
          )

          const shouldHighlight = Boolean(
            remappedThemes[originalWord.toLowerCase()]
          )
          if (shouldHighlight) {
            word = (
              <mark key={`${originalWord}-${wordIdx}`}>{calculatedWord}</mark>
            )
            if (
              !thisAnswerObject.labels.includes(
                remappedThemes[originalWord.toLowerCase()]
              )
            ) {
              thisAnswerObject.labels.push(
                remappedThemes[originalWord.toLowerCase()]
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
      res.push(thisAnswerObject)
    })
  })

  return res
}
