---
title: Learn The Basics Of Writable Streams
slug: node/streams/writable
author: Jake Laursen
excerpt: Writing Data As A Stream of Chunks
tags: ["node", "streams"]
parentDir: node/streams
order: 3
---


# Writing Data In Chunks With Writable Streams
[Writable streams](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#writable-streams) allow for writing data to a source in chunks.  
Writable streams include...
- Client-side HTTP Requests & server-side http responses
- the `fs` module `createWriteStream` method
- compression with `zlib` & `crypto` stream methods

## An example of WRiting to a file
```js
// setup
const { createWriteStream } = require('fs');
const THE_FILE_TO_WRITE = './written-from-stream.txt';

// some made-up data as an example
const dataToWrite = [
  'this is the first line',
  'this is the second line',
  'this is the third line'
]


// create the write stream object
const writeStream = createWriteStream(THE_FILE_TO_WRITE);
writeStream.on('finish', () => {
  console.log('finished writing');
});

// write to the writeStream
dataToWrite.forEach(str => writeStream.write(str + `\n`));
writeStream.end('ending line');
```