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
  - [Stream File Data With createReadStream](#stream-file-data-with-createreadstream)
    - [Adjust The Chunk Size](#adjust-the-chunk-size)

(_This is part of [a brief series on the fs module](/node/fs)_)  

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

## Stream File Data With createReadStream
This is a trivial example of using one of [node's built-in stream apis](/node/streams/). There is a bunch of more helpful info to consider about streams, but this will just cover a few things.  

```js
const { createReadStream } = require('fs');
const FILE_TO_READ = './../big-file.txt';

let chunkCount = 0;
const readStream = createReadStream(FILE_TO_READ)
readStream.on('data', (d) => {
  chunkCount++;
  console.log({chunkCount})
})
```

### Adjust The Chunk Size 
the `createReadStream` api gives [a few options](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#filehandlecreatereadstreamoptions) to use.  
One of the options is called the [`highWaterMark`](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#buffering), which describes a limit on the of memory each chunk will consume. The node docs say the default value for the `highWaterMark` is `64 * 1024`.

```js
const { createReadStream } = require('fs');
const FILE_TO_READ = './../big-file.txt';

let chunkCount = 0;
const readStream = createReadStream(FILE_TO_READ)
readStream.on('data', (d) => {
  chunkCount++;
})
readStream.on('end', () => { 
  console.log({ chunkCount });
})
```

Lets say the `big-file.txt` is `190M` in size. The default number of chunks will be `3040`.  


Let's update the process to have a smaller `highWaterMark` and more break up the file stream into more chunks:
```js
const { createReadStream } = require('fs');
const FILE_TO_READ = './../big-file.txt';
const DEFAULT_WATER_MARK = 64 * 1024;
let chunkCount = 0;
const readStream = createReadStream(FILE_TO_READ, { highWaterMark: DEFAULT_WATER_MARK * 2 });
readStream.on('data', (d) => {
  chunkCount++;
})
readStream.on('end', () => { 
  console.log({ chunkCount });
})
```
Here, the number of chunks will be `1520`. Each chunk, now, is allowed to be 2x the size!