---
title: Send CSS and JS
slug: http-server/styling-and-interaction
parentDir: http-server
author: Jake Laursen
excerpt: Include a style-sheet and a js file while serving a frontend from an express server
tags: http, web, server, node, express, npm, html
order: 4
---

## Current Server

So far an http server...

- can listen on a default port
- can listen on a port from an env var
- listens at a root `/` endpoint
- returns an html doc when a request (_preferrably a browser_) hits an endpoint

## Including a Stylesheet

### Add the stylesheet to the html doc

In the existing html file from [this previous example](./render-docs), there is a commented out `link` to a stylesheet in the head of the doc that we'll re-enable.

```html
<!-- Go from -->
<!-- <link rel="stylesheet" href="some-stylesheet-here"> -->

<!-- to -->
<link rel="stylesheet" href="./index.css" />
```

### See the failure

Check the server sending this to a browser! If the express server is running from the [previous section](./render-docs), stop and restart the server. Go to the terminal where the server was started from...

```bash
# hold down "control" and the "c" key to stop the server
^C

# restart the server
API_PORT=9876 node .
```

With the html doc pointing to an `./index.css`, the html page in the browser is looking for the css file at `http://localhost:9876/index.css`. This file does not exist, unfortunately.
