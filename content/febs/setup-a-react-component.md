---
title: Setup A react Component
slug: febs/setup-a-react-component
parentDir: febs
order: 6
---

## A Gap

I have plugins and an understanding of frontend build system parts, but I don't have a React component setup yet.

## A Hope

As a developer I'd like to setup React to manipulate the dom

## A Practice

Here, setup the root React component of the project.  
Begin with the JS file & import dependencies:

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

### All Together

```js
import React from 'react';
import ReactDOM from 'react-dom';

const Title = () => <h1>First Component</h1>;
ReactDOM.render(<Title />, document.getElementById('root'));
```
