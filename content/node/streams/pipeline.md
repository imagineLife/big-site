---
title: Learn The Basics Of Using A Pipeline
slug: node/streams/pipeline
author: Jake Laursen
excerpt: Pipeline is a clear and simple method for passing data between streams
tags: ["node", "streams", "core", "piping"]
parentDir: node/streams
order: 7
---


# Pipeline
[pipeline](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#streampipelinestreams-callback), from the `stream` module, passes data from a readable stream to a/many transform streams, to a final stream.  
This could be good to use 
- to maintain low memory use
- to handle large files

- [Pipeline](#pipeline)
  - [Read A File, Uppercase The Content, Write To A File](#read-a-file-uppercase-the-content-write-to-a-file)
  - [Read A File, Compress The Content, Write To A File](#read-a-file-compress-the-content-write-to-a-file)


## Read A File, Uppercase The Content, Write To A File
```js
// dependencies
const { pipeline } = require('stream');
const { join } = require('path');
const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');


// variables
const STREAM_INPUT_FILENAME = __filename;
const UPPERCASE_OUTPUT_FILENAME = 'out-upper-stream.txt'

console.log(`reading a stream from ${STREAM_INPUT_FILENAME} to ${UPPERCASE_OUTPUT_FILENAME}`);

// will get called after the pipeline finishes
function onPipelineDone(err) {
  if(err){
    console.error(err);
    return;
  }
  console.log('finished writing!')
}

// the transform stream
function createUpperCaseStream(){
  return new Transform({
    transform(chunk, enc, nxt) {
      const upd = chunk.toString().toUpperCase()
      nxt(null,upd);
    }
  })
}

pipeline(
  createReadStream(__filename),
  createUpperCaseStream(),
  createWriteStream(join(__dirname, UPPERCASE_OUTPUT_FILENAME)),
  onPipelineDone
);
```

## Read A File, Compress The Content, Write To A File
This combines [the native createReadStream module](/node/streams/readable), [the native createWriteStream module](node/streams/writable), and [the native zlib createGzip module](https://nodejs.org/dist/latest-v18.x/docs/api/zlib.html#zlib).  
```js
// Dependencies
const { createGzip } = require('zlib');
const { pipeline } = require('stream')
const {
  createReadStream,
  createWriteStream
} = require('fs');

// Vars
const SOURCE_FILE = 'big-text.txt';
const DEST_FILE = 'big-text.txt.gz';

// streams
const SRC_STREAM = createReadStream(SOURCE_FILE);
const DEST_STREAM = createWriteStream(DEST_FILE);
const gz = createGzip()

function onPipelineDone(err){
  if(err){
    console.error(`PIPELINE ERR: `, err)
    process.exitCode = 1;
  }
}

pipeline(
  SRC_STREAM,
  gz,
  DEST_STREAM,
  onPipelineDone
)
```