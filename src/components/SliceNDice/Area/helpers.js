function getSelectedSentences({sentences, selectedAreaArr}){
  return sentences.reduce((acc, curVal, curIdx) => {
    if (curIdx >= selectedAreaArr[0] && curIdx <= selectedAreaArr[1]) {
      return acc.concat(curVal);
    }
    return acc;
  }, [])
}

export { getSelectedSentences }