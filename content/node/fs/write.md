---
title: Learn How To Write Files
slug: node/fs/write
author: Jake Laursen
excerpt: Write Files To Disk
tags: ["node", "fs", "core", "event loop"]
parentDir: node/fs
order: 4
---

# Write Files
- [Write Files](#write-files)
  - [Writing Files Syncrhonously](#writing-files-syncrhonously)
  - [Leveraging Flags For More Explicit FInteraction Expectations](#leveraging-flags-for-more-explicit-finteraction-expectations)
    - [ax: Fail When The File Already Exists](#ax-fail-when-the-file-already-exists)
    - [a+ Append When The File Already Exists](#a-append-when-the-file-already-exists)
  - [Keeping The Event Loop Open with writeFile](#keeping-the-event-loop-open-with-writefile)
  - [Keeping The Event Loop Open with The Promise API](#keeping-the-event-loop-open-with-the-promise-api)

## Writing Files Syncrhonously
The [`writeFileSync`](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fswritefilesyncfile-data-options) method of the `fs` module can be used to write files to disk:
```js
const { writeFileSync } = require('fs');
const FILE_TO_WRITE = './../from-writeFileSync.txt';

writeFileSync(FILE_TO_WRITE,'this is a string\n');
```

## Leveraging Flags For More Explicit FInteraction Expectations
Node has [a bunch of file system flags](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#file-system-flags) that can be used to be more explicit about interaction expectations. Here's a few examples:

### ax: Fail When The File Already Exists
```js

// assuming the file already exists
const { writeFileSync } = require('fs');
const FILE_TO_WRITE = './../from-writeFileSync.txt';

writeFileSync(FILE_TO_WRITE, 'this is a string\n', { flag: 'ax' });

// will throw an error:
// Error: EEXIST: file already exists, open './../from-writeFileSync.txt'
```

### a+ Append When The File Already Exists
```js
const { writeFileSync } = require('fs');
const FILE_TO_WRITE = './../from-writeFileSync.txt';

writeFileSync(FILE_TO_WRITE, 'this is a string\n', { flag: 'a+' });
```

## Keeping The Event Loop Open with writeFile
```js
const { writeFile } = require('fs');
const FILE_TO_WRITE = './../from-writeFile.txt';

function writeFileCallback(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('done writing');
}

writeFile(FILE_TO_WRITE, 'this is a string\n', writeFileCallback);
```

## Keeping The Event Loop Open with The Promise API
[the node fs module has a nice built-in promise-syntax api](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#promises-api):