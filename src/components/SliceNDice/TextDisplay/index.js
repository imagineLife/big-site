import React, { useContext, useState } from 'react';
import './index.css';

import { TextAreaContext } from './../../../pages/slice-n-dice-times/Contexts/TextArea';
import { WordListContext } from './../../../pages/slice-n-dice-times/Contexts/CommonWords';
import { getQueriedWord } from "./../../../pages/slice-n-dice-times/lib/getQueriedWord"
import getWordLength from "./../../../pages/slice-n-dice-times/lib/getWordLength"


function splitStr(str, idx) {
  const firstPart = str.substring(0, idx);
  const secondPart = str.substring(idx);
  return [firstPart, secondPart];
}

const TextDisplay = () => {
  const {
    curColor,
    displayText,
    selectedAreaArr,
    sentences,
    wordLength,
    theme,
    themesData,
  } = useContext(TextAreaContext);

  const { selectedWord } = useContext(WordListContext);
  const [closingSentenceTag] = useState('</span>');

  if (!displayText) {
    return (<p>Loading Text Display...</p>);
  }

  // if no selected word && no
  let resText = displayText;


  /*
    calculate text-segment in-view
  */
  const inViewSentences = sentences.filter((s, i) => i >= selectedAreaArr[0] && i <= selectedAreaArr[1]);

  /*
    Theme calculations
    Calulating, getting, && applying themes to sentences
    - backwards Loop thru selected-sentences
    - apply theme attrs
      -... ending tag
      -... beginning tag
  */

  const absoluteSentenceIndexesThatIncludeSelectedTheme = [];

  if (theme) {
    // loop through selected-sentence array
    for (let i = selectedAreaArr[0]; i <= selectedAreaArr[1]; i++) {
      // check if the current sentence HAS the selected theme
      if (themesData[i].includes(theme)) {
        absoluteSentenceIndexesThatIncludeSelectedTheme.push(
          {
            i,
            relativeI: i - selectedAreaArr[0],
            themes: themesData[i],
          },
        );
      }
    }
  }

  for (let i = absoluteSentenceIndexesThatIncludeSelectedTheme.length - 1; i >= 0; i--) {
    const openingSentenceTag = `<span class="theme-sentence" style="text-decoration-color: ${curColor}">`;

    // @ each sentence, do some magic
    const currentSentenceTextWithTheme = inViewSentences[absoluteSentenceIndexesThatIncludeSelectedTheme[i].relativeI].text;
    const openingTagIndex = resText.indexOf(currentSentenceTextWithTheme);
    const closingTagIndex = openingTagIndex + currentSentenceTextWithTheme.length;

    // Input CLOSING tag
    const splitAtSpanEnd = splitStr(resText, closingTagIndex);
    resText = `${splitAtSpanEnd[0]}${closingSentenceTag}${splitAtSpanEnd[1]}`;

    // Input OPENING tag
    const splitAtSpanBeginning = splitStr(resText, openingTagIndex);
    resText = `${splitAtSpanBeginning[0]}${openingSentenceTag}${splitAtSpanBeginning[1]}`;
  }

  /*
    apply WORD-LENGTH
    ORDER of js is important, word-length is affected by <span>word-length</span>
  */
  if (wordLength) {
    resText = getWordLength(resText, wordLength, 'word-length');
  }

  /*
    apply SELECTED WORD
  */
  if (selectedWord) {
    resText = getQueriedWord(resText, selectedWord, 'selected-text');
  }


  // apply styles
  // - update resText
  // replace ~x content with html className

  // SNIPPETS
  // remove INTERNAL chars
  resText = resText.replace(/~xz\s~\|/g, ' ')

  // add opening html tag
    .replace(/~\|/g, '<i class="')

  // closing-opening, good luck
    .replace(/~xz./g, '"> ')

  // closing html tag
    .replace(/.zx[\w-~\/]*\|~/g, ' </i>');


  // "Responsive" UI column divisions
  let columnCount = Math.ceil(inViewSentences.length / 15);
  columnCount = Math.min(columnCount, 4);

  const columnStyle = {
    columns: columnCount, // 10-sentence-columns,
    overflowX: 'auto',
    columnRuleStyle: 'solid',
    height: '330px',
  };

  /*
    CALCULATE a theme data object...
    {
      ThemeWord: [2,3,4] //sentence numbers,
      ThemeWordTwo: [2,4,5] //sentence numbers
    }
    ...MOVE THIS ELSEWHERE?
  */
  const themeMappedObject = { };
  themesData && themesData.forEach((t, idx) => {
    // loop through the nested array element
    t.forEach((nestedThemeWord) => {
      themeMappedObject[nestedThemeWord] = themeMappedObject[nestedThemeWord]
        ? [...themeMappedObject[nestedThemeWord], idx]
        : [idx];
    });
  });

  return <p className="display-text" style={columnStyle} dangerouslySetInnerHTML={{ __html: resText }} />;
};

export default TextDisplay;
