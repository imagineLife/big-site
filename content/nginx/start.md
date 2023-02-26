---
title: "nginx: an intro from a web-first perspective"
parentDir: /
slug: nginx-intro
author: Jake Laursen
excerpt: What It Does And How It Can Fit In A Tech Stack
tags: ["nginx", "server"]
order: 1
---

# nginx
## A WebServer For Web Developers
Coming from a "full-stack"-first developer set of experiences, [nginx](https://www.nginx.com/resources/glossary/nginx/) nginx might feel most similar to a web-server - something like an [express](https://expressjs.com/) server with [node](https://nodejs.org/en/). nginx, though, is used for different use-cases - a reverse proxy, caching assets, load balancing... things that can compliment what node apps might be more traditionally built to do.  

## Spin Up The Out-Of-The-Box Docker Image
```bash
docker run --name ngx -p 8081:80 --hostname ng1 -d nginx
```
A brief rundown -
- use docker
- name the container `ngx`
- make the running container available on port `8081` on the host 
- give it a hostname of `ng1`
- run it in the background