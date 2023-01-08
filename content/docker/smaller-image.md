---
title: "Noder Server IV: A Smaller Image"
parentDir: docker
slug: docker/a-smaller-node-image
author: Jake Laursen
excerpt: Considering the Impact that the base image has on the final image
tags: Docker, Dockerfile, NodeJS, Container, Image, Dependencies, Optimization, Size, Footprint
order: 9
---

# Considering Image Size
A Brief comparison of image size where the _only thing changing between images_ is the first line of the dockerfile, the `FROM` command.   
For reference, [Docker Node Images](https://hub.docker.com/_/node/tags?page=1&name=18&ordering=last_updated).  

|Base Image|Output Size|
|:--|--:|
|node:18|950MB|
|node:18-slim|243MB|
|node:18-alpine|176MB|

```Dockerfile
FROM node:18
# FROM node:18-slim
# FROM node:18-alpine
USER node 
RUN mkdir /home/node/code 
WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./
RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

# run the server
CMD ["node", "index.js"]
```