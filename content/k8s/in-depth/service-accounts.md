---
title: Service Accounts Provide Identity To Container Processes
parentDir: k8s/in-depth
slug: k8s/in-depth/service-accounts
author: Jake Laursen
excerpt: 
tags: Kubernetes, K8s, Security, Docker, Users, Privileges
order: 6
---

# Kubernetes Service Accounts
According to the [K8s docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/),  
`A service account provides an identity for processes that run in a Pod.`  

There are two Types of accounts in K8s:
- User accounts are used by humans
  - an admin accesses a cluster
  - a dev accesses the cluster to deploy an app
- Service accounts are used by machines
  - an app accesses a cluster (_prometheus_)
  - jenkins deploys apps after pipelines

An Example:
- a K8s Dashboard app, a python app
- gets a list of pods in the cluster
- displays pods on a webpage
- Uses a service account

Here, the service account would be used by the app to "talk to" the cluster and get cluster details to show in the resulting app webpage.  <br/><br/>


- [Kubernetes Service Accounts](#kubernetes-service-accounts)
  - [Create a Service Account](#create-a-service-account)
    - [Comes with a Token](#comes-with-a-token)
  - [Inspect All Service Accounts](#inspect-all-service-accounts)
  - [Inspect One Service Account](#inspect-one-service-account)
## Create a Service Account
```yaml
kubectl create service account dashboard-sa
```
### Comes with a Token
Creating a service account builds a token.  
This token is a secret k8s object.  
This token K8s object name can be inspected by [inspecting a service account](#inspect-one-service-account)


## Inspect All Service Accounts
```bash
# show 1-liners, 1 for each account
kubectl get serviceaccount
```


## Inspect One Service Account
```bash
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