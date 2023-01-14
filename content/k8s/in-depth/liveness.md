---
title: Test In-Container Readyness with Liveness Probes
parentDir: k8s/in-depth
slug: k8s/in-depth/liveliness
author: Jake Laursen
excerpt: Create http requests, bash scripts, or tcp requests to assess application readyness status 
tags: ["Kubernetes", "K8s", "pods", "containers", "liveness"]
order: 14
---

# Liveliness Probes
Periodically test an app in a container.  
If the test fails, the container is destroyed & recreated.  
This allows devs to "decide" what makes an app healthy.  
**NOTE**: the livenessProve goes IN the container definition. This applies to a pod AND this can apply in a deployment of pods!

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: a-dummy-api
  labels:
    name: horse
spec:
  containers:
  - name: api-box
    image: api-box-img
    ports: 
      - containerPort: 8080
    # THIS!
    livenessProbe:
      httpGet:
        path: /api/its-alive
        port: 8080
```
Other options:
```yaml
# tcp tests
livenessProbe:
  tcpSocket:
    port: 3306

# bash command tests
livenessProbe:
  exec:
    command: ["cat", "check/if/its/alive"]
  
  # these are available on all livenessProve types
  initialDelaySeconds: 5
  periodSeconds: 1
  failureThreshold: 10 
```

## Liveness Probes in a Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: cowdep
  name: cowdep
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cowdep
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: cowdep
    spec:
      containers:
      - image: docker/cowsay
        name: cowsay
        command:
        - sh
        - -c
        - "cowsay horselisten"
        # THIS is the liveness probe, IN the container definition block
        livenessProbe:
          exec:
            command: ["cat", "check/if/its/alive"]

```