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

- [Writing Data In Chunks With Writable Streams](#writing-data-in-chunks-with-writable-streams)
  - [An example of Writing to a file with the fs module](#an-example-of-writing-to-a-file-with-the-fs-module)
  - [A WriteStream From Scratch](#a-writestream-from-scratch)
  - [Writing In Chunks While Maintaining Input Strings](#writing-in-chunks-while-maintaining-input-strings)
  - [Writing In Chunk For Several JS Input Types](#writing-in-chunk-for-several-js-input-types)

## An example of Writing to a file with the fs module
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

## A WriteStream From Scratch
```js
const { Writable } = require('stream');
const resultingData = [];
const dataToWrite = ['this is the first line', 'this is the second line', 'this is the third line'];

function createWriteStream(data) {
  return new Writable({
    // 
    // this is where custom logic can be written into the `write` method of the Writable function
    //
    write(chunk, encoding, next) {
      data.push(chunk)
      next()
    }
  })
} 

const writeStream = createWriteStream(resultingData);
writeStream.on('finish', () => {
  console.log('finished writing to resultingData');
  console.log(resultingData);
});
dataToWrite.forEach((str) => writeStream.write(str));

writeStream.end('last line here!');
```
This will show output in a terminal when run:
```bash
finished writing to resultingData
[
  <Buffer 74 68 69 73 20 69 73 20 74 68 65 20 66 69 72 73 74 20 6c 69 6e 65>,
  <Buffer 74 68 69 73 20 69 73 20 74 68 65 20 73 65 63 6f 6e 64 20 6c 69 6e 65>,
  <Buffer 74 68 69 73 20 69 73 20 74 68 65 20 74 68 69 72 64 20 6c 69 6e 65>,
  <Buffer 6c 61 73 74 20 6c 69 6e 65 20 68 65 72 65 21>
]
```
Notice how this translates, by default, input to buffer objects.  


## Writing In Chunks While Maintaining Input Strings
```js
//  with decodeStrings set to false
//  NOTE: only strings will work as input here
//  to allow MORE than strings, see the next example
const { Writable } = require('stream');
const resultingData = [];
const dataToWrite = ['this is the first line', 'this is the second line', 'this is the third line'];

function createWriteStream(data) {
  return new Writable({
    // STOP converting strings to buffers
    decodeStrings: false,
    // 
    // this is where custom logic can be written into the `write` method of the Writable function
    //
    write(chunk, encoding, next) {
      data.push(chunk)
      next()
    }
  })
} 

const writeStream = createWriteStream(resultingData);
writeStream.on('finish', () => {
  console.log('finished writing to resultingData');
  console.log(resultingData)
});

dataToWrite.forEach((str, itmIdx) => { 
  if (itmIdx !== dataToWrite.length - 1) {
    writeStream.write(str);
  } else {
    writeStream.end(str);
  }
});
```
This will output...
```js
[
  'this is the first line',
  'this is the second line',
  'this is the third line'
]
```


## Writing In Chunk For Several JS Input Types
```js
// with objectMode set to true
//  accepts many input types, maintaining the type wrhen writing
const { Writable } = require('stream');
const resultingData = [];
const dataToWrite = ['this is the first line', 'this is the second line', 'this is the third line', 8675309, {thisIs: "an Object"}];

function createWriteStream(data) {
  return new Writable({
    objectMode: true,
    //
    // this is where custom logic can be written into the `write` method of the Writable function
    //
    write(chunk, encoding, next) {
      data.push(chunk);
      next();
    },
  });
}

const writeStream = createWriteStream(resultingData);
writeStream.on('finish', () => {
  console.log('finished writing to resultingData');
  console.log(resultingData);
});

dataToWrite.forEach((str, itmIdx) => {
  if (itmIdx !== dataToWrite.length - 1) {
    writeStream.write(str);
  } else {
    writeStream.end(str);
  }
})
```