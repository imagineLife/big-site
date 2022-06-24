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
## Nodes
A node is a machine, physical or virtual, where K8s is installed. Nodes might be known as minions.  

## Clusters
A cluster is a set of nodes. Clusters are helpful for load management and replication during node failure.  

## A Master Node
A Node with K8s installed.  
This node "watches" && manages other nodes in a cluster.  

##