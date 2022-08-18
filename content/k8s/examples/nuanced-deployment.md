---
title: Build A Nuanced Deployment
parentDir: k8s/examples
slug: k8s/examples/nuanced-deployment
author: Jake Laursen
excerpt: Specify cpu request units, mounted volume types, a label, and expose a port
tags: Kubernetes, K8s, deployment, redis, resources
order: 5
---

# Create A Deployment And A ConfigMap
## Create A Deployment
- called `redis`
- use image `redis:alpine`
- have 1 replica
- request `.2` cpu units
- have a label `app` set to `redis`
- mount 2 volumes
  - an empty dir volume 
    - called `data` 
    - at path `/redis-master-data`
  - a configmap volume
    - called `redis-config` 
    - at path `/redis-master`
- expose port `6379`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  labels:
    app: redis
spec:
  containers:
  - image: redis:alpine
    name: redis
    resources:
      requests:
        cpu: "0.2"
  volumes:
    - name: data
      emptyDir: {}
    - name: redis-config
      configMap:
        name: redis-config

        


```