---
title: "JavaScript Promises: A Less-Technical Explanation"
parentDir: js
slug: js/promises-intro
author: Jake Laursen
excerpt: Consider a Real-World Promise
tags: ["js","promises"]
order: 1
---

# Promises In Simple Language
- [Promises In Simple Language](#promises-in-simple-language)
  - [Between Two Parties](#between-two-parties)
    - [The Real World](#the-real-world)
    - [In Code](#in-code)
- [Promises Have 3 "States"](#promises-have-3-states)
  - [Pending](#pending)
  - [Fulfilled](#fulfilled)
  - [Rejected](#rejected)

"Can you take the trash out before I get back?"  
_"...I Promise - I will  take the trash out before you get back to the apartment."_  
"What are the things we should prepare for the team while I'm away?"  
_I Promise - I will get back to you on how we can plan for your time away from the office._"  

## Between Two Parties
### The Real World
In The Real World, promises are between the promise-requester and the promise-maker.  
The one who _makes the promise_ to take the trash out is the _promise-maker_. The promise-maker makes the promise to the other party.    
The one who _waits for the result of the promise_ is the _promise-requester_.  
The Promise-requester requests the promise from the other party.  
During the time that the promise is either being completed or not, the "thing" that the requester has is the promise itself (_maybe a bit abstract here_).  
During the time that the promise is either being completed or not, the promise-maker is doing all of the work related to the promise.  

### In Code
In JavaScript, the two parties might be a little more "abstract". The promise-maker, in code, is the `Promise` feature in JavaScript. The `Promise` feature in JavaScript will do all of the work related to the promise.  
In JavaScript, the process/service/program being run is the promise-requester.  
I, as a JS writer, write into my program a request for a promise to be fulfilled. JS, itself, has the built-in `Promise` utility to take care of the work.  

# Promises Have 3 "States"
JavaScript implements 3 "states" of a promise - perhaps like the real-world.  

## Pending  
Promises in a pending state are not completed. When I've made a promise to take the trash out while my roomate is gone, the promise is pending until my roomate comes back and finds out the result of the promise.  

## Fulfilled
Perhaps this is the ideal - a promise, after pending, gets completed!  
In JS, the promise returns any information requested, as well.  

## Rejected
Sometimes promises are incomplete. The `Promise` mechanism provides this `rejected` state option.   