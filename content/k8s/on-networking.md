---
title: On Networking
parentDir: k8s
slug: k9s/networking-intro
shortSlug: networking-intro
author: Jake Laursen
excerpt: Only an Intro
tags: ["Kubernetes", "k8s", "networking"]
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

## CNI Config
K8s is standardizing on the [Container Network Interface](https://github.com/containernetworking/cni) (_CNI_) spec for container networking.  
This spec
- relates to other librariers that write plugins
- configure container networking 
- remove allocated resources when containers are deleted
- aims to provide a common interface between networking oclutions + container runtimes

Something like this
```json
{
  "cniVersion": "0.2.0",
  "name": "this-network",
  "type": "bridge",
  "bridge": "cni0",
  "isGateway": true,
  "ipMasq": true,
  "ipam": {
    "type": "host-local",
    "subnet": "10.22.0.0/16",
    "routes": [
      { "dst": "0.0.0.0/0" }
    ] 
  }
}
```
- a linux bridge network
- named `cni0`
- gives out an IP in a subnet range `10.22.0.0./16`

## Pod-To-Pod networking
CNI does not help across nodes, unfortunately.  
Tools like GKE, Weave, Flannel, Calico, and Cilium help with making all IPs routable without Network Address Translation (NAT).  

## References
https://research.google/pubs/pub43438/  

https://www.gcppodcast.com/post/episode-46-borg-and-k8s-with-john-wilkes/  

https://github.com/kubernetes/community