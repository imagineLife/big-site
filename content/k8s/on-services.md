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
Inside and outside an single.  
I.E. - groups of pods where...
- some are frontends
- some are "backends"
- some connect to data sources
Services help with communication, with loose coupling between components.  

## Types of SErvices
### Node Port
- an object
- lives in a  node
- listens to ports on the node
- fwds req from a port to a port the pod
- allows for pod-access from "outside" the k8s world


## External Communicaton
- a container, in
- a pod, with an internal pod network and IP (_lets say 10.244.0.2 that is in a range of 10.244.0.0-2XX or something_) in
- a node with an IP (_lets say 192.168.1.2_)
- **a service** in the node
  - the service is an object
  - listens to ports on the node
  - fwds req from a port to a port the pod
  - **its a node port service**
- my laptop with an ip (_lets say 192.168.1.10_)
- NOTE: the laptop and the node have the same network

Get access to the pods webpage
- ssh into the k8s node
  - get to the pod address (_10.244.0.2_)
- OR
- 

