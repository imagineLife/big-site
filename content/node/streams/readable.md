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
In this example, a text file, called `longfile.txt`, gets read in chunks. The size of the file will impact the number of chunks that gets read.  

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
let howManyChunks = 1;

// 
// functional logic
// 
const readStream = createReadStream(THE_FILE_TO_READ);

function readChunk(data) {
  console.log(`got chunk # ${${howManyChunks}}`, data);
  howManyChunks++;
  console.log('\n');
}

function endReading() {
  console.log(' finished reading');
}

readStream.on(EVENTS.DATA, readChunk);
readStream.on(EVENTS.END, endReading);
```

## Creating a Readable Stream Object From Scratch
Node comes with a [readable](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#class-streamreadable) stream factory function that can be used to create a "lower level" readable stream. The above example is connected to the `fs` module, but this `Readable` function is more interpretable to a developers' needs:

```js
const { Readable } = require('stream');

const madeUpData = ['this', 'is', 'an','array','of','strings'];

const myReadStream = () => {
  return new Readable({
    read() {
      if (madeUpData.length === 0) this.push(null);
      else this.push(madeUpData.shift());
    },
  });
};

function readData(data) {
    console.log('got data', data);
}

function endData() {
  console.log('finished reading');
}
const readableObject = myReadStream();
readableObject.on('data', readData);
readableObject.on('end', endData);
```