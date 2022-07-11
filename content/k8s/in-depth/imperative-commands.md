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
# deploy a pod named "nginx" with the "nginx:alpine" image
kubectl run nginx --image=nginx:alpine

# Deploy a pod
# named redis
# from image redis:alpine
# with labels tier: db
kubectl run redis --image=redis:alpine --labels="tier=db"
```

## Imperative Deployment Handling
```bash
# create a deployment named nginx based on an nginx image
kubectl create deployment --image=nginx nginx

# Create a definition file for the same deployment without creating the deployment
kubectl create deployment --image=nginx nginx --dry-run=client -o yaml

# create a deployment named nginx based on an nginx image wiith 3 replicas
kubectl create deployment nginx --image=nginx --replicas=4

# scale an existing deployment named nginx to 5 ppods
kubectl scale deployment nginx --replicas=5
```

## Imperative Service Handling
```bash
# Create a service definition file
# - names redis-service
# exposing a pod named "redis" 
# on port 6379

kubectl expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml

# Create a service
# - names redis-service
# exposing a pod named "redis" 
# on port 6379
kubectl expose pod redis --port=6379 --name redis-service

# Create a service
#  named nginx
# NodePort type
# expose pod named nginx
# expose port 80 of the pod on port 30080 of the node
kubectl create service nodeport nginx --tcp=80:80 --node-port=30080

# Create a service
# named redis-service
# exposing an existing app called redis
# on port 6379
kubectl expose pod redis --name=redis-service --port=6379 --target-port=6379
```
