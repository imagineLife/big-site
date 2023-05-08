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

What might get run "out of order" that might get written _in an order_? ... plenty of things....
- setTimeout
- setInterval
- network response logic
- Promises & their response handling

- [Control Flow And Code Execution Order](#control-flow-and-code-execution-order)
  - [Some Code Runs In Order](#some-code-runs-in-order)
  - [Callbacks Are Run Later](#callbacks-are-run-later)
  - [Promises Represent Asynchronous Operations](#promises-represent-asynchronous-operations)
  - [Async And Await Syntax Show Readable Async Logic](#async-and-await-syntax-show-readable-async-logic)
  - [AbortControllers Allow For Cancelling Async Logic](#abortcontrollers-allow-for-cancelling-async-logic)


## Some Code Runs In Order
Synchronous code matters. Code that runs in-order is critical to [the event-loop](/node/event-loop) (_which is present in both browser environments as well as in the node env_). Perhaps a TL;DR is that synchronous code runs in the order it is written.  

## Callbacks Are Run Later
## Promises Represent Asynchronous Operations
## Async And Await Syntax Show Readable Async Logic
## AbortControllers Allow For Cancelling Async Logic 