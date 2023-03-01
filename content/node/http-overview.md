---
title: HTTP Servers
slug: node/http
author: Jake Laursen
excerpt: Probably one of the most prominent use-cases of node
tags: ["server", "node", "javascript", "http"]
parentDir: node
order: 7
---


Some details on http servers with node:  

- [I: Building an HTTP Server](/node/http/intro): A skeleton set of http servers - with node and with express

(_some more topics I hope to write up_)
- **CRUD**: leveraging http methods on resources to create, read, update and delete data
- **authorization**: "stateless" protection of resources
- **connecting to databases**: maybe a brief overview of connecting to mongodb and associating a trivial crud api to mongodb resources
- **scaling**:
  - **"vertically"**: taking advantage of more resources available on a machine than the basic http server setup provides: multi-threading, clustering...
  - **horizontally**: