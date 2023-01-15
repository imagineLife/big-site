---
title: Leverage Taints and Tolerations to Instruct Nodes to Allow or Not Allow Pod Deployment 
parentDir: k8s/in-depth
slug: k8s/in-depth/taints-and-tolerations
author: Jake Laursen
excerpt: Taints on nodes block pod deployment and tolerations enable pods to work with node taints
tags: ["Kubernetes", "k8s", "taints", "tolerations", "deployment"]
order: 9
---

# Taints and Nodes
Taints apply to nodes.  
Taints allow nodes to "repel" a pod from being deployed on the node.  
Taints are interpreted by the K8s scheduler, and the scheduler takes into account node taints as well as pod tolerations (_below_) when scheduling pods for deployments onto nodes.  

- [Taints and Nodes](#taints-and-nodes)
  - [Taint Effects](#taint-effects)
    - [The NoSchedule Effect](#the-noschedule-effect)
    - [The PreferNoSchedule Effect](#the-prefernoschedule-effect)
    - [The NoExecute Effect](#the-noexecute-effect)
- [Tolerants and Pods](#tolerants-and-pods)
- [Taints and Tolerations Working Together](#taints-and-tolerations-working-together)
  - [Set a Taint on a Node](#set-a-taint-on-a-node)
  - [Set Matching Tolerations on Pods](#set-matching-tolerations-on-pods)
  - [Taints Only Prevent Tainted Nodes From Accepting Pods](#taints-only-prevent-tainted-nodes-from-accepting-pods)
  - [Master Nodes Are Tainted](#master-nodes-are-tainted)
  - [Things to be able to do](#things-to-be-able-to-do)
    - [See the Impact of Taints And Tolerations](#see-the-impact-of-taints-and-tolerations)
    - [In Action](#in-action)
- [Toggle Schedulability of A Node](#toggle-schedulability-of-a-node)
- [Remove A Node From The Cluster](#remove-a-node-from-the-cluster)

## Taint Effects
There are 3 "types" of taints, describe by kubernetes as "effects": NoSchedule, PreferNoSchedule, and NoExecute.  
The NoSchedule and PreferNoSchedule are taints that apply to pods that may or may not be deployed to nodes in the future. The NoExecute taint will affect existing running pods on nodes.  

### The NoSchedule Effect
No Pod will be able to be scheduled on the node unless the pod has matching toleration(s).  
This is perhaps the most strict taint.  

### The PreferNoSchedule Effect
This is, perhaps, a gentler version of the NoScheudle effect.  
The scheduler "tries to avoid" putting a pod in the node if the pod does not tolerate the node.  
This "trying" does not explicitly mean that a pod will not be deployed on a node with mismatched taint(s).  

### The NoExecute Effect
When a node gets the NoExecute effect, any pod in the node that does not tolerate the taint will be evicted from the node immediately.  



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

## Set Matching Tolerations on Pods
Pod definition files can include a `tolerations` object as a sibling to `containers` and key within the `spec` field:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mock-pod
spec:
  containers:
    - name: nxinx-box
      image: nxing
  tolerations:
    - key: "app"
      operator: "Equal"
      value: "frontend"
      effect: "NoSchedule"
```

## Taints Only Prevent Tainted Nodes From Accepting Pods
Pods can end up on any node by the k8s scheduler.  
Pods cannot end up on tainted mis-matched nodes by the scheduler.   
Taints do not explicitly "match" pods to nodes. Tains are more "preventative", in that they block non-matching pods from entering a node.  
Even the taint+toleration combo, which explicitly allows a pod to be deployed on a node, does not require the tolerant pod to be deployed on the tainted node in the case where other untainted nodes exist.

## Master Nodes Are Tainted
K8s sets this up out-of-the-box.  
Application workloads are not intended to be deployed on master nodes.  
```bash
# see the tain on the master node
kubectl describe node kubemaster | grep Taint
```

## Things to be able to do
### See the Impact of Taints And Tolerations
Here
- use a 2-node setup - one controlplane another called...`qwer`
- taint the `qwer` node
- deploy a pod & see it in "pending" state
- deploy ANOTHER pod with a toleration to the taint and see it deploy successfully
- remove the taint on the `qwer` pod and see the previously-pending pod now in the "running" state


1. see now many nodes are running
2. see if any taints are present on node qwer
3. taint a node
   1. `qwer`, 
   2. with key of asdf
   3. val of poiu
   4. effect of NoSchedule
4. create a pod named lkjh with image nginx
5. understand why a created pod is in "Pending" state
   1. the pod cannot tolerate the node taint
6. Create a pod that...
   1. has a name of lkjh
   2. image nginx
   3. a toleration set to taint mortein
7. remove a taint from a node
8. identitify which node a pod is running on

### In Action
```bash
# 1
kubectl get nodes
# 2
kubectl describe nodes qwer | grep Taint
# 3
kubectl taint nodes qwer asdf=poiu:NoSchedule
# 4 
kubectl run lkjh --image=nginx
# 6
# create a pod def file
kubectl run bee --image=nginx --restart=Never --dry-run=client -o yaml > asdf.yaml
# update the config file
vi asdf.yaml
```
```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: bee
  name: bee
spec:
  containers:
  - image: nginx
    name: bee
  # THIS is the key, setting the pod to tolerate the node taint 
  tolerations:
    - effect: NoSchedule
      key: asdf
      operator: Equal
      value: poiu
```

```bash
# 7
# remove taint from controlplane
# SHOW the taint - can be seen though "kubectl describe" or 
kk describe nodes controlplane | grep Taint
Taints:             node-role.kubernetes.io/master:NoSchedule


# remove it
# the command is NEARLT IDENTICAL to adding a taint to the node
# NOTICE the "-" at the end of the taint - thats the key!
kk taint node controlplane node-role.kubernetes.io/master:NoSchedule-
node/controlplane untainted
```

# Toggle Schedulability of A Node
see [k8s docs](https://kubernetes.io/docs/concepts/architecture/nodes/#manual-node-administration) for a few details:  

```bash
# mark as unschedulable
kubectl cordon <node-here>

# mark as schedulable
kubectl uncordon <node-here>
```

# Remove A Node From The Cluster
[K8s Docs](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/#use-kubectl-drain-to-remove-a-node-from-service): Remove a node - this can be useful "_...before you perform maintenance on the node (e.g. kernel upgrade, hardware maintenance, etc.)_"
```bash
kubectl drain nodeNameHere
```