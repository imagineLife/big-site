---
title: Multiple Async Operations Are No Problem For JS
parentDir: js/control-flow
slug: js/control-flow/many-promises
author: Jake Laursen
excerpt: Promises Are A Native Object That Comes With Helpful Methods
tags: ["js","control flow", "promises", "async"]
order: 4
---

# Promises Have Methods
Promises come with a few interesting methods that can allow for engineers to manage multiple async operations: [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) and [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) will be covered here.  

## Promise.all For Getting 1 Promise For All Promises
Compared to the [previous examples](/js/control-flow/promises) where promises are written and ran one-at-a-time, here is a _much simpler to write_ syntax that, more or less, does the same thing...
```js
const { readFile, readdir } = require('fs').promises;

const FILES_DIR = './../files';

const print = (data) => {
  console.log(Buffer.concat(data).toString());
};

function readFilesAndStart(files) { 
  const readFilePromises = files.map((fileName) => readFile(`${FILES_DIR}/${fileName}`));
  return Promise.all(readFilePromises).then(print).catch(console.error);
}
readdir(FILES_DIR).then(readFilesAndStart).catch(console.error);
```
