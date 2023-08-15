---
title: Learn About Encrypting And Decrypting Using Node
slug: node/crypto/encrypt-decrypt
author: Jake Laursen
excerpt: An Introduction To Encrypting & Decrypting Data
tags: ["node", "crypto", "core", "encryption", "decryption"]
parentDir: node
order: 2
---

# Encrypting & Decrypting

## Encrypt with createCipheriv
Node allows for [creating a cipher](https://nodejs.org/dist/latest-v18.x/docs/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options), which are encryption algorithms. Using the provided function, `createCipheriv`, returns an objects that can be used to encrypt data.  

## Decrypt with createDecipheriv
Node also allows for [creating a decipher](https://nodejs.org/dist/latest-v18.x/docs/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options), which can be used to "decrypt" an encrypted value.  


Key details that matter when encrypting and decrypting are:
- both must _take the same encryption algorithm_ when creating the objects (createCipheriv, createDecipheriv)
- both must _take the same "key"_ when creating the objects (createCipheriv, createDecipheriv)
- both must _take the same "initializationVector"_ when creating the objects (createCipheriv, createDecipheriv)
- both leverage the "update" and "final" methods, where data + input encoding + output encoding can get passed to the `update` method, and output encoding get passed to the `final` method

```js
const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");

const envryptionAlgorithm = "aes-256-cbc"; 
const random16Bytes = randomBytes(16);
const random32Bytes = randomBytes(32);

// protected data
const message = "This is a secret message";

// encrypt
const cipher = createCipheriv(envryptionAlgorithm, random32Bytes, random16Bytes);
// decrypt
const decipher = createDecipheriv(envryptionAlgorithm, random32Bytes, random16Bytes);

// encrypt the message
let encryptedData = cipher.update(message, "utf-8", "hex");
encryptedData += cipher.final("hex");
console.log(`Encrypted message: ${encryptedData}`);


// decrypt
let decryptedData = decipher.update(encryptedData, "hex", "utf-8")
decryptedData += decipher.final("utf8");
console.log(`Decrypted message: ${decryptedData}`);
```