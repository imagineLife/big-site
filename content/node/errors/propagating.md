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
      - [Thinking Through The Propagation](#thinking-through-the-propagation)
    - [Making use of the error output](#making-use-of-the-error-output)
    - [Move The Error "Up"](#move-the-error-up)
  - [Make Meaningful Impact on the code](#make-meaningful-impact-on-the-code)


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
#### Thinking Through The Propagation
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
    at mixPrimaries (<path-to-file>/index.js:434:11)
    at runIt (<path-to-file>/index.js:439:20)
    at Object.<anonymous> (<path-to-file>/index.js:444:1)
    at Module._compile (node:internal/modules/cjs/loader:1254:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47
```

### Making use of the error output
The error output is helpful for several reasons:
- **the name** of the error is written frist, the `CannotMixError`
- **The "reason"** of the error is second: `cannot mix red and pink: pink must be a primary color`
- **the code liness** that interact with the error:
  - `at mixPrimaries (...434:11)` shows that the `mixPrimaries` fn, at line `434` character `11` is a code "touchpoint" of the error
  - `at runIt (...434:11)` shows that the `runIt` fn, at line `439` character `20` is a code "touchpoint" of the error
  - `at Object.<anonymous> (...434:11)` shows that the `Object.<anonymous>` fn, which in our case is the `runIt()` being called, at line `444` character `1` is a code "touchpoint" of the error
  - the notes beyond that reveals some node "inner workings" that interact with the error, which is beyond the scope of this post!


### Move The Error "Up"
In the above example, the error gets thrown at `mixPrimaries` and node throws the error.  
The error can be moved "up", propagated, to the parent `runIt` funcitonality.  
Only a few things can change to "handle" the error so that an error is logged and not thrown:  
- A value will be returned from `mixPrimaries`, "passed along" to the `runIt` function
- `runIt` will get updated
  - it will become an `async` function, to introduce the ability to catch an error
  - it will use the `().then().catch()` syntax to catch the error thrown in `mixPrimaries`

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
    if (a === b) throw new Error('must be different colors');
    return mixedColors[a][b]
  } catch (error) { 
    throw new CannotMixError(a,b, error.message)
  }
}

async function runIt(){
  try {
    return mixPrimaries('red', 'red')
  } catch (error) {
    throw new Error(error)
  }
}

runIt().then(d => console.log('runIt done: ',d)).catch(e => {
  console.log('runIt error: ',e.message)
})
```

## Make Meaningful Impact on the code
When code expects things and those things aren't met, developer-friendly code can be built-in to errors.  
This will make exterminating bugs easier:
- **understandable error messages** give developers clear points to investigate
- **line numbers** point and filenames _point exactly to where the error is written_
- **embracing the tradeoff** of time-to-make error code vs. time-to-deliver usable code will pay for itself "down the road" by reducing the time it takes for a dev to find something that isn't working as expected. The time it takes to both creat error code and deliver meaningful functionality will both decrease over time.