---
title: Initialize a Client Source Directory
slug: fwebs/setup-src
parentDir: febs
excerpt: Setting up the client directory to build with Webpack
order: 4
tags: ["tooling", "frontend"]
---

# Setting Up A Client to Build For Production

- [Setting Up A Client to Build For Production](#setting-up-a-client-to-build-for-production)
- [Dependency Installation and Overview](#dependency-installation-and-overview)
- [Directory setup](#directory-setup)
  - [index.js](#indexjs)
- [Leverage Webpack to build static assets](#leverage-webpack-to-build-static-assets)
  - [Add a Build Script](#add-a-build-script)
    - [Build Attempt 1 - Fail](#build-attempt-1---fail)
  - [Add Some Loaders \& Parsers](#add-some-loaders--parsers)
  - [Configure Webpack and Babel to leverage Loaders \& Parses](#configure-webpack-and-babel-to-leverage-loaders--parses)
    - [Add Babel Config File](#add-babel-config-file)
    - [Setup Webpack to Leverage Babel](#setup-webpack-to-leverage-babel)
    - [Build Attempt 2 - Success](#build-attempt-2---success)

Here, a directory will be setup to contain some "framework" details for a client-side frontend build system.
A primary goal here is to leverage webpack for "bundling" some react dev code into production-ready static html/js/css.
This will include

- setting up a directory and initializing as an npm repo
- installing dependencies like react, webpack, babel, and other related dependencies
- building a simple react component
- building the parts needed to transform react code into production-ready static assets

# Dependency Installation and Overview

```js
npm i webpack webpack-cli react react-dom
```

- **Webpack**: the tool used to "build" the developer code into production-ready static assets
- **Webpack-CLI**: the tool used to run webpack from the command line
- **React**: The JavaScript library for building user interfaces
- **React-DOM**: Rendering react components to the DOM

# Directory setup

```bash
- src
  - index.html
  - index.js
  - index.css
- webpack.config.js

- package.json      //already included
- package-lock.json //already included
```

## index.js

The `src/index.js` can look like...

```js
import React from 'react';
import ReactDOM from 'react-dom';

function Header() {
  return <h1>Test Header Here</h1>;
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(<Header />, rootElement);
}
export default Header;
```

# Leverage Webpack to build static assets

## Add a Build Script

The `package.json` file is read by npm & we can leverage the `scripts` section to run webpack.  
Here, add a "build" script inside the `"scripts"` object to get something like this:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode=production"
  }
```

### Build Attempt 1 - Fail

Try running the new build script from a terminal with...

```bash
npm run build
```

The terminal should print something like this...

```bash
> the-repo@1.0.0 build
> webpack --mode=production

assets by status 310 bytes [cached] 1 asset
./src/index.js 266 bytes [built] [code generated] [1 error]

ERROR in ./src/index.js 5:9
Module parse failed: Unexpected token (5:9)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|
| function Header(){
>   return <h1>Test Header Here</h1>
| }
|

webpack 5.69.1 compiled with 1 error in 88 ms
```

This is alluding to how a webpack loader is required to parse the react content.

## Add Some Loaders & Parsers

Here, babel will be leveraged to parse the react (_jsx_) code from the js file.

```bash
npm i --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

- **@babel/core**: the primary "guts" of babel, the tool that does the jsx-to-js transformation
- **@babel/preset-env**: a part of babel particular for "modern" js syntax transformation
- **@babel/preset-react**: a part of babel particular to jsx + react details
- **babel-loader**: the webpack interface for babel

## Configure Webpack and Babel to leverage Loaders & Parses

### Add Babel Config File

```bash
# at the root of the project, add a babelrc file
touch .babelrc
```

```js
// include these details in the babelrc file
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

### Setup Webpack to Leverage Babel

```bash
# create a webpack config file at the root of the project
touch webpack.config.js
```

```js
const path = require('path');
const ROOT_INDEX_FILE = './src/index.js';
module.exports = {
  entry: path.resolve(__dirname, ROOT_INDEX_FILE),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
```

### Build Attempt 2 - Success

From a terminal running in the project directory, run `npm run build` -

```bash
npm run build

# output will look something like...
> frontend-build-system@1.0.0 build
> webpack --mode=production

asset main.js 127 KiB [compared for emit] [minimized] (name: main) 1 related asset
modules by path ./node_modules/react/ 6.48 KiB
  ./node_modules/react/index.js 190 bytes [built] [code generated]
  ./node_modules/react/cjs/react.production.min.js 6.3 KiB [built] [code generated]
modules by path ./node_modules/react-dom/ 119 KiB
  ./node_modules/react-dom/index.js 1.33 KiB [built] [code generated]
  ./node_modules/react-dom/cjs/react-dom.production.min.js 118 KiB [built] [code generated]
modules by path ./node_modules/scheduler/ 4.91 KiB
  ./node_modules/scheduler/index.js 198 bytes [built] [code generated]
  ./node_modules/scheduler/cjs/scheduler.production.min.js 4.72 KiB [built] [code generated]
./src/index.js 337 bytes [built] [code generated]
./node_modules/object-assign/index.js 2.06 KiB [built] [code generated]
webpack 5.69.1 compiled successfully in 1206 ms
```
