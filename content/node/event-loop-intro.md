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
The event loop matters for process synchronicity, asynchronicity, program workflow management, process availability (_normally discussed in the context of a web api_), and more.  

## The Basis of Node is an EventEmitter
I wrote more on the EventEmitter module and some examples [in another post](/node/event-loop/event-emitters)