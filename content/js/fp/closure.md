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
    - [Global Scope Is Available In A Function Closure](#global-scope-is-available-in-a-function-closure)
  - [Perhaps Use Composition Over Inheritence](#perhaps-use-composition-over-inheritence)
    - [Inheritence Can Inherit Complications](#inheritence-can-inherit-complications)
    - [Composition Can Introduce Flexibility](#composition-can-introduce-flexibility)

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

### Global Scope Is Available In A Function Closure
Let's consider the `addThree` function, pand particularly how it differs from the `addTwo` function.  

**The global scope** is shared between the `addThree` and `addTwo` functions.  

**The function scope** is a bit smaller:
- there are 3 args of the function, `x`, `y` and `z`
- there are instructions to log the `a` variable
- **the `a` variable is not declared inside the `addThree` function** and the function "gets" the `a` variable from the "next scope" available to the function. Because the `a` variable is not declared as an arg in this `addThree` function like it is in the `addTwo` function, the `a` variable is "found" by the `addThree` function in the global scope.
- **these parts within the function represent the function's closure** 
  - a critical detail here is that the closure of this `addThree` function refers to the `a` global-scope variable. In pure functional programming, this is a bit of a "no no"


## Perhaps Use Composition Over Inheritence
### Inheritence Can Inherit Complications
The problem that inheritence brings with it's design is when a "low-level" (_or high level, base, whatever you feel like calling it_) inherited object needs changing, this can make "child" or inherited instances of the object different than expected.  

An example is that a multi-"level" class structure exists, and a class early on in the chain needs adjusting...
- **a "card" class** builds a card component
  - it includes a title and some content
  - **a "chart" class** inherits the card class, and takes as a prop a chart-type (and does chart things with it)
    - **a barChart class** inherits the chart class, and requires bar-chart details
  - **a table class** also inherits the card class, and does table-things with the card
  - 

Perhpas over time the table class expects to be full-screen-able. In order to get this out the door to customers, this is included in the table class.  
Perhaps over time, this same expand/collapse feature is requested on all "card" instances (_with more customer-friendly language_).  
Here lies the problem that inheritence brings along with it: does code get copied+pasted? Does code get cut + moved? How will every other instance of a "card" be expected to act? If this is delivered incrementally (_which might be the expectation_), the implementation may get even more complex.  

### Composition Can Introduce Flexibility
With composition (_more to come on this later_), the building of objects can be less "dependent" on each "parent" element && rather, well, a composition of details.  
One great one-liner comparing the two approaches:  
[_In general, inheritance could answer the “is-a” relationship, when composition “has-a”._](https://hackernoon.com/inheritance-vs-composition-in-javascript)  

An inherited class "is a" extension of another class which includes methods and state.  
A composed function "has a" bunch of methods and state, and is not an instance of other similar instances.  
