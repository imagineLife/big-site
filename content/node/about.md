---
title: An Overview Of Node
slug: node/overview
author: Jake Laursen
excerpt: JavaScript on the Server and more
tags: ["server", "node", "javascript", "overview", "idea", "backend"]
parentDir: node
order: 1
---

# JavaScript on the Server

- [JavaScript on the Server](#javascript-on-the-server)
- [A Robust built-In Module Ecosystem](#a-robust-built-in-module-ecosystem)
  - [A Few Basic Commands](#a-few-basic-commands)
    - [Get The Node Version](#get-the-node-version)
    - [Get The NPM Version](#get-the-npm-version)
  - [Build An HTTP Server](#build-an-http-server)
  - [Coming Soon](#coming-soon)

I was introduced to [Node](https://nodejs.org/en/) as "_JavaScript on the Server_".  
Node on the server allows for 1 cross-application lanugage, [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), to be writable in a web browsers and on servers.

# A Robust built-In Module Ecosystem

Not only does node give us the ability to run JavaScript on the server, but Node has built-in "modules" that JavaScript in the browser does not have:

- **fs** gives file-system access
- **http** & **https** gives server-creation ability
- **cluster** allows for launching node while leveraging several cores of a system
- **child_process** allows for "spawning" other processes besides the main running thread
- **debugger** is a cli debugging utility: see [debugging](/node/using-the-cli/debugging)
- [**events**](/node/events/) allow for quick-and-easy event-driven system development with "emitters" and "listeners"
- **os** is a utility tool that can gather stats about the Operating System
- **path** is an all-encompassing tool for dealing with files & directories and their paths
- **process** gives access to and information about the running node process
- **readline** allows for interpreting stream-based input, most commonly in practice with the command-line input
- **stream** is a verbose tool allowing for handling streaming data like fs content, and http network response content (_and many more!_)
- **string_decoder** allows for converting buffers to strings
- **util** is an all-encompassing module with a bunch of properties
- **zlib** allows for compression & decompression of content

## A Few Basic Commands

### Get The Node Version

`node --version` && `node -v` will show the version of node installed, something like `v18.14.2`

### Get The NPM Version

`npm --version` && `npm -v` will show the version of node installed, something like `9.5.0`.

## Build An HTTP Server

[Here](/http-server) is a brief rundown on building an http server using node.  
TL;DR: Listen for requests and serve up some content.

## Coming Soon

- CRUD operations on a filesystem
- async workflows using callbacks, promises, and async/await syntax
- Buffers: allocation, encoding & decoding strings
- Watching directories
- Errors
- Events & an event-driven setup
- Scaling a node server leveraging the cluster module
- Streams: read, write, pipelines, duplex, transform
