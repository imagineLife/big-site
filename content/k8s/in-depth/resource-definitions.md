---
title: An Overview of Kubernetes Resource Allocation and Definition Options
parentDir: k8s/in-depth
slug: k8s/in-depth/on-resources
author: Jake Laursen
excerpt: Disk, Memory, and CPU are 3 types of resources that can be configured within Kubernets
tags: Kubernetes, K8s, Disk, Memory, CPU, Hardware, resources, allocation
order: 8
---

# Kubernetes Objects Consume Hardware Resources
Nodes can use memory, disk, and cpu.  
Pods can use the same.  

## Scheduler Considers these hardware resources
Kubernetes schedulers "decide" which node that a pod gets allocated to. The Scheduler considers resources that are required by a pod. The scheduler also considers resources "left available" on the host(s) environmnets.  

## 
## Resource Maximums Can Be Configured
According to [the k8s docs](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/memory-default-namespace/) on configuring memory limits,
`A Kubernetes cluster can be divided into namespaces. Once you have a namespace that has a default memory limit, and you then try to create a Pod with a container that does not specify its own memory limit, then the control plane assigns the default memory limit to that container.`  

### Resource Limits can Be describe in LimitRange definition files

#### Memory
Here is a memory LimitRange example for a pod. [K8s Memory units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes) are describe bytes- integers with quantity suffixes of:
- E 
- P
- T
- G
- M
- k 
- Ei
- Pi
- Ti
- Gi
- Mi
- Ki

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
Here is a CPU LimitRange example for a pod. K8s CPU units of measurement are equivelant to 1 physical cpu core, or 1 virtual core - depending on the host env type. The below def file describes:
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