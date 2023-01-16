import {
  convertStrToWordArr,
  getLongestThirty,
  getWordsByCount,
  getWordsByLength,
  ingWords,
  getSentences,
  edWords,
} from './'

describe('stats fns', () => {
  describe('convertStrToWordArr', () => {
    let testSentenceOne = 'the quick brown fox jumps over the lazy dog.'
    let expectedArrRes = [
      'the',   'quick',
      'brown', 'fox',
      'jumps', 'over',
      'the',   'lazy',
      'dog'
    ]
    describe(`SENTENCE: ${testSentenceOne}`, () => {
      let fnRes = convertStrToWordArr(testSentenceOne)
      let expectedArrOutput = [
      'the',   'quick',
      'brown', 'fox',
      'jumps', 'over',
      'the',   'lazy',
      'dog'
    ];
      
      it('is an arr', () => {
        expect(Array.isArray(fnRes)).toBe(true);
      })
      it('has 9 items', () => {
        expect(fnRes.length).toBe(9);
      })
      it('matches expected array', () => {
        expect(fnRes.toString()).toBe(expectedArrOutput.toString());
      })
    })
  })

  describe('ingWords', () => {
    //@TODO: make this SKIP words that ONLY have 4 letters and end ing 'ing' maybe?!
    describe('ing words return successfully', () => {
      describe('from arr of strings', () => {
        const correctWords = ['sing','walking', 'ring', 'dancing'];
        correctWords.forEach(matchingWord => {
          let fnRes = ingWords(matchingWord)
          it(`${matchingWord}`, () => {
            expect(fnRes[0]).toBe(matchingWord)
          })
        })
      })

      it('found ALL "ing" words in a sentence', () => {
         const wordSentence = 'Singing warned the sinking ship about living.';
        let foundIngWords = [ 'Singing', 'sinking', 'living' ];
        let fnRes = ingWords(wordSentence)
        expect(fnRes.toString()).toBe(foundIngWords.toString())
      })
    })
    describe('non-ing words return null', () => {
      const incorrectWords = ['sung', 'brought', 'hinges', 'bingbong'];
      incorrectWords.forEach(nonMatchingWord => {
        let fnRes = ingWords(nonMatchingWord)
        it(`${nonMatchingWord}`, () => {
          expect(fnRes).toBe(null)
        })
      })

      it('found NO "ing" words in a sentence', () => {
        const wordSentence = 'Sink warned the sink ship about liv.';
        let fnRes = ingWords(wordSentence)
        expect(fnRes).toBe(null)
      })
    })
  })

  describe('edWords', () => {
    //@TODO: make this SKIP words that ONLY have 4 letters and end ing 'ing' maybe?!
    describe('returns matching edWords successfully', () => {
      describe('from arr of words', () => {
        let edWordsArr = ['walked', 'banked', 'qwertyed','instantiated']
        edWordsArr.forEach(matchingWord => {
          let fnRes = edWords(matchingWord)
          it(`${matchingWord}`, () => {
            expect(fnRes[0]).toBe(matchingWord)
          })
        })
      })
      describe('from sentence', () => {
        const wordSentence = 'Singing warned the sinking ship about lived.';
        let foundEdWords = ['Singing', 'sinking']
        let fnRes = ingWords(wordSentence)
        expect(fnRes.toString()).toBe(foundEdWords.toString())
      })
    })

    describe('returns null on non-matching words from arr of words', () => {
      let nonMatchingEds = ['walk', 'bank', 'qwerty','instantiate']
      nonMatchingEds.forEach(badMatch => {
        let fnRes = edWords(badMatch)
        it(`${badMatch}`, () => {
          expect(fnRes).toBe(null)
        })
      })
    })
  })

  describe('getWordsByCount', () => {
    it('First sentence of Trump Inauguration', () => {
      const testSentence = 'Chief Justice Roberts, President Carter, President Clinton, President Bush, President Obama, fellow Americans, and people of the world, thank you.';
      const expectedOutput = [
        { word: 'president', occurances: 4 },
        { word: 'chief', occurances: 1 },
        { word: 'justice', occurances: 1 },
        { word: 'roberts', occurances: 1 },
        { word: 'carter', occurances: 1 },
        { word: 'clinton', occurances: 1 },
        { word: 'bush', occurances: 1 },
        { word: 'obama', occurances: 1 },
        { word: 'fellow', occurances: 1 },
        { word: 'americans', occurances: 1 },
        { word: 'people', occurances: 1 },
        { word: 'world', occurances: 1 },
        { word: 'thank', occurances: 1 }
      ]
      let testRes = getWordsByCount(testSentence)
      expect(testRes.toString()).toBe(expectedOutput.toString())
    })
    it('mock words', () => {
      const stock = 'First second second third third third fourth fourth fourth fourth fifth fifth fifth fifth fifth';
      const stockExpectation = [
        {word: 'First', occurances: 1},
        {word: 'second', occurances: 2},
        {word: 'third', occurances: 3},
        {word: 'fourth', occurances: 4},
        {word: 'fifth', occurances: 5},
      ]
      let stockRes = getWordsByCount(stock);

      expect(stockRes.toString()).toBe(stockExpectation.toString())
    })
    it('takes ARRAY too', () => {
      const stock = ['First','second','second','third','third','third','fourth','fourth','fourth','fourth','fifth','fifth','fifth','fifth','fifth'];
      const stockExpectation = [
        {word: 'First', occurances: 1},
        {word: 'second', occurances: 2},
        {word: 'third', occurances: 3},
        {word: 'fourth', occurances: 4},
        {word: 'fifth', occurances: 5},
      ]
      let stockRes = getWordsByCount(stock);

      expect(stockRes.toString()).toBe(stockExpectation.toString())
    })
  })

  describe('getWordsByLength', () => {
    it('works with string', () => {
      let s = 'A aa aaa aaaa B bb bbb C cc D';
      let exampleRes = [{"occurances": 4, "size": 1}, {"occurances": 3, "size": 2}, {"occurances": 2, "size": 3}, {"occurances": 1, "size": 4}]
      let res = getWordsByLength(s)
      expect(res.toString()).toBe(exampleRes.toString())
    })
    it('works with arr', () => {
      let s = ['A', 'aa', 'aaa', 'aaaa', 'B', 'bb', 'bbb', 'C', 'cc', 'D'];
      let exampleRes = [{"occurances": 4, "size": 1}, {"occurances": 3, "size": 2}, {"occurances": 2, "size": 3}, {"occurances": 1, "size": 4}]
      let res = getWordsByLength(s)
      expect(res.toString()).toBe(exampleRes.toString())
    })
  })

  describe('getSentences', () => {
    it('gets 3 sentences', () => {
      let sOne = "The Bible tells us, how good and pleasant it is when God's people live together in unity."
      let sTwo = "We must speak our minds openly, debate our disagreements, but always pursue solidarity." 
      let sThree = "When America is united, America is totally unstoppable.";
      let res = getSentences(`${sOne} ${sTwo} ${sThree}`);
      expect(res.length).toBe(3)
      expect(res[1].text).toBe(sTwo);
      expect(res[0].text).toBe(sOne);
      expect(res[2].text).toBe(sThree);
    })
  })

  describe('getLongestThirty', () => {
    it('gets longest words', () => {
      let sOne = "The Bible tells us, how good and pleasant it is when God's people live together in unity."
      let sTwo = "We must speak our minds openly, debate our disagreements, but always pursue solidarity." 
      let sThree = "When America is united, America is totally unstoppable.";
      let expectedRes = ["disagreements", "unstoppable", "solidarity", "pleasant", "together", "america", "totally", "people", "openly", "debate", "always", "pursue", "united", "bible", "tells", "god's", "unity", "speak", "minds", "good", "when", "live", "must", "the", "how", "and", "our", "but", "us", "it"]
      let res = getLongestThirty(`${sOne} ${sTwo} ${sThree}`);
      expect(res.toString()).toBe(expectedRes.toString())
    })
  })
})