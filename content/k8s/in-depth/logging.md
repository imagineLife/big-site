---
title: Logging In K8s Is Similar to Logging in Docker
parentDir: k8s/in-depth
slug: k8s/in-depth/logging
author: Jake Laursen
excerpt: Syntax to log a pod in kubernetes is nearly identical to logging with docker
tags: Kubernetes, K8s, pods, containers, logs
order: 15
---

## Logging For Docker Containers
```bash
# docker logs -f container-id
docker logs -f api-box
```

## Logging For Pods in K8s
```bash
# kubectl logs -f pod-name
kubectl logs -f api-pod
```

## Logging Containers in Multi-Container Pods
```bash
# kubectl logs -f pod-name container-name
kubectl logs -f api-pod api-emailing-sidecar-box
```
