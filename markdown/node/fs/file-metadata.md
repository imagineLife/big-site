---
title: Learn How To Get File Metadat
slug: node/fs/file-metadata
author: Jake Laursen
excerpt: Information About Files
tags: ["node", "fs", "core"]
parentDir: node/fs
order: 6
---

# Get File Metadata 
The [`fs.Stats`](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#class-fsstats) object contains a bunch of information about files.  
The `fs.Stats` object can be found when running `fs.stat()`, `fs.lstat()`, `fs.fstat()`, and other synchronous version of those commands.  
(_This is part of [a brief series on the fs module](/node/fs)_)
```js
const { readdirSync, statSync } = require('fs');

const files = readdirSync('.');
const typeFromStat = (stat) => (stat.isDirectory() ? 'dir: ' : 'file: ');
files.forEach((name, idx) => {
  if (idx === 0) {
     const stat = statSync(name);
     const { atime, birthtime, ctime, mtime } = stat;
     const typeLabel = typeFromStat(stat);
     console.group(typeLabel, name);
     console.log({
       atime: atime.toLocaleString(),
       ctime: ctime.toLocaleString(),
       mtime: mtime.toLocaleString(),
       birthtime: birthtime.toLocaleString(),
     });
     console.groupEnd();
     console.log(); 
  }
  })
```

## Details On A Few File Metadata Properties
[**atime**](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#statsatime): ACCESSED: 
- shows the last time a file was accessed.  

[**ctime**](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#statsctime): STATUS CHANGED: 
- shows the last time the file **status** was changed  

[**birthtime**](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#statsbirthtime): CREATED: 
- shows the creation time.  

[**mtime**](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#statsmtime): MODIFIED: 
- shows the last time the file was modified

[**size**](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#statssize): SIZE (_in bytes_): 
- shows the size of the file - may not be supported