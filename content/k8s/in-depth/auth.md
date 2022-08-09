---
title: 
parentDir: k8s/in-depth
slug: k8s/in-depth/security-primitives
author: Jake Laursen
excerpt: 
tags: Kubernetes, K8s
order: 23
---

Hosts form clusters.  
Access to hosts should only be used with ssh keys: no un+pw.  

# Security In K8s
- [Security In K8s](#security-in-k8s)
  - [The First Line Of Defense: Protect the Kube-Apiserver](#the-first-line-of-defense-protect-the-kube-apiserver)
  - [AuthN](#authn)
    - [Focusing On Devs, Admins, and Apps that Get Access](#focusing-on-devs-admins-and-apps-that-get-access)
      - [Leverage Static Files To Hold User AuthN Details](#leverage-static-files-to-hold-user-authn-details)
  - [AuthZ](#authz)
  - [Kubernetes leverages TLS for its built-in object communication](#kubernetes-leverages-tls-for-its-built-in-object-communication)

## The First Line Of Defense: Protect the Kube-Apiserver
The kube-apiserver can perform almost all functions. This must be protected.

## AuthN
Who can use this stuff?!  

Files can hold access creds.  
Certs can exist.  
Machines can get service accounts.  

AuthN through static files, like below, are not necessarily recommended.  
At least put these files in mounted dirs.  

### Focusing On Devs, Admins, and Apps that Get Access
Kubernetes can create and manage serviceaccounts. Those can be used.  
All user access is managed by the apiserver.  
The kube-apiserver authenticates requests prior to processing the request.  
#### Leverage Static Files To Hold User AuthN Details
Consider using a csv file with 3 cols: pw,un,uid.  
The filename can be passed as an option to the kube-apiserver....hmm...  
To auth with one of those users:  
`curl -v -k https://master-node-ip-here:6443/api/v1/pods -u "un:pw"`  

A 4th column can exist to assign users to groups.  

## AuthZ
What can these people do?  

RBAC can work.  
ABAC can work.  
Node Auth and webhook mode can work.  

## Kubernetes leverages TLS for its built-in object communication
All communication in the cluster happens with tls encryption: the etcd cluster, kubelet, kube controller manager, kube apiserver, kube proxy, kube scheduler... all of these things use tls encryption to talk to one another.  
