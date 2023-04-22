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
- create a directory to hold the thing (_lets call ours "horse"_)
- run `npm init -y`: this will create a package.json file and fill it with some "template" content:
```json
{
  "name": "horse",
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

### package.json has a bunch of fields
There is an [entire doc](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) about the fields in a `package.json` file. Here's the fields to get started with:
- `name`: well, give it a name!
- `version`: a [semantic version](https://semver.org) string
- `description`: this appears when somehone [searches for your module through npm](https://www.npmjs.com)
- `main`: the "entrypoint" of the project - where the code running should start at
- `scripts`: an objects of commands (_scripts_) that npm can use (with [a robust doc](https://docs.npmjs.com/cli/v9/using-npm/scripts) to go with it)
- `keywords`: an array of strings
- `author`: this can include an object with `name`, `email`, and `url`
- `license`: Check out something like [choosealicense.com](https://choosealicense.com) for options to consider - let consumers of the project know what they can and can't do with it