---
title: A Brief Introduction to Node and the Event Loop
slug: node/event-loop/in-action
author: Jake Laursen
excerpt: Notice some details about the event loop and ordering logic
tags: node, events, event loop, setTimeout, process, promises
parentDir: node/event-loop
order: 4
---

# The Event Loop - An Introducion
- [The Event Loop - An Introducion](#the-event-loop---an-introducion)
  - [Node Parses Some of the File For Errors](#node-parses-some-of-the-file-for-errors)
  - [How A Few Functions Interact With The Event Loop](#how-a-few-functions-interact-with-the-event-loop)
    - [setImmediate to do it later](#setimmediate-to-do-it-later)
    - [Compare setImmediate to setTimeout](#compare-setimmediate-to-settimeout)
      - [Introduce Multiple timeouts for further inspection](#introduce-multiple-timeouts-for-further-inspection)
      - [Including an I/O call](#including-an-io-call)
  - [Some Take-Aways](#some-take-aways)


`video: [Intro to the Event Loop](https://youtu.be/3o8pU6cLUNA) youtube: [Intro to the Event Loop](https://youtu.be/3o8pU6cLUNA)`

## Node Parses Some of the File For Errors
The first thing node does with a file is "parse" 
## How A Few Functions Interact With The Event Loop
Start with a simple node file - lets call it something like "eventloop.js" -
```js
console.log('start')
console.log('end')
```
Run the file in a terminal:
```bash
# run it
node eventloop.js

# output here
start
end
```

### setImmediate to do it later
Add in a setImmediate call:
```js
console.log('start')
setImmediate(() => {
  console.log('set immediate')
})
console.log('end')
```

Run the file in a terminal:
```bash
# run it
node eventloop.js

# output here
start
end
set immediate
```
ALERT!  

The ` end ` string logs before the setImmediate string. This is due to node's parsing of the entire "program", here the file. Node parses the entire file before finishing the event-loop logic of `setImmediate`.  
If you're reading this and "new" to event loop logic, this is officially the end of the beginning.

### Compare setImmediate to setTimeout
Throw in a setTimeout:  
```js
console.log('start');
setImmediate(() => {
  console.log('set immediate');
});
setTimeout(() => {
  console.log('timeout');
}, 0);
console.log('end');
```
Run it:
```bash
# run it
node eventloop.js

# output here
start
end
set immediate
timeout
```

Let's put the timeout + immediate in vice-versa order:
```js
console.log('start');
setTimeout(() => {
  console.log('timeout');
}, 0);
setImmediate(() => {
  console.log('set immediate');
});
console.log('end');
```

Run it:
```bash
start
end
set immediate
timeout
```

Maybe not that interesting so far.  

#### Introduce Multiple timeouts for further inspection
```js
console.log('start');

// round 1
setImmediate(() => {
  console.log('immediate');
});
setTimeout(() => {
  console.log('timeout');
}, 0);

// round 2
setImmediate(() => {
  console.log('immediate 2');
});
setTimeout(() => {
  console.log('timeout 2');
}, 0);
console.log('end');
```

Run it:
```bash
# run it
node eventloop.js

# output
start
end
immediate
immediate 2
timeout
timeout 2
```

Here! Node processed BOTH setImmediates before the timeouts! Interesting.  
Flip the order of the code - put the timeouts before the immediates && lets see what happens.  
Code:
```js
console.log('start');

// timeouts
setTimeout(() => {
  console.log('timeout');
}, 0);
setTimeout(() => {
  console.log('timeout 2');
}, 0);

// immediates
setImmediate(() => {
  console.log('immediate');
});
setImmediate(() => {
  console.log('immediate 2');
});

console.log('end');
```
returns
```bash
start
end
timeout
timeout 2
immediate
immediate 2
```
Interesting! Node processed the timeouts first here.  

Next, put the immediates first:  
```js
console.log('start');

// immediates
setImmediate(() => {
  console.log('immediate');
});
setImmediate(() => {
  console.log('immediate 2');
});

// timeouts
setTimeout(() => {
  console.log('timeout');
}, 0);
setTimeout(() => {
  console.log('timeout 2');
}, 0);

console.log('end');
```
This returns
```bash
start
end
timeout
timeout 2
immediate
immediate 2
```
This is also interesting! A take-away:  
(_note: A [complete collection of the take-aways](#some-take-aways) is at the end of this doc_)  
- managing timeouts + immediates can be complicated: managing the priority and order of those two seem interchangable (_at least at this trivial scale_)

#### Including an I/O call
Here, a moderately more complex event loop + setImmediate example:
- parse the file (_start + end logs_)
- setImmediate
- read a file + pass a callback (_do that later_)
- in the file-handling callback, call setTimeout && setImmediate

```js
console.log('start');

const fs = require('fs');
console.log(`fs has ${Object.keys(fs).length} keys`);

fs.readFile(__filename, () => {
  console.log('readFile')
  
  setTimeout(() => {
    console.log('readFile: timeout');
  }, 0);
  setImmediate(() => {
    console.log('readFile: immediate');
  });
});

setImmediate(() => {
  console.log('set immediate');
});

console.log('end');
```

This will return
```bash
start
fs has 101 keys
end
set immediate
readFile
readFile: immediate
readFile: timeout
```

A few take-aways to consider here:  
- node "parses" the whole file(s) before "running" the files
- node will complete the "require"(s) functionality before parsing the rest of the file
- in the I/O callback, node ran setImmediate before setTimeout, even with timeout value of 0 - looks like node FORCES immediates to run before timeouts SPECIFICALLY IN I/O Callbacks


## Some Take-Aways
- node "parses" the whole file(s) before "running" the files
- node will complete the "require"(s) functionality before parsing the rest of the file
- in the I/O callback, node ran setImmediate before setTimeout, even with timeout value of 0 - looks like node FORCES immediates to run before timeouts SPECIFICALLY IN I/O Callbacks