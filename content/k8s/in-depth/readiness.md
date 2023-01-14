---
title: Understanding K8s Pod Readyness May Be Tricky
parentDir: k8s/in-depth
slug: k8s/in-depth/readiness
author: Jake Laursen
excerpt: Surely there is a status of the pod, but the applications inside the pods can require more granular configuring to understand their readyness
tags: ["Kubernetes", "K8s", "pods", "containers", "patterns", "sidecar", "adapter", "ambassador"]
order: 13
---

# A Pod Has A Status And A Lifecycle
- Pending
  - the scheduler is trying to figure out where to place a pod
  - the reason for a pending pod can be found in `kubectl describe bod the-pod`
- ContainerCreating
  - pulling an image
  - on a node
- Running
  - until the container is terminated or completed

## Conditions Help Understand a Pod State
These are boolean conditions
- PodScheduled
- Initialized
- ContainersReady
- Ready

These can be discovered in the `kubectl describe pod the-pod` under the `Conditions` section.  

## The Ready Condition Can Be Misleading
Applications in containers may not be "ready" but the container, outside of the application, is ready.  
This can feel misleading

## Create Readiness Probes for Containers
Readiness Probe is a familiar term for "real-world" k8s containerized apps to be ready. K8s will use a custom-defined  readinessProbe to wait until the readinessProbe "tells k8s" that the container within the pod is "ready" via some custom logic we, the container/pod devs, create:  

- try building a "ready" api on a web app (`/healthz` or something)
- try testing a db connecting with tcp on the default port (_3306 perhaps_)
- try building a "readiness" script to run on a more back-end-y service

## Configure a ReadinessProbe in a pod def file
With this, K8s does not set the container status to "ready" until k8s gets a successful response from an api
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
    readinessProbe:
      httpGet:
        path: /api/ready
        port: 8080
```

2 more options:
```yaml
# tcp
readinessProbe:
  tcpSocket:
    port: 3306

# exec a command
readinessProbe:
  exec:
    command:
      - cat
      - some/command/checking/ready_Status
```

More config can be made in these custom readinessProbes:
```yaml
# an httpGet example
readinessProbe:
  httpGet:
    path: /api/ready
    port: 8080
  
  # wait to start probing
  initialDelaySeconds: 10
  
  # frequency of readiness probe
  periodSeconds: 6

  # how many failures to allow
  failureThreshold: 8
```