---
title: More To Come
slug: node/http
author: Jake Laursen
excerpt: crud apis, auth, db connections, load-testing, scaling....
tags: ["server", "node", "javascript", "http"]
parentDir: node
order: 7
---

# More To Come With Node

(_some more topics I hope to write up_)

- **CRUD**: leveraging http methods on resources to create, read, update and delete data
- **authorization**: protecting api resources from unauthorized client requests
- **connecting to databases**: maybe a brief overview of connecting to mongodb and associating a trivial crud api to mongodb resources
- **load testing**: using a cli tool like siege to gain some understanding of the scalability of a node server
- **scaling**:
  - **"vertically"**: taking advantage of more resources available on a machine than the basic http server setup provides: multi-threading, clustering...
  - **managing workloads**: worker threads, child_processes and "offloading" some work from the primary process
