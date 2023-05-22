---
title: EventEmitters Are A Beautiful API in Node
slug: node/event-loop/event-emitters
author: Jake Laursen
excerpt: Register event listeners, call events with payloads, and express a program through events fundamentally
tags: ["server", "node", "events", "eventEmitters", "workflow"]
parentDir: node/event-loop
order: 3
---

# Event Emitters 
According to the [Node Docs](https://nodejs.org/api/events.html#events)...  
"_Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called._"

- [Event Emitters](#event-emitters)
  - [Initialize an Event Emitter](#initialize-an-event-emitter)
  - [TLDR: A Trivial Example](#tldr-a-trivial-example)
  - [An Overview of the Events Module](#an-overview-of-the-events-module)
  - [Creating Event Emitters](#creating-event-emitters)
  - [Listening For Events](#listening-for-events)
    - [On](#on)
    - [prependListener](#prependlistener)
    - [once](#once)
  - [Emitting Events](#emitting-events)
  - [Removing Event Listeners](#removing-event-listeners)
    - [removeListener](#removelistener)
    - [removeAllListeners](#removealllisteners)
  - [Error Events](#error-events)
  - [Some Take-Aways](#some-take-aways)

## Initialize an Event Emitter
Here's 3 ways to initialize the Event Emitter:
```js
// NOTE: this default export from "events" is not really recommended by the node docs
const { EventEmitter } = require('events')


class MyEmitter extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    this.name = opts.name;
  }
}
const newE = new MyEmitter()
myEmitter.on('dog', (d) => console.log('on dog'));
myEmitter.emit('dog');

const lastEv = new EventEmitter();
lastEv.on('water', (d) => console.log('on water'));
lastEv.emit('water');
```

## TLDR: A Trivial Example
A trivial non-functional example, briefly illustrating the eventEmitter in action

```js
const { EventEmitter } = require("events");

// initialize
const dataHandler = new EventEmitter();

/*
  two functions
*/ 
function cleanUpTheData(arr){
  const cleaned = arr.filter(d => d)
  dataHandler.emit('sendData',cleaned)
}

function sendData(arr){
  console.log('do something with the data here')
  console.log(arr)
}

/*
  register some events to handle
*/ 
dataHandler.on('cleanUp', cleaUpTheData)
dataHandler.on('sendData', sendData)

// kick off the logic here!
dataHandler.emit('cleanUp', [1,'apple',null,undefined,321])
```
The parts of the events module to start with - 
- `EventEmitter`: the heart of the consumable event module
- `on`: creating event "handlers"
- `emit`: calling an event by name

The primary goals that this doc will cover are to
- create an Event-Managing object that 
  - registers events, within a program, to "listen" for other parts of the program to emit the same event
  - emit events, by name, with data passed along, to trigger the event listener to respond

## An Overview of the Events Module
There is a core node module called `events` which is the source for making events. This module includes a few parts:
```bash
# in a node repl
> const e = require('events')
Object.keys(e)
[
  'once',
  'on',
  'getEventListeners',
  'EventEmitter',
  'usingDomains',
  'captureRejectionSymbol',
  'captureRejections',
  'errorMonitor',
  'defaultMaxListeners',
  'setMaxListeners',
  'init',
  'listenerCount'
]
```

## Creating Event Emitters
The EventEmitter itself can be used to create an instance of its event-managing object

```js
const { EventEmitter } = require("events");

// one way of making an event object
const dataHandler = new EventEmitter();

// a more 'traditional' way
class dataHandler extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    this.name = opts.name;
  }
}
```

## Listening For Events
### On
The most-used event listener registration may be the `on` method.  
With the eventEmitter object, the on is like describing what happens when an event gets "called" or "emitted" or "triggered".
```js
dataHandler.on("event-name", handleParamsFn);
dataHandler.on("event-name", handleParamsFnTwo);
```

- the ORDER of emitting && listening matters...
  - if emit is written before the listener, the listener will not catch the emit
- multiple fns can happen on an even, above the ` handleParamsFn ` and ` handleParamsFnTwo ` both happen

### prependListener

- a method on the eventEmitter
- registers at the beginning of the listeners array for the given event
- can be written out-of-order, and will ALWAYS 'handle' an event even when the `.on` is written after prependListener

```js
dataHandler.prependListener("event-name", prependFn);
```

### once

```js
function singleHandle(){
  console.log('single handler was called!')
}
dataHandler.once("single-event-instance-handler", singleHandler);
dataHandler.emit("single-event-instance-handler");
dataHandler.emit("single-event-instance-handler");
```

- the event removes itself after it is called once
- emitting the even _again_ will do nothing && throw no error

## Emitting Events
Emitting events might be the "easiest" part.  
- use the eventEmitter instance
- use the `emit` method
- pass the emit method 2 things:
  - a string of the event name
  - an optional payload of data for the event handler to use
```js
dataHandler.emit("event-name", { ...eventParams });
```

## Removing Event Listeners

### removeListener

- used to remove a listener that has been registered
- can take 2 args/params
  - event name
  - event listener fn

```js
dataHandler.removeListener("event-name", handleParamsFnTwo);
```

### removeAllListeners

```js
dataHandler.removeAllListeners("event-name");
```

## Error Events

As the [node docs read](https://nodejs.org/docs/latest-v16.x/api/events.html#error-events), "_...If an EventEmitter does not have at least one listener registered for the 'error' event, and an 'error' event is emitted, the error is thrown, a stack trace is printed, and the Node.js process exits....As a best practice, listeners should always be added for the 'error' events._"  

Writing Events? Write an error event handler.  

```js
const { EventEmitter } = require("events");
const thisTry = new EventEmitter();

// keep process alive
process.stdin.resume();

thisTry.on("error", (err) => {
  console.log("got error:", err.message);
});

thisTry.emit("error", new Error("dummy err message"));
```


## Some Take-Aways
- EventEmitters can be seen with a few primary tools
  - the ` .on ` method, for describe an event and what to do when the event is emitted/called/triggered
  - the ` .emit ` method, for emitted/calling/triggering an event by name, and optionally passing a payload of data
  - the special case of the ` error ` event should always ve taken care of in code, explicitly