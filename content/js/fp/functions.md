---
title: Functional Programming
parentDir: js/fp
slug: js/fp/overview
author: Jake Laursen
excerpt: More On Functions
tags: ["js","functions", "functional programming"]
order: 1
---

# Functions For Everything
The principle of fp is that everything is a function.  
Creating data? use a function.  
need an object? get it from a function.  
Have repeatative tasks? wrap them in functions.  
Need a function? wrap it in a function that creates and returns functions.  

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

