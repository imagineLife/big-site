---
title: Running a Reverse Proxy
parentDir: /nginx
slug: nginx/reverse-proxy
author: Jake Laursen
excerpt: 3 node servers and a round-robin style load-balancer
tags: ["nginx", "reverse proxy", "node", "docker", "containers"]
order: 2
---

(_these are rough working notes - read at your own risk for now!_)

## The Goals
This will create a system where nginx acts as a reverse-proxy that passes requests along to some web servers.  
There will be 3 web-servers, all clones of each other. Nginx passes requests along, as a load-balancer, with nginx's default "round-robin" approach - continuously "rotating" requests between the web servers.    
The web servers are skeleton node http servers.  
The web servers and the nginx instance will all run in docker.  

- [The Goals](#the-goals)
- [The Node Server](#the-node-server)
  - [Build The Node Server](#build-the-node-server)
  - [Build A Dockerfile](#build-a-dockerfile)
  - [Verify The Node Server](#verify-the-node-server)

## The Node Server
### Build The Node Server
Here, a little node+express server.  

The directory and file:
```bash
mkdir node-server
cd node-server 
touch index.js

npm init -y
```

The Javascript file:
```js
const e = require("express")
const expObj = e()
const { hostname } = require("os")
const THIS_HOST = hostname()
const PORT = process.env.API_PORT || 8080
function rootHandler(req, res) {
  return res.send(`Hello from ${THIS_HOST}!`)
}
expObj.get("/", rootHandler)
const api_server = expObj.listen(PORT, () => console.log(`app running on ${PORT} on ${THIS_HOST}`));

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  api_server.close(() => {
    console.log('express server closed');
  });
});
```

### Build A Dockerfile
```dockerfile
FROM node:18-slim

# workdir - here, where the app will run
WORKDIR /node-api

# From the sibling app dir on the host to the docker image workdir
COPY app /node-api

# command to run during the image build process
RUN npm i

# command to run during container run
CMD node index.js
```

### Verify The Node Server
To test the node server without docker...
- run `npm i` in the `node-server` directory
- run `node .` in the `node-server` directory
- use a browser & enter the url `localhost:8080`
- the browser should return the "Hello from (the name of your machine)"


To-Do
- test it in a browser
- build a dockerfile for the node app
- use the dockerfile to build an image
- run the image as a container
  - `docker run -p 8080:8080 -d node-for-nx`
- write an nginx config 
  - a load balancer between 3 instances of the node app
  -  listen on port 8080 from the "outside"
-  create a docker network to run a bunch of containers on
   -  OVERVIEW of containers -
      -  nginx
      -  3 instances of a simple node api
   -  `docker network create nx-lb`
-  run the node app in 3x containers
  -  NOTE the hostnames of the nodeapp instances must match the written hostnames in the nginx config
  -  `docker run --hostname nodeapp1 name nodeapp1 -d node-for-nx`
  -  `docker run --hostname nodeapp2 name nodeapp2 -d node-for-nx`
  -  `docker run --hostname nodeapp2 name nodeapp2 -d node-for-nx`
- connect the 3 node apps to the network
  - `docker network connect nx-lb nodeapp1`
  - `docker network connect nx-lb nodeapp2`
  - `docker network connect nx-lb nodeapp3`
  -  `docker run --name nxproxy --hostname ng1 -p 8081:8081 --network nx-lb -v $PWD/nginx.conf:/etc/nginx/nginx.conf nginx:alpine`



```bash
# build it
docker build -t nodeapp .

# run it
docker run -p 8081:8080 --hostname node-one -d nodeapp
```
