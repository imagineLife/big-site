---
title: Remove a Requirement of Pre-Defined Storage Objects with Storage Classes
parentDir: k8s/in-depth
slug: k8s/in-depth/storage-classes
author: Jake Laursen
excerpt: Describe a type of storage with a storage class definition
tags: Kubernetes, K8s, data, persistence, volumes
order: 22
---

# Define a Data-Storage Solution Dynamically with Storage Classes
## A Change Data-Creation In Order
**With Persistent Volumes**, a data-storage **disk** must be created prior to creating the Persistent Volume.  
This is **static provisioning**.  

**With Storage Classes**, though, and **dynamic provisioning**
- a data provisioner can be made (_like google or amazon or whatever_)
- the provisioner can _automatically create storage_ and attach the storage to pods when a claim is made

A StorageClass Def File:  
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gcp-storage
provisioner: kubernetes.io/gce-pd
```  

## A Pod With A Persistent Volume Moves to a Storage Class
Here's an example of a pod that uses a volume. The volume, here, is a persistent Volume. Here,
- the pod definition 
  - includes a volume mount set of args for the container
  - includes a volume description inside the spec
  - includes a reference to the persistent volume claim (_pvc_) name
- the pvc   

```yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: rando-num-gen
spec:
  containers:
  - image: alpine
    name: alpine
    command: ["/bin/sh","-c"]
    args: ["shuf -i 0-100 -n 1 >> /opt/rando.txt"]
    volumeMounts:
      - mountPath: /opt
        name: opt-vol
```
