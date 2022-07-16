---
title: Leverage Taints and Tolerations to Instruct Nodes to Allow or Not Allow Pod Deployment 
parentDir: k8s/in-depth
slug: k8s/in-depth/taints-and-tolerations
author: Jake Laursen
excerpt: Taints on nodes block pod deployment and tolerations enable pods to work with node taints
tags: Kubernetes, K8s, taints, tolerations, deployment
order: 9
---

# Taints and Nodes
Taints apply to nodes.  
Taints allow nodes to "repel" a pod from being deployed on the node.  
Taints are interpreted by the K8s scheduler, and the scheduler takes into account node taints as well as pod tolerations (_below_) when scheduling pods for deployments onto nodes.  

### Taint Effects
There are 3 "types" of taints, describe by kubernetes as "effects": NoSchedule, PreferNoSchedule, and NoExecute.  
The NoSchedule and PreferNoSchedule are taints that apply to pods that may or may not be deployed to nodes in the future. The NoExecute taint will affect existing running pods on nodes.  

#### The NoSchedule Effect
No Pod will be able to be scheduled on the node unless the pod has matching toleration(s).  
This is perhaps the most strict taint.  

#### The PreferNoSchedule Effect
This is, perhaps, a gentler version of the NoScheudle effect.  
The scheduler "tries to avoid" putting a pod in the node if the pod does not tolerate the node.  
This "trying" does not explicitly mean that a pod will not be deployed on a node with mismatched taint(s).  


# Tolerants and Pods
Tolerations apply to pods.  
Tolerations allow pods to match a node taint.  
Tolerations are interpreted by the K8s scheduler, and the scheduler takes into account pod tolerations as well as node taints when scheduling pods for deployments onto nodes.

# Taints and Tolerations Working Together
When a node has a taint that a pod does not have a matching toleration, the pod will not get deployed onto the node.  

## Set a Taint on a Node
Here is an example:
```bash
# kubectl taint nodes a-node-name key=value:taint-effect
kubectl taint nodes primary app=frontend:NoSchedule
```
