import reducer from './';

describe('TextArea reducer', () => {
  describe('DONE_FETCHING_TEXT', () => {
    let rr = reducer({}, {type: 'DONE_FETCHING_TEXT', payload: {
      text: 'ace',
      sentences: 'bronto',
      maxWords: 'cart',
      themes: 'dont'
    }})
    it('updates 4 state keys', () => {
      expect(Object.keys(rr).length).toBe(4)
    })
    it('sets text state from payload', () => {
      expect(rr.text).toBe('ace');
    })
    it('sets sentences state from payload', () => {
      expect(rr.sentences).toBe('bronto');
    })
    it('sets maxWordsPerSentence state from payload', () => {
      expect(rr.maxWordsPerSentence).toBe('cart');
    })
    it('sets themes state from payload', () => {
      expect(rr.themes).toBe('dont');
    })
  })
  describe('SENTENCES', () => {
    let a = {};
    let rr = reducer(a, {type: 'SENTENCES', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets sentences state from payload', () => {
      expect(rr.sentences).toBe('mock payload here');
    })
  })

  describe('WORD_LENGTH', () => {
    let a = {};
    let rr = reducer(a, {type: 'WORD_LENGTH', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets wordLength state from payload', () => {
      expect(rr.wordLength).toBe('mock payload here');
    })
  })

  describe('TEXT', () => {
    let a = {};
    let rr = reducer(a, {type: 'TEXT', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets text state from payload', () => {
      expect(rr.text).toBe('mock payload here');
    })
  })

  describe('MAX_WORDS', () => {
    let a = {};
    let rr = reducer(a, {type: 'MAX_WORDS', payload: 'mock payload here'})
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('sets maxWordsPerSentence state from payload', () => {
      expect(rr.maxWordsPerSentence).toBe('mock payload here');
    })
  })

  describe('THEME', () => {
    let a = {};
    describe('without theme in payload', () => {
      let rr = reducer(a, {type: 'THEME', payload: null})
      it('updates 2 state vars', () => {
        expect(Object.keys(rr).length).toBe(2)
      })
      it('sets curColor and theme from payload', () => {
        expect(rr.curColor).toBe(null);
        expect(rr.theme).toBe(null);
      })
    })
     describe('with theme in payload', () => {
      let rr = reducer(a, {type: 'THEME', payload: 'saucy'})
      it('updates 2 state vars', () => {
        expect(Object.keys(rr).length).toBe(2)
      })
      it('sets curColor and theme from payload', () => {
        expect(rr.curColor).not.toBe(null);
        expect(rr.theme).toBe('saucy');
      })
    })
  })
  describe('UPDATE_DISPLAY_TEXT_FROM_AREA', () => {
    let stateSentences = ['Apple Pie is delicious','Second Sentence Here.', 'Third sentence is third.'];
    let initState = { sentences: stateSentences}
    
    let rr = reducer(initState, {
      type: 'UPDATE_DISPLAY_TEXT_FROM_AREA', 
      payload:[1,2]
    })
    it('returns 3 state items', () => {
      expect(Object.keys(rr).length).toBe(3);
    })
    it('sets selectedAreaArr from payload', () => {
      expect(rr.selectedAreaArr.toString()).toBe([1,2].toString())
    })
  })
  it('throws err by default with bad type', () => {
    let a ={}
    expect(() => {
      reducer(a, {type: 'sauce'})
    }).toThrow(`CALLED TEXT-AREA REDUCER WITH BAD TYPE: sauce`)
  })
})