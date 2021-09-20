---
title: Setup An NPM Repo
slug: http-server/setup-npm
author: Jake Laursen
excerpt: Get A project started with npm, a package.json file, and some dependencies
tags: http, web, server, node, express, npm
order: 2
---

# Beginning an HTTP Server

Here, a project will get started.  
A directory will be created that holds the project, and the directory will be initialized for npm to help manage node dependencies.  
A few dependencies will be added & a super simple http server will be setup & runnable.

## Pre-Requisites

Have [node installed](https://nodejs.org/en/download/) on the machine. Node comes with [npm]

## Setup an npm repo dir

Create the directory where this http server will live. Here, the directory will be called "web-server".

```bash
mkdir web-server
```

Initialize the directory as an place for npm to manage

```bash
cd web-server
npm init -y
```

## Install express

The version is explicit here

```bash
npm install express@4.17.1
```
