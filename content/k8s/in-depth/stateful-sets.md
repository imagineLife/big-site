---
title: Some Trickery With Stateful Pods Using Stateful Sets
parentDir: k8s/in-depth
slug: k8s/in-depth/stateful-sets
author: Jake Laursen
excerpt: When Pods rely on other pods, like in replicated dbs, stateful sets can be a helpful tool
tags: Kubernetes, K8s, data, persistence, volumes, diagram
order: 23
---

# Stateful Sets Are Similar To Deployments
Deployments can manage replicas of pods.  
Stateful sets can too.  
Stateful sets, though, ["maintain a sticky identifier"](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) for each of the pods that the set "watches over".  

- [Stateful Sets Are Similar To Deployments](#stateful-sets-are-similar-to-deployments)
  - [Explanation Through Diagrams](#explanation-through-diagrams)
    - [Starting With A Databse](#starting-with-a-databse)
    - [Add Servers For Higher Availability](#add-servers-for-higher-availability)
    - [The Deployment Order And Instructions Are Critical](#the-deployment-order-and-instructions-are-critical)
    - [DB With Replicas In K8s Require More Specific and Critical Config](#db-with-replicas-in-k8s-require-more-specific-and-critical-config)
  - [May Not Be Needed](#may-not-be-needed)
  - [Consider Stateful Sets For Something Like DB Replicaion](#consider-stateful-sets-for-something-like-db-replicaion)
    - [Stateful Set K8s Deployment Specifics](#stateful-set-k8s-deployment-specifics)
  - [Definition file](#definition-file)
  - [Storage in Stateful Sets](#storage-in-stateful-sets)
    - [All pods share the same vol](#all-pods-share-the-same-vol)
    - [Each Pod Gets Its Own PVC + PV](#each-pod-gets-its-own-pvc--pv)
      - [During Pod Failure](#during-pod-failure)

## Explanation Through Diagrams
### Starting With A Databse
Starting small, consider a db being required in a "Full-Stack" application. Here, a DB, lets say mongoDB for those JS and application-first data architecture fans - 
Diagram coming soon...
```js
// mermaid
flowchart
  DB["Database Instance"]

  subgraph Server
    DB
  end
```

### Add Servers For Higher Availability
For more reliability, replication is required for DB resilliancy. New Servers with DBs get setup, and Mongo Replica Sets get introduced (_this is a "high-level" example here._):
- application-to-db communication go to the now "master" node
- the "master" node gets replicated to 2 "slave" instances, where the data is cloned

Diagram coming soon...
```js
// mermaid
flowchart
  DB["Database Instance"]
  DB2["Database Instance"]
  DB3["Database Instance"]

  subgraph MS1["Master DB Instance"]
    DB
  end

  subgraph RP1["Replica 1"]
    DB2
  end

  subgraph RP2["Replica 2"]
    DB3
  end

  ND1["Application Traffic"] ---> MS1
  MS1 -.-> RP1
  MS1 -.-> RP2
```

### The Deployment Order And Instructions Are Critical
In Db replicas, the order of how this whole thing gets built really matters. This is a db-specific detail, not explicitly about K8s or Stateful sets.

### DB With Replicas In K8s Require More Specific and Critical Config
The steps for the deployments, here, need to fit the db requirements.  
Also, the "ephemeral" nature of kubernetes, without stateful sets, means that any pod + node can be destroyed and recreated without K8s really "caring" about the nodes + pods.  This ephemeral nature goes against the goals of a db replication, because the replicated db instances are critical to the success of a high-availability db setup.  



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

### Stateful Set K8s Deployment Specifics
With StatefuSets, pods are...
- **created in a sequential order** - master could be spun up first, then slave 1, then slave 2
- **assigned indexes**, 0-first, by the stateful set
- **get reliable unique names** (db-0, db-1, db-2, etc)
  - **these names can be relied on!!**
- **given a stable, unique dns record** that any app can use to access the pod

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
A unique detail in a db replica set is that writes only go to the master.  
This adds some specifity to K8s:
- a service that exposes the statefulSet can't be "normal" - the service in regular deployments balances requests across nodes
- a "headless service" is needed here (see [This other doc](/k8s/in-depth/headless-services) for more deets on headless services)

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
Diagram coming soon...
```js
// mermaid
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
Here, a stateful set can deploy pods that each reference their own pvc, where each is bound to their own pv.   
Here, what looks nearly identical to a pvc definition file gets added to the statefulset def file under `spec.volumeClaimTemplates`.  Note:
- stateful set creates the pods chronologically
  - A Pvc is created for each pod
  - A pvc is connected to a storageClass
  - The storageClass provisions a vol on the storage provider, here google
  - the storageClass creates a pv
  - the storageClass binds the pv to the pvc
- those steps repeat for each pod in the replica set, in order

#### During Pod Failure
**stateful sets** dont delete pvcs during pod failure/recreation. Stateful sets maintain "stable storage" for pods

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
  # like pvcs, but "templatized" for deployments
  # 1 pvc for each pod will be created
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

Diagram coming soon...
```js
// mermaid
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