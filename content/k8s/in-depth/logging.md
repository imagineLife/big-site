---
title: Logging In K8s Is Similar to Logging in Docker
parentDir: k8s/in-depth
slug: k8s/in-depth/logging-and-monitoring
author: Jake Laursen
excerpt: Syntax to log a pod in kubernetes is nearly identical to logging with docker
tags: Kubernetes, K8s, pods, containers, logs
order: 15
---

# Logging And Monitoring
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

# Monitoring
Metric are collected with the kubelet:
- kubelet is the agent on each node
- gets directions from master server
- contains `cAdvisor`, getting performance metrics from pods
- Get this up & running with
  - `minikube addons enable metrics-server`
  - or
  - git clone https://github.com/kubernetes-incubator.metrics-server.git then kubectl create -f deploy/1.8+/
  - `kubectl top node` will show a little cli table
  - `kubectl top pod` will show a little cli table
Several options are out there:
- Metrics Server
  - an in-memory option && cannot see historical performance data
- Prometheus
- Elastic Stack
- DataDog
- Dynatrace
## Monitoring Resource Consumption
- cpu
- network
## Monitoring Objects And Object Health
- number of nodes
- health of nodes
- pod count
- pod cpu & memory usage


## Things to be able to do
- install the metrics server
  - git clone https://github.com/kodekloudhub/kubernetes-metrics-server.git
- create all the k8s objects from the downloaded resources
  - cd kubernetes-metrics-server
  - kk create -f .
    - note the dot! :) 
- see some stats about nodes
  - kk top node
- see some pod stats 
  - kk top pod