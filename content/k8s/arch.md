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

