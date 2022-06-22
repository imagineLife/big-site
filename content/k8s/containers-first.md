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