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
- [**JS Errors**](#js-errors): Some built-in errors that exist in both browser and node envs
- **System Errors**: OS errors (fs, http, etc)
- **User-Written Errors**: things devs can write in an application
- **Assertion Errors**: resulting from failing tests

## JS Errors
There are a few [errors that "come with" JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors):
- [Errors](#errors)
  - [There Are Several Types Of Errors](#there-are-several-types-of-errors)
  - [JS Errors](#js-errors)
    - [Reference Error](#reference-error)
    - [Syntax Error](#syntax-error)
    - [Range Error](#range-error)
### Reference Error
This is thrown when a variable is not defined.  
These can be thrown due to developer error: scope mismatches, typos, etc.
```js
console.log(missingVar)

// this will return "Uncaught ReferenceError: missingVar is not defined"
```

### Syntax Error
This is thrown when the code being executed is not valid js.  
```js
console.log("this is an incomplete string)

// this will return "Uncaught SyntaxError: Invalid or unexpected token"
```

### Range Error
This is thrown when the code being executed is not ["in the set or range o allowed values"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError#).  
I'm personally not sure I've ever seen this thrown. This seems like a good candidate for math-type functions and libraries:

```js
function isAllowed({ min, max, val }) {
  if (val < min) {
    throw new RangeError(`${val} is below allowed min of ${min}`);
  }
  if (val > max) {
    throw new RangeError(`${val} is above allowed max of ${max}`);
  }
  return true
}

isAllowed({ min: 5, max: 10, val: 11 });
// Uncaught RangeError: 11 is above allowed max of 10
isAllowed({ min: 5, max: 10, val: 3 });
// Uncaught RangeError: 3 is below allowed min of 5
isAllowed({ min: 5, max: 10, val: 7 });
// true

```