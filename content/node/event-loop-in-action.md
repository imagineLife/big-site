---
title: See How Node Handles Events With The Event Loop
slug: node/event-loop/in-action
author: Jake Laursen
excerpt: Notice some 
tags: node, events, event loop, setTimeout, process, promises
parentDir: node/event-loop
order: 4
---

# Dig In To An Event-Loop Investigation

- [Dig In To An Event-Loop Investigation](#dig-in-to-an-event-loop-investigation)
  - [setImmediate to do it later](#setimmediate-to-do-it-later)
  - [Compare setImmediate to setTimeout](#compare-setimmediate-to-settimeout)
    - [Introduce Multiple timeouts for further inspection](#introduce-multiple-timeouts-for-further-inspection)
    - [Including an I/O call](#including-an-io-call)
  - [Some Take-Aways](#some-take-aways)


Start with a simple node file.
```js
console.log('start')
console.log('end')
```
The output will read  the 'start' then the 'end'.  

## setImmediate to do it later
Add in a setImmediate call:
```js
console.log('start')
setImmediate(() => {
  console.log('set immediate')
})
console.log('end')
```

Now, the output will read
```bash
start
end
set immediate
```

## Compare setImmediate to setTimeout
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
This will return
```bash
start
end
set immediate
timeout
```
Let's put the timeout + immediate in vice-cersa order:
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
This will return
```bash
start
end
set immediate
timeout
```
Maybe not that interesting so far!

### Introduce Multiple timeouts for further inspection
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
This returns...
```bash
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
Interesting! Node processed the timeouts first!  
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
- managing timeouts + immediates can be complicated: managing the priority and order of those two seem interchangable (_at least at this trivial scale_)

### Including an I/O call
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

A few take-aways to consider here so far:  
(_note: A [complete collection of the take-aways](#some-take-aways) is at the end of this doc_)  
- node "parses" the whole file(s) before "running" the files
- node will complete the "require"(s) functionality before parsing the rest of the file
- in the I/O callback, node ran setImmediate before setTimeout, even with timeout value of 0 - looks like node FORCES immediates to run before timeouts SPECIFICALLY IN I/O Callbacks


## Some Take-Aways
- node "parses" the whole file(s) before "running" the files
- node will complete the "require"(s) functionality before parsing the rest of the file
- in the I/O callback, node ran setImmediate before setTimeout, even with timeout value of 0 - looks like node FORCES immediates to run before timeouts SPECIFICALLY IN I/O Callbacks