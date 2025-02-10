const convertStrToWordArr = require('./convertStrToWordArr').default;

export default function getLongestThirty(inputVar) {
  const startingArr = (typeof inputVar === 'string') ? convertStrToWordArr(inputVar) : inputVar;

  // make NO REPEATS
  const uniqueWords = startingArr.reduce((acc, val) => {
    if (acc.indexOf(val.toLowerCase()) < 0) acc.push(val.toLowerCase());
    return acc;
  }, []);

  // sort the word by longest-at-the-top
  uniqueWords.sort((a, b) => b.length - a.length);

  const topTewnty = uniqueWords.slice(0, 30);

  return topTewnty;
}