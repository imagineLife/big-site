---
title: Handle Promise Rejections
slug: node/errors/handling-rejection
author: Jake Laursen
excerpt: Handle Promise Rejections
tags: ["node", "errors"]
parentDir: node/errors
order: 3
---


# Handling Promise Rejections
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