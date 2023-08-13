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

### hmac with a readable stream
```js
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
const {
  createHmac,
} = await import('node:crypto');

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream('test.js');
input.pipe(hmac).pipe(stdout)
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

## Crypto And User Passwords
This might be a bit more like "system design" decisions.  
Here, a password can be hashed - 
```js

function hashString(s){
  const alg = 'sha512';
  const digest = 'hex';
  return crypto.createHash(alg).update(s).digest(digest);
}
const userPw = 'theyPutThisInAForm123!@#'
const hashedPassword = hashString(userPw)
// insert into db AND/OR
// hash the pw & compare to table-stored pw value
```

Here, a password, with a randomly generated "salt", can be used with `createHmac` to build a more complex pw system:
```js

const userPw ='userPutThisInAForm1234*&^%'
function makeSalt(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function saltPw(pw){
  const salt = makeSalt(12);
  const salted = createHmac('sha256', salt)
    .update(pw)
    .digest('hex');
    return { pw: salted, salt }
}

const { salt, pw } = saltPw(userPw)
// save BOTH the salt AND the pw to a datastore
```