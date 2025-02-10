---
title: Setup An NPM Repo
slug: node/http-server/build-it
author: Jake Laursen
excerpt: Get A project started with npm, a package.json file, and some dependencies
parentDir: http-server
tags: ["http", "web", "server", "node", "express", "npm"]
order: 2
---

# Building an HTTP Server

- [Building an HTTP Server](#building-an-http-server)
  - [Pre-Requisites](#pre-requisites)
  - [Setup an npm repo dir](#setup-an-npm-repo-dir)
  - [Install express](#install-express)
  - [Spin up a simle http server](#spin-up-a-simle-http-server)
  - [Try It Out](#try-it-out)
  - [Next-Step Options](#next-step-options)

Here, a project will get started.  
A directory will be created that holds the project, and the directory will be initialized for npm to help manage node dependencies.  
A few dependencies will be added & a super simple http server will be setup & runnable.

## Pre-Requisites

Have [node installed](https://nodejs.org/en/download/) on the machine. Node comes with [npm](https://www.npmjs.com/)

## Setup an npm repo dir

Create the directory where this http server will live. Here, the directory will be called "web-server".

```bash
mkdir web-server
```

Initialize the directory as an place for npm to manage, then add an `index.js` file where the beginning of the express http server code will live.

```bash
# make the dir
cd web-server
```

Initialize the repo as an npm repo && make a file that will hold the server code.

```js
npm init -y

// add the index.js file
touch index.js
```

## Install express

The version is explicit here

```js
npm install express@4.17.1
```

## Spin up a simle http server

Based on the express docs [hello world example](https://expressjs.com/en/starter/hello-world.html), build a server in just a few lines of code

```js
const express = require('express');
const expressObj = express();
const port = process.env.API_PORT || 3000;

function helloHandler(req, res) {
  return res.send('Hello World!');
}

function listenCallback() {
  console.log(`Node HTTP Server listening on http://localhost:${port}`);
}

expressObj.get('/', helloHandler);

expressObj.listen(port, listenCallback);
```

## Try It Out

from a terminal

- if not already in the server directory, `cd` into the directory that holds the http server
- set an API_PORT environment variable && run node with the root `index.js` file

```js
API_PORT=9876 node .
```

the terminal should output

```bash
Example app listening at http://localhost:9876
```

## Next-Step Options

One path to go here is to [send some html (and more) to the dom](/node/http-server/render-docs).  
Another path to consider is to consider dig into server scaling (_coming soon_).
