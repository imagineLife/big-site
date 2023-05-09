---
title: A Bit About The Order Of Code Execution
parentDir: js/
slug: js/control-flow
author: Jake Laursen
excerpt: Code Might Happen Out-Of-Order
tags: ["js","control flow","intro"]
order: 1
---

# Control Flow And Code Execution Order
Code gets written. In an order.  
Code gets run in, perhaps, a different order.  

What might get run "out of order" that might get written _in an order_? ... plenty of things like setTimeout, setInterval, network response logic, Promises & their response handling, etc.  



- [Control Flow And Code Execution Order](#control-flow-and-code-execution-order)
  - [Some Code Runs In Order](#some-code-runs-in-order)
  - [Callbacks Are Run Later](#callbacks-are-run-later)
  - [Promises Represent Asynchronous Operations](#promises-represent-asynchronous-operations)
  - [Async And Await Syntax Show Readable Async Logic](#async-and-await-syntax-show-readable-async-logic)
  - [AbortControllers Allow For Cancelling Async Logic](#abortcontrollers-allow-for-cancelling-async-logic)


## Some Code Runs In Order
Synchronous code matters. Code that runs in-order is critical to [the event-loop](/node/event-loop) (_which is present in both browser environments as well as in the node env_). Perhaps a TL;DR is that synchronous code runs "in order", and asynchronous code leverages the event loop to run snippets of code "later".    

## Callbacks Are Run Later
["callback"](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) is a term that represents a function in a specific use-case.  
A callback can be any function.  
**Like any function**, the callback gets "called" (_or "invoked"_) by something.  
**Unlike any function**, a callback gets "called" more "programmatically" by something like another function. Functions can be called more directly by a program writer (_`addTwo(2,3) calls addTwo "directly"`_). Callbacks, though, get called  another function.  
For a longer write-up, [check out another post I wrote](/js/callbacks), but here's a snippet to get the ball rolling: 
```js
// two different functions, addTwo and addThree
function twoTogether(a,b){ return a + b};

//  a "wrapper" function that has a callback as a function parameter
function plusFive(a, anonymousCallback){
  return anonymousCallback(a,5)
}

console.log(plusFive(3,twoTogether))
```
## Promises Represent Asynchronous Operations
## Async And Await Syntax Show Readable Async Logic
## AbortControllers Allow For Cancelling Async Logic 