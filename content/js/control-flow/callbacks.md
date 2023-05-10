---
title: "Callbacks: The O.G Async JS Code Syntax"
parentDir: js/control-flow
slug: js/control-flow/callbacks
author: Jake Laursen
excerpt: Callbacks 
tags: ["js","control flow", "callbacks"]
order: 2
---

# Callbacks
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

## Callbacks May Not Run In Order
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