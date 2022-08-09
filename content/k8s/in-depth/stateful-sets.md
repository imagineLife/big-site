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
- given a stable, unique dns record that any app can use to access the pod

Scaling can be helped here because new pods are cloned from previous instances.  
Also, on pod termination, the latest pod is deleted first.  

## Definition file
This is similar to a deployment definition file.  

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
  # unique to StatefulSets, not deployments
  serviceName: mongodb-h
```

## Storage in Stateful Sets
### All pods share the same vol
Here, all pods in the stateful set will try to use the same volume:
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db-ss
  labels:
    app: db
spec:
  replicas: 3
  selector:
    matchLabels:
      app: db
  # pod def template section
  template:
    metadata:
      labels:
        app: db
    spec:
      containers:
      - name: mongodb
        image: mongodb:5
        volumeMounts:
        - mountPath: /data-root-dir-i-forgot
          name: db-vol
      volumes:
      - name: db-vol
        persistentVolumeClaim:
          claimName: db-vol-claim
```
```mermaid
  flowchart LR
  
  %%
  %%  Nodes
  %%
  SC["StorageClass"]
  PV["Persistent Vol"]
  PVC["Persistent Vol Claim"]
  Pd1["Pod 1"]
  Pd2["Pod 2"]
  Pd3["Pod 3"]

  SC --> PV
  PV --> PVC
  PVC --> Pd1
  PVC --> Pd2
  PVC --> Pd3
```

### Each Pod Gets Its Own PVC + PV
Here, a stateful set can deploy pods that each reference their own pvc, which each is bound to their own pv. Here, what looks nearly identical to a pvc definition file gets added to the statefulset def file under `spec.volumeClaimTemplates`. Note:
- stateful set creates the first pod
  - A Pvc is created for each pod
  - the pvc is connected to a storageClass
  - the storageClass provisions a vol on the storage provider, here google
  - the storageClass creates a pv
  - the storageClass binds the pv to the pvc
- those steps repeat for each pod in the replica set, in order
- **stateful sets** dont delete pvcs during pod failure/recreation - stateful sets maintain "stable storage" for pods

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db-ss
  labels:
    app: db
spec:
  replicas: 3
  selector:
    matchLabels:
      app: db
  # pod def template section
  template:
    metadata:
      labels:
        app: db
    spec:
      containers:
      - name: mongodb
        image: mongodb:5
        volumeMounts:
        - mountPath: /data-root-dir-i-forgot
          name: db-vol
  volumeClaimTemplates:
  - metadata:
      name: db-vol
    spec:
      accessModes:
        - ReadWriteOnce
      storageClassName: google-storage
      resources:
        requests:
          storage: 500Mi
```

```mermaid
  flowchart LR
  
  %%
  %%  Nodes
  %%
  SC["StorageClass"]
  PV1["Persistent Vol1"]
  PV2["Persistent Vol2"]
  PV3["Persistent Vol3"]
  PVC1["Persistent Vol Claim1"]
  PVC2["Persistent Vol Claim2"]
  PVC3["Persistent Vol Claim3"]
  Pd1["Pod 1"]
  Pd2["Pod 2"]
  Pd3["Pod 3"]

  SC --> PV1
  SC --> PV2
  SC --> PV3
  PV1 --> PVC1
  PV2 --> PVC2
  PV3 --> PVC3

  PVC1 --> Pd1
  PVC2 --> Pd2
  PVC3 --> Pd3
```