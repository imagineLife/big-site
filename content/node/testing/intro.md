---
title: Learn About Unit Testing In Node
slug: node/testing
author: Jake Laursen
excerpt: An Introduction To Testing Using Core Node Functionality
tags: ["node", "testing", "core"]
parentDir: node
order: 1
---

# An Introduction To Testing With Node
Testing with node can be done using the [assert module](https://nodejs.org/dist/latest-v18.x/docs/api/assert.html).   
```js
// returns nothing!
// assert(true)

// throws an error
// assert(false)
```

- [An Introduction To Testing With Node](#an-introduction-to-testing-with-node)
  - [Testing By Category](#testing-by-category)
  - [Assert Loosely And Strictly](#assert-loosely-and-strictly)
    - [Primitive Values](#primitive-values)
    - [Objects](#objects)
  - [Errors Are Thrown As Expected](#errors-are-thrown-as-expected)
    - [An Interesting Error Assertion with ifError](#an-interesting-error-assertion-with-iferror)

## Testing By Category
Testing could be grouped into categories:
- Truthyness
  - is something true
- equality
  - do 2 things equal as expected
  - this could include "deep" equality
    - like equality, including more "strict" assertions (more to come)
- error validation
  - things erro and/or throw and/or reject as expected
- failability


## Assert Loosely And Strictly

### Primitive Values
```js
function addTwo(a, b) {
  return a + b;
}

const ADDED = addTwo(2, 3);

// these will both pass!
assert.equal(ADDED, 5);
assert.equal(ADDED, '5');

// these FAIL
assert.strict.equal(ADDED, '5')
assert.strictEqual(ADDED, '5')
```


### Objects
```js
const obj = {
  id: 1,
  type: 'person',
  name: { first: 'Joe', last: 'Schmoe' },
};
// this assert will fail because they are different objects:
assert.equal(obj, {
  id: 1,
  type: 'person',
  name: { first: 'Joe', last: 'Schmoe' },
});

// This one also fails because the type of the primitive '1' does not match the original type
assert.deepStrictEqual(obj, {
  id: `1`,
  name: { first: 'David', second: 'Clements' },
})

// same as this
assert.strict.deepEqual(obj, {
  id: `1`,
  name: { first: 'David', second: 'Clements' },
});


// This one PASSES!
assert.deepEqual(obj, {
  id: 1,
  type: 'person',
  name: { first: 'Joe', last: 'Schmoe' },
});

// This one ALSO PASSES!
assert.deepStrictEqual(obj, {
  id: 1,
  type: 'person',
  name: { first: 'Joe', last: 'Schmoe' },
});
```


## Errors Are Thrown As Expected
```js
const assert = require('assert');

const TEST_ERR = new Error('Test String');

function addTwoNumbers(a, b) {
  assert.deepEqual(typeof a, 'number', TEST_ERR);
  assert.deepEqual(typeof b, 'number', TEST_ERR);
  return a + b;
}

// WONT WORK because bad error matching
// assert.throws(() => {
//   addTwoNumbers('1', 2);
// }, new Error('not gonna work'));

assert.throws(() => { 
  addTwoNumbers('1', 2);
}, TEST_ERR)

assert.throws(() => {
  addTwoNumbers(1, `2`);
}, TEST_ERR);

assert.doesNotThrow(() => {
  addTwoNumbers(1, 2);
}, TEST_ERR);
```
- `deepEqual` above is used to validate that arguments are, indeed, numbers
- `throws` is used to assert that a function will throw an Error given "bad" inputs
  - the first arg to `throws` here is a function, NOT the function that is tested
  - the tested function goes _inside_ the function passed to `throws`
  - the second arg to `throws` is an error (_or a string, but it is [suggested not to do that](https://nodejs.org/dist/latest-v18.x/docs/api/assert.html#assertthrowsfn-error-message)_). This error is compared against the error thrown from the tested function for equality. This is a nice tidbit, that a function will not only throw but will throw a _specific expected error_!


### An Interesting Error Assertion with ifError
Here, the `ifError` gets used (_`ifError(errValue)`_).  
This passes when the `errValue` passed to it is NOT an error, basically (_when it is undefined or null_). When the value passed to ifErr is, indeed, an error, the assertion fails.  
Here, a mock api _that includes a callback_ is tested. This uses the error-first paradigm of classic node apis.  

```js
// 
// variables
// 
const URLS = {
  GOOD: 'http://laursen.tech',
  BAD: 'http://unwanted.url'
}
const MY_ERR = new Error('dont use this email');
const MOCK_RETURN_STRING = 'sounds good';

// 
// the mock request fn
// 
const mockReq = (url, cb) => {
  setTimeout(() => {
    if (url === URLS.BAD) cb(MY_ERR);
    else cb(null, Buffer.from(MOCK_RETURN_STRING));
  }, 300);
};

// 
// the tests!
// 
mockReq(URLS.GOOD, (err, data) => {
  assert.ifError(err);
});

mockReq(URLS.BAD, (err, data) => {
  assert.deepStrictEqual(err, MY_ERR);
});
```