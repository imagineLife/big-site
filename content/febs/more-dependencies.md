---
title: Project Setup - Install Babel & loader Dependencies,
slug: febs/more-dependencies
parentDir: febs
order: 6
---

## A Goal and A Strategy

_I need tools to convert JSX to browser-readable content. React is written in JSX, and browsers can not read JSX._

As a developer I'd like to...

- Be able to communicate how loaders 'fit' into a frontend build system
- Include some loaders into a frontend boilerpalte setup

Here, install loaders.

### Why loaders

Loaders are used by webpack to do several tasks - convert files to browser readable code, bundle files, images, stylesheets, and more for client-ready consumption, and more. Here's a list of loaders, a brief description of each, and a single install script at the end.

### @babel/preset-react

This includes a few other plugins that transform react's jsx syntax to browser-readable js

### babel-loader

transforms all remaining javascript that may not be readable by browsers and makes the js readable

### css-loader

converts js 'import' syntax on css files for browsers

### html-webpack-plugin

we'll tell this plugin to use our html template for the html root of our project

### html-loader

we'll use this to minify our template html file

### sass-loader

loads && convers sass files to css files

### style-loader

puts css into the dom

### install script

```js
npm i --save-dev @babel/preset-react@7.16 babel-loader@8.2 css-loader@6.5 html-loader@3.0 html-webpack-plugin@5.5 sass-loader@12.4 style-loader@3.3
```
