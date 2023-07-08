---
title: Learn The Basics Of Streams
slug: node/streams
author: Jake Laursen
excerpt: Streams are one of Node's most interesting and impactful features
tags: ["node", "streams"]
parentDir: node
order: 1
---


# Streams
The [node stream api](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html) is at the "core" of many node apis.  
The stream interface is built on top of the [eventEmitter](/node/events) api, where streams can get and receive events by name.  
Streams are either readbable, writable, or duplex (_both readable and writable_). Transform streams are also available that are a type of duplex stream.  

## Streams represent data flowing
At first glance, streams in node might be comparable to real-world streams. Data is "flowing" in a continuous "stream". We as developers get to interact with the "stream" of data as it flows.  

I think that this is not the easiset way to consider streams in node.  
Streams in node are interactive through "chunks". Node has a built-in [buffering system](/node/buffers) that "capture" the streamed data in "chunks" (_more on this later, perhaps!_).  
## Streams Can Be Readable
Readable streams "get" data from a datasource and we as devs can interact with the "chunks" of data through a readable stream.  
[More on Readable Streams Here](/node/streams/readable)

## Streams Can Be Writable
Writables streams represent _sending data_ somewhere - to a file, through an http response, etc. We as devs can send data in "chunks" using a writable stream.  

## Streams Handle Data Types of Buffers, Strings, and Objects
The default "mode" of stream data-handling is to handle Buffers and strings.  
Node does, though, offer an [object mode](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#object-mode) where a stream in object mode can interact with javascript values: `null` is not included as a valid type that streams work with.  


