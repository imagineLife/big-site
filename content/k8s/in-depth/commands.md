---
title: Kubernetes Kubectl Commands and Configuration Examples
parentDir: k8s/in-depth
slug: k8s/in-depth/commands
author: Jake Laursen
excerpt: Create objects, alter objects, and more
tags: Kubernetes, K8s, Commands, CLI
order: 98
---

- [Creating Objects Imperatively](#creating-objects-imperatively)
  - [An Overview](#an-overview)
  - ["Core" Objects](#core-objects)
    - [Pods](#pods)
    - [Replica Sets](#replica-sets)
    - [Deployments](#deployments)
  - [Networking Services](#networking-services)
  - [Accounts](#accounts)
    - [Service Accounts](#service-accounts)
- [Inspect Objects](#inspect-objects)
  - ["Core" Objects](#core-objects-1)
    - [Pods](#pods-1)
    - [Replica Sets](#replica-sets-1)
    - [Deployments](#deployments-1)
  - [Accounts](#accounts-1)
    - [Service Accounts](#service-accounts-1)
  - [Secrets](#secrets)
  - [Terminal Ninja Commands](#terminal-ninja-commands)
    - [Common Command Aliases](#common-command-aliases)
# Creating Objects Imperatively
This is intended to be a brief collection of commands. Read the other posts for more deets.  
[Kubectl docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#create) cover imperative commands in extensive details.  

## An Overview
Perhaps A use-case:  
Another engineer has installed kubernetes and kubectl and has setup a node.  
We are given several images to deploy and a handful of instructions:
- **deploy an api webserver** from image `web-sesrver:1.2.3` as a replicaset with a deployment object - use 3 instances of the image
- **deploy an nginx server** as a "frontend" server with a deployment, replicaset, and 3 instances
- **deploy a db server** from image `mongodb:5.0.0`, with a depliment, replicaset, and 1 instance 
- **make them talk to each other**: document and share some k8s object definition files to support these requirements 
  - the nginx (frontend) server will 
    - accept requests from the world on port 80
    - make requests to the api server
    - **should not** be allowed to talk to or accept requests from anything else
  - the api server will 
    - accept requests from the frontend on port 1234
    - make requests to the db on port 27017
    - **should not** be allowed to talk to or accept requests from anything else
  - the db server will 
    - accept requests from the api server on port 27017
    - **should not** be allowed to talk to or accept requests from anything else
- accept requests from the world with an ingress setup - the engineer already setup an nginx ingress controller && we need to config the ingress details to make ingress work

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
## "Core" Objects
### Pods
### Replica Sets
### Deployments

## Accounts
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

## Secrets
```bash
# show 1-liner, 1 per secret
kubectl get secrets

# show a secret in depth
# kubectl describe secret <secret-name>
kubectl describe secret cicd-user-sa-token-qwer
```

## Terminal Ninja Commands
Using the bash cmd prompt can be cumbersome. Here are shome things to consider
### Common Command Aliases
```bash
alias kk=kubectl
alias kkg"kubectl get"
alias kkd="kubectl describe"
```