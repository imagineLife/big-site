---
title: Learn The Basics Of Piping
slug: node/streams/piping
author: Jake Laursen
excerpt: Connect two streams with "pipe"
tags: ["node", "streams"]
parentDir: node/streams
order: 5
---


# Piping Streams Together
The output of one [readable stream](/node/streams/readable) can get connected, ["piped"](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#event-pipe), to the input of another [writable stream](/node/streams/writable) or to a [duplex stream](/node/streams/duplex).  
As an example here:
- [`process.stdin`](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processstdin) is a readable stream 
- this gets piped to a TransformStream to change the `stdin` contents to an array
- this gets piped, again, to convert the array back to a string
- this gets piped, again, to `process.stdout` (_the terminal output_)
```js
const { Transform } = require('stream');

const commaSplitter = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(chunk.toString().trim().split(','));
    callback();
  },
});

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  
  transform(chunk, encoding, callback) {
    const obj = {};
    for(let i=0; i < chunk.length; i+=2) {
      obj[chunk[i]] = chunk[i+1];
    }
    this.push(obj);
    callback();
  }
});

const toString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n');
    callback();
  },
});

process.stdin
  .pipe(commaSplitter)
  .pipe(toString)
  .pipe(process.stdout);
```