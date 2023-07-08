---
title: Learn The Basics Of Readable Streams
slug: node/streams/readable
author: Jake Laursen
excerpt: Reading Data As A Stream of Chunks
tags: ["node", "streams"]
parentDir: node/streams
order: 2
---


# Reading Data In Chunks With Readable Streams

## A readable Stream Of Data From A Local File
```js

// 
// dependencies
// 
const { createReadStream } = require('fs');

// 
// variables
// 
const THE_FILE_TO_READ = './longfile.txt';
const EVENTS = {
  DATA: 'data',
  END: 'end',
}
let howManyChunks = 0;

// 
// functional logic
// 
const readStream = createReadStream(THE_FILE_TO_READ);

function readChunk(data) {
  console.log(`got data at chunk ${howManyChunks}`, data);
  howManyChunks++;
  console.log('\n');
}

function endReading() {
  console.log(' finished reading');
}

readStream.on(EVENTS.DATA, readChunk);
readStream.on(EVENTS.END, endReading);
```