---
title: Multiple Async Operations Are No Problem For JS
parentDir: js/control-flow
slug: js/control-flow/many-promises
author: Jake Laursen
excerpt: Promises Are A Native Object That Comes With Helpful Methods
tags: ["js","control flow", "promises", "async"]
order: 4
---

# Promises Have Methods To Help With Concurrency
Promises come with a few interesting methods that can allow for engineers to manage multiple async operations: [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) and [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) will be covered here.  

## A Bit About Concurrent, Parallel, and Synchronous
These 3 words can be a bit convoluted: [concurrent](https://en.wikipedia.org/wiki/Concurrent_computing), [parallel](https://en.wikipedia.org/wiki/Parallel_computing), and 

## Promise.all For Getting 1 Promise For All Promises
Compared to the [previous examples](/js/control-flow/promises) where promises are written and ran one-at-a-time, here is a _much simpler to write_ syntax that, more or less, does the same thing...
```js
const { readFile, readdir } = require('fs').promises;

const FILES_DIR = './../files';

const print = (data) => {
  console.log(Buffer.concat(data).toString());
};

function readFilesAndStart(files) { 
  const readFilePromises = files.map((f) => readFile(`${FILES_DIR}/${f}`));
  return Promise.all(readFilePromises).then(print).catch(console.error);
}
readdir(FILES_DIR).then(readFilesAndStart).catch(console.error);
```

Promise.all...
- **takes a list** (_array_) of promises. Here, that list of promises comes from the `files.map((f) => readFile('${FILES_DIR}/${f}'))` function which returns a list of promises
- resolves, "completes", when all of the promises in the array are done