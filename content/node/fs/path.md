---
title: Learn How To Work With Paths
slug: node/fs/path
author: Jake Laursen
excerpt: Node Has A Bunch of built-in tooling for dealing with paths
tags: ["node", "fs", "path"]
parentDir: node/fs
order: 1
---

# Paths
_This is a follow-up to a brief [intro to the file-system](/node/fs)_  

- [Paths](#paths)
  - [join: for combinig paths strings](#join-for-combinig-paths-strings)
  - [resolve: for calculating a path from segments](#resolve-for-calculating-a-path-from-segments)

## join: for combinig paths strings
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
nested index file
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

## resolve: for calculating a path from segments
Similar to the [join method](#the-join-method-for-combinig-paths-strings), the `resolve` method can be used to get a single path from multiple path segments.  
To see how 2 path strings can be "resolved", consider a directory+file combo at `/Users/<you>/Desktop/test/index.js` that includes code like the following: (_note this is a continuation of the [example above](#the-join-method-for-combinig-paths-strings)_)

```js
const { join, resolve } = require('path');

console.log('test index file')

console.log({
  filename: __filename,
  dirname: __dirname,
  joinBackward: join(__dirname, '..'),
  joinFileName: join(__dirname, 'file.txt'),
  resolvedRelativePaths: resolve('./first', 'second'),
  resolvedRootPaths: resolve('/first', '/second'),
  resolvedMixed: resolve('/first', 'second'),
  resolvedDoubleDots: resolve('../', 'second'),
});
```

That will return:
```bash
test index file
{
  filename: '/Users/<me>/Desktop/test/index.js',
  dirname: '/Users/<me>/Desktop/test',
  joinBackward: '/Users/<me>/Desktop',
  joinFileName: '/Users/<me>/Desktop/test/file.txt',
  resolvedRelativePaths: '/Users/<me>/Desktop/test/first/second',
  resolvedRootPaths: '/second',
  resolvedMixed: '/first/second',
  resolvedDoubleDots: '/Users/<me>/Desktop/second'
}
```