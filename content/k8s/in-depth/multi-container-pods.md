---
title: Multi-Container Pods Can be Valuable For Tightly-Coupled Applications
parentDir: k8s/in-depth
slug: k8s/in-depth/multi-container-pods
author: Jake Laursen
excerpt: A few meaningful approaches to deploying multiple containers in a single pod
tags: Kubernetes, K8s, pods, containers, patterns, sidecar, adapter, ambassador
order: 12
---

# Multi-Container Pods
A Microservice-Style set of apps might work for multi-container pods.  
A web server might need a logging service. Ba-Da-Bing Ba-da-boom.  
When 2 containers are in the same pod, the containers can "know" about each other as "localhost" - a nice little tidbit.  

## Extend a Primary Function with the Sidecar Pattern
- No intervention required of the primary container
- The second container is independent of the primary

## Proxy Access Between Containers with the Ambassador Pattern
- Scaling an existing Service? the Ambassador pattern can extract things like repeating access-details into a separate container
- Testing the deployment of a project? The ambassador container can be a proxy, routing a percentage of traffic to a test deployment

##  Transform output from a Primary container with the Adapter Pattern
- Transformers. They're robots in disguise.  