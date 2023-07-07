---
title: Buffers
slug: node/buffers
author: Jake Laursen
excerpt: Learn About Buffers in Node
tags: ["node", "buffers"]
parentDir: node
order: 1
---


# Buffers
[Buffers are included with node](https://nodejs.org/api/buffer.html). Buffers are a spot in memory where data can live.  

```js
// using a node repl
// Buffer is a globally available reserved word!
Object.keys(Buffer)
[
  'poolSize',
  'from',
  'of',
  'alloc',
  'allocUnsafe',
  'allocUnsafeSlow',
  'isBuffer',
  'compare',
  'isEncoding',
  'concat',
  'byteLength'
]
```

- [Buffers](#buffers)
  - [Buffers Allocate Memory](#buffers-allocate-memory)
  - [Create A Buffer Using a Safe Allocation](#create-a-buffer-using-a-safe-allocation)
  - [Create A Buffer Using an UnSafe Allocation](#create-a-buffer-using-an-unsafe-allocation)
  - [Create A Buffer From A String](#create-a-buffer-from-a-string)
  - [Create Strings From Buffers](#create-strings-from-buffers)
  - [Buffers And JSON](#buffers-and-json)
  - [Encoding And Decoding Strings](#encoding-and-decoding-strings)


## Buffers Allocate Memory
Allocate is a fancy term for distribute.  
Buffers get distributed.  
A buffer is a piece of memory - ram.  
Buffers are distributed with either "safe" or "unsafe" methods.  
"unsafe" allocation runs the risk of being filled with memory "fragments" from data that had been used previously. These can contain bytes of data.  
"safe" allocation uses "new" memory that has not been used previously.  

## Create A Buffer Using a Safe Allocation
```js
const HOW_MANY_BYTES = 10
const a = Buffer.alloc(HOW_MANY_BYTES)
a
// <Buffer 00 00 00 00 00 00 00 00 00 00>
```

## Create A Buffer Using an UnSafe Allocation
```js
const HOW_MANY_BYTES = 12
const a = Buffer.allocUnsafe(HOW_MANY_BYTES)
a
// <Buffer 00 00 00 00 00 00 00 00 00 00 00 00>
```

## Create A Buffer From A String
```js
> const STR = "This is a six word string."
// undefined
> Buffer.from(STR)
<Buffer 54 68 69 73 20 69 73 20 61 20 73 69 78 20 77 6f 72 64 20 73 74 72 69 6e 67 >


// interesting views here...
"abcdefghijklmnop".split("").forEach(c => console.log(Buffer.from(c)))
<Buffer 61>
<Buffer 62>
<Buffer 63>
<Buffer 64>
<Buffer 65>
<Buffer 66>
<Buffer 67>
<Buffer 68>
<Buffer 69>
<Buffer 6a>
<Buffer 6b>
<Buffer 6c>
<Buffer 6d>
<Buffer 6e>
<Buffer 6f>
<Buffer 70>

"ABCDEFGHIJKLMNOP".split("").forEach(c => console.log(Buffer.from(c)))
<Buffer 41>
<Buffer 42>
<Buffer 43>
<Buffer 44>
<Buffer 45>
<Buffer 46>
<Buffer 47>
<Buffer 48>
<Buffer 49>
<Buffer 4a>
<Buffer 4b>
<Buffer 4c>
<Buffer 4d>
<Buffer 4e>
<Buffer 4f>
<Buffer 50>
```

## Create Strings From Buffers
```js
const str = 'this is a string'
// 'this is a string'

const strBuffer = Buffer.from(str)
// undefined

strBuffer
// <Buffer 74 68 69 73 20 69 73 20 61 20 73 74 72 69 6e 67>

strBuffer.toString()
// 'this is a string'

const baseString = 'this will be base64 encoded.'
const bufferSixtyFour = Buffer.from(baseString, 'base64');

bufferSixtyFour.toString('base64')

strBuffer.toString('hex')
// '74686973206973206120737472696e67'

strBuffer.toString('utf8')
// 'this is a string'
```
Above, note that buffers can take encodings via strings. The default encoding is utf8. This won't cover the other encodings in detail.  


## Buffers And JSON
Buffers and json can work together. Here a "full circle" takes a string into a buffer into a stringified object, BACK to a json object, BACK to a buffer, BACK to the string.

Buffer a string:
```js
const s = 'this is a string'
// 'this is a string'

const bufferedS = Buffer.from(s)
// <Buffer 74 68 69 73 20 69 73 20 61 20 73 74 72 69 6e 67>
```

Passing that buffer into `JSON.stringify` & using `JSON.parse` on the stringified buffer:
```js
// stringifying a buffer
const jsonStringifiedBuffer = JSON.stringify(bufferedS)
// '{"type":"Buffer","data":[116,104,105,115,32,105,115,32,97,32,115,116,114,105,110,103]}'

// parsing a stringified buffer INTO an object
// the object has 2 keys: type, and data
const parsedJsonString = JSON.parse(jsonStringifiedBuffer)
// {
//   type: 'Buffer',
//   data: [
//     116, 104, 105, 115,  32,
//     105, 115,  32,  97,  32,
//     115, 116, 114, 105, 110,
//     103
//   ]
// }
```

Re-Building the buffer from the parsed stringified buffer
```js
const almostThere = Buffer.from(parsedJsonString.data)
// <Buffer 74 68 69 73 20 69 73 20 61 20 73 74 72 69 6e 67>

Buffer.toString(almostThere)
// 'this is a string'
```

## Encoding And Decoding Strings
```js
const THE_STRING = 'this is a string!'
'this is a string!'


const b64Buffd = Buffer.from(THE_STRING).toString('base64')
// 'dGhpcyBpcyBhIHN0cmluZyE='

const redone = Buffer.from(b64Buffd, 'base64').toString()
// 'this is a string!'
```