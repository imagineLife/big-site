---
title: A Bit About The Order Of Code Execution
parentDir: js/
slug: js/control-flow
author: Jake Laursen
excerpt: Code Might Happen Out-Of-Order
tags: ["js","control flow","intro", "async"]
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
  - [Asynchronous Code Can Allow For More Activity](#asynchronous-code-can-allow-for-more-activity)


## Some Code Runs In Order
Synchronous code matters. Code that runs in-order is critical to [the event-loop](/node/event-loop) (_which is present in both browser environments as well as in the node env_). Perhaps a TL;DR is that synchronous code runs "in order", and asynchronous code leverages the event loop to run snippets of code "later".    

## Callbacks Are Run Later
["callback"](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) is a term that represents a function in a specific use-case.  
A callback can be any function.  
**Like any function**, the callback gets "called" (_or "invoked"_) by something.  
**Unlike any function**, a callback gets "called" more "programmatically" by something like another function. Functions can be called more directly by a program writer (_`addTwo(2,3) calls addTwo "directly"`_). Callbacks, though, get called  another function.  
For a longer write-up, [check out another post I wrote](/js/control-flow/callbacks), but here's a snippet to get the ball rolling: 
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

## Asynchronous Code Can Allow For More Activity
[Code Running in order](#some-code-runs-in-order) matters.  
First, "A" happens. "A" could be reading files from a file-system, making a network request to an external service, making a db request, etc.  
Then, "B" can happen. "B" could be "doing something" with the results of "A": parsing & prepping for another step, "C".  

Synhronicity might not really matter when the entire process is happening once.  

In the case of an [http api](/node/http/intro/), though, many web clients may be trying to do similar things. like repeating "A" and "B".  
Syncrhonously, (_with the help of the [event loop](/node/event-loop/)_), the order of many web clients trying to do "A" and "B" could look like....
```bash
- server gets request from CLIENT_X
  - server starts "A"
    - will take 1s
  - server gets request from CLIENT_Y before "A" is done
    - server makes CLIENT_Y wait...
  - server finishes "A" and starts process "B"
    - total time? 1s
    - will take 1s
  - server finishes process "B" and returns info to CLIENT_X
    - total time? 2s
  - server starts "A" for client_Y
    - will take 1s
  - server finishes "A" and starts process "B"
    - total time? 3s
    - will take 1s
  - server finishes process "B" and returns info to client_y
    - total time? 4s
```

Total time above? say something like 4s.  

Synchronous code, though, leverages the event loop differently.  
Synchronous apis "hand off" parts of logic so that the main event loop is not ["blocked"](/node/event-loop/blocking/).  
What does this look like? How does this compare to the previous example?
```bash
- server gets request from CLIENT_X
  - server starts "A"
    - will take 1s
  - server gets request from CLIENT_Y before "A" is done, .2s later
    - server starts "A" for client_Y
    - will take 1s
  - server finishes "A" for client_X and starts process "B"
    - total time? 1s
    - will take 1s
  - server finishes "A" for client_Y and starts process "B"
    - total time? 1.2s
    - will take 1s
  - server finishes "B" for client_X and returns some data
    - total time? 2s
  - server finishes "B" for client_Y and returns some data
    - total time? 2.2s
```
Total time above? 2.2s.  
Same logic, just handled "asynchronously".  