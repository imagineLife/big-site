---
title: Send HTML with an HTTP server
slug: http-server/render-docs
author: Jake Laursen
excerpt: With a simple http server, send a webpage to the browser
parentDir: http-server
tags: ["http", "web", "server", "node", "express", "npm", "html"]
order: 3
---

## Current Server

- [Current Server](#current-server)
  - [Send an HTML File](#send-an-html-file)
  - [Create and Populate the HTML file](#create-and-populate-the-html-file)
  - [Next-Step Options](#next-step-options)

So far, an http server...

- can listen on a default port
- can listen on a port from an env var
- listens at a root `/` endpoint
- returns text when a request hits that endpoint

Here, the server will be updated to serve html.  
The html file will also be looking for some css && js, and the express server will accommodate those files.

### Send an HTML File

Update the constants at the top of the `index.js` file to include 3 new variables:

- 1 representing a new `static-contents` directory path
- 1 representing a new `home.html` file
- 1 representing the full path to the new `home.html` file

```js
// line 1 of index.js
const express = require('express');
const expressObj = express();
const port = process.env.API_PORT || 3000;
const STATIC_DIR_PATH = __dirname + '/static-contents/';
const HOME_FILE_NAME = 'home.html';
const HOME_FILE_PATH = STATIC_DIR_PATH + HOME_FILE_NAME;
```

Update the `helloHandler` function to send an html file

```javascript
function helloHandler(req, res) {
  return res.sendFile(HOME_FILE_PATH);
}
```

### Create and Populate the HTML file

Create a new directory at the root of the repo called `static-contents`.  
Inside this `static-contents` directory, create an html file called `home.html`:

```js
mkdir static-contents
cd static-contents
touch home.html
```

Populate the html file with some boilerplate contents

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

### Next-Step Options

One path to consider is to [dig into some HTML](./../html): elements, attributes, etc.  
Another direction to go is to [serve css + js](./styling-and-interaction) from this same express server.
