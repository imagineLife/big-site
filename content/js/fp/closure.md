---
title: Functions, Closure, and Scope
parentDir: js/fp
slug: js/fp/closure-scope
author: Jake Laursen
excerpt: 
tags: ["js","functions", "functional programming", "closure"]
order: 5
---

# Functions and Closure And Scope
[Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) represent code and its ability to access other parts of code. Closure is a result of different [scopes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#closure_scope_chain) at play.   

- [Functions and Closure And Scope](#functions-and-closure-and-scope)
  - [Scope Is About What Is Available Within Reach](#scope-is-about-what-is-available-within-reach)
    - [JavaScript Has A Global Scope](#javascript-has-a-global-scope)
    - [JavaScript Has A Module Scope](#javascript-has-a-module-scope)
    - [JavaScript Has A Function Scope](#javascript-has-a-function-scope)
  - [Closures Represent Scope Encapsulation](#closures-represent-scope-encapsulation)
    - [Functional Closure Takes Precedence Over Global Scope Variables](#functional-closure-takes-precedence-over-global-scope-variables)
    - [Global Scope Is Available](#global-scope-is-available)

## Scope Is About What Is Available Within Reach
Maybe like life, something are in-scope and some things are out-of-scope.  
Changing a tire on a car means certain things are in scope: using a tire-iron, a jack, dealing with lug nuts, potentially a tire-pressure gague and a pressurizing device. The task, in this case, defines the scope. There is a broader scope, perhaps the drive-train, whic encapsulates the tires, but also includes more. There is an even broader scope, perhaps the entire vehicle, which summarizes all of the child components.   

JavaScript has [scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope), too.  

### JavaScript Has A Global Scope
When running JavaScript, the global scope includes _everything_.  
Front-end developers may not be intimately familiar with all of the details of what is available in the global scope of a browser context.  
Server-Side developers may not be intimately familiar with all of the details of what is available in the global scope of a node context.  

### JavaScript Has A Module Scope
JavaScript code can be run in a module. Code in a module is scoped to that module.  

### JavaScript Has A Function Scope
JavaScript code can be run in a function.  
Code inside the function is scoped to that function.  
This functional scope is critical to master for implementing a funcitonal programming style.  

## Closures Represent Scope Encapsulation
Take for example a function that is part of a process:
```js
let a = 123;
function addTwo(a,b){ 
  console.log("a inside addTwo: ",a)
  return a + b
}

let result = addTwo(2,3)
// a inside addTwo:  2

console.log(result)
// 5

console.log(a)
// 123


function addThree(x,y,z){
  console.log("a inside addThree: ",a)
  return  x + y + z
}

console.log(addThree(4,5,6))
// a inside addThree: 123
// 15
```
### Functional Closure Takes Precedence Over Global Scope Variables
Let's start by looking at the `addTwo` function.  
In this trivial example there are a few things to note: the global scope, the function scope, and the variable(s) `a`.  
**The global scope** has a few pieces:
- the `a` variable declaration
- the `addTwo` variable declaration
- the running of `addTwo(2,3)` stored in a variable called `result`
- the instruction to `console.log()` the `result` value  
- the declaration of the `addThree`
- the instructions to log the results of the `addThree(4,5,6)` (_[addThree is covered in more depth below](#global-scope-is-available)_)

**The function scope** has a few pieces:
- "knowledge" of 2 arguments of the function, here named `a` and `b`
- the instructions to log the `a` parameter
- the instruction to return `a + b` as a result of running this function
- **these parts within the function represent the function's closure**   

The `a` variable is the critical piece to master when understanding scope and closure:
- in the global scope, a is equal to `123`
- in the function's closure, `a` is equal to whatever the first parameter passed to the calling of the `addTwo` function - in the case above, it is equal to `2`
- **the value of a inside of addTwo only exists as the argument value, not as the global value**  

What about `addThree`? [See below](#global-scope-is-available)

### Global Scope Is Available 
Let's consider the `addThree` function, pand particularly how it differs from the `addTwo` function.  

**The global scope** is shared between the `addThree` and `addTwo` functions.  

**The function scope** is a bit smaller:
- there are 3 args of the function, `x`, `y` and `z`
- there are instructions to log the `a` variable
- **the `a` variable is not declared inside the `addThree` function** and the function "gets" the `a` variable from the "next scope" available to the function. Because the `a` variable is not declared as an arg in this `addThree` function like it is in the `addTwo` function, the `a` variable is "found" by the `addThree` function in the global scope.
- **these parts within the function represent the function's closure** - a critical detail here is that the closure of this `addThree` function refers to a global-scope variable. In pure functional programming, this is a bit of a "no no" and 
