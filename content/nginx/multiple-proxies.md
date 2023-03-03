---
title: Two Load-Balancers Across Two Ports
parentDir: /nginx
slug: nginx/multiple-proxies
author: Jake Laursen
excerpt: Here, 6 node servers behind 2 nginx instances - 3 node servers per nginx proxy
tags: ["nginx", "reverse proxy", "node", "docker", "containers", "load balancer"]
order: 3
---

## The Goals 
This takes advantage of some notes already written in a [previous post on nginx as a load-balancer](/nginx/reverse-proxy).  
Here, 2 nginx instances will...
- listen on 2 ports : 8081 and 8082
- "pass" the requests to 3 round-robin node apps
  - **here**, the two instances of nginx will each have 3 (_different_) node backend instances to "forward" the requests to

- [The Goals](#the-goals)
- [The Node Server](#the-node-server)
- [The NGINX Load-Balancers](#the-nginx-load-balancers)
  - [Config 1 - half the node instances on port 8081](#config-1---half-the-node-instances-on-port-8081)
  - [Config 2 - half the node instances](#config-2---half-the-node-instances)
- [Build a Docker Network](#build-a-docker-network)
- [Run And Connect All Of the Containers](#run-and-connect-all-of-the-containers)
  - [3x the node app](#3x-the-node-app)
  - [The NGINX container](#the-nginx-container)
- [Test The Setup](#test-the-setup)
- [Compose For A Different Approach](#compose-for-a-different-approach)


## The Node Server
See [the previous post](/nginx/reverse-proxy) for a trivial node api, which includes...
- **The Server:** a trivial node rest api
- **Containerizing The Server**: building a dockerfile, building an image from the dockerfile, and running container

## The NGINX Load-Balancers
With the goal here being to have 2x nginx instances running, 2 nginx config files will be built.  
The files will be nearly identical:
- the servers listed in the "nodebackend" section will be named differently between the 2 nginx instnaces
- the port that reverse proxy listens on will be differently between the 2 nginx instnaces

### Config 1 - half the node instances on port 8081
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

### Config 2 - half the node instances
Here's the nginx config, maybe name it `nginx2.conf`:
```text
# the context here: http context
http {

  # defaults to a "round-robin" method for load balancing across servers
  # here, the servers are named "nodebackend"
  upstream nodebackend {

    server nodeapp4:8080;
    server nodeapp5:8080;
    server nodeapp6:8080;

  }

  server {
    # here, listening on port 8082
    listen 8082;
    location / {
      
      proxy_pass http://nodebackend/;
    }
  }
}

# can set things like maximum-worker-connections...
events {}
```
The nginx config is setup to listen on port 8082 and round-robin balance the requests to 3 different apps: nodeapp4 on port 8080, nodeapp5 on port 8080, and nodeapp5 on port 8080.

## Build a Docker Network
In order for the containers to be able to "talk to" each other, they all will get put on the same network. Here, this network will be called `nxnet`: `docker network create nxnet`.  

## Run And Connect All Of the Containers
### 6x the node app
This showcase one nice detail of working with docker: spinning up 6 node apis from the same image:
-  `docker run --hostname nodeapp1 --network nxnet name nodeapp1 --env API_PORT=8080 -d nodebox`
-  `docker run --hostname nodeapp2 --network nxnet name nodeapp2 --env API_PORT=8080 -d nodebox`
-  `docker run --hostname nodeapp3 --network nxnet name nodeapp3 --env API_PORT=8080 -d nodebox`
-  `docker run --hostname nodeapp4 --network nxnet name nodeapp4 --env API_PORT=8080 -d nodebox`
-  `docker run --hostname nodeapp5 --network nxnet name nodeapp5 --env API_PORT=8080 -d nodebox`
-  `docker run --hostname nodeapp6 --network nxnet name nodeapp6 --env API_PORT=8080 -d nodebox`

The above commands include the `--network nxnet` flag.  
Containers can be started without that flag and later joined to a network...
- create a container in one command: `docker run --hostname nodeapp7 name nodeapp7 -d nodebox`
- join the network in another command: `docker network connect nxnet nodeapp7`

Also, these containers do not expose ports! These containers will only "talk to" the nginx container, and the nginx container will be accessible from the host machine.  


### The NGINX containers
-  `docker run --name nxproxy --hostname ng1 -p 8081:8081 --network nxnet -v $PWD/nginx.conf:/etc/nginx/nginx.conf nginx:alpine`
-  `docker run --name nxproxy --hostname ng2 -p 8082:8082 --network nxnet -v $PWD/nginx2.conf:/etc/nginx/nginx.conf nginx:alpine`

Note the volume mounts: the configs file made earlier gets mounted to the [default location in the container](https://hub.docker.com/_/nginx), `/etc/nginx/nginx.conf`.  

## Test The Setup
use a browser and go to `localhost:8081`.  
This will connect to nginx, which passes the request, round-robin, to the 3 instances of the node api.  
The UI should show `Hello from ______`.  
Refreshing the page should show "rotating" values in the `Hello from ______` - 3 different values.   
This rotation of values illustrates that nginx is having the 3 instances of the node server "handle" the requests and responses, as the 3 rotating values represent the 3 "hosts" of each docker container.  
use a browser and go to `localhost:8082` - the same "rotating" output should exist :) 
