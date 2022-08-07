---
title: Persist Data Created By Pods By Using Volumes and Claims in Kubernetes
parentDir: k8s/in-depth
slug: k8s/in-depth/vols-and-claims
author: Jake Laursen
excerpt: 
tags: Kubernetes, K8s, data, persistence, volumes
order: 20
---

# Volumes
- Volumes in Docker
  - **containers** are transient: lasting only as long as they are needed
  - **data** in containers gets destroyed
  - **volumes** can be attached to containers to retain data when the container is deleted

- Volumes in K8s
  - **pods are transiet** - like containers
  - **volumes** can be attached to a pod

- [Volumes](#volumes)
  - [A Workflow For Creating a Volume to Persist Data Of A Pod](#a-workflow-for-creating-a-volume-to-persist-data-of-a-pod)
  - [A Trivial Pod With A Volume Attached](#a-trivial-pod-with-a-volume-attached)
  - [Volume Data-Storage Options](#volume-data-storage-options)
    - [A Host Path](#a-host-path)
    - [Other Options](#other-options)
- [Persistent Volumes](#persistent-volumes)

## A Workflow For Creating a Volume to Persist Data Of A Pod
- ID the data persistence needs of the pod
  - what data needs to be persisted after the container + pod are destroyed?
  - where does the container/pod "think" it is writing data to, currently?

## A Trivial Pod With A Volume Attached
An alpine container.  
Has a built-in command with args on startup.  
Creates a rando number && sends the result to a file, `/opt/number.out`.  

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: rando-num-gen
spec:
  containers:
    - image: alpine
      name: alpine-pod
      command: ["/bin/sh", "-c"]
      args: ["shuf -i 0-100 -n 1 >> /opt/number.out;"]
      # associate the volume, below, with this container
      volumnMounts:
      # the "container" directory
      - mountPath: /opt
        # the volume name
        name: rando-gen-vol
        

  # THE VOLUME! PERSIST THE DATA!
  # a sibling of the "containers" key
  volumes:
  - name: rando-gen-vol
    # use a dir on the host, the "/data" dir
    hostPath:
      path: /data
      type: Directory
```

## Volume Data-Storage Options
### A Host Path
Configure a directory on the host as storage space for a volume.  
```yaml
  volumes:
  - name: the-volume-friendly-name-to-reference-in-the-container-def
    # use a dir on the host, here the "/data" dir
    hostPath:
      path: /data
      type: Directory
```
**This works well** for single nodes.  
**This does not work well** for multi-node clusters.  
Many `/data` dirs, one per node, would be used. This might not be what the goal is.  

### Other Options
- NFS
- GluserFS
- Flocker
- Ceph
- Scaleio
- AWS, EBS - elastic block store volume
- Azure Disk
- Googles Persistent Disk


# Persistent Volumes
Volume Config _can happen in a pod definition file_, as in the above work.  
