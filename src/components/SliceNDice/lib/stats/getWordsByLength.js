import { convertStrToWordArr } from './';

export default function getWordsByLength(srcWordArr) {
  const startingArr = (typeof srcWordArr === 'string') ? convertStrToWordArr(srcWordArr) : srcWordArr;

  const wordsByLength = [];

  startingArr.forEach((singleWord) => {
    let thisIndex = null;
    // check if this word is already in array
    const thisWordLength = singleWord.length;
    if (wordsByLength.some((arrObj, arrObjInd) => {
      if (arrObj.size == thisWordLength) {
        thisIndex = arrObjInd;
      }
      return arrObj.size == thisWordLength;
    })
    ) {
      wordsByLength[thisIndex].occurances += 1;
    } else {
      wordsByLength.push({ size: thisWordLength, occurances: 1 });
    }
  });

  return wordsByLength.sort((a, b) => b.occurances - a.occurances).slice(0, 8);
}