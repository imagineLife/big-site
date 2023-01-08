---
title: "Noder Server III: With Dependenceis"
parentDir: docker
slug: docker/node-server-with-deps
author: Jake Laursen
excerpt: The IMpact of Dependencies in A Node Image
tags: Docker, Dockerfile, NodeJS, Container, Image, Dependencies
order: 8
---

## Node + Hapi
- [Node + Hapi](#node--hapi)
  - [An index.js server  file](#an-indexjs-server--file)
  - [install dependencies](#install-dependencies)
  - [add a dockerfile](#add-a-dockerfile)
  - [A Trivial Approach](#a-trivial-approach)
  - [build the container](#build-the-container)
  - [run the container \&\& server](#run-the-container--server)
- [Not Optimal](#not-optimal)
  - [...permission errors!](#permission-errors)
  - [build the container](#build-the-container-1)
  - [run the container](#run-the-container)
- [Why publish instead of Expose](#why-publish-instead-of-expose)
  - [get the port exposed](#get-the-port-exposed)
  - [check which port is exposed](#check-which-port-is-exposed)
- [Specifying What To Copy From Host To Image](#specifying-what-to-copy-from-host-to-image)
  - [See Everything that gets copied](#see-everything-that-gets-copied)
  - [Identify The Required Files](#identify-the-required-files)
  - [Set The Dockerfile to Only Copy the Required Files](#set-the-dockerfile-to-only-copy-the-required-files)

### An index.js server  file
This example uses hapi as a dependency in the node api - dependencies are common in node apps.
```js
const hapi = require('@hapi/hapi')

async function start(){
  const server = hapi.server({
    //LOCALHOST will break as a hard-loop
    host: "0.0.0.0",
    port: process.env.PORT || 3000
  })

  server.route({
    method: 'GET',
    path: '/',
    handler(){
      return {success: true }
    }
  })

  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true
    }
  })

  await server.start()
  return server;
}

start().catch(e => {
  console.log(e)
  process.exit(1)
})
```

### install dependencies
On the host machine
- go to terminal
- go to directory 'more-complicated-nodejs-app' or whatever it is called
- run ```npm init -y```
  - should now be package.json next to the index.js above
- run ``` npm install @hapi/hapi hapi-pino ```
- can TEST the node process by running ```node index.js```
  - the server can be reached @ localhost:3000/
  - the terminal should log some details

### add a dockerfile
### A Trivial Approach
```bash
touch Dockerfile
```
```dockerfile
FROM node:18

USER node
WORKDIR /home/node/code

# copy all from . to .
# THIS will get addressed later
COPY --chown=node:node . .

CMD ["node", "index.js"]
```


### build the container
```docker build -t noder-server-container```

### run the container && server
```
docker run --init --rm --publish 3000:3000 noder-server-container 
```

## Not Optimal
Above, the node_modules have been installed on the HOST computer. This is not optimal, perhaps
  - the npm install has to happen inside the container
  - the dockerfile needs updating...

```dockerfile
FROM node:18
USER node
WORKDIR /home/node/code

# copy all from . to .
COPY --chown=node:node . .

# adheres to the package-lock file, ignores some npm i stuff
RUN npm ci
CMD ["node", "index.js"]
```
### ...permission errors!
- this home/code  dir is owned by 'root' user not 'node' user
- dockerfile needs updating

```dockerfile
FROM node:18

USER node
#mkdir so that workdir doesnt try to make it as node user with bad permissions
RUN mkdir /home/node/code
WORKDIR /home/node/code

# copy all from . to .
# THIS will be dealth with later
COPY --chown=node:node . .

# adheres to the package-lock file, ignores some npm i stuff
RUN npm ci

CMD ["node", "index.js"]
```
### build the container
```docker build -t noder-server-container```
...now everything works as expected

### run the container
```
docker run --init --rm --publish 3000:3000 noder-server-container
```


## Why publish instead of Expose
- COULD write in the dockerfile 
  - ``` Expose 3000 ```
- this needs a flag
  - build the container
  - then run the container detatched, in the bg...
    - ```docker run --init --rm --detatch noder-server-container ```
    - detach runs it in the bg

localhost:3000 is not exposed yet

### get the port exposed
```docker run --init --rm --detach -P node-server-container```

### check which port is exposed
```docker ps```
see that the port INSIDE the container is 300, but the port FROM the outside is random...

## Specifying What To Copy From Host To Image
In the above dockerfiles, the copy command `COPY . .` copies all files from the host machine into the docker image.  
This is a beginning approach to getting everything working in an image so that the container works.  
This, though, can be more explicit so that _files that are not required in the running container_ can be ignored in the container.

### See Everything that gets copied
```bash
# 1. build the image
docker build -t my-tag .
# ...will output a bunch of progress

# 2. run the container in the background with the -d flag
docker run -d my-tag

# 3. get the terminal "into" the container
docker exec -it my-tag bash

# 4. the terminal might look something like this
node@6e2bd62160d3:~/code$

# 5. use THIS to list out the files in the container
node@6e2bd62160d3:~/code$ ls
```

After building the image and running a container, we can see what is in the running inside the container.  
step 2 above runs the container in the bg.  
step 3 above puts the terminal "inside" the running container & the "new" repl cli will show something like step 4
- `node` is the user
- `@garblygook` is the container id
- `/code` is the directory that the shell is "in"

In step 5, running ls will show the files in the project. This might looks something like....
```bash
Dockerfile index.js  node_modules  package-lock.json  package.json
```

### Identify The Required Files
The trick here is know which files and directories are required to run the project. Here, we are running a node server, & the only "required" files in this case are the `index.js`, and `node_modules`.  
In more complex (_perhaps production_) environments, many more files will be present: linting configs, testing files... a whole bunch of stuff. This is where copying everything becomes un-needed.  

### Set The Dockerfile to Only Copy the Required Files
Here a bunch of new things will happen:
- 2 "stages" will happen in the docker file (_a [multi-stage build](https://docs.docker.com/build/building/multi-stage/#use-multi-stage-builds)_)
- the first stage will 
  - copy a few host files into a "build" dir
  - run `npm ci`
  - use a node image
- the second stage will
  - use a much smaller image, an alpine image
  - install node "manually"
  - add a `node` user + group to the alpine os
  - make a directory to put the code in
  - copy the required files from the _first_ build stage
    - the `index.js` node file
    - the `node_modules` dir
    - run the node process

```dockerfile
# prep & do OS work
FROM node:18-slim as buildstage
# store build content in build dir
# as root user!
WORKDIR /build

# prep & do npm work
COPY package-lock.json package.json ./
RUN npm ci
COPY . .


# STAGE: runtime container
# prep & do os work
FROM alpine:3.12
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node 

# prep & do  mkdir, copy files, and running process work
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=buildstage --chown=node:node /build/index.js .
COPY --from=buildstage --chown=node:node /build/node_modules ./node_modules
CMD ["node", "index.js"]
```