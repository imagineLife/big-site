import { getQueriedWord as fn } from './getQueriedWord';

describe('GetQueriedWord', () => {
  let params = {
    "text": "Test test countries",
    "hlText": "countries",
    "classToUse": "selected-text"
}
  let res = fn(params.text, params.hlText, params.classToUse);
  it('works', () => {
    expect(res).toBe('Test test ~|selected-text~xz countries zx~/selected-text|~')
  })
})