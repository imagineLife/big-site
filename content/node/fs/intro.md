---
title: Learn File System Interaction
slug: node/fs
author: Jake Laursen
excerpt: 
tags: ["node", "fs"]
parentDir: node
order: 1
---


# File System Interactions
Filesystems can be interacted with the `fs` module as well as using the `path` module.  

## The path module helps with cross-platform paths
[path](https://nodejs.org/dist/latest-v18.x/docs/api/path.html) is a native node module that [_"...provides utilities for working with file and directory paths..."_](https://nodejs.org/dist/latest-v18.x/docs/api/path.html) (_thanks node docs!_).  

## __filename and __dirname for current location
Files and directories "live" at a location which is accessible by a path.  

Lets consider a simple directory structure with a few js files to see what the [`__filename`](https://nodejs.org/dist/latest-v18.x/docs/api/modules.html#__filename) and [`__dirname`](https://nodejs.org/dist/latest-v18.x/docs/api/modules.html#__dirname) globally available vars do:
- a test dir containing
  - an `index.js` file
  - a directory called `nested`, which contains
    - an `index.js` file
```bash
- test (dir)
    - index.js (file)
    - nested (dir)
      - index.js (files)
```

Here's what the js files will contain:  
`test/index.js`
```js
require('./nested');

console.log('test index file')

console.log({
  filename: __filename,
  dirname: __dirname
})
```

`test/nested/index.js`:
```js
console.log('nested index file');

console.log({
  filename: __filename,
  dirname: __dirname,
});
```

With a terminal in the `test` dir, after running `node .`, the output will show...
```bash
nested index file
{
  filename: '/Users/my-username/Desktop/test/nested/index.js',
  dirname: '/Users/my-username/Desktop/test/nested'
}
root index file
{
  filename: '/Users/my-username/Desktop/test/index.js',
  dirname: '/Users/my-username/Desktop/test'
}
```