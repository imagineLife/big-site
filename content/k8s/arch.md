---
title: K8s Concepts
parentDir: k8s
slug: /k8s/architecture-overview
author: Jake Laursen
excerpt: Phrases and Parts to K8s
tags: Kubernetes, K8s, nodes, clusters
order: 2
---
# Kubernetes Concepts
- [Kubernetes Concepts](#kubernetes-concepts)
  - [Nodes](#nodes)
  - [Clusters](#clusters)
  - [A Master Node](#a-master-node)
  - [Worker Nodes](#worker-nodes)
  - [Components](#components)
    - [API Server](#api-server)
    - [ETCD Key Store](#etcd-key-store)
    - [Kubelet](#kubelet)
    - [Container Runtime](#container-runtime)
    - [Controllers](#controllers)
    - [Scheduler](#scheduler)
  - [Kubectl](#kubectl)

With Kubernetes, one of the primary goals is to...
- deploy app(s)
- in containers
- on machines
- configured as "worker nodes" in a cluster

K8s does not deploy containers directly on a worker node, though.  
Containers are encapsulated in [pods](/k8s/on-pods): single instances of an app or suite of tightly-coupled apps. Pods are the smallest object that can be created/managed in K8s.  

## Nodes
A node is a machine, physical or virtual, where K8s is installed. Nodes might be known as minions.  

## Clusters
A cluster is a set of nodes. Clusters are helpful for load management and replication during node failure.  

## A Master Node
A Node with K8s installed.  
This node "watches" && manages other nodes in a cluster.  
The master server has the kube API server on it.  
All info about the worker nodes is stored on the master with the etcd component/service.  
THe master has both the controller and scheduler on it.

## Worker Nodes
Minions. These host the container runtimes and containers. 
These have the kubelet agent on them, which is used to interact with the master node.  

## Components
Installing Kubernetes is installing some "components".
### API Server
- the "frontend" for K8s
- allows interaction w/ k8s cluster
### ETCD Key Store
- stores data to manage the cluster
- a key-value store
- responsible for implementing logs within clusters to alleviate any potential conflicts between master nodes

### Kubelet
- the agent that runs on each node in a cluster
### Container Runtime
- will prob be docker
### Controllers
- the "brain" behind orchestration
- "notice" when containers stop working
- starts new containers
### Scheduler
- Distributes work & containers across nodes

## Kubectl
A kube command-line tool.  
Used to deploy + manage kubernetes apps on a K8s cluster.
```bash
# deploy an app on a cluster
kubectl run hello-minikub

# see info about the cluster
kubectl cluster-info

# list the nodes in the cluster
kubectl get nodes
```