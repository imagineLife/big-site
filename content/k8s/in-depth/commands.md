---
title: Kubernetes Kubectl Commands Through A Working Example
parentDir: k8s/in-depth
slug: k8s/in-depth/commands
author: Jake Laursen
excerpt: Create objects, alter objects, and more through configuration files and imperative kubectl commands
tags: Kubernetes, K8s, Commands, CLI, config, imperative example
order: 98
---

- [Creating Objects Imperatively](#creating-objects-imperatively)
  - [An Overview](#an-overview)
  - [Terminal Ninja Commands](#terminal-ninja-commands)
    - [Bash Aliases](#bash-aliases)
    - [Imperative commands](#imperative-commands)
  - [Create Vs Apply](#create-vs-apply)
  - [Copy Files Between Nodes](#copy-files-between-nodes)
# Creating Objects Imperatively
This is intended to be a brief collection of commands. Read the other posts for more deets.  
[Kubectl docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#create) cover imperative commands in extensive details.  
Here, a mock use-case to setup a kuberenetes set of objects will be used as an example to illustrate a bunch of commands used to create & inspect k8s objects.

## An Overview
Perhaps A use-case:  
Another engineer has installed kubernetes and kubectl and has setup a node.  
We are given several images to deploy and a handful of instructions:
- **deploy an api webserver** from image `web-sesrver:1.2.3` as a replicaset with a deployment object - use 3 instances of the image
- **deploy an nginx server** as a "frontend" server with a deployment, replicaset, and 3 instances
- **deploy a db server** from image `mongodb:5.0.0`, with a deployment, replicaset, and 1 instance 
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
- **accept requests from the world using an ingress setup** - the engineer already setup an nginx ingress controller && we need to config the ingress details to make ingress work

## Terminal Ninja Commands
Using the bash cmd prompt can be cumbersome. Here are shome things to consider
### Bash Aliases
Save Millions of Keystrokes.  
Millions.  
  
Consider using something like these to shortcut the ammount of times we need to wiggle our fingers.  

**Remember:** 8 keystrokes saved, which is from `kubectl get` to `kkg`... 
- at 100x in a day is 800 keystrokes saved
- over 5 days is 4,000 keystrokes
- over 1 month, lets say 15 days at the previous rate, is 60,000 keystrokes
- do this for 6 months and we save 360,000 keystrokes. 

Write a few aliases to save a few keystrokes. save ourselves millions of finger-wiggles.  


```bash
alias kk=kubectl
alias kkg"kubectl get"
alias kkd="kubectl describe"
alias kkc="kubeclt create"
alias kkdel="kubectl delete"
alias kkconf="kubectl config"
```
### Imperative commands
Check out the [kubectl cheatsheet docs for more](https://kubernetes.io/docs/reference/kubectl/cheatsheet/).   
Check out the [generated reference docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands) also, for a different aspect on the imperative commands.  


```bash

# show all current "api resource" types that are available
kubectl api-resources

# 
# CONFIG
# 
# see the config
kk config view
# context
kk config get-contexts
kk config current-context
kk config use-context some-named-context


#
# CONFIG: create config objects
#

# create a user in the kubeconfig file @ /root/.kube/config
#  LEVERAGE a client-cert from a file 
#  LEVERAGE a client-key from a file 
# kubectl config set-credentials <user-name> --client-certificate=/the/cert/file.crt --client-key=the/key/file.key
kubectl config set-credentials webappadmin --client-certificate=/webappadmin.crt --client-key=/webappadmin.key


# 
# Get info
# 
# get all
kk get (one of) | pods | deployments | netpol
kk get deployments
kk get netpol
kk get svc
# get a single
kk get pods pod-name
kk get netpol a-policy-name
kk get svc a-service-name

# WATCH the status of pods update
# note, this one needs ^C to cancel the terminal session
kk get pods --watch


# 
# Create a yaml before creating the resource
# -o yaml > the-file.yaml 
kk run api-pod --image=node:alpine --dry-run=client -o yaml > podfile.yaml



# 
# "Random"
# 
# all namespaces
kkg pods --all-namespace
# all namespaces shorthand
kkg pods -A

# get deployments AND pods, in oneline
kkg deployment,pod

# get more all at once
# replicasets, pods, services, endpoints
# for a list of ALL shortcuts and their types: https://kubernetes.io/docs/reference/kubectl/#resource-types
kkg deploy,rs,po,svc,ep

# 
# Taints
#

# un-taint a node
# note the "-" at the end removes the taint
mretfaster@cp:~$ kubectl taint nodes --all node-role.kubernetes.io/control-plane-
node/cp untainted


# 
# Process info
# 

# kk top: display resources by "type"
# https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#top
# show cpu + memory highlights
kk top nodes
kk top pods
```

## Create Vs Apply
```bash
┌─────────┬───────────────────────┬────────────────────────┐
│ command │ object does not exist │ object already exists  │
├─────────┼───────────────────────┼────────────────────────┤
│ create  │ create new object     │          ERROR         │ 
│         │                       │                        │
│ apply   │ create new object     │ configure object       │
│         │ (needs complete spec) │ (accepts partial spec) │
│         │                       │                        │
│ replace │         ERROR         │ delete object          │
│         │                       │ create new object      │
└─────────┴───────────────────────┴────────────────────────┘
```

## Copy Files Between Nodes
while the terminal is "in" a node, say the `controlplane` node, use the `scp` command (_OpenSSH secure file copy_) to copy to another node, say the node `worker2`:
```bash
controlplane$ scp path/to/files/on/host worker2:/path/on/worker2/node
```