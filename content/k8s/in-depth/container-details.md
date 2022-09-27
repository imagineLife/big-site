---
title: Container tooling develops
parentDir: k8s/in-depth
slug: k8s/in-depth/containers-and-more
author: Jake Laursen
excerpt: Docker has led to many other container details 
tags: Kubernetes, K8s, containers, docker, OCI
order: 33
---

# An Overview Of Containers And Containerizing Options
Containers.  
"OS-like" pieces of code that are intended to "wrap" things like applications, functionalities, programs, databases, etc.  

- [An Overview Of Containers And Containerizing Options](#an-overview-of-containers-and-containerizing-options)
  - [Kubernetes Used Docker](#kubernetes-used-docker)
  - [Containers Need Container Runtimes](#containers-need-container-runtimes)
  - [There Are A Bunch Of Container Tooling Options](#there-are-a-bunch-of-container-tooling-options)

## Kubernetes Used Docker
Kubernetes used docker, exclusively, as the container tool. Recently, kubernetes [announced plans to move away from dockershim as the default](https://kubernetes.io/blog/2022/01/07/kubernetes-is-moving-on-from-dockershim/).  

## Containers Need Container Runtimes
The Runtime runs the containerized "applications".  
[Docker Engine](https://docs.docker.com/engine/) is a runtime.  
[containerd](https://containerd.io) is another.  

## There Are A Bunch Of Container Tooling Options
[THis Github repo has a bunch](https://github.com/containers).  


