---
title: WIP: Initialize a Source Directory
slug: febs/setup-src
parentDir: febs
order: 999
---

## A Goal and A Strategy

_I know which dependencies to use for a frontend boilerplate, but I'm not sure how to setup initial files to work with._

_As a developer I'd like to setup the Contents of a 'Source' Directory, including html, js and scss files._

Here, the beginnings of the application codebase wil be setup, including a `js` file and an `scss` file.

### Create A Directory

Inside the project, make a directory. We'll call it `src`. Webpack leverages the `src` as the default `entry point` for this type of project.

### Create a js file

Inside the src directory, create an `index.js` file. This will be where react, at its core, is leveraged to manipulate the dom.

### Create a scss file

Inside the src directory, create an `index.scss` file. This will be the root stylesheet for the project.

After the above scss and js files are created, the project directory structure and files should be

```bash
src/
  index.js
  index.scss
```

## Attempt a Build

### Add a Component to the JS file

Here, we'll add some code to each file. We'll add a "build" script to the project and see what webpack does wit the code.

In the `index.js` file, lets add a small react component:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

const App = () => (<main id="app">App Here!</main>)

ReactDOM.render(<App>, document.getElementById('root'));
```

### Add content to the style sheet

```css
#app {
  text-align: center;
}
```

### Add a build script

The `package.json` will hold a script that we will run to tell webpack to take some 'input', based on a react root, and convert the code to some browser-readable output.  
In the `"scripts"` section of the `package.json`, add

```json
"scripts": {
  "build": "webpack --mode=production"
}
```

Try running this. In a terminal in the root of the project, run `npm run build`. See the error output, should be something like this:

```bash
assets by status 388 bytes [cached] 1 asset
./src/index.js 193 bytes [built][code generated] [1 error]

ERROR in ./src/index.js 5:19
Module parse failed: Unexpected token (5:19)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| import './index.scss'
|

> const App = () => (<main id="app">App Here!</main>)
> |
> | ReactDOM.render(<App>, document.getElementById('root'));

webpack 5.65.0 compiled with 1 error in 144 ms

```

Notice the error output, noting that loaders need to be configured in order to make this work. Next, setup some configuration details that webpack can use to "load" the react syntax and more successfully.
