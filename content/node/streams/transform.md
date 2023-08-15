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
```js
const { Transform } = require('stream')
const { scrypt } = require('crypto')
const ENCRYPTION_SALT = 'salt-here';
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
transform.on('data', (data) => {
  console.log('got data:', data)
})

transform.write('First line\n')
transform.write('Second line\n')
transform.write('Third Line\n')
transform.end('Last line')
```