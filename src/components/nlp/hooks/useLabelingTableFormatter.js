// export default function useLabelingTableFormatter({ data, remappedThemes }) {
//   let res = []
//   data.forEach(personObj => {
//     delete personObj.person_id
//     const questionKeys = Object.keys(personObj)
//     questionKeys.forEach(questionText => {
//       let thisAnswerObject = {
//         labels: [],
//         text: "",
//       }
//       const answerText = personObj[questionText]
//       thisAnswerObject.text = answerText

//       answerText.split(" ").map((word, wordIdx) => {
//         if (remappedThemes[word]) {
//           if (!thisAnswerObject.labels.includes(remappedThemes[word])) {
//             thisAnswerObject.labels.push(remappedThemes[word])
//           }
//         }
//       })
//       res.push(thisAnswerObject)
//     })
//   })

//   return res
// }

import React from "react"

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
          const wordWithOptionalSpace =
            wordIdx !== answerTextWordsArr.length - 1
              ? `${originalWord} `
              : originalWord

          const shouldHighlight = Boolean(remappedThemes[originalWord])
          if (shouldHighlight) {
            word = <mark>{wordWithOptionalSpace}</mark>
            if (
              !thisAnswerObject.labels.includes(remappedThemes[originalWord])
            ) {
              thisAnswerObject.labels.push(remappedThemes[originalWord])
            }
          } else {
            word = (
              <span key={`${originalWord}-${wordIdx}`}>
                {wordWithOptionalSpace}
              </span>
            )
          }
          return word
        }
      )
      thisAnswerObject.text = <p>{formattedAnswerText}</p>
      console.log("thisAnswerObject")
      console.log(thisAnswerObject)

      res.push(thisAnswerObject)
    })
  })

  return res
}
