---
title: On Pods
parentDir: k8s
slug: /k8s/on-pods
author: Jake Laursen
excerpt: A "wrapper" around
tags: Kubernetes, K8s, pods, services, workloads
order: 4
---

# Workloads and Pods
([K8s docs on this](https://kubernetes.io/docs/concepts/workloads/))  

- [Workloads and Pods](#workloads-and-pods)
  - [Pods](#pods)
    - [One or more Containers](#one-or-more-containers)
    - [Linux under the Hood](#linux-under-the-hood)
    - [A Pod Definition](#a-pod-definition)
    - [One Pod for One Application Instance](#one-pod-for-one-application-instance)
  - [On Scaling](#on-scaling)
    - [Scalability with Pods](#scalability-with-pods)
    - [Scalability with Nodes](#scalability-with-nodes)
  - [One Pod with Many Containers](#one-pod-with-many-containers)
  - [Parallels to Docker](#parallels-to-docker)
  - [Deploying a pod](#deploying-a-pod)
    - [See Pods available](#see-pods-available)
## Pods
Pods are [_"...the smallest deployable units of computing..."_](https://kubernetes.io/docs/concepts/workloads/) that can be made and "managed" by k8s.  
Pods may look & feel like a composed network of docker containers that, in dockerland, are all working together under a single `docker-compose.yml` file.  

### One or more Containers
Pods run containers.  
Pods share storage.  
Pods share network resources.  
Pods share a "spec" on how to run the containers.  
Based on the k8s docs,  
[_"Note: Grouping multiple co-located and co-managed containers in a single Pod is a relatively advanced use case. You should use this pattern only in specific instances in which your containers are tightly coupled."_](https://kubernetes.io/docs/concepts/workloads/pods/#workload-resources-for-managing-pods).  

### Linux under the Hood
Pods [share linux namespaces, cgroups,](https://kubernetes.io/docs/concepts/workloads/pods/#what-is-a-pod), and configurably more.  
This might feel && sound like a docker container.  

### A Pod Definition
A pod [is defined in a yaml file](https://kubernetes.io/docs/concepts/workloads/pods/#using-pods):  
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```
That pod
- is running a single container 
- the container is using the docker image `nginx:1.14.2` and
- the name of the container is `nginx`  

A pod can be run with
```bash
kubectl apply -f https://k8s.io/examples/pods/simple-pod.yaml
```

### One Pod for One Application Instance
Scale horizontally === more pods, one per instance of an app.  
_Replication_.  
A Replicated pod or set of pods [_"are usually created and managed as a group"_](https://kubernetes.io/docs/concepts/workloads/pods/#workload-resources-for-managing-pods) by a workload resource and its controller.  

One pod, one container (_maybe a norm here_).  

## On Scaling
### Scalability with Pods
One hierarchical look a this:
- A: A cluster, wraps
  - B: a single-node k8s cluster, wraps
    - C: a pod, wraps
      - D: a single instance of a docker container, running
        - E: a single instance of an app

When the number of users grows to introduce a scaling problem? With K8s, a new pod gets created, multiplying the "C" layer and below:

- A: A cluster, wraps
  - B: a single-node k8s node, wraps
    - C1: a pod, wraps
      - D1: a single instance of a docker container, running
        - E1: a single instance of an app
    - C2: a pod, wraps
      - D2: a single instance of a docker container, running
        - E2: a single instance of an app


### Scalability with Nodes
In the previous scaling example, 2 pods are present:
When the number of users grows to introduce a scaling problem? With K8s, a new pod gets created, multiplying the "C" layer and below:

- A: A cluster, wraps
  - B: a single-node k8s node, wraps
    - C1: a pod, wraps
      - D1: a single instance of a docker container, running
        - E1: a single instance of an app
    - C2: a pod, wraps
      - D2: a single instance of a docker container, running
        - E2: a single instance of an app

When the number of users grows to introduce a scaling problem where the number of pods is making the parent "node" stretched thin? Add a node:

- A: A cluster, wraps
  - B1: a single-node k8s node, wraps
    - C1: a pod, wraps
      - D1: a single instance of a docker container, running
        - E1: a single instance of an app
    - C2: a pod, wraps
      - D2: a single instance of a docker container, running
        - E2: a single instance of an app
  - B2: a single-node k8s node, wraps
    - C21: a pod, wraps
      - D21: a single instance of a docker container, running
        - E21: a single instance of an app

Above, the "B2" node can be introduces with even a single pod in it, where room to grow can be introduced into this new pod.  


## One Pod with Many Containers
A Single pod _can have multiple containers_.  
Multiple containers in a single pod are best used when the containers are _tightly coupled_: supporting containers of a primary use-case container.  

Containers in a single pod can all access one another through `localhost`.  


## Parallels to Docker
- deploy an app in a container
  - `docker run api-app`
- **need more resource?** deploy more instances, here 3 will run total
  - `docker run api-app`
  - `docker run api-app`
- **app has introduced a new "service"**?
  - add new "helper containers that link to the primary apps. Here, 3 "helper" container services are added, 1 per primary instance of the app
    - `docker run helper-box -link api-app-1`
    - `docker run helper-box -link api-app-2`
    - `docker run helper-box -link api-app-3`
    - THIS
      - would require shared...
        - networking
        - volumes
        - monitoring of container management

PODS, comparatively, solve the container-linking resource-sharing needs:
- put a primary & helper container in a pod
- containers have same...
  - storage
  - network
  - up & down coordination



## Deploying a pod
Here, deploying an nginx container
kubectl...
- deploys a container
- creates a pod

```bash
# nginx getes downloaded from dockerhub here
kubectl run nginx --image nginx
```  
### See Pods available
```bash
kubectl get pods
```
- see pods
- see a "status"
  - containerCreating
  - Running