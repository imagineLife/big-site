import reducer from './';

describe('Area Reducer', () => {
  describe('STOP_MOVING', () => {
    let a = {
      curSentence: 'apple',
      sentenceNumber: 2,
      offsetSentenceNumber: 3,
      showLine: 4
    }
    let rr = reducer(a, {type: 'STOP_MOVING', payload: true})

    it('updates 4 state items', () => {
      expect(Object.keys(rr).length).toBe(4)
    })
    it('updates curSentence to null', () => {
      expect(rr.curSentence).toBe(null)
    })
    it('updates sentenceNumber to null', () => {
      expect(rr.sentenceNumber).toBe(null)
    })
    it('updates offsetSentenceNumber to null', () => {
      expect(rr.offsetSentenceNumber).toBe(null)
    })
    it('updates showLine to false', () => {
      expect(rr.showLine).toBe(false)
    })
  })
  describe('SET_CUR_SENTENCE', () => {
    let a = {
      curSentenceObj: 1,
      curSentence: 2,
      sentenceNumber: 3,
      offsetSentenceNumber: 4,
      showLine: 5,
      xOffset: 6
    }
    let rr = reducer(a, {type: 'SET_CUR_SENTENCE', payload: {
      curSentenceObj: 'alpha',
      curSentence: 'beta',
      sentenceNumber: 'camma',
      offsetSentenceNumber: 'dalpha',
      showLine: 'elipha',
      xOffset: 'fifa' 
    }})
    it('updates 6 state keys', () => {
      expect(Object.keys(rr).length).toBe(6)
    })
    it('sets curSentenceObj from payload', () => {
      expect(rr.curSentenceObj).toBe('alpha')
    })
    it('sets curSentence from payload', () => {
      expect(rr.curSentence).toBe('beta')
    })
    it('sets sentenceNumber from payload', () => {
      expect(rr.sentenceNumber).toBe('camma')
    })
    it('sets offsetSentenceNumber from payload', () => {
      expect(rr.offsetSentenceNumber).toBe('dalpha')
    })
    it('sets showLine from payload', () => {
      expect(rr.showLine).toBe('elipha')
    })
    it('sets xOffset from payload', () => {
      expect(rr.xOffset).toBe('fifa')
    })
    
  })
  it('defaults to throw an err with bad type', () => {
    expect(() => {
      return reducer({}, {type: 'SAUCE'})
    }).toThrow(`Called Area Reducer with bad type SAUCE`)
  })
})