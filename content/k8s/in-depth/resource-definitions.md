---
title: An Overview of Kubernetes Resource Allocation and Definition Options
parentDir: k8s/in-depth
slug: k8s/in-depth/on-resources
shortSlug: on-resources
author: Jake Laursen
excerpt: Disk, Memory, and CPU are 3 types of resources that can be configured within Kubernets
tags: ["Kubernetes", "k8s", "Disk", "Memory", "CPU", "Hardware", "resources", "allocation"]
order: 8
---

# Kubernetes Objects Consume Hardware Resources
Nodes can use memory, disk, and cpu.  
Pods can use the same.  

- [Kubernetes Objects Consume Hardware Resources](#kubernetes-objects-consume-hardware-resources)
  - [Scheduler Considers these hardware resources](#scheduler-considers-these-hardware-resources)
  - [Resource Maximums Can Be Configured](#resource-maximums-can-be-configured)
    - [Resource Limits can Be describe in LimitRange definition files](#resource-limits-can-be-describe-in-limitrange-definition-files)
      - [Memory](#memory)
      - [CPU](#cpu)
  - [Resources Can Be Configured by Pod Definition](#resources-can-be-configured-by-pod-definition)
    - [Understanding Resource Allocation on Running Pods](#understanding-resource-allocation-on-running-pods)
    - [Pod Resource Requests and Kubernetes Scheduler Impacts](#pod-resource-requests-and-kubernetes-scheduler-impacts)
## Scheduler Considers these hardware resources
Kubernetes schedulers "decide" which node that a pod gets allocated to. The Scheduler considers resources that are required by a pod. The scheduler also considers resources "left available" on the host(s) environmnets.  

## Resource Maximums Can Be Configured
According to [the k8s docs](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/memory-default-namespace/) on configuring memory limits,
`A Kubernetes cluster can be divided into namespaces. Once you have a namespace that has a default memory limit, and you then try to create a Pod with a container that does not specify its own memory limit, then the control plane assigns the default memory limit to that container.`  

### Resource Limits can Be describe in LimitRange definition files

#### Memory
Here is a memory LimitRange example for a pod. [K8s Memory units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes) are describe bytes- integers with quantity suffixes of:
- E 
- P
- T
- G for gigabytes (1,000,000,000 bytes)
- M for Megabytes (1,000,000 bytes)
- k for kilobytes (1,000 bytes)
- Ei
- Pi
- Ti
- Gi for gibibyte (1,073,741,824 bytes)
- Mi for Mebibyte (1,048,576 bytes)
- Ki for Kibibyte (1,024 bytes)

in This def file is described
- requesting 256MiB of memory
- setting a max mem limit of 512 MiB

```yaml
# mem-limits.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: memory-limit-range
spec:
  limits:
    - default:
        memory: 512Mi
      defaultRequest:
        memory: 256Mi
      type: Container
```

This can be applied to a namespace for all pods in the namespace, here the `default` namespace. With this applied, any container created within a pod in the `default` namespace, where the pod itself does not specify _its own memory min or max_, the k8s control plane applies the described values to the pod.
```bash
kubectl apply -f mem-limits.yaml --namespace=default
```


#### CPU
Here is a CPU LimitRange example for a pod. [K8s CPU units of measurement](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes) are equivelant to 1 physical cpu core, or 1 virtual core - depending on the host env type. The below def file describes:
- requesting 256MiB of memory
- setting a max mem limit of 512 MiB

```yaml
# cpu-limits.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: memory-limit-range
spec:
  limits:
    - default:
        cpu: 1
      defaultRequest:
        cpu: 0.5
      type: Container
```

This can be applied to a namespace for all pods in the namespace, here the `default` namespace. With this applied, any container created within a pod in the `default` namespace, where the pod itself does not specify _its own cpu min or max_, the k8s control plane applies the described values to the pod.
```bash
kubectl apply -f cpu-limits.yaml --namespace=default
```


## Resources Can Be Configured by Pod Definition
Here, an example of a pod that includes explicity memory & cpu request sizes. here,
- 2 containers, both with similar resource descriptions
    - requested ammounts
      - .25 CPU units
      - 64MiB of memory
    - max limits
      - .5 CPU units
      - 128MiB of memory
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: frontend
spec:
  containers:
    - name: api-app
      image: some-api-image:v2
      # here!
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
    - name: hidden-worker
      image: some-worker-image:v2
      # here!
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
```

### Understanding Resource Allocation on Running Pods
```bash
kubectl get pod pod-name-here -o yaml
```
This command will reveal `containers:-resource:(limits + request)` details.  

### Pod Resource Requests and Kubernetes Scheduler Impacts
Pods get created.  
K8s scheduler selects a node for the pod to run on.  
Each node, itself, has a maximum capacity of resources that the node can allocate to pods.  
The scheduler asserts that the maximum available resources of the node are always larger than the sum of the resource requests of the containers (_inside pods_).  
Resource Limit Description Without Request Definition
Pod resource limits can be described without describing the resource request.  