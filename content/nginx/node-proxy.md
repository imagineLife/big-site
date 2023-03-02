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
  - [Run The Docker Image](#run-the-docker-image)
    - [Not Exposed with Bash and Curl](#not-exposed-with-bash-and-curl)
  - [Verify The Node Server](#verify-the-node-server)
  - [Verify The Node Server In Docker](#verify-the-node-server-in-docker)
- [The NGINX Load-Balancer](#the-nginx-load-balancer)
  - [Build the Nginx config](#build-the-nginx-config)
- [Build a Docker Network](#build-a-docker-network)
- [Run And Connect All Of the Containers](#run-and-connect-all-of-the-containers)
  - [3x the node app](#3x-the-node-app)
  - [The NGINX container](#the-nginx-container)
- [Test The Setup](#test-the-setup)

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
FROM node:18

# workdir - here, where the app will run
WORKDIR /node-api

# From the sibling app dir on the host to the docker image workdir
COPY app /node-api

# command to run during the image build process
RUN npm i

# NOTE: entrypoint OVER CMD to pass along process signals to the node process!
ENTRYPOINT [ "node", "index.js" ]
```

### Run The Docker Image
Here are a few ways to run the image as a container:

#### Not Exposed with Bash and Curl
- run the image as a container with 

### Verify The Node Server
To test the node server without docker and just node on your machine
- run `npm i` in the `node-server` directory
- run `node .` in the `node-server` directory
- use a browser & enter the url `localhost:8080`
- the browser should return the "Hello from (the name of your machine)"

### Verify The Node Server In Docker
To test the node server with docker
- build an image by running `docker build -t nodebox .` in the `node-server` directory
- run the image as a container with `docker run -d -rm --name node-box -p 8080:8080 nodebox`
- use a browser & enter the url `localhost:8080`
- the browser should return the "Hello from (the name of the docker "host", which is probably a bit of garbly-gook to look at)"

## The NGINX Load-Balancer 
### Build the Nginx config
[nginx docs](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) have a great write-up on load-balancing with nginx, including notes on...
- [**http context**](https://nginx.org/en/docs/http/ngx_http_upstream_module.html?&_ga=2.250182340.397332022.1677686402-1818721733.1677362332#upstream): where the http server conf (_directive_) is specified
- [**upstream**](https://nginx.org/en/docs/http/ngx_http_upstream_module.html?&_ga=2.250182340.397332022.1677686402-1818721733.1677362332#upstream): defining a group of servers and naming them
- [**server**](https://nginx.org/en/docs/http/ngx_http_upstream_module.html?&_ga=2.47280741.397332022.1677686402-1818721733.1677362332#server) _inside the "upstream" block here_: defines an address for each server - the port is optional and when not present defaults to `80`. this can have more config details (_hope to cover elsewhere_)
  - [**server**](https://nginx.org/en/docs/http/ngx_http_core_module.html#server) as the server block, configuring a "virtual server"
- [**listen**](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen): where to "listen" for requests
- [**location**](https://nginx.org/en/docs/http/ngx_http_core_module.html#location): request-url-specific config settings
- [**proxy_pass**](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass): the url (protocol+address) of the server that gets proxied _to_
Here's the nginx config:
```text
# the context here: http context
http {

  # defaults to a "round-robin" method for load balancing across servers
  # here, the servers are named "nodebackend"
  upstream nodebackend {

    server nodeapp1:8080;
    server nodeapp2:8080;
    server nodeapp3:8080;

  }

  server {
    # here, listening on port 8081
    listen 8081;
    location / {
      
      proxy_pass http://nodebackend/;
    }
  }
}

# can set things like maximum-worker-connections...
events {}
```
The nginx config is setup to listen on port 8081 and round-robin balance the requests to 3 different apps: nodeapp1 on port 8080, nodeapp2 on port 8080, and nodeapp3 on port 8080.  

## Build a Docker Network
In order for the containers to be able to "talk to" each other, they all will get put on the same network. Here, this network will be called `nxnet`: `docker network create nxnet`.

## Run And Connect All Of the Containers
### 3x the node app
This showcase one nice detail of working with docker: spinning up 3 node apis from the same image:
-  `docker run --hostname nodeapp1 --network nxnet name nodeapp1 --env API_PORT=8080 -d nodebox`
-  `docker run --hostname nodeapp2 --network nxnet name nodeapp2 --env API_PORT=8080 -d nodebox`
-  `docker run --hostname nodeapp2 --network nxnet name nodeapp3 --env API_PORT=8080 -d nodebox`

The above commands include the `--network nxnet` flag.  
Containers can be started without that flag and later joined to a network...
- create a container in one command: `docker run --hostname nodeapp4 name nodeapp4 -d nodebox`
- join the network in another command: `docker network connect nxnet nodeapp4`

Also, these containers do not expose ports! These containers will only "talk to" the nginx container, and the nginx container will be accessible from the host machine.  


### The NGINX container
-  `docker run --name nxproxy --hostname ng1 -p 8081:8081 --network nxnet -v $PWD/nginx.conf:/etc/nginx/nginx.conf nginx:alpine`

Note the volume mount: the config file made earlier gets mounted to the [default location in the container](https://hub.docker.com/_/nginx), `/etc/nginx/nginx.conf`.  

## Test The Setup
use a browser and go to `localhost:8081`.  
This will connect to nginx, which passes the request, round-robin, to the 3 instances of the node api.  
The UI should show `Hello from ______`, with 3 different values rotating. This illustrates that nginx is having the 3 instances of the node server "handle" the requests and responses.  
