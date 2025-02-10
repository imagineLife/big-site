---
title: Learn The Basics Of Transform Streams
slug: node/streams/transform
author: Jake Laursen
excerpt: Transform data in a stream
tags: ["node", "streams", "core", "transformation"]
parentDir: node/streams
order: 6
---


# Transform Streams

- [Transform Streams](#transform-streams)
  - [Encrypt Some Data](#encrypt-some-data)
  - [Transform stdin to uppercase text](#transform-stdin-to-uppercase-text)

[Transform streams](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#class-streamtransform), in practice: take input from a stream, transform the data (_up to us as developers WHAT how they transform_), and "pass" the data along to another stream.   

A `createTransformStream` functioin can be built. This funciton could
- return a `Transform` object (stream)
- contain the "logic" of the transformation


## Encrypt Some Data
Here, an example of a transform stream that encrypts the data passed to it:
```js
const { Transform } = require('stream')
const { scrypt } = require('crypto')
const ENCRYPTION_SALT = 'salt-here';

// build the transform stream creator
const createTransformStream = () => {
  return new Transform({
    decodeStrings: false,
    encoding: 'hex',
    transform (chunk, enc, next) {
      scrypt(chunk, ENCRYPTION_SALT, 32, (err, key) => {
        if (err) {
          next(err);
          return;
        }
        next(null, key);
      });
    }
  })
}
const transform = createTransformStream()

// register a listener for the transform stream instance
transform.on('data', (data) => {
  console.log('got data:', data)
})

// send some data to the transform stream
transform.write('First line\n')
transform.write('Second line\n')
transform.write('Third Line\n')
transform.end('Last line')
```
Running that will return:
```bash
got data: e0046ff16bca85fcc79483d59ff01a8cd0dbdf206ea2aec29b8e38af396e52da
got data: 063e61c30148f5d2649c7e1db30de10bb697a4be41d643d62c3c4284a2681890
got data: 167fe3aa6c27c68fc133b18ced4ed98f94a51ebcd0d087ed66498614fa33c066
got data: 6b6b3ea91b7c0b88ce682745f73d51ef266e60a7fc06b85072338e85c3bd808d
```

## Transform stdin to uppercase text
This example combines a `createTransformStream` function with [piping](/node/streams/piping) and [stdio](/node/process):
```js
// to-upper.js

const { Transform } = require('stream');

function createUppercaseStream(){
  return new Transform({
    transform(chunk,encoding,next){
      const upd = chunk.toString().toUpperCase()
      next(null,upd)
    }
  })
}

const upperStream = createUppercaseStream()
process.stdin.pipe(upperStream).pipe(process.stdout)
```
Running that with something like `node to-upper.js` will keep the terminal open. once the terminal is open, writing something in the terminal like `this is some text` will cause the `process.stdin` to get `pipe`d to the `upperStream`. The `upperStream` takes the input and runs `.toString().toUpperCase()` on it. Then, the output of THAT command getss `pipe`d to `process.stdout` which is the same terminal that the text was entered in. The terminal should immediately output `THIS IS SOME TEXT`.  
