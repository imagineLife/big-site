---
title: Learn How To Work With Paths
slug: node/fs/path
author: Jake Laursen
excerpt: 
tags: ["node", "fs", "path"]
parentDir: node/fs
order: 1
---

# Paths

- [Paths](#paths)
  - [The join method for combinig paths strings](#the-join-method-for-combinig-paths-strings)

## The join method for combinig paths strings
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
const { join } = require('path');

console.log('test index file')

console.log({
  filename: __filename,
  dirname: __dirname,
  joinBackward: join(__dirname, '..'),
  joinFileName: join(__dirname, 'file.txt'),
});

```

`test/nested/index.js`:
```js
console.log('nested index file');
const { join } = require('path');

console.log({
  filename: __filename,
  dirname: __dirname,
  joinBackward: join(__dirname, '..'),
  joinFileName: join(__dirname, 'file.txt'),
})

```

running the above will output:
```bash
{
  filename: '/Users/<my-username>/Desktop/test/nested/index.js',
  dirname: '/Users/<my-username>/Desktop/test/nested',
  joinBackward: '/Users/<my-username>/Desktop/test',
  joinFileName: '/Users/<my-username>/Desktop/test/nested/file.txt'
}
test index file
{
  filename: '/Users/<my-username>/Desktop/test/index.js',
  dirname: '/Users/<my-username>/Desktop/test',
  joinBackward: '/Users/<my-username>/Desktop',
  joinFileName: '/Users/<my-username>/Desktop/test/file.txt'
}
```