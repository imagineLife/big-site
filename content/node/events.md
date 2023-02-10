---
title: Events, Emitters, and Listeners
slug: node/events
author: Jake Laursen
excerpt: Events in Node are Underrated!
tags: ["server", "node", "javascript", "events", "emitting", "listening"]
parentDir: node
order: 4
---

# Node And Event Emitters
- [Node And Event Emitters](#node-and-event-emitters)
  - [Emitting And Listening For Events](#emitting-and-listening-for-events)
  - [On Events](#on-events)
  - [Some Interesting bits](#some-interesting-bits)
    - [prependListener](#prependlistener)
    - [once](#once)
  - [Removing Event Listeners](#removing-event-listeners)
    - [removeListener](#removelistener)
    - [removeAllListeners](#removealllisteners)
  - [Error Events](#error-events)

This is not to be confused with the ideas involved in Event Driven Architecture.  
Node provides the `EventEmitter` that can be used to write programs that operate with events.  

```js
const { EventEmitter } = require("events");

// one way of making an event object
const dataHandler = new EventEmitter();

// another, maybe more 'traditional' way to do the same
class dataHandler extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    this.name = opts.name;
  }
}
```

## Emitting And Listening For Events

```js
// a var event name
const CONNECT_TO_DB = 'connectToDb';
const START_API = 'startApi';

// register some event handlers:
// two for CONNECT_TO_DB
// one for START_API
dataHandler.on(CONNECT_TO_DB, handleParamsFn);
dataHandler.on(CONNECT_TO_DB, logSomething);
dataHandler.on(START_API, startTheApi);

// call the event and pass some data
dataHandler.emit(CONNECT_TO_DB, dbParams);
```

## On Events
Events come from EventEmitter instances, a node built-in detail.  
Event names are strings.  
Events get event-handlers registered to them.  
Events get emitted. Emitted events can take parameters that get passed to the handler.  

## Some Interesting bits
- the ORDER of emitting && listening matters...
  - if `event.emit` is written before the `event.on` listener registration, the listener will not catch the emit! 
- multiple fns can happen on a single event even, above the `handleParamsFn` and `logSomething` both happen on connection to a db


### prependListener

`prependListener` is a method on the eventEmitter instance.   
This registers listeners at the _beginning_ of a (_potential_) listeners array (_if there are many listeners, each listener is an item in an array_).  

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

// this will only log "single handler was called!" once - not 3x
```

the event removes itself after it is called once. emitting the event _again_, with this `once` handler registered, will do nothing && throw no error.  

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
When an event gets emitted with an error, the error event gets triggered/emitted.  
This is critical to NOT crash the node process: without the `.on("error", errorHandler)` written, if an event gets some sort of error during its processing, the whole node process crashes.  

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
