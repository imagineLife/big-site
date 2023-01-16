export default function edWords(str) {
  const findEnding = /\w*ed\b/g;
  const res = str.match(findEnding);
  return res;
}