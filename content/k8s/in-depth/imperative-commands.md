---
title: Build Kubernetes Objects with One-Lineres
parentDir: k8s/in-depth
slug: k8s/in-depth/imperative-commands
author: Jake Laursen
excerpt: Use One-Line Imperative programming syntax to build some k8s objects
tags: Kubernetes, K8s, imperative, cli
order: 3
---

# Imperative One-Liners

## Imperative Pod Handling
```bash
# Create a pod named "nginx" with the "nginx" image
kubectl run nginx --image=nginx

# Create a definition file for the same pod without creating the pod
kubectl run nginx --image=nginx --dry-run=client -o yaml
```