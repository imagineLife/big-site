---
title: Test In-Container Readyness with Liveness Probes
parentDir: k8s/in-depth
slug: k8s/in-depth/liveliness
author: Jake Laursen
excerpt: Create http requests, bash scripts, or tcp requests to assess application readyness status 
tags: Kubernetes, K8s, pods, containers, liveness
order: 14
---

# Liveliness Probes
Periodically test an app in a container.  
If the test fails, the container is destroyed & recreated.  
This allows devs to "decide" what makes an app healthy.  

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