---
title: Building an HTTP Server
slug: http-server
author: Jake Laursen
excerpt: An overview of http servers
parentDir: http-server
tags: http, web, server, node, express
order: 1
---

# Serving Content Over The Web
Diagram Coming soon...
```js
// mermaid
sequenceDiagram
  participant Browser

  Browser->>Web Server: REQUEST </br> Hey web server, can I view this website?

  loop Handling </br> the Request
  Web Server->>Web Server: - Receive Request </br> - Use a "handler" </br> - Prepare The Response
  end

  Web Server-->>Browser: RESPONSE: Here's what you asked for!
```
