---
title: On Networking
parentDir: k8s
slug: k9s/networking-intro
author: Jake Laursen
excerpt: Only an Intro
tags: Kubernetes, K8s, networking
order: 7
---

# Networking
Networking across Nodes is not setup by default by Kubernetes.  
There are many other network solutions available:
- cisco
- vmWare
- cilium
- flannel
- calico

From scratch, calico and/or flannel might work.  
NSXT might be good in a vmware env.  
K8s labs use weavenet as their solution.  

The networking solution will assign virtual ips to the nodes && pods.  

## Services Help
Services help with networking.  
A `ClusterIP` service is used to handle inner-cluster traffic.  
A `NodePort` service is used to allow access into a node from the "outside world". NodePort services first create a clusterIP service, then associate a port on the node to the new clusterIP.    
A `LoadBalancer` helps balance the network traffic across recievers.  

Check out [This slide deck](https://speakerdeck.com/thockin/illustrated-guide-to-kubernetes-networking) for another much more verbose look into networking.  
