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
- [Reading Data In Chunks With Readable Streams](#reading-data-in-chunks-with-readable-streams)
  - [A Readable Stream Of Data From A Local File](#a-readable-stream-of-data-from-a-local-file)
  - [Creating a Readable Stream Object From Scratch](#creating-a-readable-stream-object-from-scratch)
  - [Creating a Readable stream instance with encoding](#creating-a-readable-stream-instance-with-encoding)
  - [A Readable Stream Just For JavaScript](#a-readable-stream-just-for-javascript)
  - [A Readable Stream with less code](#a-readable-stream-with-less-code)

## A Readable Stream Of Data From A Local File
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

const madeUpData = ['some', 'data', 'to', 'read'];

const createReadStream = () => {
  return new Readable({
    read() {
      console.log('---Readable fn---')
      
      // 
      // note: the "this" is the readable instance
      // 
      if (madeUpData.length === 0) this.push(null);
      else this.push(madeUpData.shift());
    },
  });
};

function readData(data) {
    console.log('got data', data.toString());
}

function endData() {
  console.log('finished reading');
}
const readable = createReadStream();
readable.on('data', readData);
readable.on('end', endData);
```

that will log...
```bash
---Readable read fn---
---Readable read fn---
got data <Buffer 73 6f 6d 65>
---Readable read fn---
got data <Buffer 64 61 74 61>
---Readable read fn---
got data <Buffer 74 6f>
---Readable read fn---
got data <Buffer 72 65 61 64>
finished reading
```

## Creating a Readable stream instance with encoding
Notice the note on the [setEncoding](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#readablesetencodingencoding) property of the `Readable` function arg object property:
```js
const { Readable } = require('stream');

const madeUpData = ['this','is', 'an', 'array', 'of', 'strings'];

const createReadStream = () => {
  return new Readable({
    encoding: 'utf8',
    read() {
      console.log('---Readable read fn---');
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
const readable = createReadStream();
readable.on('data', readData);
readable.on('end', endData);
```

## A Readable Stream Just For JavaScript
[objectMode](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#new-streamreadableoptions) is a property of Readable streams that we as developers can use to build the stream for parsing js objects using the stream + chunk interface.  
```js
const { Readable } = require('stream');
const madeUpData = ['this', 'is', 'an', 'array', 'of', 'strings'];

const createReadStream = () => {
  return new Readable({
    objectMode: true,
    read() {
      console.log('---Readable.read()');
      if (madeUpData.length === 0) this.push(null);
      else this.push(madeUpData.pop());
    },
  });
};

const dataFn = (data) => {
  console.log('got data', data);
};
const endFn = () => {
  console.log('finished reading');
};

const readable = createReadStream();
readable.on('data', dataFn);
readable.on('end', endFn);
```

That will output...
```bash
---Readable.read()
---Readable.read()
got data strings
---Readable.read()
got data of
---Readable.read()
got data array
---Readable.read()
got data an
---Readable.read()
got data is
---Readable.read()
got data this
finished reading
```

## A Readable Stream with less code
The `Readable` constructor function includes a `from` function that [takes some data directly](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#streamreadablefromiterable-options):
```js
const { Readable } = require('stream');
const madeUpData = [13,26,43,96];

const dataFn = (data) => {
  console.log(`MATH: ${data} * 3 = ${data * 3}`);
};
const endFn = () => {
  console.log('finished reading');
};

const streamObj = Readable.from(madeUpData);
streamObj.on('data',dataFn);
streamObj.on('end', endFn);
```