---
title: Build Rules for Pod Network Traffic
parentDir: k8s/in-depth
slug: k8s/in-depth/network-policies
author: Jake Laursen
excerpt: Ingress policies allow incoming network requests, and Egress policies all outgoing network requests 
tags: Kubernetes, K8s, ingress, egress networking, policies, network policies
order: 20
---

# Network Traffic Is Though Of From Where The Request Starts
In a traditional http data-transfer, each request has 2 parts: a request and a response. One unit makes a request to another unit, and the other unit fullfills the request and the http data-transfer "comes back" to the initial requester.  
```mermaid
flowchart LR
  A["I Want Something"]
  B["I Have What You Need"]
    A -- 1. Request --> B
    B -- 2. Response --> A
```
