---
title: "HTTP Server I: Trivial Servers"
slug: node/http-server
author: Jake Laursen
excerpt: Probably one of the most prominent use-cases of node
tags: ["server", "node", "javascript", "http", "express"]
parentDir: node
order: 7
---

# Building An HTTP Server
Build a web server is one of the most common parts of a JavaScript developer's "Full-Stack" arsenal.  
Serving http json payloads for APIs ([rest](https://restfulapi.net/), [graphQL](https://graphql.org/), etc)

## Just Node, No Dependencies
The [node docs](https://nodejs.org/dist/latest-v18.x/docs/api/http.html) have great examples of how to go about starting http server work.  
The basic http server looks something like...
```js
// import the node module
const http = require('node:http');

// choose a port to listen on
const PORT = process.env.API_PORT || 3000;

// build the server
// here, only returning a "hello world!" string to the requester
http
  .createServer((req, res) => {
    res.write('hello world!\n');
    res.end();
  })
  .listen(PORT);
```
Key details here:
- `http` or `node:http` is the built-into-node http server library

_more to come here..._


## Leveraging Express
- create a directory to hold the project
- run in the directory, run `npm init -y` to [initial the repo as a module](https://docs.npmjs.com/cli/v8/commands/npm-init): for this use case, and many rest api use-cases, the package.json is not explicitly to create a new module- rather to leverage dependencies
- add express to the dependencies with `npm i express`
- fill an `index.js` file with something like...

```js
const e = require('express');

// constants
const expressObj = e();
const port = 3000;
const HELLO_STRING = 'Hello from the express server!'
const ROOT_ROUTE = '/'


function helloHandler(req, res){
  return res.send(HELLO_STRING)
}

// register a "handler" to listen at endpoint "/"
expressObj.get(ROOT_ROUTE, helloHandler)

// start server, register listener callback
expressObj.listen(port, serverListeningCallback)
```