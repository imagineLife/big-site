---
title: Build A Nuanced Deployment
parentDir: k8s/examples
slug: k8s/examples/nuanced-deployment
author: Jake Laursen
excerpt: Specify cpu request units, mounted volume types, a label, and expose a port
tags: ["Kubernetes", "K8s", "deployment", "redis", "resources"]
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


### How
Start with an imperative command:  
`kubectl create deployment redis --image=redis:alpine --replicas=1 --port=6379 --dry-run=client -o yaml > rdp.yaml`

```yaml
apiVersion: v1
kind: Deployment
metadata:
  name: redis
  labels:
    app: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - image: redis:alpine
          name: redis
          resources:
            requests:
              cpu: "0.2"
          ports:
          - containerPort: 6379
          volumeMounts:
          - mountPath: /redis-master-data
            name: data
          - mountPath: /redis-master
            name: redis-config
      volumes:
        - name: data
          emptyDir: {}
        - name: redis-config
          configMap:
            name: redis-config
```