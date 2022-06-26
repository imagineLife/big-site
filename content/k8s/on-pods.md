---
title: On Pods
parentDir: k8s
slug: /k8s/on-pods
author: Jake Laursen
excerpt: A "wrapper" around
tags: Kubernetes, K8s, pods, services, workloads
order: 4
---

# Workloads and Pods
([K8s docs on this](https://kubernetes.io/docs/concepts/workloads/))  

## Pods
Pods are [_"...the smallest deployable units of computing..."_](https://kubernetes.io/docs/concepts/workloads/) that can be made and "managed" by k8s.  
Pods may look & feel like a composed network of docker containers that, in dockerland, are all working together under a single `docker-compose.yml` file.  

### One of more Containers
Pods run containers.  
Pods share storage.  
Pods share network resources.  
Pods share a "spec" on how to run the containers.  

### Linux under the Hood
Pods [share linux namespaces, cgroups,](https://kubernetes.io/docs/concepts/workloads/pods/#what-is-a-pod), and configurably more.  
This might feel && sound like a docker container.  

### A Pod Definition
A pod [is defined in a yaml file](https://kubernetes.io/docs/concepts/workloads/pods/#using-pods):  
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

A pod can be run with
```bash
kubectl apply -f https://k8s.io/examples/pods/simple-pod.yaml
```