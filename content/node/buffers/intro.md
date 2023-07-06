---
title: Buffers
slug: node/buffers
author: Jake Laursen
excerpt: 
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

## Create A Buffer
### Using a Safe Allocation
```js
const HOW_MANY_BYTES = 10
const a = Buffer.alloc(HOW_MANY_BYTES)
a
// <Buffer 00 00 00 00 00 00 00 00 00 00>
```

### Using an UnSafe Allocation
```js
const HOW_MANY_BYTES = 12
const a = Buffer.allocUnsafe(HOW_MANY_BYTES)
a
// <Buffer 00 00 00 00 00 00 00 00 00 00 00 00>
```