---
title: "Node Server IV: A Smaller Image"
parentDir: docker/node-server
shortSlug: a-smaller-node-image
slug: docker/node-server/a-smaller-node-image
author: Jake Laursen
excerpt: Considering the Impact that the base image has on the final image
tags: ["Docker", "Dockerfile", "NodeJS", "Container", "Image", "Dependencies", "Optimization", "Size", "Footprint"]
order: 9
---

# Considering Image Size
A Brief comparison of image size where the _only thing changing between images_ is the first line of the dockerfile, the `FROM` command.   
For reference, [Docker Node Images](https://hub.docker.com/_/node/tags?page=1&name=18&ordering=last_updated).  


- [Considering Image Size](#considering-image-size)
  - [Some Pre-Built Images](#some-pre-built-images)
  - [More Customized](#more-customized)
    - [Alpine as the Root](#alpine-as-the-root)

## Some Pre-Built Images
|Base Image|Output Size|1 Dot = 25MB (Micro Viz)|
|:--|--:|:-|
|node:18|950MB|.... .... .... .... .... .... .... .... .... ..|
|node:18-slim|243MB|.... .... ..|
|node:18-alpine|176MB|.... ...|
|alpine as the root|59MB|..|

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

## More Customized
Here are a couple more customized images to illustrate how building an image more "from scratch" can reduce the size EVEN MORE!

### Alpine as the Root

```dockerfile
# setup alpine & install node & npm
FROM alpine:3.12
RUN apk add --update nodejs npm

# -S: Create a system group
# -G Group
# add a group called node
# add a user node TO the node group
RUN addgroup -S node && adduser -S node -G node
USER node 

# setup the image directories
RUN mkdir /home/node/code 
WORKDIR /home/node/code
COPY --chown=node:node package-lock.json package.json ./


RUN npm ci
COPY --chown=node:node . .
EXPOSE 3000

# run the server
CMD ["node", "index.js"]
````
