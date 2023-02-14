---
title: Tooling Overview
slug: febs/overview
parentDir: febs
excerpt: A Brief overview of the tooling involved in a Frontend build System
order: 1
tags: ["tooling", "frontend", "build"]
---

`video: [VideoTitle](https://youtu.be/R5JqzAij7gc) youtube: [Cool Youtube Video](https://youtu.be/R5JqzAij7gc)`

- [A Goal and A Strategy](#a-goal-and-a-strategy)
  - [React](#react)
  - [Webpack](#webpack)
  - [Babel](#babel)
  - [NPM](#npm)
  - [Node](#node)
- [A Development Approach](#a-development-approach)
    - [Links](#links)

## A Goal and A Strategy

_I Don't know what tools are being used when I build a website using react. I can build a project with create-react-app, and I've heard about webpack, but I don't know whats going between them._

_As a developer I'd like to understand the tooling_

- be able to articulate the tools that I'm using
- be able to give at least an overview of how these tools are working together
- have my own boilerplate project where I've compiled react/webpack/babel etc.
- understand and being able to assemble a frontend app using the tools of react, webpack, babel, npm, and node.

Here's a few one-liners to give an overview of the tooling.

### React

A lightweight JavaScript library used for building component-focused UIs (almost lifted directly from their website!). In a frontend build system, React builds the entire UI from an otherwise empty html document.

### Webpack

An npm module used to 'compile' or 'bundle' javascript. In a frontend build system, webpack shrinks the size of the javascript that is delivered to the browser. Webpack dev server is also used as a server during the development process.

### Babel

A module that transforms code when the syntax is not natively readable by a browser. Browsers don't know what to do with JSX.

### NPM

NPM hosts a bunch of code (repositiories) that are writtend and 'packaged' up for folks like us to install and use.

### Node

With the node runtime, JS can run on a server. Node is used here to develop an http server. Node is an underlying tech, and a frontend build system hardly writes any core node code.

## A Development Approach
- build a node server
- have the node server serve "static content" - html/js/css, a frontend repo
- build a frontend "system", react + babel + webpack
  - the "build" step: leveraging webpack to convert react to "production ready" static assets
  - the "development-friendly" setup, incorporating webpack-dev-server
  - more options:
    - react-router "deeper dive" for frontend routing & its impact on serving the app from node
    - lazy-loading & it's impact on bundle size, performance, etc
    - integrating typescript (webpack, babel, react, ts)

#### Links

[React](https://reactjs.org/)
[Webpack](https://webpack.js.org/)
[Babel](https://babeljs.io/)
[NPM](https://www.npmjs.com/)
[Node](https://nodejs.org/en/)
