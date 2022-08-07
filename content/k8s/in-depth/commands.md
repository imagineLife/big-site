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
```