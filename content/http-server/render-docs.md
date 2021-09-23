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

### Populate the HTML file

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Demo Template</title>
    <meta name="description" content="Demo Html" />
    <meta name="author" content="SitePoint" />

    <meta property="og:title" content="Demo Template" />
    <meta property="og:type" content="website" />
    <!-- <meta property="og:url" content="some-remote-image-here"> -->
    <meta property="og:description" content="Demo Html" />
    <!-- <meta property="og:image" content="some-remote-image-here"> -->

    <!-- <link rel="icon" href="/favicon.ico"> -->
    <!-- <link rel="icon" href="/favicon.svg" type="image/svg+xml"> -->

    <!-- <link rel="stylesheet" href="some-stylesheet-here"> -->
  </head>

  <body>
    <header>
      <h1>Demo HTML Here!</h1>
    </header>
    <!-- <script src="some-script-file-here"></script> -->
  </body>
</html>
```

This can be seen through a browser when going to a terminal and running

```bash
API_PORT=9876 node .
```

then, going to a browser and going to the url
`localhost:9876`.

Note: there are a handful of placeholder commented details here. These will be included & briefly reviewed shortly.
