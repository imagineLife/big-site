---
title: Javascript And Errors
parentDir: js
slug: js/errors
author: Jake Laursen
excerpt: Working With Native Errors and Custom Errors
tags: ["js","errors"]
order: 1
---

# JavaScript Includes Built-In Errors And Error-Handling
Sometimes js can't "do" what a programmer expects it to do, and JS will throw an error.  
When a piece of code is expected to get some data from an API and the networking protocol acts unexpectedly, js will throw an error.  
When a piece of code is expected to perform a function that is not available on an object, an `Uncaught TypeError` may get thrown.  
As a developer writing a function that is expecting a number as an argument, we can check for a number and when the parameter is not a number we can `throw` a `new` instance of a `TypeError` reading `(fn name) parameter must be a number`.  
All in all, there is a bit to know about using Errors in JS:  
- [a few built-in Error types](/js/errors/native)
- [errors can be be custom built](/js/errors/custom)