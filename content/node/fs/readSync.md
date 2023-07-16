---
title: Learn How To Read Files Synchronously
slug: node/fs/readSync
author: Jake Laursen
excerpt: Read Files Then Handle the file contents
tags: ["node", "fs", "core", "event loop"]
parentDir: node/fs
order: 3
---

# Reading Files Syncrhonously
The [`readFileSync`](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fsreadfilesyncpath-options) method of the `fs` module can be used to read files from disk:
```js
const { readFileSync } = require('fs');
const FILE_TO_READ = './../some-file.txt';
const contents = readFileSync(FILE_TO_READ);
```
The default behavior is that the returned content is a buffer.  
To convert the content to a more understandable string within the same line of code, an "encoding" option could be passed:
```js
const { readFileSync } = require('fs');
const FILE_TO_READ = './../some-file.txt';
const contents = readFileSync(FILE_TO_READ, { encoding: 'utf8' });
```