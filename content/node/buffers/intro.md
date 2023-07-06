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