---
title: Errors
slug: node/errors
author: Jake Laursen
excerpt: Errors
tags: ["node", "errors"]
parentDir: node
order: 1
---


# Errors
[Node has some extensive docs on its errors, error handling, and more.](https://nodejs.org/dist/latest-v18.x/docs/api/errors.html)  
[Mozilla also has robust docs on the Error object and error types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) toward to scope of js in a browser rather than in the node env.  

## There Are Several Types Of Errors
Perhaps a TL;DR of [the node docs](https://nodejs.org/dist/latest-v18.x/docs/api/errors.html#errors):
- **JS Errors**: Some built-in errors that exist in both browser and node envs
- **System Errors**: OS errors (fs, http, etc)
- **User-Written Errors**: things devs can write in an application
- **Assertion Errors**: resulting from failing tests