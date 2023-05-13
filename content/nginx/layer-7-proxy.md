---
title: Use-Cases for NGINX as a Layer-7 Proxy
parentDir: /nginx
slug: nginx/layer-7-proxy
author: Jake Laursen
excerpt:
tags: ["nginx", "reverse proxy", "node", "docker", "containers", "load balancer"]
order: 4
---

# NGINX as a Layer-7 Proxy
Here, nginx will be used as a layer-7 proxy. nginx will "route" network requests to 1-of-4 node servers:
- nginx will listen on port 80
- nginx will "load-balance" between 4 backend instances of a node api
- node servers should be available on ports `2222`, `3333`,`4444` and `5555`

## Setup an Nginx Config file
```bash
http{

  # register the backend services, the node apps, with this nginx instance 
  upstream allbackend {
    server  127.0.0.1:2222;
    server  127.0.0.1:3333;
    server  127.0.0.1:4444;
    server  127.0.0.1:5555;
  }

  server{
    listen: 80;
    location / {
      # allbackend references the service above!
      # send all requests to that backend
      proxy_pass http://allbackend/;
    }
  }
}
events{}
```

## Enable Sticky Sessions Between the Requester And The Backend Instance
This technique makes it so that requests from a single client (browser, user at a machine) "stays" consistent with a single backend instance.  
This is referred to as a "stateful" connection, where there now exists a "state" of connection between a client and a server.  
This is different than the out-of-the-box round-robin approach because with the round-robin approach (as described above) rotates requests from a client between backend instances.  

```bash
http{

  # register the backend services, the node apps, with this nginx instance 
  upstream allbackend {
    # https://nginx.org/en/docs/http/ngx_http_upstream_module.html#ip_hash
    ip_hash;
    server  127.0.0.1:2222;
    server  127.0.0.1:3333;
    server  127.0.0.1:4444;
    server  127.0.0.1:5555;
  }

  server{
    listen: 80;
    location / {
      # allbackend references the service above!
      # send all requests to that backend
      proxy_pass http://allbackend/;
    }
  }
}
events{}
```


## Connect url paths to backend instances
nginx can connect specific url paths to specific backend app instances.  
A use-case, here, might be backend with "microservices", where say two teams in an org are focused on two different parts of an api. Each teams' api's could be served through separate api servers, allowing for separate SDLC strategies per team and per api set.  

Lets say team 1 is working on `/summary/**` endpoints for analytics data and another team is working on `/user-data/**` endpoints for consuming user input. nginx will route requests to each endpoint to separate backend instances.  

Here, 2 instances of each backend will exist, each available on 2 different ports.   

```bash
http{

  upstream allinstances {
    server  127.0.0.1:2222;
    server  127.0.0.1:3333;
    server  127.0.0.1:4444;
    server  127.0.0.1:5555;
  }


  upstream summaryinstances {
    server  127.0.0.1:2222;
    server  127.0.0.1:3333;
  }

  upstream userdatainstances {
    server  127.0.0.1:4444;
    server  127.0.0.1:5555;
  }

  server{
    listen: 80;

    location / {
      proxy_pass http://allinstances/;
    }

     location /summary {
      proxy_pass http://summaryinstances/;
    }

    location /user-data {
      proxy_pass http://userdatainstances/;
    }
  }
}
events{}
```


## Block Connections To A Specific Route
NGINX can "block" responding to specific routes.  
A use-case here might be to disallow access to `/admin` routes - these could be for "internal-only" use-cases. NGINX can help with this type of use-case.  
This will "block" responses to `/admin` without a port.  
In this example, `/admin` will continue to be available on ports `2222`, `3333`,`4444` and `5555`.

```bash
http{

  upstream allinstances {
    server  127.0.0.1:2222;
    server  127.0.0.1:3333;
    server  127.0.0.1:4444;
    server  127.0.0.1:5555;
  }


  upstream summaryinstances {
    server  127.0.0.1:2222;
    server  127.0.0.1:3333;
  }

  upstream userdatainstances {
    server  127.0.0.1:4444;
    server  127.0.0.1:5555;
  }

  server{
    listen: 80;

    location / {
      proxy_pass http://allinstances/;
    }

     location /summary {
      proxy_pass http://summaryinstances/;
    }

    location /user-data {
      proxy_pass http://userdatainstances/;
    }

    location /admin {
      retirn 403;
    }
  }
}
events{}
```