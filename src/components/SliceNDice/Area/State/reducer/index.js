function AreaReducer(state, {type,payload}){
  switch(type){
    case "STOP_MOVING":
      return {
        ...state,
        curSentence: null,
        sentenceNumber: null,
        offsetSentenceNumber: null,
        showLine: false
      }
    case "SET_CUR_SENTENCE":
      return {
        ...state,
        curSentenceObj: payload.curSentenceObj,
        curSentence: payload.curSentence,
        sentenceNumber: payload.sentenceNumber,
        offsetSentenceNumber: payload.offsetSentenceNumber,
        showLine: payload.showLine,
        xOffset: payload.xOffset
      }
    default:
      throw new Error(`Called Area Reducer with bad type ${type}`)
  }
}

export default AreaReducer;