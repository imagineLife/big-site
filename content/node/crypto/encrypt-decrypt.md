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

```js
const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");

const envryptionAlgorithm = "aes-256-cbc"; 
const random16Bytes = randomBytes(16);
const random32Bytes = randomBytes(32);

// protected data
const message = "This is a secret message";

// the cipher function
const cipher = createCipheriv(envryptionAlgorithm, random32Bytes, random16Bytes);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log(`Encrypted message: ${encryptedData}`);

// the decipher function
const decipher = createDecipheriv(envryptionAlgorithm, random32Bytes, random16Bytes);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

console.log(`Decrypted message: ${decryptedData}`);
```