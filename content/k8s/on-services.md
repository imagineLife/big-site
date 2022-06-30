---
title: On Services
parentDir: k8s
slug: /k8s/intro-to-services
author: Jake Laursen
excerpt: Only an Intro
tags: Kubernetes, K8s, services
order: 8
---

# Services
K8s services enable communication between components.  
Inside and outside and single.  
I.E. - groups of pods where...
- some are frontends
- some are "backends"
- some connect to data sources
Services help with communication, with loose coupling between components.  

- [Services](#services)
  - [Types of Services](#types-of-services)
    - [Node Port](#node-port)
    - [Cluster IP](#cluster-ip)
    - [Load Balancer](#load-balancer)
  - [External Communicaton](#external-communicaton)
## Types of Services
### Node Port
- an object
- lives in a  node
- listens to ports on the node
- fwds req from a port to a port the pod
- allows for pod-access from "outside" the k8s world

### Cluster IP 
- creates a virtual ip in a cluster
- lives in a cluster
- enables communication between services

### Load Balancer
- provisions a load-balancer
- distribute load across servers

## External Communicaton
- a container, in
- a pod, with an internal pod network and IP (_lets say 10.244.0.2 that is in a range of 10.244.0.0-2XX or something_) in
- a node with an IP (_lets say 192.168.1.2_)
- **a service** in the node, the node port service
  - the service is an object
  - listens to ports on the node
  - fwds req from a port to a port the pod
  - **its a node port service**
- my laptop with an ip (_lets say 192.168.1.10_)
- NOTE: the laptop and the node have the same network
