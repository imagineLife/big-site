---
title: Learn About Cryptography Using Node
slug: node/crypto
author: Jake Laursen
excerpt: An Introduction To the Native Crypto Module
tags: ["node", "crypto", "core"]
parentDir: node
order: 1
---

# crypto

## Creating an hmac
[node docs](https://nodejs.org/dist/latest-v18.x/docs/api/crypto.html#cryptocreatehmacalgorithm-key-options):  
```js
const { createHmac } = require('crypto');

const A_SECRET_STRING = 'here it is!';
const A_HASH_ALGORITHM = 'sha256';
// a multi-part update
const hmac = createHmac(A_HASH_ALGORITHM, A_SECRET_STRING)
  .update('one')
  .update('two')
  .update('second')
  .update('third');
console.log(hmac.digest('hex'));
```

## Creating a hash
```js
const { createHash } = require('node:crypto');

// a continuous update
const hash = createHash('sha256');
hash.update('one');
console.log(Object.getOwnPropertyNames(hash))

console.log('hash one: ',hash.copy().digest('hex'));

hash.update('two');
console.log('hash two: ',hash.copy().digest('hex'));

hash.update('three');
console.log('hash three: ',hash.copy().digest('hex'));
```