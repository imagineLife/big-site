// import React from 'react';

// (text: source text blob, hlText: selectedWordLength-to-hightlight)
const getWordLength = (text, textLength, classToUse) => {
  const removeRegex = new RegExp(`/.\w*\s\w*=\/${classToUse}.(\w*)<\/\w*>/g`);

  const newStyleRegex = new RegExp(`\\s(\\w{${textLength}})[\\s.!?,]`, 'g');

  const resText = text
    .replace(removeRegex, '$1')
    // .replace(newStyleRegex, ` <i className="${classToUse}">$1</i> `); // working for now
    .replace(newStyleRegex, `~|${classToUse}~xz $1 zx~/${classToUse}|~`);

  return resText;
};

export default getWordLength;
