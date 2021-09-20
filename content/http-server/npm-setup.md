---
title: Setup An NPM Repo
slug: http-server/setup-npm
author: Jake Laursen
excerpt: Get A project started with npm, a package.json file, and some dependencies
tags: http, web, server, node, express, npm
order: 2
---

# Beginning an HTTP Server

Here, a project will get started.  
A directory will be created that holds the project, and the directory will be initialized for npm to help manage node dependencies.  
A few dependencies will be added & a super simple http server will be setup & runnable.

## Pre-Requisites

Have [node installed](https://nodejs.org/en/download/) on the machine. Node comes with [npm]

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

```js
npm init -y

# add the index.js file
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
const app = express();
const port = process.env.API_PORT || 3000;

function helloHandler(req, res) {
  return res.send('Hello World!');
}

function listenCallback() {
  console.log(`Example app listening at http://localhost:${port}`);
}

app.get('/', helloHandler);

app.listen(port, listenCallback);
```
