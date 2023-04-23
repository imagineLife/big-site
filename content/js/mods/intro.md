---
title: A Bit About Modules
parentDir: js/
slug: js/deps
author: Jake Laursen
excerpt: An overview of modules
tags: ["js","modules","intro"]
order: 1
---

# Modules
[Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).  
Modules are js code in a file as a stand-alone unit of code - the file can be responsible for performing some fiunctionality.  
Modules are all about making these bits of code exportable and importable.  

There are a few different syntaxes between browsers and node: [commonJS](https://nodejs.org/api/modules.html), [ECMAScript](https://nodejs.org/api/esm.html), and node has [node:modules syntax](https://nodejs.org/api/module.html).  

## Load A Module with the require keyword
node_modules can be loaded into a file using the [require keyword](https://nodejs.org/api/modules.html#requireid).  
As an example, take a basic [express api](https://expressjs.com/en/starter/hello-world.html):  
```js
const express = require('express')
const expressObj = express()
const port = process.env.PORT || 3000

expressObj.get('/', helloWorldFunction)
expressObj.listen(port, listenFollowup)


/*
  functions
*/
function helloWorldFunction(req, res){
  return res.send('Hello World!')
}
function listenFollowup(){
  console.log(`Example expressObj listening on port ${port}`)
}
```
The first line uses the `require` keyword to import the "express" node module. The required module result is stored in the variable named `express`.  

## Create A Module That can be Imported
Create the module, here in `add.js`
```js
// add.js
function addTwo(a,b){ return a + b}
module.exports = { addTwo }
```
In node, there is a [module object](https://nodejs.org/docs/latest-v18.x/api/modules.html#the-module-object) that has a handful of methods and values attached to it. Here, the `exports` gets assigned an object `{addTwo}` (the shorthand key/value assignment), which is the `addTwo` function created immediately prior. This assignment is what allows the `addTwo` function to be exported from the file.  

Use the module, here in `index.js`:  
```js
const myModule = require('./addTwo');
console.log(myModule.addTwo(3,8))
```

A few things are happening here:
- creates a variable called `myModule`. This is an interesting implementation detail, as the `myModule` variable text, itself, is irrelevant in implementation of the module being imported. 
- the `myModule` is assigned the result of the `require()` statement
- the `require()` statement, here, refers to a relative path, `./addTwo`. This is a detail that is different from importing a `node_module`, which is referred to as an absolute name (like `require('express')`)
- the `addTwo` function, which is bound as a key on the exported object from `add.js`, is called with `myModule.addTwo(3,8)` inside a console.log statement, which prints the result to the console

