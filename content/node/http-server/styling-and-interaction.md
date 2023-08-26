---
title: Send CSS and JS
slug: node/http-server/styling-and-interaction
author: Jake Laursen
parentDir: http-server
excerpt: Include a style-sheet and a js file while serving a frontend from an express server
tags: ["http", "web", "server", "node", "express", "npm", "html"]
order: 4
---

## Current Server

So far an http server...

- can listen on a default port
- can listen on a port from an env var
- listens at a root `/` endpoint
- returns an html doc when a request (_preferably a browser_) hits an endpoint

## Including a Stylesheet

### Add the stylesheet to the html doc

In the existing html file from [this previous example](/node/http-server/render-docs), there is a commented out `link` to a stylesheet in the head of the doc that we'll re-enable.

```html
<!-- Go from -->
<!-- <link rel="stylesheet" href="some-stylesheet-here"> -->

<!-- to -->
<link rel="stylesheet" href="./index.css" />
```

### See the failure

Check the server sending this to a browser! If the express server is running from the [previous section](/node/http-server/render-docs), stop and restart the server. Go to the terminal where the server was started from...

```bash
# hold down "control" and the "c" key to stop the server
^C

# restart the server
API_PORT=9876 node .
```

With the html doc pointing to an `./index.css`, the html page in the browser is looking for the css file at `http://localhost:9876/index.css`. This file does not exist, according to the express server, unfortunately.

### Migrate to Express Included Middleware

Express has [clear documentation](https://expressjs.com/en/starter/static-files.html) on their static file delivery preference. Next, follow and apply their suggestions to this setup.

The docs suggest `app.use(express.static('public'))`, where the `app`, represents the express Object. In our case, this express object is called `expressObj`.  
In the example, the directory that hosts the static contents is called `public`, where in our case the directory is called `static-content`.  
We'll make some adjustments to the `server.js` file. The [complete file](#the-complete-server-file) can be found below. Here's a play-by-play to-do:

- create a new var `STATIC_DIR` var, holding the name of the static dir `static-contents`
- update the `STATIC_DIR_PATH` var declaration:

```js
const STATIC_DIR_PATH = `${__dirname}/${STATIC_DIR}/`;
```

- immediately before the `get` registration on the `/` path, setup the express static middleware:

```js
expressObj.use(express.static(STATIC_DIR));
```

- the above changes will make the listener on the root irrelevant, so the 2 parts of the file associated with the `helloHandler` will be able to be removed

#### The Complete Server File

```js
const express = require('express');
const expressObj = express();
const port = process.env.API_PORT || 3000;
const STATIC_DIR = 'static-contents';
const STATIC_DIR_PATH = `${__dirname}/${STATIC_DIR}/`;
const HOME_FILE_NAME = 'index.html';
const HOME_FILE_PATH = STATIC_DIR_PATH + HOME_FILE_NAME;

function listenCallback() {
  console.log(`Node HTTP Server listening on http://localhost:${port}`);
}

expressObj.use(express.static(STATIC_DIR));

expressObj.listen(port, listenCallback);
```
