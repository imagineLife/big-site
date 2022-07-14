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