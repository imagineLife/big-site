---
title: Use-Cases for NGINX as a Layer-4 Proxy
parentDir: /nginx
slug: nginx/layer-4-proxy
author: Jake Laursen
excerpt:
tags: ["nginx", "reverse proxy", "node", "docker", "containers", "load balancer"]
order: 5
---

# NGINX as a Layer-4 Proxy
Layer 7 has application awareness - paths, etc.
Layer 4 only has networking and application port awareness.  
nginx as a Layer 4 proxy is more like a "sticky session" than layer 7 - this will (_likely_) persist a request from a browser client to the same instance of a backend instance.  

## Setup an Nginx Config File
There are a few subtle but critical differences between this layer-4 config and a [layer-7 config](/nginx/layer-7-proxy):
- the `http` block in the layer-7 is now a [`stream`](https://nginx.org/en/docs/stream/ngx_stream_core_module.html) block
- there are no `location` declarations in this layer-4 config. the `location` references paths in the layer-7 examples, and the paths are declared by the application. Because layer-4 does not "know" about paths, layer-4 cannot interpret the paths
- 
```bash
stream{

  # register the backend services, the node apps, with this nginx instance 
  upstream allbackend {
    server  127.0.0.1:2222;
    server  127.0.0.1:3333;
    server  127.0.0.1:4444;
    server  127.0.0.1:5555;
  }

  server{
    listen: 80;
      proxy_pass http://allbackend/;
    }
  }
}
events{}
```
