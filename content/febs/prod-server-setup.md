---
title: Setting Up a Web Server
slug: febs/prod-server-setup
parentDir: febs
excerpt: Serve HTML, JS, and CSS from a Node Web Server
order: 3
tags: ["node", "server"]
---

# Setting Up An HTTP Server
`video: [Express Server - I](https://youtu.be/2a_coCwZKrg) youtube: [Express Server - I](https://youtu.be/2a_coCwZKrg)`

- [Setting Up An HTTP Server](#setting-up-an-http-server)
  - [Why this HTTP Server](#why-this-http-server)
- [Server Setup Overview](#server-setup-overview)
- [Creating The Server Directory and Files](#creating-the-server-directory-and-files)
- [Setup Some Static Assets](#setup-some-static-assets)
  - [Fill the html file with some boilerplate code](#fill-the-html-file-with-some-boilerplate-code)
  - [Fill The css With Styling](#fill-the-css-with-styling)
  - [Fill The js With Interaction](#fill-the-js-with-interaction)
- [Setup The "package.json" File](#setup-the-packagejson-file)
  - [Overview of the NPM Init command](#overview-of-the-npm-init-command)
  - [Add A Start Script](#add-a-start-script)
  - [Depend on Express](#depend-on-express)
- [Setup Express to Listen and Serve Static Contents](#setup-express-to-listen-and-serve-static-contents)

## Why this HTTP Server

**TL;DR** - When considering a "frontend build system", an http server serving static html/js/css is most often the "production" setup.

Software Engineers who are well-versed in "frontend" development, writing the code that populates website interfaces (_like this text here!!_) are used to using a "development" setup while writing code, which is fundamentally different tha a production-style setup.  
**A Development Setup** for the frontend engineering environment involves "hot reloading", where developers make code changes frequently, press "save" on their code editor, and _see the updated code results in a browser instantly_. This involves specific tools required for this instant-reloading experience when writing frontend projects using tools like react, vue, angular, etc. The code involved in this workflow is not HTML,CSS, & JS - in React, for example, the code is written with [JSX](https://reactjs.org/docs/introducing-jsx.html).

**A Production Setup**, though, is much less complicated. When writing a react project and preparing the project for production, the react JSX code gets transformed into HTML, JS and CSS. The resulting files are the files that, get served through browser url requests (_like www.google.com_) in production. The HTML, CSS, and JS files are commonly referred to as "static assets" in web development.

# Server Setup Overview

Here, a production http server will get setup. this will include:

- creating a directory that will contain all the "guts" of the server
- [initializing the directory as an npm repo](https://docs.npmjs.com/cli/v8/commands/npm-init)
- creating a file that [Node](https://nodejs.org/en/) will use to run an http server
- installing [express](https://expressjs.com/) as a [dependency](https://nodejs.dev/learn/npm-dependencies-and-devdependencies) - express has a lot of "bells & whistles" "under the hood" to make setting up an http server quick & easy
- configuring the node+express server
  - [listen](https://nodejs.org/api/net.html#serverlisten) for requests on a port
  - serve the static assets (HTML file, CSS file and JS file) from the root url of "/"

# Creating The Server Directory and Files

Here, a directory will be created in a "projects" directory on our desktop. The terminal commands below will work on a mac.

```bash
# navigate to your desktop in a terminal
# my machine is called "Jakes" & the terminal will read the following when my terminal is at my desktop
Jakes:Desktop Jake$

# create the projects directory
mkdir projects # press enter

# navigate into the projects directory
cd projects # press enter

# make our production server directory
mkdir prod-server # press enter

# navigate into the prod-server dir
cd prod-server # press enter

# initialize the dir as a npm repo
npm init -y # press enter

# create the required files & folders:
# index.js for the "root" of the server
# static dir holding an html, css, and js file
touch index.js # press enter
mkdir static # press enter
cd static # press enter
touch index.js index.css index.html # press enter
```

# Setup Some Static Assets

Here, 3 files will be created to be served by the express(node) server: HTML, JS, and CSS.
**NOTE** "Real" websites are usually significantly more complicated than this. These static assets are here not to display all of the html + js + css magic that can be accomplished. These static assets are here to show that the express(node) server can send these files to the browser when requested.

## Fill the html file with some boilerplate code

Online, [several](https://www.freecodecamp.org/news/basic-html5-template-boilerplate-code-example/) [html](https://www.sitepoint.com/a-basic-html5-template/) [boilerplate](https://html5boilerplate.com/) example files can be found. Here's one that includes all that is needed for this particular project. This will include:

- Some text displayed, leveraging the `html`
- Some styles, leveraging the `css`
- A Button that will have some interaction when clicked

Write this in the `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Server Example</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body id="test-body">
    <h1>An Example HTML File here</h1>
    <p>Congrats, you got this being served by an http server :)</p>
    <button id="test-button">
      Click me to leverage JavaScript to alter the html
    </button>
    <script src="index.js"></script>
  </body>
</html>
```

## Fill The css With Styling

Here, the header text in the html file will be centered and colored. Write this in the `index.css` file:

```css
h1 {
  text-align: center;
  color: blue;
}
```

## Fill The js With Interaction

```js
// create the function that runs on-button-click
function doThisOnClick() {
  const spanTag = document.createElement('span');
  const text = document.createTextNode(
    'This text is added to the html after clicking the button!',
  );
  spanTag.appendChild(text);
  const element = document.getElementById('test-body');
  element.appendChild(spanTag);
}

// get the button in a var
const btn = document.getElementById('test-button');

// register the function on button click event
btn.addEventListener('click', doThisOnClick);
```

# Setup The "package.json" File

## Overview of the NPM Init command

When initializing the server directory as an npm repo in the [above step](#creating-the-server-directory-and-files), a `package.json` file gets created. This `package.json` file has many functionalities that npm uses: naming, version definition, keyword registration, a homepage url reference, and many others.

Here, the `package.json` will be updated to:

- explicitly "depend" on the expressjs module
- have a [script](https://docs.npmjs.com/cli/v8/using-npm/scripts) that runs the express(node) server

## Add A Start Script

The `package.json` file will have a "scripts" section that looks something like this:

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Update this "scripts" object to include a new key/value pair that will tell node to run using the `index.js` as instructions. This new key will be called `start`:

```js
"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Using the "start" word is [used by npm](https://docs.npmjs.com/cli/v7/commands/npm-start) to run this "start" script when using `npm start` from a terminal.

## Depend on Express

Here, the package.json will be populated from npm. Tell npm to use express as a dependency from the terminal command-line:

```bash
npm install express
```

This will pull express from the web, install the express contents in a new _node_modules_ directory in the repo, and update the `package.json` to have a "dependencies" section that looks something like this:

```js
"dependencies": {
  "express": "^4.17.3"
}
```

**NOTE** at the time of updating this webpage, express is at version `4.17.3`. When the express version updates, running `npm install express` will populate a "higher" version of express.

# Setup Express to Listen and Serve Static Contents
`video: [Express Server - III](https://youtu.be/t1f80fuYDU4) youtube: [Express Server - III](https://youtu.be/t1f80fuYDU4)`

The `index.js` at the root of the server directory is the final piece of the puzzle here. The `index.js` file will

- contain an express server
- listen on a port, here port 3000
- serve static contents from the root url

This is what the contents of the `index.js` could look like to accomplish those things:

```js
// init the express server
const express = require('express');
const expressObj = express();

// store the listening port in a variable
const port = process.env.API_PORT || 3000;

// store the name of the static dir in a variable
const STATIC_DIR = 'static';

// store a function that will log a string after express is listening
function listenCallback() {
  console.log(`Node HTTP Server listening on http://localhost:${port}`);
}

// leverage express'
expressObj.use(express.static(STATIC_DIR));

expressObj.listen(port, listenCallback);
```
