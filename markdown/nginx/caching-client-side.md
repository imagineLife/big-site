---
title: Learn Caching On The Client-Side with Nginx
parentDir: /nginx
slug: nginx/caching-client-side
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
order: 7
---

# nginx Has Many Directives

nginx includes [a bunch](https://www.nginx.com/resources/wiki/start/topics/examples/fullexample2/#nginx-conf) of [directives](http://nginx.org/en/docs/http/ngx_http_proxy_module.html), & the docs even include [an alphabetical index of directives](http://nginx.org/en/docs/dirindex.html).  
Directives are a set of instructions.  
The directives I'll note here deal specifically with instructing nginx about timeouts in two ways: (a) client-side, between itself and the client-world (b) server-side, between itself and "backend" proxied service(s).  
As a one-line review, nginx here lives between client requests and servers - client requests get to nginx and nginx "passes along" requests to servers. Servers respond, send the respond to nginx, which "passes along" the response to the client.

## client-side timeouts to restrict "stalling"

## client_header_timeout

Restrict the time it takes for a client to finish sending headers with [client_header_timeout](http://nginx.org/en/docs/http/ngx_http_core_module.html#client_header_timeout). The default value is 60s & can be shortened when the expected request time for headers, alone, is much less.  
When might this be helpful? To be a preventative measure against long-lasting open requests to the backend server: this is called the [slowloris DDoS attack](https://www.cloudflare.com/learning/ddos/ddos-attack-tools/slowloris/)

```bash
http{
  client_header_timeout: 5s;
}
```

### client_body_timeout

the [client_body_timeout](http://nginx.org/en/docs/http/ngx_http_core_module.html#client_body_timeout) sets a maximum time allowed for a request body to complete.

### send_timeout

[send_timeout](http://nginx.org/en/docs/http/ngx_http_core_module.html#send_timeout) sets the max time allowed to while transmitting the response to the client

### keepalive_timeout

[keepalive_timeout](http://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout) sets the max time that a client with the "keep-alive" header can stay open

### lingering_timeout

the [most time to wait for a "lingering" client data request to continue](http://nginx.org/en/docs/http/ngx_http_core_module.html#lingering_timeout). The default lingering timeout is 5s.  
This is connected to the [lingering_close directive](http://nginx.org/en/docs/http/ngx_http_core_module.html#lingering_close), which is "on" by default.

### resolver_timeout

[resolver_timeout](http://nginx.org/en/docs/http/ngx_http_core_module.html#resolver_timeout) is the max time to "resolve" a name resolution (like a dns)
