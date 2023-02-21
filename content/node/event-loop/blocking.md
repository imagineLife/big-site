---
title: Blocking The Event Loop
slug: node/event-loop/blocking
author: Jake Laursen
excerpt: 
tags: ["server", "node", "event loop", "blocking", "single thread"]
parentDir: node
order: 5
---

# Blocking The Event Loop
`video: [Blocking The Event Loop](https://youtu.be/WaUshOoEHd4) youtube: [Blocking The Event Loop](https://youtu.be/WaUshOoEHd4)`   
Blocking the event loop is a thing. Blocking could also be thought of as "consuming". Some code "consumes" node's "brain" and takes up its ability to do other things.  
As an example of blocking the event loop, loops do the trick. "For" loops, "while" loops, "forEach" loops, etc.  
Put a bunch of loops in a rest api and then fire a bunch of requests at the api and watch the whole thing seem sluggish.  
Some things don't block the eventloop, and these things are node's saving grace. I/O work, in general, is what node passes off easily.  
Also, node offers a pretty robust [stream system](https://nodejs.org/docs/latest-v16.x/api/stream.html#stream) for dealing with chunks of data instead of waiting for large pieces of data to be passed around. Great stuff there.  

## Blocking The Event Loop Might Be A Scaling Problem
When the EventLoop is "blocked", or consumed by logic, no other process can happen in the node server.  
