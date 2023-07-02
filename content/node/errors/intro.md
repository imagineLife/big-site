---
title: Errors
slug: node/errors
author: Jake Laursen
excerpt: Errors
tags: ["node", "errors"]
parentDir: node
order: 6
---


# Errors
[Node has some extensive docs on its errors, error handling, and more.](https://nodejs.org/dist/latest-v18.x/docs/api/errors.html)  
[Mozilla also has robust docs on the Error object and error types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) toward to scope of js in a browser rather than in the node env.  

Errors are both objects and instances. Most of the time during dev work I think I've heard folks talk about writing code that throws error _instances_ without as much consideration for the error _types_ that are being thrown. Also, I think most of the time Errors are _responded to_ during dev efforts and not _written explicitly_.  

- [Errors](#errors)
  - [There Are Several Types Of Errors](#there-are-several-types-of-errors)
  - [JS Errors](#js-errors)
    - [Reference Error](#reference-error)
    - [Syntax Error](#syntax-error)
    - [Range Error](#range-error)
    - [Type Error](#type-error)
  - [User-Written Errors](#user-written-errors)
  - [Errors in the Real World](#errors-in-the-real-world)
    - [Understand the Error's Audience](#understand-the-errors-audience)


## There Are Several Types Of Errors
Perhaps a TL;DR of [the node docs](https://nodejs.org/dist/latest-v18.x/docs/api/errors.html#errors):
- [**JS Errors**](#js-errors): Some built-in errors that exist in both browser and node envs
- **System Errors**: OS errors (fs, http, etc)
- [**User-Written Errors**](#user-written-errors): things devs can write in an application
- **Assertion Errors**: resulting from failing tests

## JS Errors
There are a few [errors that "come with" JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors):
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

### Type Error
Used to describe that some part of the code is using the wrong "type"
```js
function addTwo(a,b){
  if(typeof a !== "number") throw new TypeError('first arg must be a number')
  if(typeof b !== "number") throw new TypeError('second arg must be a number')
  return a + b
}

addTwo('one',2)
// Uncaught TypeError: first arg must be a number
//     at addTwo (REPL13:2:35)
addTwo(1,'two')
// Uncaught TypeError: second arg must be a number
//     at addTwo (REPL13:3:35)
addTwo(1,2)
// 3
```

## User-Written Errors
Developers can write our own error types based on the "parent" error object. Here, an error with code "MUST_BE_PRIMARY" gets written into a function:

```js
function validPrimary(color) {
  const PRIMARY_COLORS = ['red','yellow','blue']
  if (!PRIMARY_COLORS.includes(color)) {
    const e = Error('must be a primary color');
    e.code = "ERR_MUST_BE_PRIMARY";
    throw e
  }
  return true
}

validPrimary('lightgreen');
// Uncaught Error: must be a primary color
//     at validPrimary (REPL59:4:15) {
//   code: 'ERR_MUST_BE_PRIMARY'
// }

validPrimary('blue');
// true
```

Another approach to building the Error, this one might look a bit nicer in the err output text:
```js
class PrimaryError extends Error {
  constructor (colorParam = '') {
    super(colorParam + ' must be a primary color')
  }
  get name () { return 'PrimaryError' }
  get code () { return 'ERR_MUST_BE_PRIMARY' }
}

class CannotMixError extends Error {
  constructor (colorOne, colorTwo) {
    super(`cannot mix ${colorOne} and ${colorTwo}: one of them must be primary`)
  }
  get name () { return 'CannotMixError' }
  get code () { return 'ERR_MUST_BE_MIXBLE' }
}

function isValidPrimary(color) {
  const PRIMARY_COLORS = ['red','yellow','blue']
  if (!PRIMARY_COLORS.includes(color)) {
    throw new PrimaryError(color)
  }
  return true
}
isValidPrimary('lightgreen');
// Uncaught PrimaryError: lightgreen must be a primary color
//     at isValidPrimary (REPL15:4:11)
isValidPrimary('blue');
// true
```

## Errors in the Real World
Errors are complex to deal with in the real world.  
### Understand the Error's Audience
Some errors can be for a developer writing code.  
A developer who is new to a part of a project can benefit from friendly errors: 
- type errors when using methods & functions
- missing values required to connect successfully to "external" sources like auth sources, dbs, services, etc.
- calling an api from a frontend repo with unexpected payloads and/or paramaters and/or header contents *

Developers deserve reasonable errors.  
In the js world, things like typescript have helped implement "type aware(ish)" tooling that, when used effectively, can help developers understand expectations (_maybe dreading the "all" type_).  
