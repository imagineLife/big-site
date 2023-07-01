---
title: Pass Errors Up The CallStack
slug: node/errors/propagating-beyond
author: Jake Laursen
excerpt: Errors get natively "bubbled up", which can be useful
tags: ["node", "errors"]
parentDir: node
order: 4
---


# Errors Get Propagated
Understand [js errors](/node/errors).  
Understand how [errors can be caught](/node/errors/catching).  
Understand how [promises that throw errors can be interacted with](/node/errors/handling-rejection).  

- [Errors Get Propagated](#errors-get-propagated)
  - [Propagation](#propagation)
    - [Breaking Down The Error Propagation Example](#breaking-down-the-error-propagation-example)


## Propagation
Errors can get "bubbled up". Here's an example, with a "walkthrough" below:
```js
const PRIMARY_COLORS = ['red', 'yellow', 'blue'];
const NOT_MIXABLE_ERR = 'ERR_MUST_BE_MIXBLE';
const NOT_PRIMARY_ERR = 'ERR_MUST_BE_PRIMARY';
const mixedColors = {
  red: {
    blue: 'purple',
    yellow: 'orange',
  },
  blue: {
    red: 'purple',
    yellow: 'green',
  },
  yellow: {
    blue: 'green',
    red: 'orange',
  },
};

class PrimaryError extends Error {
  constructor (colorParam = '') {
    super(colorParam + ' must be a primary color')
  }
  get name () { return 'PrimaryError' }
  get code () { return NOT_PRIMARY_ERR; }
}

class CannotMixError extends Error {
  constructor(a,b,reason) {
    super(`cannot mix ${a} and ${b}: ${reason}`);
  }
  get name() {
    return 'CannotMixError';
  }
  get code() {
    return NOT_MIXABLE_ERR;
  }
}

function isValidPrimary(color) {
  if (!PRIMARY_COLORS.includes(color)) {
    throw new PrimaryError(color)
  }
  return true
}

function mixPrimaries(a, b) {
  try {
    isValidPrimary(a);
    isValidPrimary(b);
    return mixedColors[a][b];
  } catch (error) { 
    throw new CannotMixError(a,b, error.message)
  }
}

function runIt(){
  const mixedRes = mixPrimaries('red', 'pink')
  console.log(`mixedResult : ${mixedRes}`)
  
}

runIt()
```

### Breaking Down The Error Propagation Example
One way of looking at the order of operations above:
- `runIt` gets called
  - `runIt` runs `mixPrimaries` && passes 2 args
  - `mixPrimaries` 
    - calls `isValidPrimary` up to 2x, 1x per arg
    - returns the result of a nested object, essentially "mixing" the two primary colors

Considering the errors:
- `runIt` is a function that gets called/ran at the bottom of the code
- `runIt` calls `mixPrimaries`, which is a function declared earlier in the file
  - the two args passed above to the fn are `red` and `pink`
  - `pink` is not a primary color, and the code should (does) not allowed this
- `mixPrimaries`...
  - checks each parameter for validity with `isValidPrimary`
  - `isValidPrimary` 
    - either returns true or 
    - throws an instance of a custom-made `PrimaryError`
    - **an error gets thrown here**

A ply-by-play of the error & how it relates:
- the first parameter of the `mixPrimaries` fn, `red`, is a valid primary
- the second, `pink`, is not
- this causes an error to get thrown in `isValidPrimary`
- this error string reads `pink must be a primary color` as described by the custom error `PrimaryError`
- the error gets "caught" inside the `catch` block of `mixPrimaries`
- `mixPrimaries` takes the error and "uses" the `error.message` by passing the error.message, along with the 2 params passed to itself, to another custom error called `CannotMixError`
- the `CannotMixError` is not "caught" by any `catch` block, so the node process receives the error and throws to stdout:
```bash
throw new CannotMixError(a,b, error.message)
    ^

CannotMixError: cannot mix red and pink: pink must be a primary color
    at mixPrimaries (<path-to-file>/index.js:line:character)
    at runIt (<path-to-file>/index.js:line:character)
    at Object.<anonymous> (<path-to-file>/index.js:444:1)
    at Module._compile (node:internal/modules/cjs/loader:1254:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47
```
