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
A Server is a computer. When it comes to the internet, there are "web servers". "web servers" are computers (servers) that...
- have http* server tooling (like node's built-in [http module](https://nodejs.org/dist/latest-v18.x/docs/api/http.html)) which...
  - **listening** for requests over the [http protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
  - **responds to requests** (_typically from a browser or http client_) and sends to the requester some data

When going to a browser (google chrome, safari, firefox, opera, edge, brave, etc) and typing in a url `www.google.com`, the browser is making a request to the internet which eventually makes it to a server where the google website is served by a server.  

```mermaid
sequenceDiagram
  participant Browser

  Browser->>Web Server: REQUEST <br/> Hey web server, can I view this website?

  loop Handling the Request
  Web Server->>Web Server: - Receive Request <br/> - Use a "handler" <br/> - Prepare The Response
  end

  Web Server-->>Browser: RESPONSE: Here's what you asked for!
```

***Notes**
- http could also leverage [http/2](https://nodejs.org/dist/latest-v18.x/docs/api/http2.html) and/or [https](https://nodejs.org/dist/latest-v18.x/docs/api/https.html)
- for code examples of the http server, see these [trivial examples](/node/http-server/trivial-servers/) to get started  
