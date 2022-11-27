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
  - [Setting up a user, role, rolebinding](#setting-up-a-user-role-rolebinding)
  - [Config Updates](#config-updates)
  - [Shorthand resources](#shorthand-resources)
  - [Kubectl Config Overview](#kubectl-config-overview)
    - [Configure User Credentials](#configure-user-credentials)
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

# permanently save the namespace for all subsequent kubectl commands in that context.
# i.e set the current namespace
kubectl config set-context --current --namespace=horse
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

## Setting up a user, role, rolebinding
```bash
# ROLE
kk create role dev-role --resources=pods,svc
```
## Config Updates
Here, deal with users, and contexts
```bash
kubectl config set-credentials username --username=kubeuser --password=kubepassword
```

## Shorthand resources
The [K8s Docs](https://kubernetes.io/docs/reference/kubectl/#resource-types) show a list of all resource types and their shortnames, api versions, and kind. Here's a shortlist of maybe the "common" resource types:
|||
|:--:|:--|
| cm | 	configmaps |
| ds | 	daemonsets |
| deploy | 	deployments |
| ep | 	endpoints |
| ing | 	ingresses |
| ns | 	namespaces |
| no | 	nodes |
| pvc | 	persistentvolumeclaims |
| pv | 	persistentvolumes |
| po | 	pods |
| rs | 	replicasets |
| rc  | 	replicationcontrollers |
| sa | 	serviceaccounts |
| svc | 	services |

Here are some I have not really used
|||  
| :--: | :-- |  
| cs | 	componentstatuses |
| csr |       	certificatesigningrequests |
| ev | 	events |
| hpa |       	horizontalpodautoscalers |
| limits | 	limitranges |
| pdb | 	poddisruptionbudgets |
| psp | 	podsecuritypolicies |
| quota | 	resourcequotas |

## Kubectl Config Overview
`kubectl config <command and more>` can be used to work the kubeconfig file:
- crud contexts
- crud clusters
- crud users

```bash

# ...lifted from the `kubectl config --help` output


Modify kubeconfig files using subcommands like "kubectl config set current-context my-context"

 The loading order follows these rules:

  1.  If the --kubeconfig flag is set, then only that file is loaded. The flag may only be set once and no merging takes
place.
  2.  If $KUBECONFIG environment variable is set, then it is used as a list of paths (normal path delimiting rules for
your system). These paths are merged. When a value is modified, it is modified in the file that defines the stanza. When
a value is created, it is created in the first file that exists. If no files in the chain exist, then it creates the
last file in the list.
  3.  Otherwise, ${HOME}/.kube/config is used and no merging takes place.

Available Commands:
  current-context   Display the current-context
  delete-cluster    Delete the specified cluster from the kubeconfig
  delete-context    Delete the specified context from the kubeconfig
  delete-user       Delete the specified user from the kubeconfig
  get-clusters      Display clusters defined in the kubeconfig
  get-contexts      Describe one or many contexts
  get-users         Display users defined in the kubeconfig
  rename-context    Rename a context from the kubeconfig file
  set               Set an individual value in a kubeconfig file
  set-cluster       Set a cluster entry in kubeconfig
  set-context       Set a context entry in kubeconfig
  set-credentials   Set a user entry in kubeconfig
  unset             Unset an individual value in a kubeconfig file
  use-context       Set the current-context in a kubeconfig file
  view              Display merged kubeconfig settings or a specified kubeconfig file
```

### Configure User Credentials
this will
- add a user credential to the kubeconfig file
- use a cert + key combo for the user from local key/cert files
```bash
kubectl config set-credentials joe --client-certificate ./joe.crt --client-key ./joe.key

# display the user(s) in the kubeconf file
kubectl get-users
```