---
title: Catch Errors with Try/Catch
slug: node/errors/catching
author: Jake Laursen
excerpt: Catch Errors with Try/Catch
tags: ["node", "errors"]
parentDir: node/errors
order: 2
---


# Catch Errors with Try/Catch
[The try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) syntax helps a (control flow)[js/control-flow] detail, where code "lives" in a few different parts:
- a `try` block, where code is "tried"
- a `catch` block where errors that occur _from within the try block_ are "caught" and passed as a parameter, and the code in the `catch` block can act on the error thrown during the execution of the `try` block
- a `finally` block (_which is optional_) that runs after the try and catch are finished

- [Catch Errors with Try/Catch](#catch-errors-with-trycatch)
  - [Connecting Errors To Try/Catch](#connecting-errors-to-trycatch)
    - [Catching An Error](#catching-an-error)
    - [Skipping The Catch](#skipping-the-catch)
    - [Skipping The Finally](#skipping-the-finally)
  - [Handling Errors](#handling-errors)
    - [Be Aware Of Code That Runs Later](#be-aware-of-code-that-runs-later)

## Connecting Errors To Try/Catch
### Catching An Error
```js
console.log('1')
try {
  console.log('2')
  noFunctionYet();
} catch (error) {
  console.log('3')
  console.error(error);
} finally{
  console.log('4')
  console.log('finally run here')
}
console.log('5')
```

This will output...
```bash
1
2
3
ReferenceError: noFunctionYet is not defined
    at Object.<anonymous> (<file-path>/<filename>..js:4:3)
    at Module._compile (node:internal/modules/cjs/loader:1254:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47
4
finally run here
5
```

### Skipping The Catch
```js
function workingFunction(){
  return 2
}
console.log('1')
try {
  console.log('2')
  workingFunction();
} catch (error) {
  console.log('3')
  console.error(error);
} finally{
  console.log('4')
  console.log('finally run here')
}
console.log('5')
```

This will output...
```bash
1
2
4
finally run here
5
```



### Skipping The Finally
```js
function workingFunction(){
  return 2
}
console.log('1')
try {
  console.log('2')
  workingFunction();
} catch (error) {
  console.log('3')
  console.error(error);
}

console.log('4')
```

This will output...
```bash
1
2
4
```

## Handling Errors 
Errors can be caught in the code and handled.  
```js
// constants
const NOT_NUMBER_ERR_CODE = 'NOT_A_NUMBER';
const TOO_LOW_ERR_CODE = 'TOO_LOW';



// error classes
class NotANumber extends Error{
  constructor (num) {
    super(num + ' must be a number')
  }
  get name () { return 'NotANumber' }
  get code () { return NOT_NUMBER_ERR_CODE }
}

class TooLow extends Error {
  constructor(num) {
    super(num + ' must be above zero');
  }
  get name() {
    return 'TooLow';
  }
  get code() {
    return TOO_LOW_ERR_CODE;
  }
}




// logging function example
function logErrorDetails(e) {
  if (e.code == NOT_NUMBER_ERR_CODE) console.log('caught a wrong type');
  if (e.code == TOO_LOW_ERR_CODE) console.log('caught a too-low err');
}



// the function being tested below!
function addTwo(a, b) {
  if (typeof a !== 'number') throw new NotANumber(a);
  if (typeof b !== 'number') throw new NotANumber(b);

  if (a < 0) throw new TooLow(a);
  if (b < 0) throw new TooLow(b);
  return a + b;
}





// perhaps the "meaningful" control-flow of the code
console.log('1');
try {
  console.log('2');
  addTwo('test', -3);
} catch (error) {
  logErrorDetails(error)
} finally {
  console.log('4');
  console.log('finally run here');
}
console.log('5');



try {
  console.log('6');
  addTwo(-3,2);
} catch (error) {
  logErrorDetails(error);
} finally {
  console.log('7');
  console.log('finally run here');
}
```

this will return
```bash
1
2
caught a wrong type
4
finally run here
5
6
caught a too-low err
7
finally run here
```

### Be Aware Of Code That Runs Later
This is mostly identical to the previous code example.  
Here, though, in the try/catch block, a `setTimeout` causes the function call to "wait" 2 seconds, triggering a `throw` that is NOT caught by the `catch` block:
```js
const NOT_NUMBER_ERR_CODE = 'NOT_A_NUMBER';
const TOO_LOW_ERR_CODE = 'TOO_LOW';



// error classes
class NotANumber extends Error{
  constructor (num) {
    super(num + ' must be a number')
  }
  get name () { return 'NotANumber' }
  get code () { return NOT_NUMBER_ERR_CODE }
}

class TooLow extends Error {
  constructor(num) {
    super(num + ' must be above zero');
  }
  get name() {
    return 'TooLow';
  }
  get code() {
    return TOO_LOW_ERR_CODE;
  }
}




// logging function example
function logErrorDetails(e) {
  if (e.code == NOT_NUMBER_ERR_CODE) console.log('caught a wrong type');
  if (e.code == TOO_LOW_ERR_CODE) console.log('caught a too-low err');
}



// the function being tested below!
function addTwo(a, b) {
  if (typeof a !== 'number') throw new NotANumber(a);
  if (typeof b !== 'number') throw new NotANumber(b);

  if (a < 0) throw new TooLow(a);
  if (b < 0) throw new TooLow(b);
  return a + b;
}





// perhaps the "meaningful" control-flow of the code
console.log('1');
try {
  console.log('2');
  setTimeout(() => {
    addTwo('test', -3);
  }, 2000)
} catch (error) {
  logErrorDetails(error)
} finally {
  console.log('3');
  console.log('finally run here');
}
console.log('4');



try {
  console.log('5');
  addTwo(-3,2);
} catch (error) {
  logErrorDetails(error);
} finally {
  console.log('6');
  console.log('finally run here');
}
```

this will return
```bash
1
2
3
finally run here
4
5
caught a too-low err
6
finally run here
<path-to>/<the-filename>.js:181
  if (typeof a !== 'number') throw new NotANumber(a);
                             ^

NotANumber: test must be a number
    at addTwo (<path-to>/<the-filename>.js:181:36)
    at Timeout._onTimeout (<path-to>/<the-filename>.js:198:5)
    at listOnTimeout (node:internal/timers:569:17)
    at process.processTimers (node:internal/timers:512:7)

Node.js v18.14.2
```