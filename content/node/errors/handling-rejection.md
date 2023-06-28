---
title: Handle Promise Rejections
slug: node/errors/handling-rejection
author: Jake Laursen
excerpt: Handle Promise Rejections
tags: ["node", "errors"]
parentDir: node
order: 3
---


# Handling Promise Rejections

- [Handling Promise Rejections](#handling-promise-rejections)
  - [A Promise](#a-promise)
  - [A Promise With Rejection](#a-promise-with-rejection)
  - [Handling Promise Rejection With Code](#handling-promise-rejection-with-code)
    - [Use The Catch Chained Promise Method](#use-the-catch-chained-promise-method)
    - [Wrap the Calling Of The Promise in a Try/Catch Block](#wrap-the-calling-of-the-promise-in-a-trycatch-block)
  - [Error Properties Are Available](#error-properties-are-available)


## A Promise
A brief example of a Javascript promises in action:
```js
const HOW_LONG_TO_MOCK = 500
const thisPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, HOW_LONG_TO_MOCK);
});

// USING the promise with the "then" syntax
thisPromise().then(console.log)
// Success!

async function runIt(){
  const promiseResult = await thisPromise()
  console.log(promiseResult)
  // Success!
}

runIt()
```
This will log "Success!".  

## A Promise With Rejection
Here is a promise that rejects. the function `thisPromise` returns a promise.  
the `runIt()` function is `async`, and `await`s the completion of the `thisPromise` function

```js
const HOW_LONG_TO_MOCK = 500;
function thisPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('My Own Failure Message');
    }, HOW_LONG_TO_MOCK);
  })
};

// USING the promise with the "then" syntax
thisPromise().then(console.log);
// Success!

async function runIt() {
  const promiseResult = await thisPromise();
  console.log('promiseResult')
  console.log(promiseResult)
  
}

runIt()
```
Running this will return some interesting details in a node terminal session:
```bash
node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "My Own Failure Message".] {
  code: 'ERR_UNHANDLED_REJECTION'
}

Node.js v18.14.2
```
Node has made their error messages more helful in the recent months/years! Notice that the error includes `This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().`.  
## Handling Promise Rejection With Code
### Use The Catch Chained Promise Method
```js
const HOW_LONG_TO_MOCK = 500;
function thisPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new TypeError('My Own Failure Message'));
      return;
    }, HOW_LONG_TO_MOCK);
  })
};

thisPromise().then(console.log).catch(e => {
  console.log('e?.message')
  console.log(e?.message)
  console.log('do things based on the failure of the promise')
})
```

### Wrap the Calling Of The Promise in a Try/Catch Block
```js
const HOW_LONG_TO_MOCK = 500;
function thisPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new TypeError('My Own Failure Message'));
      return;
    }, HOW_LONG_TO_MOCK);
  })
};

async function runIt() { 
  try {
    const promiseResult = await thisPromise()
    console.log('promiseResult')
    console.log(promiseResult)
    
  } catch (error) {
    console.log('error?.message');
    console.log(error?.message);
    console.log('do things based on the failure of the promise');
  }
}
runIt()
```
Running the bove will "hit" the catch block, log the error message, and log the next string.  
The above will _not_ log the promiseResult.

## Error Properties Are Available
Building an error object that [takes advantage of error properties](/node/errors/catching) like the error code can be helpful when catching an error thrown by a promise.  