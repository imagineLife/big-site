---
title: Handle User Info
parentDir: k8s/examples
slug: k8s/examples/deal-with-users
author: Jake Laursen
excerpt: User Details
tags: k8s, node, users, config, kubectl
order: 12
---

## Add A User To the Kubernetes Configuration
Allow a new user to access the cluster, provided...
- a client key, here stored at `/root/devops-user.key`
- a client cert, here stored at `/root/devops-user.crt`

In order for this to work, add a context to the kubernetes config:
- called `devops`
- for user `devops-user`
- for cluster `kubernetes`

### Some steps
Edit the kubeconfig file at `/root/.kube/config`.  
There are sections to this file: `users`, `contexts`, etc.  

K8s is setup with a current context (_view it with `kubectl config current-context`_).  
The current context can be updated with the new user+cluster combo:
`kubectl config use-context devops`. Here, the `devops` is the name of the new context (_above_).  

## Setup a Role and RoleBinding
Create a role with permissions:
- named `devops-dev`
- in the `devops` namespace
- can do all with `services`
- can do all with `persistentvolumeclaims`
- can do all with `pods`

Create a Rolebinding:
- for the `devops-dev` role
- called `dev-role-binding`
- in the namespace `devops`
- associated with a specific user `devops-user`