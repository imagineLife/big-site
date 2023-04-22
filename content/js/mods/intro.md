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
