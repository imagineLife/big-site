---
title: "Callbacks: The O.G Async JS Code Syntax"
parentDir: js/control-flow
slug: js/control-flow/callbacks
author: Jake Laursen
excerpt: Callbacks 
tags: ["js","control flow", "callbacks", "async"]
order: 2
---

# Promises
[callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) is a term that represents a function in a particular use.  
Callbacks are functions that get "passed" to _another function_.  
The function that "gets" the callback passed will "call" the "callback" function after doing something in the function.  
```js
function addTwo(a,b){ return a + b }
function squared(a){ return Math.pow(a,2) }

function addWithCallback(a,b,callback){
  const added = addTwo(a,b);
  return callback(added)
};

console.log(addWithCallback(3,2,squared));
// will show "25" in the console
```

- [Promises](#promises)
  - [A Function Gets A Function As A Parameter](#a-function-gets-a-function-as-a-parameter)
  - [A Function is Called Anonymously](#a-function-is-called-anonymously)
  - [Callbacks May Not Run In The Order They Are Written](#callbacks-may-not-run-in-the-order-they-are-written)
  - [Callback Hell And Serial Execution](#callback-hell-and-serial-execution)
  - [Callbacks And Recursion And Global State](#callbacks-and-recursion-and-global-state)
  - [Promises As A Callback Alternative](#promises-as-a-callback-alternative)


## A Function Gets A Function As A Parameter
Above, the `addWithCallback` function is a function.  
This function has 3 parameters: `a`,`b`, and...you guessed it... `callback`.  
The `addWithCallback` doesn't "know" what the `callback` does. The `addWithCallback` "calls" the `callback` function and passes the result of the `addTwo` function.  

## A Function is Called Anonymously
And May Be A Bit Confusing To Read.  

The `callback` argument in the `addWithCallback` argument list is a reference to the `squared` function.  
```js
function addTwo(a,b){ return a + b }
function squared(a){ return Math.pow(a,2) }

function addWithCallback(a,b,callback){

  // to see the name of the callback function
  console.log('callback function name:', callback.name)
  // THIS will print "callback function name: squared"

  const added = addTwo(a,b);
  return callback(added)
};

console.log(addWithCallback(3,2,squared));
// will show "25" in the console
```
This is a critical detail for understanding callbacks. Callbacks are understood to be functions, but are usually written as something like `callback` or `cb`. _The function that is called via the `callback()` or `cb()` call is not explicitly called by name within the function that receives the callback._  

## Callbacks May Not Run In The Order They Are Written
Here, assume 3 files in a dir exist on the filesystem, alongside this `fs-callbacks.js` file. (_this can be done with something like copy+paste and a lorem-impsum generator_)
```js
// fs-callbacks.js

const { readFile } = require('fs');
const FILES_DIR = './files'
const SM_FILE_PATH = `${FILES_DIR}/sm.txt`
const MD_FILE_PATH = `${FILES_DIR}/md.txt`
const LG_FILE_PATH = `${FILES_DIR}/lg.txt`
const printFileContents = (err, contents) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(contents.toString());
};
readFile(LG_FILE_PATH, printFileContents);
readFile(MD_FILE_PATH, printFileContents);
readFile(SM_FILE_PATH, printFileContents);
```

With the `lg` file containing the most content, the `md` file containing less, and the `sm` containing even less, you will probably find that the order of the cli output is not the same order of the code written. In the code written, the order of readFile is `lg`,`md`,`sm`. The order that the cli will show the contents will likely be `sm`, `md`, then `lg`.  

An abundance of the nodejs apis expect a callback function to "handle" the results of the operation. Above is just one of the node apis, [fs.readFile](https://nodejs.org/api/fs.html#fsreadfilepath-options-callback), which uses callbacks.  

## Callback Hell And Serial Execution
One way to _force_ the above code, and any other callback-oriented code, is to use nested callbacks (_or "callback hell"_).  
This example changes the execution order of the above example. The major similarity between the above example and this example is that a node process leverages the `fs` module to read 3 files of different sizes. The major difference between the two is that the following example "nests" the reading of the 2nd and 3rd file, _forcing_ the read order of the code.  
```js
// fs-callbacks.js

const { readFile } = require('fs');
const FILES_DIR = './files'
const SM_FILE_PATH = `${FILES_DIR}/sm.txt`
const MD_FILE_PATH = `${FILES_DIR}/md.txt`
const LG_FILE_PATH = `${FILES_DIR}/lg.txt`
const printFileContents = (err, contentsOne) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("LARGE file done reading")
  console.log(contentsOne.toString());



  // nested callback level 1
  readFile(MD_FILE_PATH, function readMediumCallback(err, contentsTwo){
    if (err) {
      console.error(err);
      return;
    }
    console.log("MEDIUM file done reading")
    console.log(contentsTwo.toString())



    // nested callback level 2
    readFile(SM_FILE_PATH, function readMediumCallback(err, contentsThree){
      if (err) {
        console.error(err);
        return;
      }
      console.log("SMALL file done reading")
      console.log(contentsThree.toString())
    });
  });

};
```
This file will read the files in the order written: large, then medium, then small. The reason for this is that the 2nd + 3rd `readFile` commands do not run until the previous `readFile` in the callback "chain" are completed. The callback of the first `readFile` includes the logic to start the "nested" callbacks.  

With more and more callbacks, it is clear how this nesting of callbacks can begin to look confusing and become difficult to "reason about". It may be common to look at a file like the above and begin to wonder "which callback am I in?"  

The naming of variables also becomes critical - `contents` in the first example now become 3 different variables (`contentsOne`, `contentsTwo`,`contentsThree`).  

## Callbacks And Recursion And Global State
One approach to avoid "callback hell" is to leverage some sort of "state" which tracks the logic flow of a process. This can introduce some iteration in-exchange-for the nesting of callbacks.  
Here's a brief example.  

Some global state to get started:
```js
const STATE = {
  fileIteration: 0,
  filesData: [],
  filesToRead: []
}
```
Here:
- **fileIteration**: store the file number (indexed starting at 0) that is "currently" being parsed - starting at 0 as the first file
- **filesData**: a list that will store the data of the files that get read from the `readFile` function
- **filesToRead**: a list that will store the names or file-paths to read - here, we'll use node to "figure out" which files to read instead of the above hard-coded filenames (sm,md,lg)

Here's a working js file that uses callbacks and a "global" state to iterate through files concurrently:
```js
const { readFile, readdir } = require('fs');
const STATE = {
  fileIteration: 0,
  filesData: [],
  filesToRead: []
}
const FILES_DIR = './files';

const printFileContents = (err, contents) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(contents.toString());
};

function readAndUpdateState() {
  const FILE_TO_READ = `${FILES_DIR}/${STATE.filesToRead[STATE.fileIteration]}`
  console.log(`READING ${FILE_TO_READ}`)
  
  readFile(FILE_TO_READ, (e, fileContent) => {
    // increment state count
    STATE.fileIteration = STATE.fileIteration + 1;
    if (e) {
      console.error(e);
    } else {
      STATE.filesData.push(fileContent);

      // conditional continue
      if (STATE.fileIteration < STATE.filesToRead.length) {
        readAndUpdateState()
      } else {
        console.log('DONE!')
        console.log(STATE.filesData.length)
      }
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

## Promises As A Callback Alternative
[promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Can be an alternative syntax to use instead of callbacks.  
Check out [another post here](/js/control-flow/promises) for a summary on promises!  
