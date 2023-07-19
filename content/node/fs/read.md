---
title: Learn How To Read Files
slug: node/fs/read
author: Jake Laursen
excerpt: Read Files Then Handle the file contents
tags: ["node", "fs", "core", "event loop"]
parentDir: node/fs
order: 3
---

# Read Files
- [Read Files](#read-files)
  - [Reading Files Syncrhonously](#reading-files-syncrhonously)
  - [Keeping The Even Loop Open With Callback](#keeping-the-even-loop-open-with-callback)
  - [Keeping The Event Loop Open with The Promise API](#keeping-the-event-loop-open-with-the-promise-api)

## Reading Files Syncrhonously
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

## Keeping The Even Loop Open With Callback
The [`readFile`](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fsreadfilepath-options-callback) method of the `fs` module can be used to read files from disk:
```js
const { readFile } = require('fs');
const FILE_TO_READ = './../small-file.txt';

function readFileCallback(err, contents){
  if (err) {
    console.error(err);
    return;
  }
  console.log('done reading: '),
    console.log(contents)
}

readFile(FILE_TO_READ, readFileCallback);

```
The default behavior is that the returned content is a buffer of the file contents.  
To convert the content to a more understandable string, an "encoding" option could be passed to the `readFile` function argument list:
```js
const { readFile } = require('fs');
const FILE_TO_READ = './../small-file.txt';

function readFileCallback(err, contents){
  if (err) {
    console.error(err);
    return;
  }
  console.log('done reading: '),
    console.log(contents)
}

readFile(FILE_TO_READ, { encoding: 'utf8' }, readFileCallback);
```

## Keeping The Event Loop Open with The Promise API
[the node fs module has a nice built-in promise-syntax api](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#promises-api):
```js
const { readFile } = require('fs/promises');
const FILE_TO_READ = './../small-file.txt';

// NOTE: the optional {encoding: utf8} 
// parses the file as a string
// the default, without the encoding, returns a buffer
readFile(FILE_TO_READ, { encoding: 'utf8' })
  .then((data) => {
    console.log(data);
    
  })
  .catch(console.log);
```