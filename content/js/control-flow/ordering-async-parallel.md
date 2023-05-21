---
title: Ordering For Parallel Execution
parentDir: js/control-flow
slug: js/control-flow/ordering-parallel
author: Jake Laursen
excerpt: Running Async Code In Parallel
tags: ["js","control flow", "async", "callbacks"]
order: 5
---

# Ordering Async Code For Parallel Execution
- [Ordering Async Code For Parallel Execution](#ordering-async-code-for-parallel-execution)
  - [Some Async Functions To Run In "Parallel"](#some-async-functions-to-run-in-parallel)
  - [Run In Parallel And Output In Reverse Order](#run-in-parallel-and-output-in-reverse-order)
    - [A Look With More Logs](#a-look-with-more-logs)

## Some Async Functions To Run In "Parallel"
Here's an example of some async code.  
3 different functions, that take 3 different sets of time to complete.  

```js
const LONG_TIME = 500;
const MID_TIME = 250;
const SHORT_TIME = 125;

function longestFn(cb){
  setTimeout(() => {
    cb(null, `Longest wait done`)
  }, LONG_TIME)
}

function midFn(cb){
  setTimeout(() => {
    cb(null, `mid wait done`)
  }, MID_TIME)
}

function shortestFn(cb){
  setTimeout(() => {
    cb(null, `shortest wait done`)
  }, SHORT_TIME)
}

function printResOrErr(err, s){
  if (err) {
    console.error(err);
  } else { 
    console.log(s);
  }
}

```
- Above, 3 functions, each do almost the exact same thing
- each takes a callback as a param
- each calls the native `setTimeout` fn
- each has a different time to wait for the callback to run (_hopefully with functions named to match the timeout duration: mid, shortest and longest_)
- each logs a string

## Run In Parallel And Output In Reverse Order
One interesting detail could be to run them in order `longestFn`,`midFn`,`shortestFn` (_with printResOrErr as the callback to see the output_) and see how the output is actually in _reverse order_: shortest, mid, then longest.  
```js
longestFn(printResOrErr)
midFn(printResOrErr)
shortestFn(printResOrErr)
```
that will log `shortest wait done` then `mid wait done` then `longest wait done`.  
This is, perhaps, an "introductory" example of how the [event loop](/node/event-loop) can be leveraged.  
here, the `setTimeout` leverages the event loop to "wait" until the timeout duration runs before "running" the function that was passed to the setTimeout function.  

These will run in "parallel". "Parallel" here refers to the event-loop's perspective. The Event-Loop "sees" the 3 instances of `setTimeout` all running simultaneously. The event-loop is "ready" to do other logic while the 3x setTimeout calls are "waiting" in the background.  

This "parallel" detail is a critical aspect of the event-loop and the control flow of this example. 

### A Look With More Logs
One way to understand the flow control of this type of logic is good-ol' console.logging.  
Putting log statements, with numbers, can reveal the "order" that the code is being run.  
If you're confused about the order and have not done this type of exercise before, try putting `console.log(1)` in the first place that you think "runs", followed by `console.log(2)` in the second...until you've guessed at the run order.  
Here, maybe a "spoiler alert", is the run order with the logs in order so that they print from lowest to highest. This might be revealing!  

```js
const LONG_TIME = 500;
const MID_TIME = 250;
const SHORT_TIME = 125;

console.log('0');

function longestFn(cb) {
  console.log('2');
  setTimeout(() => {
    console.log('9');
    cb(null, `Longest wait done`);
  }, LONG_TIME);
}

function midFn(cb) {
  console.log('4');
  setTimeout(() => {
    console.log('8');
    cb(null, `mid wait done`);
  }, MID_TIME);
}

function shortestFn(cb) {
  console.log('6');
  setTimeout(() => {
    console.log('7')
    cb(null, `shortest wait done`);
  }, SHORT_TIME);
}

function printResOrErr(err, s) {
  if (err) {
    console.error(err);
  } else {
    console.log(s);
  }
}

console.log('1');
longestFn(printResOrErr);
console.log('3');
midFn(printResOrErr);
console.log('5');
shortestFn(printResOrErr);
```

Maybe a TL;DR on the order here:
- we won't "See" javascript "storing" the function creation in memory as part of the process running time 
  - - `0` and `1` get logged
- once js "gets to" the `longestFn()` command, js "enters" that fn
  - `2` gets logged
- the `longestFn()` fn contains a `setTimeout` which the logic of `setTImeout` irself is outside of the code written here. JS "stores" the content of the `setTimeout` function as a callback after the time, `LONG_TIME` has passed. The js "runner" is not "skipping" the contents of the setTimeout, rather "waiting" for that time to pass before "calling" the contents of it
- after the `longestFn()` code is run, including storing some callback info in the setTimout instance, the js "runner" moves on to the next line after `longestFn()`  
  - `3` is logged
- once js "gets to" the `midFn()` command, js "enters" that fn
  - `4` gets logged
- the `midFn()` fn contains a `setTimeout` which the logic of `setTImeout` irself is outside of the code written here. JS "stores" the content of the `setTimeout` function as a callback after the time, `MID_TIME` has passed. The js "runner" is not "skipping" the contents of the setTimeout, rather "waiting" for that time to pass before "calling" the contents of it
- after the `midFn()` code is run, including storing some callback info in the setTimout instance, the js "runner" moves on to the next line after `longestFn()`  
  - `5` is logged
- once js "gets to" the `shortestFn()` command, js "enters" that fn
  - `6` gets logged
- the `shortestFn()` fn contains a `setTimeout` which the logic of `setTImeout` irself is outside of the code written here. JS "stores" the content of the `setTimeout` function as a callback after the time, `SHORT_TIME` has passed. The js "runner" is not "skipping" the contents of the setTimeout, rather "waiting" for that time to pass before "calling" the contents of it
- the 3x `setTimeout` instances have "started" in the bg and the shortest instance gets completed, and its callback "called"
  - `7` is logged
- the middle-length instance of setTimeout gets completed, and its callback "called"
  - `8` is logged
- the longest-length instance of setTimeout gets completed, and its callback "called"
  - `9` is logged