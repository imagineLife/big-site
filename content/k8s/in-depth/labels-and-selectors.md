---
title: Labels, Selectors and Annotations for Identifying Kubernetes Objects
parentDir: k8s/in-depth
slug: k8s/in-depth/logging-and-monitoring
author: Jake Laursen
excerpt: 
tags: Kubernetes, K8s, pods, containers, logs
order: 16
---

# Labels And Selectors For Identifying Objects
Labels can be used to identifying objects. Labels can be applied to all kinds of objects.   
Selectors can be used for "filtering" objects by specified selector(s).  

## Labels in Pods
In a pod def file, labels can exist:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: dummy-web-server
  labels:
    app: web-server
    stack-area: frontend
spec:
  containers:
  - name: api-box
    image: api-box-img
    ports:
      - containerPort: 8080
```  

These can be used by the kubectl get command:
```bash
kubectl get pods --selector stack-area=frontend
```
Any other pod that has the same stack-area will appear in the list of pods. Any pod without that label will not appear.  

## Labels in ReplicaSets
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: dummy-web-server-rs
  labels:
    app: web-server-rs
    stack-area: frontend
spec:
  replicas: 3
  # match replica sets to pods
  selector:
    matchLabels:
      stack-area: frontend
      app: frontend
  # pod defs under the "template" key, sibling of selector+replicas keys
  template:
    metadata:
      labels:
        app: web-server
        stack-area: frontend
    spec:
      containers:
      - name: api-box
        image: api-box-img
        ports:
          - containerPort: 8080
```  

## Annotations in ReplicaSets
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: dummy-web-server-rs
  labels:
    app: web-server-rs
    stack-area: frontend
  annotations:
    buildVersion: 8.67.5309
spec:
  replicas: 3
  # match replica sets to pods
  selector:
    matchLabels:
      stack-area: frontend
      app: frontend
  # pod defs under the "template" key, sibling of selector+replicas keys
  template:
    metadata:
      labels:
        app: web-server
        stack-area: frontend
    spec:
      containers:
      - name: api-box
        image: api-box-img
        ports:
          - containerPort: 8080
```  