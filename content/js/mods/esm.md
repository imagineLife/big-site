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
    - [Use A Module As An Index File](#use-a-module-as-an-index-file)


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
- the filename suffix is now `*.mjs` (_which is even recommended by [V8](https://v8.dev/features/modules#mjs), the js engine_). This is not required when [the next step is done](#setup-a-repo-to-work-with-esm), but can be helpful to reduce developer cognitive load during development
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

### Use A Module As An Index File
```js
// index.mjs
import { realpath } from 'fs/promises' 
import { fileURLToPath } from 'url' 
import * as format from './format.js'

const executedByNodeCli = process.argv[1]
const isMain =  executedByNodeCli && 
 await realpath(fileURLToPath(import.meta.url)) === 
 await realpath(executedByNodeCli)

if (isMain) { 
  const { default: pino } = await import('pino') 
  const logger = pino() 
  logger.info(format.upper('my-package started')) 
  process.stdin.resume() 
}

export default (str) => { 
  return format.upper(str).split('').reverse().join('') 
}
```