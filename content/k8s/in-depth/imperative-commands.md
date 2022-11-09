---
title: Build Kubernetes Objects with One-Lineres
parentDir: k8s/in-depth
slug: k8s/in-depth/imperative-commands
author: Jake Laursen
excerpt: Use One-Line Imperative programming syntax to build some k8s objects
tags: Kubernetes, K8s, imperative, cli
order: 3
---

# Imperative One-Liners
- [Imperative One-Liners](#imperative-one-liners)
  - [Imperative Pod Handling](#imperative-pod-handling)
  - [Imperative Deployment Handling](#imperative-deployment-handling)
  - [Imperative Service Handling](#imperative-service-handling)
    - [Imperative Namespace Handling](#imperative-namespace-handling)
    - [Imperative 2-in-1](#imperative-2-in-1)
  - [Explaining](#explaining)
  - [Shorthand resources](#shorthand-resources)
## Imperative Pod Handling
```bash
# deploy a pod named "nginx" with the "nginx:alpine" image
kubectl run nginx --image=nginx:alpine

# Deploy a pod
# named redis
# from image redis:alpine
# with labels tier: db
kubectl run redis --image=redis:alpine --labels="tier=db"


# create a pod
# named horse
# using nginx image
# expose it on container port 8080
kubectl run horse --image=nginx --port=8080
```

## Imperative Deployment Handling
```bash
# create a deployment named nginx based on an nginx image
kubectl create deployment --image=nginx nginx

# Create a definition file for the same deployment without creating the deployment
kubectl create deployment --image=nginx nginx --dry-run=client -o yaml

# create a deployment named nginx based on an nginx image wiith 3 replicas
kubectl create deployment nginx --image=nginx --replicas=4

# scale an existing deployment named nginx to 5 ppods
kubectl scale deployment nginx --replicas=5


# create a deployment
# named webapp
# with image demo:webapp
# with 3 replicas
kubectl create deployment --name=webapp --image=demo:webapp --replicas=3


# create a deployment
# called mock-dep
# in horse-ns namespace
# with redis image
# and 4 replicas
kubectl create deployment mock-dep --namespace=horse-ns --replicas=4 --image=redis
```

## Imperative Service Handling
```bash
# Create a service definition file
# - names redis-service
# exposing a pod named "redis" 
# on port 6379

kubectl expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml > redis-service.yaml

# Create a service
# - names redis-service
# exposing a pod named "redis" 
# on port 6379
kubectl expose pod redis --port=6379 --name redis-service

# Create a service
#  named nginx
# NodePort type
# expose pod named nginx
# expose port 80 of the pod on port 30080 of the node
kubectl create service nodeport nginx --tcp=80:80 --node-port=30080

# Create a service
# named redis-service
# exposing an existing app called redis
# on port 6379
kubectl expose pod redis --name=redis-service --port=6379 --target-port=6379
```

### Imperative Namespace Handling
```bash
# create a namespace
# named horse-ns
kubectl create namespace horse-ns
```

### Imperative 2-in-1
```bash
# Create a pod
# called http
# using image httpd:alpine
# AND also create a service 
# of type ClusterIP
# with same name as the pod, http
# with a terget port of 80
kubectl run httpd --image=httpd:alpine --port=80 --expose
```

## Explaining
documenting of resources  
[k8s docs](https://jamesdefabia.github.io/docs/user-guide/kubectl/kubectl_explain/)

```bash
kk explain jobs
```

## Shorthand resources
The [K8s Docs](https://kubernetes.io/docs/reference/kubectl/#resource-types) show a list of all resource types and their shortnames, api versions, and kind. Here's a shortlist of maybe the "common" resource types:
|||
|:--:|:--|


| cm | 	configmaps |
| ds | 	daemonsets |
| deploy | 	deployments |
| ep | 	endpoints |
| ev | 	events |
| hpa |       	horizontalpodautoscalers |
| ing | 	ingresses |
| limits | 	limitranges |
| ns | 	namespaces |
| no | 	nodes |
| pvc | 	persistentvolumeclaims |
| pv | 	persistentvolumes |
| po | 	pods |
| pdb | 	poddisruptionbudgets |
| psp | 	podsecuritypolicies |
| rs | 	replicasets |
| rc  | 	replicationcontrollers |
| sa | 	serviceaccounts |
| svc | 	services |

| cs | 	componentstatuses |
| csr |       	certificatesigningrequests |
| quota | 	resourcequotas |