---
title: Create A Stateful Set
parentDir: k8s/examples
slug: k8s/examples/create-a-stateful-set
author: Jake Laursen
excerpt: Stateful replica sets - helpful in something like a database deployment
tags: ["k8s", "node", "stateful set"]
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

## TOC
- [The Goal](#the-goal)
- [TOC](#toc)
- [Create Directories to Support the PVs](#create-directories-to-support-the-pvs)
- [Create the PVs](#create-the-pvs)
  - [Approach 1: Create A Handful of yaml files](#approach-1-create-a-handful-of-yaml-files)
  - [Approach 1: Create The Pvs](#approach-1-create-the-pvs)
  - [Approach 2: Leverage Bash For More Automation](#approach-2-leverage-bash-for-more-automation)
- [Create a Service for the Stateful Set](#create-a-service-for-the-stateful-set)
- [Create The StatefulSet](#create-the-statefulset)

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

Here, create a bunch of yaml files, and kubectl create the pvs.
### Approach 1: Create A Handful of yaml files
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

### Approach 1: Create The Pvs
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

### Approach 2: Leverage Bash For More Automation
Here, a few bash tools:
- a [loop](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)
- a [sequence](https://man7.org/linux/man-pages/man1/seq.1.html) and the "for" keyword to create the [looping construct](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html) of the "for loop"
- [heredoc](linux/heredoc) offers a way to alleviate creating files. Less files to manage, in exchange for another syntax to master
- the "inline" combination of 
  - the `kubectl apply -f -`, which tells k8s to build the objects
  - the in-text yaml "file" syntax
  - a variable in place of the `metadata.name` and `spec.hostPath.path` values (_with the `$i` syntax here_)
```bash
for i in $(seq 1 6)
do
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolume
metadata:
  name: redis0$i
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /redis0$i
EOF
done
```

## Create a Service for the Stateful Set
The statefulSet yaml will refer to this service by name. Because the StateFulSet yaml will refer to this service by name, the service will need be created first - otherwise, the StatefulSet will not succeed.  
```yaml
apiVersion: v1
kind: Service
metadata:
  name: redis-cluster-service
spec:
  ports:
    - port: 6379
      name: client
      targetPort: 6379
    - port: 16379
      name: gossip
      targetPort: 16379
  selector:
    app: redis-cluster
```

## Create The StatefulSet
The "big kahuna":  
- named & labeled
- includes the serviceName that will service the statefulSet
- the `spec` section has 3 Key "sub" categories: selector, template, and volumeClaims
  - `selector`
  - `template`
    - here, the container volumes and 
  - `volumeClaimTemplates`
    - here, the persistentVolumeClaim data is included

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
  labels:
    run: redis-cluster
spec:
  serviceName: redis-cluster-service
  replicas: 6
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      name: redis-cluster
      labels:
        app: redis-cluster
    spec:
      volumes:
        - name: conf
          configMap:
            name: redis-cluster-configmap
            defaultMode: 0755
      containers:
        - image: redis:5.0.1-alpine
          name: redis
          command:
            - "/conf/update-node.sh"
            - "redis-server"
            - "/conf/redis.conf"
          env:
          - name: POD_IP
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
                apiVersion: v1
          ports:
            - containerPort: 6379
              name: client
            - name: gossip
              containerPort: 16379
          volumeMounts:
            - name: conf
              mountPath: /conf
              readOnly: false
            - name: data
              mountPath: /data
              readOnly: false
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```