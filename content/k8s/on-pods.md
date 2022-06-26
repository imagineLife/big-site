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
### Pod Creation with Deployments or Jobs
