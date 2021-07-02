---
title: Frontend Build System Tooling Overview
slug: febs/overview
order: 1
---

## A Gap

I Don't know what tools are being used when I build a website using react.
I can build a project with create-react-app, and I've heard about webpack, but I don't know whats going between them.

## A Hope

As a developer I'd like to understand the tooling

- be able to articulate the tolls that I'm using
- be able to give at least an overview of how these tools are working together
- have my own boilerplate project where I've compiled react/webpack/babel etc.
- understand and being able to assemble a frontend app using the tools of react, webpack, babel, npm, and node.

## A Practice

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

#### Links

[React](https://reactjs.org/)
[Webpack](https://webpack.js.org/)
[Babel](https://babeljs.io/)
[NPM](https://www.npmjs.com/)
[Node](https://nodejs.org/en/)
