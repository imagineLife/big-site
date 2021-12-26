---
title: Project Setup - Install Babel & loader Dependencies,
slug: febs/more-dependencies
parentDir: febs
order: 5
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

### html-webpack=plugin

we'll tell this plugin to use our html template for the html root of our project

### html-loader

we'll use this to minify our template html file

### sass-loader

loads && convers sass files to css files

### style-loader

puts css into the dom

### install script

```js
npm i @babel/preset-react@7.12.13 babel-loader@8.2.2 css-loader@5.0.2 html-loader@2.0.0 html-webpack-plugin@5.1.0 sass-loader@11.0.1 style-loader@2.0.0
```
