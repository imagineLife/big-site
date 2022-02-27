---
title: Setting Up a Prod-Like Web Server
slug: febs/prod-server-setup
parentDir: febs
excerpt:
order: 3
---

<!-- video link here -->
<!-- `video: [Frontend Build System: Prod Vs Dev Setup](https://youtu.be/U5ChM1R6MAc) youtube: [Frontend Build System: Prod Vs Dev Setup](https://youtu.be/U5ChM1R6MAc)` -->

# Setting Up A Production-Like Server

- [Setting Up A Production-Like Server](#setting-up-a-production-like-server)
  - [Why A "Production" Server](#why-a-production-server)
- [Server Setup Overview](#server-setup-overview)
- [Creating The Server Directory and Files](#creating-the-server-directory-and-files)

## Why A "Production" Server

TL;DR - Production servers are simpler than developer-friendly environments.

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
