---
title: Initialize a Source Directory
slug: febs/setup-src
parentDir: febs
order: 3
---

## A Goal and A Strategy

_I know which dependencies to use for a frontend boilerplate, but I'm not sure how to setup initial files to work with._

_As a developer I'd like to setup the Contents of a 'Source' Directory, including html, js and scss files._

Here, the beginnings of the application codebase wil be setup, including a root `html` file, a `js` file and an `scss` file.

### Create A Directory

Inside the project, make a directory. We'll call it `src`. Webpack leverages the `src` as the default `entry point` for this type of project.

### Create an html file

Inside the src directory, create an `index.html` file. This will be used as the `template` for webpack to use when building the project.

### Create a js file

Inside the src directory, create an `index.js` file. This will be where react, at its core, is leveraged to manipulate the dom.

### Create a scss file

Inside the src directory, create an `index.scss` file. This will be the root stylesheet for the project.
