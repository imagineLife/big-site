import React, {
  useEffect,
  useState,
  createContext,
  useReducer,
  useContext
} from 'react';

// helper fns
import {
  getWordsByCount,
  getLongestThirty,
  convertStrToWordArr,
  ingWords
} from '../../lib/stats';
import { sortByWordAlpha } from './helpers'

// State
import reducer from './reducer';
import initialState from './reducer/initialState.json'
import { TextAreaContext } from '../TextArea';

const WordListContext = createContext();
const { Provider, Consumer } = WordListContext;

const CommonWordsProvider = (props) => {
  const [wordLists, dispatch] = useReducer(reducer, initialState);

  const { displayText } = useContext(TextAreaContext);
  const [selectedWord, setSelectedWord] = useState(null);
  const [commonWords, setCommonWords] = useState([]);
  const [longestNine, setLongestNine] = useState([]);
  const [wordListFocus, selectWordList] = useState(null);
  
  const makeCommonWords = (sentencesString) => {
    const arrayOfWords = convertStrToWordArr(sentencesString);
    setCommonWords(getWordsByCount(arrayOfWords).slice(0, 10));
    setLongestNine(getLongestThirty(arrayOfWords).slice(0, 10));
    dispatch({ type: 'COMMON_WORDS', payload: getWordsByCount(arrayOfWords).slice(0, 10) });
    dispatch({ type: 'LONGEST_WORDS', payload: getLongestThirty(arrayOfWords).slice(0, 10) });
    dispatch({
      type: 'ACTION_WORDS',
      payload: (function getINGWords() {
        const words = ingWords(sentencesString);
        if (!words) {
          return [];
        }
        return words.filter((itm, idx) => words.indexOf(itm) === idx);
      }()),
    });
  };

  // MAKE common words after display-text gets added to context
  useEffect(() => {
    if (displayText) {
      makeCommonWords(displayText);
    }
  }, [displayText]);

  // AUTO-SELECT a word-list 'onLoad'
  useEffect(() => {
    if (displayText && wordLists && !wordListFocus) {
      const lists = Object.keys(wordLists);
      selectWordList(lists[0]);
    
    }
  }, [displayText, wordListFocus, wordLists]);

  return (
    <Provider value={{
      commonWords,
      longestNine,
      makeCommonWords,
      selectWordList,
      selectedWord,
      setSelectedWord,
      sortByWordAlpha,
      wordLists,
      wordListFocus,
      wordListNames: Object.keys(wordLists)
    }}
    >
      {props.children}
    </Provider>
  );
};

// export default Provider;
export {
  CommonWordsProvider,
  Consumer as WordListConsumer,
  WordListContext,
};
