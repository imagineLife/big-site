import edWords from './edWords';

describe('edWords', () => {
  let string = 'walked around the blocked and logged miles.'
  let res = edWords(string);
  it('returns length === 3 from string input', () => {
    expect(res.length).toBe(3)
  })
})