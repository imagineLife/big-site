---
title: A Bit About Modules
parentDir: js/
slug: js/mods
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

- [Modules](#modules)
  - [Load A Module with the require keyword](#load-a-module-with-the-require-keyword)
  - [Create A Module That can be Imported](#create-a-module-that-can-be-imported)
  - [Two Ways To Run A Module With the Node CLI](#two-ways-to-run-a-module-with-the-node-cli)
    - [Run A Program As A Program](#run-a-program-as-a-program)
    - [Run A Program As A Module](#run-a-program-as-a-module)


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

## Two Ways To Run A Module With the Node CLI
### Run A Program As A Program
With the above two files sitting next to each other in a directory, this will run the index.js file:
```js
// . is a shorthand for index.js
node .

// or
node index.js
```
Here, node is treating the `index.js` as an entrypoint and maybe even more specifically like a program.  

This may seem obvious! Node has [verbose docs](https://nodejs.org/dist/latest-v18.x/docs/api/modules.html#modulepaths) on its module system with many details that relate to how node is handling its work for running an `index.js` file like this.  

Perhaps just a subtle differentiator between how the `index.js` and the `addTwo` are being used is that `index.js` is being used with the `node` keyword from a terminal, and `addTwo` is being used with the keyword and function `require`. That `require` keyword can be used to run the `index.js` file, too, treating the whole program as a module (_with a few more lines of code_)!!
### Run A Program As A Module
One key detail to make a program into a module is to [Access the main module](https://nodejs.org/dist/latest-v18.x/docs/api/modules.html#accessing-the-main-module).  
The `addTwo.js` can be setup to "figure out" if it is being run with the `node` command or as a module.  
```js
if(require.main === module){
  // this is being run with "node ."
}else{
  // this is being run as a module
}
```
Why might this differentiator between the program's run method matter? Here, the `addTwo` function expects arguments & the cli version, `node addTwo`, will not accepts args && will only work with `node addTwo.js`.  

Let's update the file to do two things:
- figure out if it is being run directly from `node`
- optionally take 2 cli arguments instead of 2 function params, so that when running from node it can log a result with something like `node addTwo.js 3 11` where it adds 3 and 11 (_or any othe 2 values_)

```js
// addTwo.js with the update!
function addTwo(a,b){ return a + b};

// this is being run with "node ."
if (require.main === module) {
  console.log(`addTwo Result:`, addTwo(process.argv[2], process.argv[3]));
}

module.exports = { addTwo };

```