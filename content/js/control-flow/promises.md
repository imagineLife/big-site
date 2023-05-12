---
title: "Promises: An Async JS Code Syntax"
parentDir: js/control-flow
slug: js/control-flow/promises
author: Jake Laursen
excerpt: Promises
tags: ["js","control flow", "promises", "async"]
order: 3
---

# Promises
[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are a syntax that represents async functionalities.  
Below are some notes and 4 code examples of different async syntaxes for reading files.  
As the code examples "evolve" from callbacks to chained promises to leveraging core node promise apis, the code length shrinks a little - which is a nice side-effect!  

- [Promises](#promises)
  - [Promises Include Then, Catch, and Finally](#promises-include-then-catch-and-finally)
  - [Promises Can Wrap Async Callback Syntax Logic](#promises-can-wrap-async-callback-syntax-logic)
  - [Promises Can Use the "async/await" syntax for control-flow adjustments](#promises-can-use-the-asyncawait-syntax-for-control-flow-adjustments)
  - [Node offers the promisify module](#node-offers-the-promisify-module)
  - [Node offers a Promise Version of the fs module](#node-offers-a-promise-version-of-the-fs-module)


## Promises Include Then, Catch, and Finally
Perhaps some of the most important syntactical details to know while using promises:
- the promise is a function, something like `fetch()`
- the promise can be followed up with a `.then()` chained method
  - this can be used to "handle" the result of the first function of the promise
- the promise can be followed up with a `.catch()` chained method
  - this can be used to "catch" errors
- the last promise can be followed up with a `.finally()` chained method
  - this can be used to do something after the promise has finished regardless of the promises success or error

This doc will give a brief overview of how to _use_ promises as well as some APIs that promises include in JS.

- [Promises](#promises)
  - [Promises Include Then, Catch, and Finally](#promises-include-then-catch-and-finally)
  - [Promises Can Wrap Async Callback Syntax Logic](#promises-can-wrap-async-callback-syntax-logic)
  - [Promises Can Use the "async/await" syntax for control-flow adjustments](#promises-can-use-the-asyncawait-syntax-for-control-flow-adjustments)
  - [Node offers the promisify module](#node-offers-the-promisify-module)
  - [Node offers a Promise Version of the fs module](#node-offers-a-promise-version-of-the-fs-module)



## Promises Can Wrap Async Callback Syntax Logic
Here will be an adjusted syntax of a [previous exercise](/js/control-flow/callbacks). That link will describe the directory structure assumptions in-order for this to work as expected.  
Here, a the `fs.readFile` callback-syntax function gets "wrapped" in a promise and the `async/await` syntax gets introduced.  

The code control-flow of the file looks something like...
  - get files in the `files` dir (_to read the contents of_)
  - update some state with that info
  - run an async `readAndUpdateState` function
    - which `awaits` the running of `myFSPromise`
      - `myFSPromise` is the function that "wraps" a callback-oriented piece of code in a promise
    - if there are more files to read, re-run `readAndUpdateState`
    - else, log `DONE`

```js
const { readFile, readdir } = require('fs');

const STATE = {
  fileIteration: 0,
  filesData: [],
  filesToRead: []
}
const FILES_DIR = './files';

function myFSPromise(fileToRead) { 
  return new Promise((resolve) => {
    readFile(fileToRead, (e, fileContent) => {
      
      // increment state count
      STATE.fileIteration = STATE.fileIteration + 1;
      if (e) {
        console.error(e);
      } else {
        console.log(`DONE reading ${fileToRead}`)
        
        STATE.filesData.push(fileContent);

        // conditional continue
        const MORE_FILES_TO_READ = Boolean(STATE.fileIteration < STATE.filesToRead.length);
        resolve(MORE_FILES_TO_READ)
      }
    });
  })
}

async function readAndUpdateState() {
  const FILE_TO_READ = `${FILES_DIR}/${STATE.filesToRead[STATE.fileIteration]}`
  console.log(`READING ${FILE_TO_READ} with readAndUpdateState`)
  myFSPromise(FILE_TO_READ).then(res => {
    console.log('promise then result: ',res)
    
    if (res === true) readAndUpdateState();
    else { 
      console.log('DONE!');
      console.log(STATE.filesData.length);
    }
  });
}

function readFilesAndStart(err, files) { 
  if (err) {
    console.error(err);
    return;
  }
  STATE.filesToRead = files;
  readAndUpdateState()
}
readdir(FILES_DIR, readFilesAndStart)
```

## Promises Can Use the "async/await" syntax for control-flow adjustments

```js
const { readFile, readdir } = require('fs');

const STATE = {
  fileIteration: 0,
  filesData: [],
  filesToRead: []
}
const FILES_DIR = './files';

function myFSPromise(fileToRead) { 
  return new Promise((res, rej) => {
    readFile(fileToRead, (e, fileContent) => {
      
      // increment state count
      STATE.fileIteration = STATE.fileIteration + 1;
      if (e) {
        console.error(e);
      } else {
        console.log(`DONE reading ${fileToRead}`)
        
        STATE.filesData.push(fileContent);

        // conditional continue
        if (STATE.fileIteration < STATE.filesToRead.length) {
          readAndUpdateState();
        } else {
          console.log('DONE!');
          console.log(STATE.filesData.length);
        }
      }
    });
  })
}

async function readAndUpdateState() {
  const FILE_TO_READ = `${FILES_DIR}/${STATE.filesToRead[STATE.fileIteration]}`
  console.log(`READING ${FILE_TO_READ} with readAndUpdateState`)
  await myFSPromise(FILE_TO_READ);
}

function readFilesAndStart(err, files) { 
  if (err) {
    console.error(err);
    return;
  }
  STATE.filesToRead = files;
  readAndUpdateState()
}
readdir(FILES_DIR, readFilesAndStart)
```

## Node offers the promisify module
Node (_not available in browsers_) includes a [promisify utility](https://nodejs.org/dist/latest-v18.x/docs/api/util.html#utilpromisifyoriginal) which can be used to wrap functions that use callbacks into a promise syntax.  

```js
const { readFile, readdir } = require('fs');
const { promisify } = require('util')

const STATE = {
  fileIteration: 0,
  filesData: [],
  filesToRead: []
}
const FILES_DIR = './files';

const fsPromise = promisify(readFile);

async function readAndUpdateState() {
  const FILE_TO_READ = `${FILES_DIR}/${STATE.filesToRead[STATE.fileIteration]}`
  console.log(`READING ${FILE_TO_READ} with readAndUpdateState`)
  fsPromise(FILE_TO_READ).then(res => {
    // increment state count
    STATE.fileIteration = STATE.fileIteration + 1;
    console.log(`DONE reading ${FILE_TO_READ}`);

    STATE.filesData.push(res);

    // conditional continue
    const MORE_FILES_TO_READ = Boolean(STATE.fileIteration < STATE.filesToRead.length);
    if (MORE_FILES_TO_READ) return readAndUpdateState();
    else {
      console.log('DONE!');
      console.log(STATE.filesData.length);
      return;
    }
  }).catch(e => {
    throw new Error(e?.message)
  })
}

function readFilesAndStart(err, files) { 
  if (err) {
    console.error(err);
    return;
  }
  STATE.filesToRead = files;
  readAndUpdateState()
}
readdir(FILES_DIR, readFilesAndStart)
```

## Node offers a Promise Version of the fs module
```js
const { readFile, readdir } = require('fs').promises;

const STATE = {
  fileIteration: 0,
  filesData: [],
  filesToRead: []
}
const FILES_DIR = './files';

async function readAndUpdateState() {
  const FILE_TO_READ = `${FILES_DIR}/${STATE.filesToRead[STATE.fileIteration]}`
  console.log(`READING ${FILE_TO_READ} with readAndUpdateState`)
  readFile(FILE_TO_READ)
    .then((res) => {
      // increment state count
      STATE.fileIteration = STATE.fileIteration + 1;
      console.log(`DONE reading ${FILE_TO_READ}`);

      STATE.filesData.push(res);

      // conditional continue
      const MORE_FILES_TO_READ = Boolean(STATE.fileIteration < STATE.filesToRead.length);
      if (MORE_FILES_TO_READ) return readAndUpdateState();
      else {
        console.log('DONE!');
        console.log(STATE.filesData.length);
        return;
      }
    })
    .catch((e) => {
      throw new Error(e?.message);
    });
}

function readFilesAndStart( files) { 
  STATE.filesToRead = files;
  readAndUpdateState()
}
readdir(FILES_DIR).then(readFilesAndStart).catch(console.log);
```