import {
  SENTENCES,
  UPDATE_DISPLAY_TEXT_FROM_AREA,
  WORD_LENGTH,
  TEXT,
  MAX_WORDS,
  THEME,
  DONE_FETCHING_TEXT,
  SET_AREA_DATA
} from './types';

const themeColors = [
  'rgb(166,206,227)',
  'rgb(31,120,180)',
  'rgb(178,223,138)',
  'rgb(51,160,44)',
  'rgb(251,154,153)',
  'rgb(227,26,28)',
  'rgb(253,191,111)',
  'rgb(255,127,0)',
  'rgb(202,178,214)',
  'rgb(106,61,154)',
  'rgb(255,255,153)',
  'rgb(177,89,40)'
]

const updateDisplayText = (sentenceArr, selectedSentenceArr) => {
  let resString = '';
  let curIdx = selectedSentenceArr[0];
  while (curIdx < selectedSentenceArr[1]) {
    resString += `${sentenceArr[curIdx++].text} `;
  }
  return resString;
};

const reducer = (state, {type, payload}) => {
  let resText;
  
  switch (type) {
    case DONE_FETCHING_TEXT: 
    return{
      ...state,
      text: payload.text,
      sentences: payload.sentences,
      maxWordsPerSentence: payload.maxWords,
      themes: payload.themes
    }
  case SENTENCES:
    return {
      ...state,
      sentences: payload,
    };
  case SET_AREA_DATA:
    return {
      ...state,
      areaData: payload
    }
  case UPDATE_DISPLAY_TEXT_FROM_AREA:
    return {
      ...state,
      selectedAreaArr: payload,
      displayText: updateDisplayText(state.sentences, payload),
    };

  case WORD_LENGTH:
    return {
      ...state,
      wordLength: payload,
    };

  case TEXT:
    return {
      ...state,
      text: payload,
    };

  case MAX_WORDS:
    return {
      ...state,
      maxWordsPerSentence: payload,
    };

  case THEME:
    let randClr = null;
    if (payload) {
      const randLength = Math.floor(Math.random() * themeColors.length);
      randClr = themeColors[randLength];
    }
    return {
      ...state,
      theme: payload,
      curColor: randClr
    };

  default:
    throw new Error(`CALLED TEXT-AREA REDUCER WITH BAD TYPE: ${type}`);
  }
};

export default reducer;