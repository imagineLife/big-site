---
title: Some Details on Functions
parentDir: js/fp
slug: js/fp/overview
author: Jake Laursen
excerpt: More On Functions
tags: ["js","functions", "functional programming"]
order: 1
---

# Functions For Everything
Funcitonal Programming is an approach to programming. The principle of fp is that everything is a function.  
**Creating data?** Use a function.  
**Need an object?** Get it from a function.  
**Have repeatative tasks?** Wrap them in functions.  
**Need a function?** Wrap it in a function that creates and returns functions.  

- [Functions For Everything](#functions-for-everything)
  - [Functions Have "this"](#functions-have-this)
  - [Pure Functions](#pure-functions)
  - [Functions Returning Functions](#functions-returning-functions)
  - [Functions Are Expressed And Declared](#functions-are-expressed-and-declared)
    - [Function Expressions With The Function Keyword](#function-expressions-with-the-function-keyword)
    - [Functions With The Arrow Declaration](#functions-with-the-arrow-declaration)
  - [Functions Can Be Hoisted](#functions-can-be-hoisted)
    - [Hoisting With Declarations](#hoisting-with-declarations)
    - [Not Hoisting With Expressions](#not-hoisting-with-expressions)
  - [Functions Have Arguments](#functions-have-arguments)
    - [The Arguments Objects](#the-arguments-objects)
    - [Rest Parameters](#rest-parameters)
  - [Three Helpful Methods - Call, Bind, And Apply](#three-helpful-methods---call-bind-and-apply)
    - [Call](#call)
    - [Bind](#bind)
    - [Apply](#apply)
  - [Functions have a prototype](#functions-have-a-prototype)

## Functions Have "this"
[`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#function_context) is a special keyword in javascript when leveraging functions.  
`this` is a variable that refers to the "parent" that the function is used by. More on `this` [later on](#call). 
```js
// here, 2 functions bound to keys in an object
// 1 as an arrow function variant
// 1 as the more classical named variant
const obj = {
  arrowFn: () => { let id = 123; console.log(`arrow this.id: ${this.id}`); console.log(`arrow inner id: ${id}`) },
  classicalFn: function classical(){ let id = 123; console.log(`classical this.id: ${this.id}`); console.log(`classical inner id: ${id}`) },
  id: 234
}

obj.arrowFn()
// arrow this.id: undefined
// arrow inner id: 123
// undefined
obj.classicalFn()
// classical this.id: 234
// classical inner id: 123
// undefined
```
The arrow style of functions do not refer to the parent `this` in the same way that a named function expression does.  
Here, the `obj` is the `this` for the expression-style of a function. When referring to `this.id`, the expression version uses the `obj.id` rather than the `id` declared in the classical function itself.  
## Pure Functions
Pure functions are functions that
- have no "side effects": they do one thing and one thing only
- return the same result based on the same input
- in practice take an input, a parameter
- in practice return a result

## Functions Returning Functions
This can be a handy application of functions.  
Here, a function can return a function.  

```js
// inspecting this principle

/*
  1. here, a function
*/ 
function add(a,b){ return a + b}
console.log(add.toString())
// function add(a,b){ return a + b}


/*
  2. here a function that returns a function
*/
function curryAdd(val){
  return function add(valTwo){ console.log(val + valTwo) }
}
console.log(curryAdd.toString())
// function curryAdd(val){
//   return function add(valTwo){ console.log(val + valTwo) }
// }

/*
  3. 
*/ 
const addTwo = curryAdd(2)
console.log(addTwo.toString())
// function add(valTwo){ console.log(val + valTwo) }
addTwo(3)
// 5


```
```js
function prefixer(strOne){
  return function (strTwo){
    return `${strOne} ${strTwo}`
  }
}

// first application of the "prefixer" function
// used in 2 different ways
// these are variables that contain functions with 1 string "loaded" into the function
const sayHiTo = prefixer('Hello')
const sayByeTo = prefixer('Goodbye')


console.log(sayHiTo('Sal')) 
// 'Hello Sal'
console.log(sayHiTo('Mark')) 
// 'Hello Mark'
console.log(sayByeTo('Quang')) 
// 'Goodbye Quang
```

## Functions Are Expressed And Declared
### Function Expressions With The Function Keyword
```js
// un-named
function(params){
  // function statement goes here
}

// named
function doSomething(params){
  // function statement goes here
}
```

### Functions With The Arrow Declaration
Functions can be declared as [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).  
These have been reffered to as "fat arrow" functions.  
These have also been reffered to as "lambda" functions.  
```js
const add = (valOne, valTwo) => { return valOne + valTwo }

// a version with the implicit return
with no curly brackets, 
const add = (valOne, valTwo) =>  valOne + valTwo
```


## Functions Can Be Hoisted
[Hoisintg](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) is when the js interpreter "moves" declared functions to the "top" of the logic.
### Hoisting With Declarations
```js
runnable()
// logs "hello there!"

function runnable(){
  console.log('hello there!')
}
```

### Not Hoisting With Expressions
```js
runnable()
// Uncaught ReferenceError: runnable is not defined

const runnable = () => console.log('hello there!')
```

## Functions Have Arguments
### The Arguments Objects
An [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) variable is available in functions - `arguments` is a reserved word in js!
```js
function add(){
  console.log(arguments)
  console.log(arguments[0] + arguments[1])
}

add(3,9)
// [Arguments] { '0': 3, '1': 9 }
// 12
```

### Rest Parameters
[Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) are another way to access function arguments.  

```js
function add(...args){
  console.log(args)
  console.log(args[0] + args[1])
}

add(3,9)
// [ 3, 9 ]
// 12
```

There are a few details to note with the rest parameters.  
Rest Parameters can be used with named parameters. When other parameters are named, the "spread" style "rest" parameters MUST BE NAMED LAST, as sort of a "catch all" for "all remaining parameters".
```js
function add(firstArg, ...otherArgs){
  console.log(otherArgs)
  console.log(firstArg + otherArgs[0])
}

add(12, 19)
// [ 19 ]
// 31
```

## Three Helpful Methods - Call, Bind, And Apply
Each function instance include [these methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#instance_methods), along with other details.  
### Call
Call can be used to pass along a function's [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) context.  

Call is a method on a function.  
Call can take params.  
`.call` can be thought of as "call the function and pass these params".  

```js

// 
// example 1
// 
function returnThisId() { console.log(this.id) }

function buildIdOffsetterFn() { 
  return (offset) => {
   console.log(this.id + offset) 
  }
}


const smallObj = { id: 999 }
const smallObj2 = { id: 2 }

returnThisId.call(smallObj2) 
// 2
returnThisId.call(smallObj) 
// 999
returnThisId.call({id: 'hand-coded in param'}) 
// hand-coded in param

const returnIdAndOffset = buildIdOffsetterFn.call(smallObj)

returnIdAndOffset(1) // prints 1000 (999 + 1)



// 
// example 2
// passing a starting "this" reference AS the first parameter of the call method
// 
function addToThis(a){
  return this.num + a;
}

function addAFew(a,b,c){
  return this.num + a + b + c;
}

let o = {
  num: 2
}

let bigO = {
  num: 14
}

let newNum = addToThis.call(o,4);
console.log({newNum})
// { newNum: 6 }

// params can be added as a list
let biggerNum = addAFew.call(o,2,3,4)
console.log({biggerNum})
// { biggerNum: 11 }
```


### Bind
Bind is a method that makes a new function.  
The 
```js
/*
  does NOT give the result when logged result
  below, returns a "bound" function
  binds the function to the bind recieved object
*/ 
function addToThis(a){
  return this.num + a;
}
let o = {
  num: 2
}
let bindOne = addToThis.bind(o,4);

let addToO = addToThis.bind(o);
console.dir(addToO)
console.dir(addToO.toString())
let addedTo0 = addToO(14)
console.log({addedTo0})


let personOne = {
  name: 'Joe',
  job: 'mailman'
};

let personTwo = {
  name: 'Wanda',
  job: 'wizard'
};

function talkAboutMe(favFood){
  console.log(`** TALK ABOUT ME THIS`)
  console.log(this)
  return `I'm ${this.name} and I'm a ${this.job} and my fav food is ${favFood}`
}

const aboutJoe = talkAboutMe.bind(personOne)


console.log(aboutJoe('pizza'))
const aboutWanda = talkAboutMe.bind(personTwo)
console.log(aboutWanda('salmon'))
```
### Apply
Appply is similar to the `.call()` method.  
The apply method, though, tales an array of arguments instead of a bunch of params:
```js
let o = {
  num: 2
}
let bigO = {
  num: 14
}
function addAFew(a,b,c){
  return this.num + a + b + c;
}
let argsArr = [3,4,5]
let bigAgain = addAFew.apply(o,argsArr);

console.log({bigAgain})
// { bigAgain: 14 }

let biggerArgsArr = [4,5,6]
let evenBig = addAFew.apply(bigO,biggerArgsArr);
console.log({evenBig})
// { evenBig: 29 }
```


## Functions have a prototype
