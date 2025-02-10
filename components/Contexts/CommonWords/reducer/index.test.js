import reducer from './';
import {
  LONGEST_WORDS,
  COMMON_WORDS,
  ACTION_WORDS
} from './types'
describe('CommonWords Reducer', () => {
  describe('LONGEST_WORDS sets Longest Words', () => {
    let a = {};
    let rr = reducer(a, {type: LONGEST_WORDS, payload: 'watermelon'}) 
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('updates "Longest Words" key', () => {
      expect(rr['Longest Words']).toBe('watermelon')
    })
  })
  describe('COMMON_WORDS sets Longest Words', () => {
    let a = {};
    let rr = reducer(a, {type: COMMON_WORDS, payload: 'juiceBox'}) 
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('updates "Common Words" key', () => {
      expect(rr['Common Words']).toBe('juiceBox')
    })
  })
  describe('ACTION_WORDS sets Longest Words', () => {
    let a = {};
    let rr = reducer(a, {type: ACTION_WORDS, payload: 'kitchenSink'}) 
    it('updates 1 state var', () => {
      expect(Object.keys(rr).length).toBe(1)
    })
    it('updates "Action Words" key', () => {
      expect(rr['Action Words']).toBe('kitchenSink')
    })
  })
  describe('default throws err', () => {
    let a = {ice: 'box'}
    it('throws', () => {
      expect(() => {
        reducer(a, {type: 'BAD_TYPE', payload: 'sauce'})
      }).toThrow(`CALLED COMMON-WORDS REDUCER WITH BAD TYPE: BAD_TYPE`)
    })
  })
})