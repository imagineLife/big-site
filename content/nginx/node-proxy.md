---
title: Running a Reverse Proxy
parentDir: /nginx
slug: /nginx/reverse-proxy
author: Jake Laursen
excerpt: A replicated node server and a reverse proxy
tags: ["nginx", "reverse proxy", "node", "docker", "containers"]
order: 2
---


NGINX
- 3 containers
  - nginx as webserver
  - 1x node as express api
  - 1x node as express api
  - put it all in docker, with a docker-compose file

To-DO
- build a node/express server
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
mkdir app
touch index.js
```

```js
const e = require('express')
const expObj = e()
const { hostname } = require('os')
const THIS_HOST = hostname();
function rootHandler(req,res){
  return res.send(`Hello from ${THIS_HOST}!`)
}
expObj.get('/',rootHandler)
expObj.listen(8080, () => console.log(`app running on 8080 on `,THIS_HOST))
```

```bash
npm init -y
```

```dockerfile
FROM node:18-slim

# workdir - here, where the app will run
WORKDIR /home/node/api

# From the sibling app dir on the host to the docker image workdir
COPY app /home/node/api/

# command to run during the image build process
RUN npm i

# command to run during container run
CMD node index.js
```

```bash
# build it
docker build -t nodeapp .

# run it
docker run -p 8081:8080 --hostname node-one -d nodeapp
```
