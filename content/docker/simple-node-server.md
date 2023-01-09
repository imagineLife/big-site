---
title: "Node Server I: Containerization"
parentDir: docker
slug: docker/node-server-containerized
author: Jake Laursen
excerpt: A Piece-by-Piece Approach to a simple node server in a docker Image + Container
tags: Docker, Dockerfile, NodeJS, Container, Image
order: 6
---

# A Node App Container
Here, a docker image will be built.  
The image will run a nodeJs web server that can be pinged at a "root" url and return a string that reads "omg hey!!".

- [A Node App Container](#a-node-app-container)
  - [Create a Directory to Hold Everything](#create-a-directory-to-hold-everything)
    - [Create A Simple Node Server](#create-a-simple-node-server)
  - [Handle The Image Details](#handle-the-image-details)
    - [Create A Dockerfile To Instruct Docker](#create-a-dockerfile-to-instruct-docker)
    - [Build The Image](#build-the-image)
    - [Run The Image As A Container](#run-the-image-as-a-container)
  - [Allow Network Traffic Between Host And Container](#allow-network-traffic-between-host-and-container)
  - [allow network traffic from host to container](#allow-network-traffic-from-host-to-container)

## Create a Directory to Hold Everything
```bash
# in a terminal
mkdir a-node-image
cd a-node-image
touch index.js
```

### Create A Simple Node Server
```js
// index.js
const http = require('http')
http.createServer((res,res) => {
  console.log('req recieved!')
  res.end('omg hey!!', 'utf-8')
})
.listen(3000)
console.log('server started!')
```

## Handle The Image Details
### Create A Dockerfile To Instruct Docker
```bash
# make a dockerfile inside the a-node-image directory
touch Dockerfile
```

Edit the dockerfile:
```yaml
# pull the node stretch img
FROM node:18

# copy the http server file from the computer's filesystem "into" the docker image space
COPY index.js index.js

# run the index.js file using node
CMD ["node", "index.js"]
```

### Build The Image
```bash
# at the root of the a-node-image dir
docker build -t node-box .
```
- tagging the app image to a friendly name of `node-box`
- `.` tells docker to look at the current directory for a file called `Dockerfile`
- should see some output about the image build process!
- why the hashes in the output?! 
  - there are valid containers throughout the build process, for each step, or each STAGE
  - at each Stage of the build process, a new image gets built and saved to optimize any other image builds from the same stage steps


### Run The Image As A Container
```bash
docker run node-box
```

- trying to ACCESS this node app from a bworser won't work
- the containerized node app is not available to the "world", to the host machine 
- cant hit ctl+c to quit the container
  - docker gives a hack flag that allows ctrl+c to work...

```
docker run --init --rm node-box
```

- the --init flag runs 'tini', so that when i want to quit the container by typing ctrl+c, tini does it for me!
- the `--rm` flag removes the container on shutdown 

## Allow Network Traffic Between Host And Container
## allow network traffic from host to container
expose port 3000 of the running container to the host machine, so that navigating to `localhost:3000` hits the container and returns the expected result in the browser
```
docker run --publish 3000:3000 node-box
```
- the `--publish` flag maps internal port to external port!
