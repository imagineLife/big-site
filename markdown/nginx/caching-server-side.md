---
title: Learn Caching On The Server-Side with Nginx
parentDir: /nginx
slug: nginx/caching-server-side
author: Jake Laursen
excerpt:
tags:
  [
    'nginx',
    'reverse proxy',
    'node',
    'docker',
    'containers',
    'caching',
    'performance',
  ]
order: 8
---

# nginx Has Many Directives

nginx includes [a bunch](https://www.nginx.com/resources/wiki/start/topics/examples/fullexample2/#nginx-conf) of [directives](http://nginx.org/en/docs/http/ngx_http_proxy_module.html), & the docs even include [an alphabetical index of directives](http://nginx.org/en/docs/dirindex.html).  
Directives are a set of instructions.  
The directives I'll note here deal specifically with instructing nginx about timeouts in two ways: (a) [client-side](/nginx/caching-client-side), between itself and the client-world (b) server-side, between itself and "backend" proxied service(s).  
As a one-line review, nginx here lives between client requests and servers - client requests get to nginx and nginx "passes along" requests to servers. Servers respond, send the respond to nginx, which "passes along" the response to the client.

## server-side timeouts to restrict "stalling"
