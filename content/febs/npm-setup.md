---
title: Project Setup - Webpack Dependencies
slug: febs/npm-setup
parentDir: febs
order: 2
---

## A Gap

I know how to explain what some of the tools do in a frontend build setup, but I don't know where to start when making my own boilerplate.

## A Hope

As a developer I'd like to know how to setup a project's dependencies as a first step of a frontend boilerplate.

## A Practice

Here, we will leverage npm to initialize a project and install a handful of webpack dependencies. This will not be all dependencies, just enough needed to get the npm consuming, bundling, and storing some code output.

### Create A Repo

Maybe call it 'frontend-boilerplate'. This will be the folder that will hold the boilerplate.

### Initialize as an NPM Repo

Open a terminal, cd in to the newly created repo.,
From the terminal, run the command `npm init -y`,
This 'sets up' the repo to leverage npm for the following steps. Now, there will be a package.json file, which acts as the 'config' for npm to know what to do with dependencies, and what files to work with.

### Install some dependencies

From the cli, run `npm install react@17.0.1 react-dom17.0.1 webpack@5.22.0 webpack-cli@4.5.0`.  
This will update the `dependencies` section of the package.json, and list the above webpack dependencies that were just installed.  
The versions are hard-coded to keep in-sync with this guide
