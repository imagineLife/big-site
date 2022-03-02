---
title: Setup A react Component
slug: fwebs/setup-a-react-component
parentDir: febs
order: 9999
---

## A Goal and A Strategy

_I have plugins and an understanding of frontend build system parts, but I don't have a React component setup yet._

_As a developer I'd like to setup React to manipulate the dom_.

Here, setup the root React component of the project.  
Begin with the `js` file & import dependencies:

```js
import React from 'react';
import ReactDOM from 'react-dom';
```

### Build a Component

Let make a 'Title' component by adding another line to the js file.

```js
const Title = () => <h1>First Component</h1>;
```

Render the Component to the dom:

```js
ReactDOM.render(<Title />, document.getElementById('root'));
```

This refers to the div with the `root` id that exists in the html file.

### All Together

Here, the complete `js` file:

```js
import React from 'react';
import ReactDOM from 'react-dom';

const Title = () => <h1>First Component</h1>;
ReactDOM.render(<Title />, document.getElementById('root'));
```
