---
title: Intro to ESModules 
parentDir: js/
slug: js/mods/ecmaScript
author: Jake Laursen
excerpt: An overview of esModules
tags: ["js","modules","intro", "ecmascript"]
order: 2
---

# EcmaScript Modules
[ECMAScript modules](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html) are the most up-to-date [standardized](https://tc39.es/ecma262/#sec-ecmascript-language-scripts-and-modules) way to put js code bits into modularized code. Two details that separate CommonJS from EMCAScript syntactically are [exports](https://tc39.es/ecma262/#sec-exports), [imports](https://tc39.es/ecma262/#sec-imports).  


- [EcmaScript Modules](#ecmascript-modules)
  - [EcmaScript is Different than CommonJS](#ecmascript-is-different-than-commonjs)
  - [Build A Node Process To Leverage ECMAScript Module Syntax](#build-a-node-process-to-leverage-ecmascript-module-syntax)
    - [Create A Module](#create-a-module)
    - [Setup A Repo To Work With ESM](#setup-a-repo-to-work-with-esm)
    - [Set An ECMAScript Module To Discover Its Runtime Method](#set-an-ecmascript-module-to-discover-its-runtime-method)
      - [process.argv accesses command-line arguments](#processargv-accesses-command-line-arguments)
      - [import.meta.url shows a modules file: url](#importmetaurl-shows-a-modules-file-url)
      - [process.argv can be leveraged to detect a files run approach](#processargv-can-be-leveraged-to-detect-a-files-run-approach)


## EcmaScript is Different than CommonJS
[Node docs](https://nodejs.org/api/esm.html) are a great reference for details comparing the two:
- esmodules (ecmaScript) are async, whereas commonjs require statements are syynchronous
- esmodules do not (_hopefully will at some point?!_) [have the same caching mechanism](https://nodejs.org/api/esm.html#no-requirecache), so modules can't be cleared & re-populated during runtime

## Build A Node Process To Leverage ECMAScript Module Syntax
### Create A Module
Here, a simple version of the `addTwo.js` file (_as built in a [previous post](/js/mods)_) converted to an ECMAScript module:
```js
// addTwo.mjs
export default function addTwo(a,b){ return a + b}
```
A few details to notice:
- the filename suffix is now `*.mjs` (_which is even recommended by [V8](https://v8.dev/features/modules#mjs), the js engine_). This file extension update is not required when [the next step is done](#setup-a-repo-to-work-with-esm), but could be helpful to reduce developer cognitive load during development by expressing with the filename that the file is intended to be a module
- the function is `export`ed, and here even as a `default`
### Setup A Repo To Work With ESM
One detail is different in this `package.json` from [the package.json in another post](/js/mods): the `type` keyword. 
```json
{
  "name": "my-add-two-repo",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "author": "",
  "license": "ISC",
  "keywords": [],
  "description": "",
}
```

[The `type` keyword](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#enabling) is about "enabling" the esm syntax.  
The "type" keyword instructs node to use ECMAScript modules && recognize `*.mjs` as javascript modules.  

### Set An ECMAScript Module To Discover Its Runtime Method
In the [commonJS approach]('/js./mods#run-a-program-as-a-module) of "figuring out" a program's runtime approach, the `require.main` and the `module` can be used by node to "figure out" a file's runtime method of either being run directly through something like `node addTwo.js` or `require('./addTwo')`.  
In ECMAScript modules, though, `require.main` is not an available functionality, and setting a file to discover it's runtime approach requires can require more work.   
In order to "discover" if an ecmascript module is ran by `node` or by `import`, a few things can be leveraged...

#### process.argv accesses command-line arguments
Let's look at a 2-line code snippet in order to see what `process.argv` does:
```js
// argv.js
console.log('argv here')
console.log(process.argv)
```
Running this from the cli with `node argv.js` returns...
```bash
[
  '/usr/local/bin/node',
  '(<pwd/path/...>)/args.js'
]
```
What this shows is...
- [process.argv returns a list (array) of strings](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processargv), where each item in the list correlates to one of the commands in the run arg (`node` and `argv.js`)
- the first result represents the node runtime, located at `/usr/local/bin/node`
- the second result represents the file that is run, located at the current working direct (_here summarized_) ending with the js file 

Running the same program with something like `node argv.js 123 water` will return
```bash
[
  '/usr/local/bin/node',
  '(<pwd/path/...>)/args.js'
  '123',
  'water'
]
```
Notice that each argument in the cli run command gets its own string in the `process.argv` array.  


#### import.meta.url shows a modules file: url
[import.meta.url](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) is a handy detail within a module.  

Let's create a 2-file project and use the `import.meta.url` to see what this does.  
Make the directory, `demo-add-two`.
Cteate an `index.mjs` and an `addTwo.mjs`.  
setup the index.js:
```js
import addTwo from './addTwo.mjs`;

console.log(`index meta url: ${import.meta.url}`)
console.log(addTwo(3,2));
```
Setup the addTwo file:
```js
// addTwo.js
console.log(`addTwo meta url: ${import.meta.url}`)
function addTwo(a,b){ return a + b };
export default addTWo;
```

Run the project and see the output in the cli:
```bash
cd demo-add-two

node index.mjs

addTwo meta url: file:///<demo-add-two-path>/addTwo.mjs
index meta url: file:///<demo-add-two-path>/index.mjs
```
This file url can be used in conjunction with other native node module functionalities to get the "real" path of the files:   
```js
// addTwo.js
// 1 import
import { fileURLToPath } from 'url';

// 2. do work
const fileUrl = import.meta.url
const thisFilesPath = fileURLToPath(importMetaUrl)

// 3. see output
console.log({
  fileUrl,
  thisFilesPath
})
function addTwo(a,b){ return a + b };
export default addTWo;
```
Now, the output will include the file-path that can be more usable by node's module system, as the `fileURLToPath` in this case more-or-less "strips" the [file:// prefix](https://en.wikipedia.org/wiki/File_URI_scheme) from the file's path:  

```json
{
  fileUrl: "file:///<demo-add-two-path>/addTwo.mjs"
  thisFilesPath: "<demo-add-two-path>/addTwo.mjs"
}
```
One more precautionary measure could be used to "normalize" the url with the `realpath` module:  
```js
// addTwo.js
// 1 import
import { fileURLToPath } from 'url';
import { realpath } from 'fs/promises';

// 2. do work
const fileUrl = import.meta.url
const thisFilesPath = fileURLToPath(importMetaUrl)
const cleanFilePath = await realpath(thisFilesPath);

// 3. see output
console.log({
  fileUrl,
  thisFilesPath,
  cleanFilePath
})
function addTwo(a,b){ return a + b };
export default addTWo;
```
This should output something like:  
```json
{
  fileUrl: "file:///<demo-add-two-path>/addTwo.mjs",
  thisFilesPath: "<demo-add-two-path>/addTwo.mjs"
  cleanFilePath: "<demo-add-two-path>/addTwo.mjs"
}
```



#### process.argv can be leveraged to detect a files run approach
Lets make a small progam and incorporate `process.argv` to "figure out" how a module is run.  
Here, a directory structure for the project that will add two numbers together:
```bash
my-adder        # directory
  index.js      # file
  package.json  # file
  add.mjs       # file
```

Run `npm init -y` at the root to fill out some template package.json contents.  
Populate add.mjs 