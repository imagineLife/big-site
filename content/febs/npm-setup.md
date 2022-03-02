---
title: Enable Webpack Production Bundling
slug: fwebs/npm-setup
parentDir: febs
excerpt: Initialize an npm repo, install webpack, and setup a build script
order: 3
---

# Enabling Webpack Production Bundling

- [Enabling Webpack Production Bundling](#enabling-webpack-production-bundling)
  - [Create and Initial An Repo](#create-and-initial-an-repo)
  - [Install Webpack And Make a Build Script](#install-webpack-and-make-a-build-script)

Here, we will leverage npm to initialize a project and install just enough dependencies to get webpack to consume some input and convert the input to an output directory.  
This is how webpack is used to take developer code, in this case React code, and return browser-readable html/js/css.

## Create and Initial An Repo

Open a terminal and create a directory that will hold the frontend repo.

```js
mkdir frontend-repo
```

In the terminal, cd in to the newly created repo. Then, run `npm init -y` to initialize the npm repo -

```js
cd frontend-repo
npm init -y
```

This 'sets up' the repo to leverage npm for the following steps. In the repo there will be a package.json file, which acts as the 'config' for npm to know what to do with dependencies, and what files to work with.  
The `-y` flag [skips a questionnaire](https://docs.npmjs.com/cli/v8/commands/npm-init). That informs what the initial values are in the `package.json` file.

## Install Webpack And Make a Build Script

From the cli

```js
npm install webpack@5.65.0 webpack-cli@4.9.1
```

This will update the `dependencies` section of the package.json, and list the above webpack dependencies that were just installed.  
The versions are hard-coded to keep in-sync with this doc.

###
