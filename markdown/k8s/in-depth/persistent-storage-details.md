---
title: A Brief Review of The Lifecycle of a Persistent Volume in Kubernetes
parentDir: k8s/in-depth
slug: k8s/in-depth/persistent-storage-details
shortSlug: persistent-storage-details
author: Jake Laursen
excerpt: An Overview of how a persistent volume gets created, bound, used, and options for "end-of-life" handling
tags: ['Kubernetes', 'k8s', 'volumes', 'lifecycle']
order: 34
---

### The PV Gets Provisions And Becomes Available

This can be done "statically" or "dynamically".  
Static ~~ a hard disk somewhere.  
Dynamic ~~ leveraging a 3rd party like google or azure, where the volume provisioner can automagically create a volume simultaneously.

### The PV Gets Bound

The K8s tooling (_assumedly a controller, not 100% sure yet_) "notices" the PV, as well as a PVC.  
The K8s tooling does the work of connecting the PV to a PVC.

### The PV Gets Used

An object definition, like a pod or a deployment, will describe a pod leveraging a PVC through a volume mount.

PV --connected-to---> PVC ---connected-to---> Pod.

### The PV Gets Disconnected And Becomes Available

When the above-described object stops using the PVC due to the pod shutting down or whatnot, the pod is no longer using the pv.  
When the PVC also gets deleted, the volume remains.  
The PV, and the data in the directory, both may persist depending on the `persistentVolumeReclaimPolicy` of the PV. Interesting perhaps that the PV "instructs" the k8s cluster tooling what to do with the vol upon its dis-association with the PV's recently-deleted assocaited PVC.

### PV Reclaim Options

[`persistentVolumeReclaimPolicy`](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming) options are

- `Retain`: allow for a new PV definition to use the same storage asset
- `Delete`: certain "plugins" work with this policy, which removes the PV from k8s AND removes the storage asset externally
- `Recycle`: deprecated - [Kubernetes docs](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#recycle) recommend using dynamic provisioning instead of recycling, but it seems like this option runs `rm -rf /the-dir/*` and then makes the vol avaolable for a new PVC
