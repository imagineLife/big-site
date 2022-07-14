---
title: Kubernetes Kubectl Commands and Configuration Examples
parentDir: k8s/in-depth
slug: k8s/in-depth/commands
author: Jake Laursen
excerpt: Create objects, alter objects, and more
tags: Kubernetes, K8s, Commands, CLI
order: 98
---

# Creating Objects Imperatively
This is intended to be a brief collection of commands. Read the other posts for more deets.  

## "Core" Objects
### Pods
### Replica Sets
### Deployments

## Networking Services

## Accounts
### Service Accounts
Used by machines to do K8s work.
```bash
# kubectl create serviceaccount <service-account-name>
kubectl create serviceaccount cicd-user
```

# Inspect Objects
### Service Accounts
```bash
# show 1-liners for all each account
kubectl get serviceaccount

# inspect one in-depth
# kubectl describe serviceaccount <account-name>
kubectl describe serviceaccount cicd-user
Name:                       cicd-user
Namespace:                  default
Labels:                     <none>
Annotations:                <none>
Image pull secrets:         <none>
Mountable secrets:          some-string-here
Tokens:                     some-string-here
Events:                     <none>
```