---
title: Create A Stateful Set
parentDir: k8s/examples
slug: k8s/examples/create-a-stateful-set
author: Jake Laursen
excerpt: Stateful replica sets - helpful in something like a database deployment
tags: k8s, node, stateful set
order: 13
---

## The Goal
With 2 nodes setup - one controlplane and 1 worker, put a statefulSet together:  
- create 6 directories on a worker node, named `redis{0-6}`
- create pvs connected to the directories created above
- create pvcs
- create a service to support this work
- create the statefulSet
- perhaps one more redis-specific detail

## Create Directories to Support the PVs
Here, create some directories where the data for each persistent volume will live:
```bash
# get into the worker node
kubectl get nodes
# find the name of the node

ssh worker-node-name-here

# 
# a one-at-a-time way of creating the directories
# 
mkdir redis01
mkdir redis02
mkdir redis03
mkdir redis04
mkdir redis05
mkdir redis06

# a one-line-approach for creating the directories
for idx in $(seq 1 6); do mkdir "/redis0$idx"; done

# check out the new directory presence
ls 
```
Escape the worker node terminal ssh sesssion -> `exit`.  

## Create the PVs
A few ways to do this.  
### Create A Handful of yaml files
```bash
# create the files
for idx in $(seq 1 6); do touch "pv$idx.yaml"; done

# populate the files
```

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: redis01
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  hostPath:
    path: /redis01
```
- copy the contents here to the other files, replacing `redis01` with the other indexs

### create the pvs
```bash
alias kk=kubectl
alias kkc="kubectl create"

# one way
kkc -f redis01.yaml
kkc -f redis02.yaml
kkc -f redis03.yaml
kkc -f redis04.yaml
kkc -f redis05.yaml
kkc -f redis06.yaml

# a different way, not 1000% sure here yet 
for idx in $(seq 1 6); do kkc -f redis0$idx.yaml
```
## Create the Service
## Create The StatefulSet