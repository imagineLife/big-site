---
title: On Networking
parentDir: k8s
slug: /k8s/networking-intro
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