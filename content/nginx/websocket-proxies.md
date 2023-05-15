---
title: NGINX As A Websocket Proxy
parentDir: /nginx
slug: nginx/websocket-proxies
author: Jake Laursen
excerpt:
tags: ["nginx", "reverse proxy", "node", "docker", "containers", "load balancer", "websockets"]
order: 6
---

# NGINX As A Websocket Proxy
## Using Layer 4
```nginx
  stream {
    
    <!-- 4 instances of a websocket backend -->
    upstream wsbackends {
      server 127.0.0.1:2222;
      server 127.0.0.1:3333;
      server 127.0.0.1:4444;
      server 127.0.0.1:5555;
    }    
  }

  server {
    listen 80;
    proxy_pass wsbackends;
  }
```

## Using Layer 7
