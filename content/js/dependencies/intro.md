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

