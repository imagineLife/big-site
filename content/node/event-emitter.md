---
title: EventEmitters Are A Beautiful API in Node
slug: node/event-loop/overview
author: Jake Laursen
excerpt: Register event listeners, call events with payloads, and express a program through events fundamentally
tags: server, node, events, eventEmitters, registering, calling, workflow
parentDir: node/event-emitters
order: 3
---

# Event Emitters 
According to the [Node Docs](https://nodejs.org/api/events.html#events)...
` Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called. `  

There is a core node module called `events`. This module includes a few parts:
```bash
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

- [Event Emitters](#event-emitters)
  - [Creating Event Emitters](#creating-event-emitters)
  - [Emitting Events](#emitting-events)
  - [Listening For Events](#listening-for-events)
    - [On](#on)
    - [prependListener](#prependlistener)
    - [once](#once)
  - [Removing Event Listeners](#removing-event-listeners)
    - [removeListener](#removelistener)
    - [removeAllListeners](#removealllisteners)
  - [Error Events](#error-events)
  - [Some Take-Aways](#some-take-aways)

## Creating Event Emitters

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

## Emitting Events

```js
dataHandler.emit("event-name", { ...eventParams });
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
- multiple fns can happen on an even, above the `handleParamsFn` and `handleParamsFnTwo` both happen

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

- when an event gets emitted with an error, the error event gets triggered/emitted

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