---
title: Learn How To Read Directories
slug: node/fs/read-dirs
author: Jake Laursen
excerpt: Read Directories
tags: ["node", "fs", "core"]
parentDir: node/fs
order: 5
---

# Reading Directories
Similar to the [reading of files](/node/fs/read) and [writing of files](/node/fs/write), reading directories have a few different syntaxes & approaches, including callbacks, [promises](/js/promises-intro/), and even [streams](/node/streams/).  

- [Reading Directories](#reading-directories)
  - [Use A Callback To Read A Directory](#use-a-callback-to-read-a-directory)
  - [Read Directories Synchronously](#read-directories-synchronously)
  - [Use A Promise To Read Directories](#use-a-promise-to-read-directories)


## Use A Callback To Read A Directory
[readdir](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fsreaddirpath-options-callback):  

```js
const { readdir } = require('fs')
// NOTE: __dirname is the current directory
readdir(__dirname, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(files);
});
```

## Read Directories Synchronously
[readdir](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fsreaddirpath-options-callback):  

```js
const { readdirSync } = require('fs')
try {
  const files = readdirSync(__dirname)
  console.log(files);
} catch (err) {
  console.error(err);
}
```

## Use A Promise To Read Directories
```js
const { readdir } = require('fs/promises');
async function doWork() {
  const files = await readdir(__dirname);
  console.log(files);
}

doWork().catch((err) => {
  console.error(err);
});
```