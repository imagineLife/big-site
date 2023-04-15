---
title: Intro To Data Types
parentDir: js/intro
slug: js/intro/data-types
author: Jake Laursen
excerpt: Consider a Real-World Promise
tags: ["js","data", "introduction"]
order: 1
---

# Data Types In JavaScript
Javascript stores data, information, in a bunch of different ways.  
Let this be a brief intro into datatypes.  
Spending most time in react+node+db interfaces, I perhaps have not dug terribly deep into data types.  

One particular detail I find interesting is that data types are usually referred to by an instance and in my experience are often ignoring or missing the Object definition of the data type.  

## Primitives Are The Root
Primitive data types represent the "lowest level" types of data in JS.  
Other data types exist & are more-or-less composed of these datatypes.  
### Numbers 
```js
321
// 321

Number("432")
// 432

+"3"
// 3

```

### Strings
There is a String Object, and there are String instances.  
Here, a look at some instances of strings - 
```js
const thisString = `This is a string`;
const thisStringTwo = "This is a string";
const thisStringThree = 'This is a string';
const thisStringFour = new String('This is a string');


// 
// Strings & Some Of Their Methods
// 

thisString.charAt(3)
// 's'

thisString.length
// 16

const SUBSTRING_START_INDEX = 3
const SUBSTRING_END_INDEX = 9
thisString.substring(SUBSTRING_START_INDEX, SUBSTRING_END_INDEX);
// 's is a'

let newString = thisString.replace("is a", 'is definitely a')
// 'This is definitely a string'

thisString.toUpperCase()
// 'THIS IS A STRING'

thisString.toLowerCase()
// 'this is a string'
                                         
thisString.concat(' with some more text')
// 'This is a string with some more text'

thisString.charCodeAt(3)
// 115                 

thisString.split(' is ')
// [ 'This', 'a string' ]

```
### Boolean
```js
true
// true

false
// false

Boolean()
// false
Boolean(3)
// true
Boolean("water")
// true
Boolean(false)
// false
Boolean(undefined)
// false
Boolean(null)
// false

```
### Symbols
```js
```
### Undefined & Null
```js
// 
// UNDEFINED: when a variable is DECLARED but has no value assigned to it
// 
// let x;
x
// undefined

typeof undefinedVariableHere
// 'undefined'



// 
// NULL: well...something that is not there
// 
null

```

### BigInts
BigInt, for the layperson, is meant to represent large numbers (big integers).  
A bit more technically, BigInt can represent large numbers more precisely than integers.  
```js
// 15 9s
let x = 999999999999999;
// 999999999999999

// 16 9s
let y = 9999999999999999;
// 10000000000000000

let bigNine = BigInt(999999999999999999)
// 1000000000000000000n
```


## Composed Data Types - or Objects
"Composed" is not an official term (_I don't believe_). Many documents refer to how all data types that are not primitives are objects.  
Each data type does have unique properties, use-cases, syntaxes, etc.  


### Objects
Objects are chunks of key-value pairs.  
The object data type does have [built-in methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#static_methods) too.  

Data in objects can be accessed by key name. 
```js
const me = {
  name: "Jake",
  age: Infinity,
  hobbies: ["roasting coffee", "writing", "learning"]
}

/*
  this object instance is called "me"
  the keys in the obejct are name,age,hobbies
*/

console.log(Object.keys(me))
// [name,age,hobbies]

console.log(me.name)
// Jake

console.log(me.age)
// Infinity

```
### Functions Are Objects That Can Do Things
Functions do things.  
[Functional programming](https://en.wikipedia.org/wiki/Functional_programming) is (_by the name, perhaps_) REALLY into functions - attempting to make everything in code a function or a result of a function.  
I have more on functions [starting here](/js/fp/overview).


#### Perform Actions On Paramters
```js
// a function: takes a parameter, here referred to as "stringHere"
function logString(stringHere){ console.log(stringHere)}

// can get used like this
logString("my example string")
// should log to the console "mu example string"
```

#### Take Other Functions As Arguments
```js
// 
// Functions that can pass another function as a parameter
// 
function logWithPrefix(myString,loggerFunction){
  return loggerFunction(`Here is a prefix for ${myString}`)
}
// here, pass the function from above, the "logString" function, as an argument TO the logWithPrefix function
// perhaps a glimpse into functional porogramming

logWithPrefix('my test string', logString)
```


### Be Parts Of Other Data Types
```js
// as the value of an object key/value pair
const objWithFunction = {
  add: (a,b) => a + b
}

// can be called like...
const result = objWithFunction.add(3,4)
console.log(result)
// should show 7
```

### Arrays
```js

```
### Dates  
```js

```