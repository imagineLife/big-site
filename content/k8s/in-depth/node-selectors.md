---
title: Label Nodes for Simple Pod-to-Node matching deployments
parentDir: k8s/in-depth
slug: k8s/in-depth/node-selectors
author: Jake Laursen
excerpt: Match node labels with pod NodeSelectors to sync pods with nodes simply
tags: Kubernetes, K8s, nodes, labels, selectors
order: 10
---

# A simple solution for matching pod deployments to nodes

- [A simple solution for matching pod deployments to nodes](#a-simple-solution-for-matching-pod-deployments-to-nodes)
  - [Useful For Simple Use-Cases](#useful-for-simple-use-cases)
  - [More Flexibility Comes With Node Affinity](#more-flexibility-comes-with-node-affinity)


Set a label on a node:
```bash
# kubectl label nodes <node-name> key=val
kubectl label nodes this-node size=large
```

Set a nodeSelector in a pod def file to match the node label:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod
spec:
  containers:
    - name: horse
      image: horse
  # THIS matches the node label above 
  nodeSelector:
    size: large
```

## Useful For Simple Use-Cases
This Pod-to-Node label matching node-selector works for clear goals for deploying a specific pod to a specific node.  
The pod gets a `nodeSelector` and the node gets a label.  
The pod with the nodeSelector will get deployed to the node with the matching label.   
## More Flexibility Comes With Node Affinity
See [Node Affinity](/k8s/in-depth/node-affinity).  
