import React, { useState, useMemo, useEffect } from "react"

function useInputSeparator(data) {
  const [answersByQuestion, setAnswersByQuestion] = useState([])
  const [processingState, setProcessingState] = useState("processing")
  const questions = useMemo(
    () => Object.keys(data[0]).filter((d, idx) => idx !== 0),
    [data]
  )

  useEffect(() => {
    if (answersByQuestion.length < questions.length) {
      const whichQuestionIndexToDo = answersByQuestion.length
      setAnswersByQuestion(curArr => {
        return [
          ...curArr,
          {
            question: questions[whichQuestionIndexToDo],
            answers: data.map(d => d[questions[whichQuestionIndexToDo]]),
          },
        ]
      })
    }
    // } else {
    //   console.log("DONE!")
    // }
  }, [answersByQuestion])
  return [answersByQuestion, processingState]
}

export default useInputSeparator
