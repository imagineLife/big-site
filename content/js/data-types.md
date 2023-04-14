---
title: Intro To Data Types
parentDir: js/data-type-intro
slug: js/
author: Jake Laursen
excerpt: Consider a Real-World Promise
tags: ["js","data", "object", "array", ]
order: 1
---

# Data Types In JavaScript
Javascript stores data, information, in a bunch of different ways.  
Let this be a brief intro into datatypes.  

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
### BigInts
```js

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
```


## Composed Data Types - or Objects
"Composed" is not an official term (_I don't believe_). Many documents refer to how all data types that are not primitives are objects.  
Each data type does have unique properties, use-cases, syntaxes, etc.  


### Objects
### Functions
### Arrays
### Dates  
