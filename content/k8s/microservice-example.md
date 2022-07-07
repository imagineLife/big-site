---
title: A Microservice K8s Demo
parentDir: k8s
slug: /k8s/microservice-demo
author: Jake Laursen
excerpt: Deploying a Microservice set of Applications with K8s
tags: Kubernetes, K8s, Microservices
order: 13
---

# The Microservices
A Brief review of the microservices here:  

- A frontend app with an api + a frontend, where users can login and vote 1 of 2 options (_simple webapp here_)
- A redis datastore
- A postgres DB
- A "worker" service that syncs data from the redis service to the postgres service
- Another frontend that show vote tallies, mocking an "analytics" frontend   

Each service will get a pod.  


- [The Microservices](#the-microservices)
  - [Definition File Directory Structure](#definition-file-directory-structure)


## Definition File Directory Structure
```bash
# all configs go in a "configs" dir
/configs
  # config "types" get broken into sub-directories
  /pods
    pg.yaml           # postgres
    redis.yaml        # redis
    results-app.yaml  # web-app
    voting-app.yaml   # web-app
    worker.yaml       # db-syncing
  /services
    redis.yaml        # internal service
    pg.yaml           # internal service
```
