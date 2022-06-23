---
title: Containers First
parentDir: k8s
slug: /k8s/containers-first
author: Jake Laursen
excerpt: Containers before Kubernetes
tags: Kubernetes, K8s, containers, pre-requisites
order: 1
---
# Kubernetes Solves Some Problems
## Understand Containers First
Coming from a frontend-first & "full-stack" experience first, containers are required to understand before Kubernetes.  

Consider a REST API and some "parts" that are required to run a rest api:
- an os
- a programming language 
- files that include the "logic" of the REST API (_http server, port allocation, endpoint config, etc_)
- Hardware: the machine, its RAM, its Disk storage, its network interfaces, etc. 

"Containers", in my brief experience with [Docker](https://www.docker.com/), bundle those types of things together.  
Containers can be helpful when...
1. working across many "projects": 1 container for the rest api, 1 container for a db, 1 container for a micro-service, etc
2. working with others who are working exclusively on one of those "containers" above, where you are working on a different one
3. running many parts all at once: rather than running the db, a few "microservices", and a rest api (_or a few_) all on your personal laptop, Docker and [Docker Compose](https://docs.docker.com/compose/) has allowed for "containerizing" all of those "services" and running them with potentially a single command - less to deal with when only developing one service at a time.  
Containers share a single parent OS.  

## Containers get Orchestrated
[Docker Compose](https://docs.docker.com/compose/), as noted above, helps in a few ways - primarily probably running several containers at once with little development effort.  
Managing several containers across a system is called container orchestration.  


## Beyond a Single Host
Docker and docker compose are great.  
In my experience they have primarily been used on a single host machine, running all the containers in 1 piece of hardware.  