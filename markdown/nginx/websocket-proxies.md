---
title: Learn how to make a websocket proxy with nginx
parentDir: /nginx
slug: nginx/websocket-proxies
author: Jake Laursen
excerpt:
tags:
  [
    'nginx',
    'reverse proxy',
    'node',
    'docker',
    'containers',
    'load balancer',
    'websockets',
  ]
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

```nginx
  stream {

    <!-- 4 instances of a websocket backend at two different registered upstream services -->
    upstream wsbackendone {
      server 127.0.0.1:2222;
      server 127.0.0.1:3333;
    }

    upstream wsbackendtwo {
      server 127.0.0.1:4444;
      server 127.0.0.1:5555;
    }
  }

  server {
    listen 80;

    <!-- this is the only difference between layer 4 and layer 7 -->
    location /wsapp {
      proxy_pass http://wsbackendone;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header Host $host;
    }

    location /wschat {
      proxy_pass http://wsbackendtwo;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header Host $host;
    }
  }
```

## Websocket Proxying Alongside Static Contents

```nginx
  stream {

    <!-- 4 instances of a websocket backend at two different registered upstream services -->
    upstream wsbackendone {
      server 127.0.0.1:2222;
      server 127.0.0.1:3333;
    }

    upstream wsbackendtwo {
      server 127.0.0.1:4444;
      server 127.0.0.1:5555;
    }
  }

  server {
    listen 80;

    location / {
      <!-- where index.html "lives" on the server -->
      root path/to/indexHtml/directory
    }

    <!-- this is the only difference between layer 4 and layer 7 -->
    location /wsapp {
      proxy_pass http://wsbackendone;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header Host $host;
    }

    location /wschat {
      proxy_pass http://wsbackendtwo;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header Host $host;
    }
  }
```
