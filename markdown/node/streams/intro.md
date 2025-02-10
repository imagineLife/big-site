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

- [Streams](#streams)
  - [Streams represent data flowing](#streams-represent-data-flowing)
    - [Streams Compare to Buffering larger data elements](#streams-compare-to-buffering-larger-data-elements)
  - [Streams Can Be Readable](#streams-can-be-readable)
  - [Streams Can Be Writable](#streams-can-be-writable)
  - [Streams Can Be Writable and Readable - Duplex](#streams-can-be-writable-and-readable---duplex)
  - [Streams Handle Data Types of Buffers, Strings, and Objects](#streams-handle-data-types-of-buffers-strings-and-objects)
  - [Streams End, Consider the "finished" method](#streams-end-consider-the-finished-method)


## Streams represent data flowing
At first glance, streams in node might be comparable to real-world streams. Data is "flowing" in a continuous "stream". We as developers get to interact with the "stream" of data as it flows.  

I think that the real world comparison might not be the easiset way to consider streams in node.  
Streams in node interactive with the data through "chunks". Node has a built-in [buffering system](/node/buffers) that "capture" the "chunks" of data (_more on this later, perhaps!_).  
To compare this to a flowing river, streams in node might be more like using a bucket to catch a small amount of the data and do work on that small amount, 1 bucket, or chunk, at a time.  

### Streams Compare to Buffering larger data elements
Taking the `fs` module as an example, `fs` is used to interact with the file-system. `fs.readFile` will read contents of a file, and put the file contents in a buffer (_memory_), and the entire file content can be used in code. The larger the file, the larger the buffer.  
`fs.createReadStream`, though, will create a [readable stream](/node/streams/readable) that will get the file in "chunks" and only keep a "chunk" in memory, one-at-a-time.  
When a file is larger than the "chunk" size of the readable stream, streaming the reading of the file with `fs.createReadStream` will consume less memory than buffering (_storing in memory_) the whole file with `fs.readFile`.   
Leveraging streams can minimize the memory footprint of a program. Streams also include a [pipe method](/node/streams/piping), which passes along the chunk from one stream to another stream. In an example like this `fs` example, the file could get read with the readable stream from `fs.createReadStream`, stored in small chunks, then piped to an http response stream.

## Streams Can Be Readable
Readable streams "get" data from a datasource and we as devs can interact with the "chunks" of data through a readable stream.  
[More on Readable Streams Here](/node/streams/readable)

## Streams Can Be Writable
Writables streams represent _sending data_ somewhere - to a file, through an http response, etc. We as devs can send data in "chunks" using a writable stream.  
[More on Writable Streams Here](/node/streams/writable)

## Streams Can Be Writable and Readable - Duplex
Writables streams represent _sending data_ somewhere - to a file, through an http response, etc. We as devs can send data in "chunks" using a writable stream.  
[More on Duplex Streams Here](/node/streams/duplex)

## Streams Handle Data Types of Buffers, Strings, and Objects
The default "mode" of stream data-handling is to handle Buffers and strings.  
Node does, though, offer an [object mode](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#object-mode) where a stream in object mode can interact with javascript values: `null` is not included as a valid type that streams work with.  


## Streams End, Consider the "finished" method
Streams end with several events:
- `close`
  - writable
  - readable
- `error`
  - writable
  - readable
- `finish`
  - writable
- `end`
  - readable 

Streams also can use the `finished` function, covered a bit in the [duplex streams section](/node/streams/duplex/#an-example-using-the-finished-utility).