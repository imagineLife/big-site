---
title: Deploy And Manage a ReplicaSet of Pods kusing Kubernetes
parentDir: k8s/examples
slug: k8s/examples/run-a-quick-deployment
author: Jake Laursen
excerpt: In just a few brief commands and edits, an entire replicaset of pods can be rolled out & the container images can be adusted, and the deployment can be rolled back
tags: Kubernetes, K8s, deployment, task, replicaset, image, rollback
order: 4
---

## Create a deployment
- called frontend-dep
- 1 container called `ngingx`
- image from `nginx:1.16`
- 4 replicas
- strategy of `rollingUpdate` with some details
  - maxSurge: 1
  - maxUnavailable: 2

## Upgrade The Image of the deployed replicaset pods
Once that is out
- upgrade the image to `nginx:1.17`

## Rollback
Once all pods are updated
- rollback the deployment to the previous version


## Helpful tips
A One-liner to start:  
`kubectl create deployment frontend-dep --image=nginx:1.16 --replicas=4 --dry-run=client -o yaml > asdf.yaml`  

Don't forget to deal with the `rollingUpdate` strategy bit:
```yaml
# ...
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 2
# ...
```