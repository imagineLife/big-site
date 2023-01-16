function ingWords(str) {
  const findEnding = /\w*ing\b/g;
  const res = str.match(findEnding);
  return res;
}

module.exports = ingWords;