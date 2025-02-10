---
title: Learn About Creating Random Bytes
slug: node/crypto/randomBytes
author: Jake Laursen
excerpt: An Introduction To Creating Random Bytes + buffers
tags: ["node", "crypto", "core"]
parentDir: node
order: 3
---

# Creating Random Bytes
```js
const { randomBytes } = require('crypto');

for (let i = 1; i < 20; i++){ console.log(`i ${i}:`, randomBytes(i)) }

/*
will return something like...
i 1: <Buffer 7e>
i 2: <Buffer f7 35>
i 3: <Buffer 9f 06 cd>
i 4: <Buffer f8 28 20 97>
i 5: <Buffer 7c 08 72 fd 99>
i 6: <Buffer 4d 47 fa 5c a0 66>
i 7: <Buffer e9 1a 41 3c 04 dc 46>
i 8: <Buffer 2d a8 1f ca 92 1b ac 6a>
i 9: <Buffer ea 9c 6f 0e ae a2 f1 15 2c>
i 10: <Buffer 3c 3c 06 89 97 3d 77 0f c8 2c>
i 11: <Buffer b5 98 5d 69 62 3d 6e 8c b4 3b 41>
i 12: <Buffer 0e 1f 8b ca 00 20 04 8e f2 6e f9 d2>
i 13: <Buffer 3f be e3 2e 64 09 25 3f ce 2b 9e 04 86>
i 14: <Buffer ac 41 65 6d 38 58 a9 ac a3 02 3b 17 89 f6>
i 15: <Buffer 06 0a 58 e2 28 c2 10 e5 15 40 ec fc 9b 4f 30>
i 16: <Buffer a4 71 d5 96 cf 7f 69 d6 81 b3 2f 4b 0e bf fd e1>
i 17: <Buffer c7 b7 f7 36 b0 ff a0 f3 96 5b 88 67 bd 35 4c ac 1c>
i 18: <Buffer a6 a6 53 2e 3f d1 37 89 65 b4 f9 46 a9 77 d8 bf 96 bf>
i 19: <Buffer 09 32 75 80 5f d7 8f 26 03 e8 f1 24 89 22 19 c4 d5 33 f4>
*/ 
```