---
title: Kubernetes Namespaces
parentDir: k8s/in-depth
slug: k8s/in-depth/namespaces
author: Jake Laursen
excerpt: Kubernetes, Identifying
tags: Kubernetes, K8s, configuration
order: 2
---

# Namespaces
[Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) isolate groups of resources within a cluster.  
Pods, deployments, replica sets... these all happen in a namespace.  

- [Namespaces](#namespaces)
  - [A Few Namespaces By Default](#a-few-namespaces-by-default)
  - [Namespaces Get Resources](#namespaces-get-resources)
  - [Namespace Objects Call Each Other By Name](#namespace-objects-call-each-other-by-name)
    - [Within the Same Namespace](#within-the-same-namespace)
    - [Across Namespaces](#across-namespaces)
    - [DNS Naming Happens](#dns-naming-happens)
  - [Using the CLI](#using-the-cli)
    - [See Objects By Namespace](#see-objects-by-namespace)
    - [Create Objects by Namespace](#create-objects-by-namespace)
  - [Specify Namespace in a Definition File](#specify-namespace-in-a-definition-file)
## A Few Namespaces By Default
- `Default`
  - created when the cluster is first setup
- `kube-system`
  - isolates K8s deets from us, the users
- `kube-public`
  - resources that are available to all users

In small environments, default is usually all that is needed.  

## Namespaces Get Resources
Namespaces can hold their own `policies`.  
Namespace can have resource quotas, too: ram, disk space, etc.  

## Namespace Objects Call Each Other By Name
Per an example, say 2 namespaces exist: a `Default` and a `dev`.  
The `Default` has 3 pods: 
- `web-pod`, a web-api
- `web-deployment`, a deployment object
- `db-service`, a db service

The `dev` has 2 pods:
- `web-pod`, a web-api
- `db-service`, a db service

### Within the Same Namespace
The 3 services within the `Default` namespace can all "talk" to each other by their service name: `web-pod` can connect to the db through something like `db.connect('db-service')`. Epic.  

Likewise, the `dev` cluster elements can talk to each other by name: `db.connect('db-service')`.  
The objects in the namespace do not "care" about the namespace when talking to each other.  

### Across Namespaces
Objects that "talk to" each other from one namespace to another use the namespace in the name: web-pod in `Default` can access the `db-service` in the `dev` namespace with something like `db.connect("db-service.dev.svc.cluster.local")`.  

### DNS Naming Happens
When each service is created, DNS entries get created for each service.  
```bash
db-service.dev.svc.cluster.local
```
- `cluster.local` is the default domain of the K8s cluster
- `svc` is the default sub-domain for service
- `dev` is the namespace
- `db-service` is the service name

## Using the CLI
### See Objects By Namespace
```bash
# defaults to the "Default" namespace
kubectl get pods

# here, use one of the built-in namespaces, "kube-system"
kubectl get pods --namespace=kube-system

# here, use one of the built-in namespaces, kube-public
kubectl get pods --namespace=kube-public
```

### Create Objects by Namespace
```bash
# defaults to the "Default" namespace
kubectl create -f def-file.yaml


# create in a new Namespace, titled "horse"
kubectl create -f dev-file.yml --namespace=horse
```


## Specify Namespace in a Definition File
```yaml
apiVersion: v1
kind: Pod
metadata:
  #  THIS!! specify the namespace directly in the def file!
  namespace: horse
  name: demo-pod
  labels:
    app: demo-app
    type: front-end
spec:
  containers:
    - name: redis-box
      image: redis
```