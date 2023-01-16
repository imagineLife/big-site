import {
  LONGEST_WORDS,
  COMMON_WORDS,
  ACTION_WORDS
} from './types';

const commonWordsReducer = (state, {type, payload}) => {
  switch (type) {
  case LONGEST_WORDS:
    return {
      ...state,
      'Longest Words': payload,
    };
  case COMMON_WORDS:
    return {
      ...state,
      'Common Words': payload,
    };
  case ACTION_WORDS:
    return {
      ...state,
      'Action Words': payload,
    };
  default:
    throw new Error(`CALLED COMMON-WORDS REDUCER WITH BAD TYPE: ${type}`);
  }
};

export default commonWordsReducer;