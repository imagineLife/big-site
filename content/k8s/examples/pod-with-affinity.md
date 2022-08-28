---
title: Build a Pod that Sleeps
parentDir: k8s/examples
slug: k8s/examples/a-sleepy-pod
author: Jake Laursen
excerpt: Perhaps reasonably simple
tags: Kubernetes, K8s
order: 9
---

# Set Up A Node
Apply a label app_type=beta to node controlplane. 

# Create A Deployment
Create a new deployment called beta-apps with image: nginx and replicas: 3. 
**Set Node Affinity to the deployment to place the PODs on controlplane only.**  

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    apps: beta-apps
  name: beta-apps
spec:
  replicas: 3
  selector:
    matchLabels:
      app: beta-apps
  # pod template
  template:
    metadata:
      labels:
        app: beta-apps
    spec:
      affinity:
        nodeAffinity:
          requireDuringSchedulingIgnoreDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: app_type
                values: ['beta']
                operator: In
      containers:
      - images: nginx
        name: nginx
```