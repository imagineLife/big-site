---
title: An Overview of the NodeJS Event Loop
slug: node/event-loop/overview
author: Jake Laursen
excerpt: The power of the Event Loop can lead devs to build faster more reliable node processes
tags: server, node, event loop, overview, call stack, queue, process
parentDir: node/event-loop
order: 2
---

# The Event Loop
Node, itself, has some [great docs](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) on the event loop.  
The event loop matters for process synchronicity, asynchronicity, program workflow management, process availability (_normally discussed in the context of a web api_), and more.  

This doc will be in the context of an http REST API: 
- receiving calls from clients through http requests
- fetching & processing some data from data sources
- returning results to the requester

- [The Event Loop](#the-event-loop)
  - [Everything Runs In The Event Loop](#everything-runs-in-the-event-loop)
    - [Get Close to the loop with nextTick](#get-close-to-the-loop-with-nexttick)
  - [The Event Loop Relies On EventEmitters](#the-event-loop-relies-on-eventemitters)
  - [The Event Loop Is a Queue](#the-event-loop-is-a-queue)
  - [](#)

## Everything Runs In The Event Loop
In the "background" of a node process, a REST API server in this case, is a loop that node is running.  
Node is waiting for events to happen, then processing the events, and returning to the waiting state - restarting this loop.  
This loop of events is what folks talk about when referencing the event loop.  

### Get Close to the loop with nextTick
[` process.nextTick `](https://nodejs.org/docs/latest-v16.x/api/process.html#processnexttickcallback-args) might be the smallest unit that a developer can interact with in the event loop.  


## The Event Loop Relies On EventEmitters
[In another post](/node/event-loop/event-emitters) are more details on the EventEmitter, but in a summary:
- Much of the core node apis (modules) are built using events
- An instance of an EventEmitter, from the _events_ module, returns are objects
- An instance of an EventEmitter, in fundamental use, provide us with 2 primary features
  - named event registration: we tell an event emitter what to do when the even emitter gets called with _named events_
  - event emission: we tell an event emitter when to "call", or emit, an event - and we can pass along some data too!

## The Event Loop Is a Queue

## 
A detail about node is how it is "single-threaded". The single-thread that everyone talks about is this event loop.

