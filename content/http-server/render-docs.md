---
title: Send HTML with an HTTP server
slug: http-server/render-docs
parentDir: http-server
author: Jake Laursen
excerpt: With a simple http server, send a webpage to the browser
tags: http, web, server, node, express, npm, html
order: 3
---

## Current Server

So far an http server...

- can listen on a default port
- can listen on a port from an env var
- listens at a root `/` endpoint
- returns text when a request hits that endpoint

## Set the Server

Here, the server will be updated to serve html.  
The html file will also be looking for some css && js, and the express server will accommodate those files.

### Send an HTML File

Update the `helloHandler` function to send an html file

```javascript
function helloHandler(req, res) {
  let filePath = __dirname + '/home.html';
  return res.sendFile(filePath);
}
```
