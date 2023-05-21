---
title: Ordering For Serial Execution
parentDir: js/control-flow
slug: js/control-flow/ordering-serial
author: Jake Laursen
excerpt: Running Async Code In Serial
tags: ["js","control flow", "async", "callbacks", "promises"]
order: 6
---

# Ordering Async Code For Serial Execution
- [Ordering Async Code For Serial Execution](#ordering-async-code-for-serial-execution)
  - [Some Async Functions To Run In "Serial"](#some-async-functions-to-run-in-serial)
  - [Leveraging Promise Chaining](#leveraging-promise-chaining)
  - [Leveraging Async and Await Syntax](#leveraging-async-and-await-syntax)

This can be a comparison to a [previous post](/js/control-flow/ordering-parallel) where the same 3 functions [below](#some-async-functions-to-run-in-serial) are ran in "parallel".  
## Some Async Functions To Run In "Serial"
Here's an example of some async code.  
3 different functions, that take 3 different sets of time to complete.  

```js

// this is for later!
const { promisify } = require('util');

const LONG_TIME = 500;
const MID_TIME = 250;
const SHORT_TIME = 125;

function longestFn(cb){
  setTimeout(() => {
    cb(null, `Longest wait done`)
  }, LONG_TIME)
}

function midFn(cb){
  setTimeout(() => {
    cb(null, `mid wait done`)
  }, MID_TIME)
}

function shortestFn(cb){
  setTimeout(() => {
    cb(null, `shortest wait done`)
  }, SHORT_TIME)
}

function printResOrErr(err, s){
  if (err) {
    console.error(err);
  } else { 
    console.log(s);
  }
}
```

## Leveraging Promise Chaining
```js
// convert the callback-oriented functions into promise-based syntax
const pOne = promisify(longestFn)
const pTwo = promisify(midFn);
const pThree = promisify(shortestFn);


// vOne: 
// callback hell!

pOne().then((res) => {
  printResOrErr(res)
  pTwo().then(resTwo => { 
    printResOrErr(resTwo);
    pThree().then(resThree => {
      printResOrErr(resThree);
    })
  })
})
```
Above is the often dreaded "callback hell", where callbacks are nested on nested on nested.  
If you can imagine, in large more complex applicaitons where code lives in different files and parameters are getting passed around, this can get very confusing to read and manage as an engineer.  


## Leveraging Async and Await Syntax
```js
// convert the callback-oriented functions into promise-based syntax
const pOne = promisify(longestFn)
const pTwo = promisify(midFn);
const pThree = promisify(shortestFn);

async function doItAll() { 
  const res = await pOne();
  printResOrErr(res);
  const resTwo = await pTwo();
  printResOrErr(resTwo);
  const resThree = await pThree();
  printResOrErr(resThree);
} 
doItAll()
```
Above is the exact same logic written with the `async/await` syntax.  
One benefit of this syntax is significantly less nesting in exchange for the `async` parent function and the `await` keyword.  