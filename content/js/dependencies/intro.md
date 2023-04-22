---
title: A Bit About Dependencies
parentDir: js/
slug: js/deps
author: Jake Laursen
excerpt: An overview of npm, dependencies, and the package.json file
tags: ["js","dependencies","package.json","configuration", "intro"]
order: 1
---

# Intro To Dependencies, npm, and package.json
Dependencies in javascript projects are ubiquitous.  
There are [devDependencies](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#devdependencies): ones that are only needed during development, and not in a production environment.  
There are [dependencies](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#dependencies), the ones needed for a prod env.  
These are managed with [npm](https://docs.npmjs.com/about-npm), "_the worlds largest software registry_".   

## A Dependency Is Someone Elses Code
Dependencies are pieces of code that do things, stored in directories, available to consume and use in (y)our projects, and maintained by others.  
Devs use dependencies for all types of things and for all sorts of purposes:
- interfacing between rest-api's and databases
- cryptography functions
- "api" frameworks
- "frontend" frameworks
- manage linting & formatting rules
- managing the semantic version implementation
- bundling and transpiling
- interfacing with other third-party vendors (email, logging, payment systems, etc)


- [Intro To Dependencies, npm, and package.json](#intro-to-dependencies-npm-and-packagejson)
  - [NPM, the Node Package manager](#npm-the-node-package-manager)
    - [Get Started with npm](#get-started-with-npm)
      - [See The npm Manuals](#see-the-npm-manuals)
  - [package.json Is The Beginning Of A Node Module](#packagejson-is-the-beginning-of-a-node-module)
    - [package.json has a bunch of fields](#packagejson-has-a-bunch-of-fields)
    - [package.json Manages Dependencies And Dependency Versions](#packagejson-manages-dependencies-and-dependency-versions)
      - [Using "npm install" to Add New Dependencies](#using-npm-install-to-add-new-dependencies)


## NPM, the Node Package manager
[npm](https://www.npmjs.com) is a free node module registry overflowing with node modules that perform functionality with easy-to-use apis.  

### Get Started with npm
[Download node](https://nodejs.org/en/download) and free node package manager command-line-interface (_cli_) comes included with the node download.  
#### See The npm Manuals
The `--help` flag and the `-h` flag produce some manual-like details in the cli.  

`npm help`: npm can begun being investigated with `npm help` from the command line.  
`npm help npm`: for a longer-form manual.  
`npm help <command-here>` or `npm <command-here> -h`: for a manual about a specific command, i.e the `install` has a mini-manual at `npm install -h` or `npm help install`.  


## package.json Is The Beginning Of A Node Module
a module, or a "package", is a project/directory that includes the `package.json` file at the root of the dir.  

Here's 2 ways to use the package.json file to being a node module.  
First, the "template" way -  
- create a directory to hold the thing (_lets call ours "blog-demo-repo"_)
- run `npm init -y`: this will create a package.json file and fill it with some "template" content:
```json
{
  "name": "blog-demo-repo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Another approach is to leverage the npm cli for more details:
- create the directory, like above
- run `npm init` and a cli will "walk you through" creating a `package.json` file with more detail.  

Also, `npm init` can be run on a project that already has `package.json` - the cli will ask the same questions, and if there are new answers, the package.json will be updated!

### package.json has a bunch of fields
There is an [entire doc](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) about the fields in a `package.json` file. Here's the fields to get started with:
- `name`: well, give it a name!
- `version`: a [semantic version](https://semver.org) string that meets the [node-semver](https://github.com/npm/node-semver) specs (carets, tildas, etc.)
- `description`: this appears when someone [searches for your module through npm](https://www.npmjs.com)
- `main`: the "entrypoint" of the project - where the code running should start at
- `scripts`: an objects of commands (_scripts_) that npm can use (with [a robust doc](https://docs.npmjs.com/cli/v9/using-npm/scripts) to go with it)
- `keywords`: an array of strings
- `author`: this can include an object with `name`, `email`, and `url`
- `license`: Check out something like [choosealicense.com](https://choosealicense.com) for options to consider - let consumers of the project know what they can and can't do with it


### package.json Manages Dependencies And Dependency Versions
Lets install some dependencies & see how the project gets updated.  
#### Using "npm install" to Add New Dependencies
From a cli, run `npm install express`. [express](https://expressjs.com) is a "_fast, unopinionated, minimalist web framework for Node.js_".  
This will ajust the project in a few ways:
- updating package.json
- including a new file, package-lock.json
- including a new directory, node_modules

The `package.json` file now includes notes on the dependency:
```json
{
  "name": "blog-demo-repo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
`express` is listed as one of the key/value pairs inside the `dependencies` array. Here, express is included with any version greater-than or equal `4.8.12` and less than `5.0.0`.  

The [`package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) is something like a record that documents _exact versions_ of modules, including dependencies of the modules. This file is not intended to be modified by us mere humans - npm will make use of it.  

The [node_modules](https://docs.npmjs.com/cli/v8/configuring-npm/folders#node-modules) directory stores the dependency code content.  
