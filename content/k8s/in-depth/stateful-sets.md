---
title: Some Trickery With Stateful Pods Using Stateful Sets
parentDir: k8s/in-depth
slug: k8s/in-depth/stateful-sets
author: Jake Laursen
excerpt: When Pods rely on other pods, like in replicated dbs, stateful sets can be a helpful tool
tags: Kubernetes, K8s, data, persistence, volumes
order: 23
---

# Stateful Sets Are Similar To Deployments
Deployments can manage replicas of pods.  
Stateful sets can too.  
Stateful sets, though, ["maintain a sticky identifier"](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) for each of the pods that the set "watches over".  

## May Not Be Needed
["_If an application doesn't require any stable identifiers or ordered deployment, deletion, or scaling, you should deploy your application using a workload object that provides a set of stateless replicas_"](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#using-statefulsets). Go to Deployments or ReplicaSets instead.  

## Consider Stateful Sets For Something Like DB Replicaion
Consider starting with a single server. 
- install a db on the server and get it working
- to withstand failures, replica sets may get deployed onto several new servers

Build a few new servers.  
- a master server dataset gets replicated to other "slave" servers
- application workloads go to the master server
- the master db node "knows about" which slave node has the replica data on it
  - **the issue here** is that in K8s land, without stateful sets, this is impossible due to the ephemeral nature of pods

With StatefuSets, pods are...
- created in a sequential order - master could be spun up first, then slave 1, then slave 2
- assigned indexes, 0-first, by the stateful set
- get unique names (db-0, db-1, db-2, etc)
  - **these names can be relied on!!**

## Definition file
```yaml
# ss.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db-set
  labels:
    app: db
spec:
  replicas: 3
  selector:
    matchLabels:
      app: db
  template:
    metadata:
      labels:
        app: db
      spec:
        containers:
          - name: mongodb
            image: mongodb:5
```