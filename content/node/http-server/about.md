---
title: HTTP Server Overview
slug: node/http-server
author: Jake Laursen
excerpt: A Server, The Internet, and Network Requests
parentDir: node
tags: ["http", "web", "server", "node", "express"]
order: 1
---

# Serving Content Over The Web

## What Is A Server
A Server is a computer. When it comes to the internet, "web servers" are computers that...
- have http* server tooling (like node's built-in [http module](https://nodejs.org/dist/latest-v18.x/docs/api/http.html))
- the http* server listening for requests over the [http protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- the http* server can respond to http requests and send to the requester some data
```mermaid
sequenceDiagram
  participant Browser

  Browser->>Web Server: REQUEST <br/> Hey web server, can I view this website?

  loop Handling the Request
  Web Server->>Web Server: - Receive Request <br/> - Use a "handler" <br/> - Prepare The Response
  end

  Web Server-->>Browser: RESPONSE: Here's what you asked for!
```

*Note: http could also be [http/2](https://nodejs.org/dist/latest-v18.x/docs/api/http2.html) or [https](https://nodejs.org/dist/latest-v18.x/docs/api/https.html).  
