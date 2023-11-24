---
title: Learn Node's Module Packaging Tooling
slug: node/modules
author: Jake Laursen
excerpt: CJS, ESM,
tags: ["node", "modules"]
parentDir: node
order: 1
---

# Modules

- [Modules](#modules)
  - [An Overview](#an-overview)
  - [Using, Creating, and Sharing Modules](#using-creating-and-sharing-modules)
    - [One Quick Way To Initialize A Module](#one-quick-way-to-initialize-a-module)
    - [Some Notes](#some-notes)

## An Overview

Code can be "packaged up", "bundled", and considered a single "module" or a set of "modules" put together.  
Node considers files to be modules.

## Using, Creating, and Sharing Modules

### One Quick Way To Initialize A Module

A quick way to start a module is to use npm and leverage a `package.json` file:

- create a directory to hold the module (something like `mkdir my-module`)
- cd into the empty soon-to-be module directory `cd my-module`
- [use npm to initialize the directory](https://docs.npmjs.com/cli/v10/commands/npm-init) as a new module with `npm init`

More on creating modules in a bit...

### Some Notes

- the [type field](https://nodejs.org/dist/latest-v20.x/docs/api/packages.html#type) in a `package.json` file will instruct node on how to treat a module:
  - `module` is to use es6 (_import, export, etc_)
  - `commonjs` is to use commonjs (_module.exports, require, etc_): **commonjs is the default way that node will treat a module, even when the "type" field is not present**
- `*.mjs` files are always treated as es6 modules
- `*.cjs` files are always treated as commonjs modules
