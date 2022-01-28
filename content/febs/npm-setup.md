---
title: Project Setup - Webpack Dependencies
slug: febs/npm-setup
parentDir: febs
excerpt: Initialize an npm repo and install webpack
order: 2
---

Here, we will leverage npm to initialize a project and install a handful of webpack dependencies. This will not be all dependencies, just enough needed to get webpack consuming, bundling, and storing some code output.

### Create A Repo

Open a terminal and create a directory that will hold the frontend repo.

```js
mkdir frontend-repo
```

### Initialize as an NPM Repo

In the terminal, cd in to the newly created repo.,
From the terminal, run the command

```js
cd frontend-repo
npm init -y
```

This 'sets up' the repo to leverage npm for the following steps. In the repo there will be a package.json file, which acts as the 'config' for npm to know what to do with dependencies, and what files to work with.

### Install some dependencies

From the cli, run

```js
npm install react@17.0.2 react-dom@17.0.2 webpack@5.65.0 webpack-cli@4.9.1
```

This will update the `dependencies` section of the package.json, and list the above webpack dependencies that were just installed.  
The versions are hard-coded to keep in-sync with this doc
