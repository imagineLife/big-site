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

## An Overview

Code can be "packaged up", "bundled", and considered a single "module" or a set of "modules" put together.  
Node considers files to be modules.

## Using, Creating, and Sharing Modules

A quick way to start a module is to use npm and leverage a `package.json` file:

- create a directory to hold the module (something like `mkdir my-module`)
- cd into the empty soon-to-be module directory `cd my-module`
- [use npm to initialize the directory](https://docs.npmjs.com/cli/v10/commands/npm-init) as a new module with `npm init`
