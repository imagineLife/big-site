export default function getSentences(srcTxt) {
  const twoWhiteSpaces = /(\s{2})/gm;
  const sentRegex = /(~~)\s/g;


  // arr of sentences
  let sentences = srcTxt.replace(twoWhiteSpaces, ' ')
    .replace(/\.\s/g, '.~~ ')
    .replace(/\?\s/g, '?~~ ')
    .replace(/!\s/g, '!~~ ')
    .split(sentRegex);

  sentences = sentences
    .filter((d, idx) => idx % 2 === 0)
    .map((s) => ({
      text: s.trim(), // 'three word sentence'
      wordCount: s.trim().split(' ').length, // 3
    }));

  return sentences;
}