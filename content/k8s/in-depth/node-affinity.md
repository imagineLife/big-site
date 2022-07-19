---
title: 
parentDir: k8s/in-depth
slug: k8s/in-depth/node-affinity
author: Jake Laursen
excerpt: 
tags: Kubernetes, K8s, nodes, node affinity
order: 11
---

# Node Affinity  
Node Affinity help match pods to nodes more flexibly than node selectors.  

Set a label on a node:
```bash
# kubectl label nodes <node-name> key=val
kubectl label nodes this-node size=large
```

Set a nodeAffinity in a pod def file. Here, the pod can be put on a node where the "size" label is either "large" or "medium"  

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod
spec:
  containers:
    - name: horse
      image: horse
  # THIS
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: size
              operator: In
              values:
                - large
                - medium
```

Another example of a pod def file, where the nodeAffinity expresses that the pod will deploy on any node where the "size" label is not "small"
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod
spec:
  containers:
    - name: horse
      image: horse
  # THIS
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: size
              operator: NotIn
              values:
                - small
```