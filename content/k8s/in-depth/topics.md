---
title: Topics to Consider When Configuring Kubernetes
parentDir: k8s/in-depth
slug: k8s/in-depth/topics
author: Jake Laursen
excerpt: Kubernetes has a bunch of details to consider when getting more in-depth than creating and getting objects
tags: ["Kubernetes", "k8s", "configuration"]
order: 1
---

## Config
Config Maps, SecurityContexts, Resource Requirements, Secrets, Service Accounts, and more. 

## Multi-Container Pods
There are patterns:
- ambassador
- adapter
- sidecar

## Observability
- readiness probes
- liveness proves
- container logging
- monitoring
- debugging
- startupProbe
  - this one is JUST to protect against containers that have a slow startup, where the liveness + readiness might timeout and trow an error

## Pod Design
- labels
- selectors
- annotations
- rolling deployment deets
- jobs & cronJobs

## Services
- in depth
- network policies

## Persistent Volumes 
- volumes
- persistent volume claims

## Imperative and Declarative Syntax
K8s docs cover, in more depth, [Imperative Management](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/imperative-config/) and [Declarative Management](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/) styles.  
In summary - 
- Imperative is sort of like "do what I say"
- Declarative is sort of like "do what I say... but look to a declaration explanation for what to do"...

Declarative & Imperative topics span software engineering, and K8s joins the fun!  
