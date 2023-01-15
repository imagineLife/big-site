---
title: Container tooling continues to develop
parentDir: k8s/in-depth
slug: k8s/in-depth/containers-and-more
author: Jake Laursen
excerpt: Docker has led to many other container details 
tags: ["Kubernetes", "k8s", "containers", "docker", "OCI"]
order: 33
---

# An Overview Of Containers And Containerizing Options
Containers.  
"OS-like" pieces of code that are intended to "wrap" things like applications, functionalities, programs, databases, etc.  

- [An Overview Of Containers And Containerizing Options](#an-overview-of-containers-and-containerizing-options)
  - [Kubernetes Uses Containers](#kubernetes-uses-containers)
    - [Kubernetes Relied On Docker](#kubernetes-relied-on-docker)
  - [Containers Need Container Runtimes](#containers-need-container-runtimes)
    - [Kubelet Has An Interface For Container Runtimes](#kubelet-has-an-interface-for-container-runtimes)
  - [There Are A Bunch Of Container Tooling Options](#there-are-a-bunch-of-container-tooling-options)
    - [Docker](#docker)
    - [containerd](#containerd)
    - [CRI-O](#cri-o)
    - [rkt](#rkt)
  - ["Containerizing" an App](#containerizing-an-app)
    - [An Overview Of Containerizing an App](#an-overview-of-containerizing-an-app)
    - [An Overview of using images in K8s](#an-overview-of-using-images-in-k8s)

## Kubernetes Uses Containers
Each k8s node needs a container runtime on it.  
Kubelet launches pods, which include containers, and every node that can run a pod (_which is most likely all nodes_) needs the container runtime to run the containers that live in the pods.
### Kubernetes Relied On Docker
Kubernetes used docker, exclusively, as the container tool. Recently, kubernetes [announced plans to move away from dockershim as the default](https://kubernetes.io/blog/2022/01/07/kubernetes-is-moving-on-from-dockershim/).  

## Containers Need Container Runtimes
The Runtime runs the containerized "applications".  
[Docker Engine](https://docs.docker.com/engine/) is a runtime.  
[containerd](https://containerd.io) is another.  

### Kubelet Has An Interface For Container Runtimes
The [Container Runtime Interface(CRI)](https://kubernetes.io/docs/concepts/architecture/cri/) is a "plugin" that kubelet uses to "talk to" the various container runtimes.  

## There Are A Bunch Of Container Tooling Options
[THis Github repo has a bunch](https://github.com/containers).  

### Docker
Perhaps the longest-used container tool on the market.  
It has grown in scope since it started - swarm, a desktop gui, the compose cli, etc.  
Docker's increase in size, scope, and even $$ requirements, have led to other open-source tooling to be developed and relied on.

### containerd
This tool is modular and "low-level".  Per the github readme, it [_"...is available as a daemon for Linux and Windows, which can manage the complete container lifecycle of its host system..."_](https://github.com/containerd/containerd). This seems like a specialed tool for folks who will be tinkering with more than just building/running/deploying applications.

### CRI-O
[CRI-O](https://github.com/cri-o/cri-o) looks like it is meant to be a one-size-fits-all interface between "_... OCI conformant runtimes and the Kubelet_". This does not currently use or offer a usable CLI.

### rkt
[rkt](https://github.com/rkt/rkt), pronounced "rocket", has ceased dev/maintenance efforts.  

## "Containerizing" an App
The more "stateless" the project, the easier it will be to "containerize" the project.  
Imagine deploying the app on several hosts & identify changable "dependencies". These dependencies should be stored "outside" of the "containerized" app.  
Key "dependencies" to consider when preparing an app for containerization:
- os versions (alpine, alpine 1.x, etc)
- code language version (node v 14, 16, 18, etc)
- reliant application connection parameters
  - a database url might be unique per env (_development, testing, production, red/blue, canary, etc_)
  - a logging service may be different
  - a memory store
  - security mechanism strength may vary


In K8s, these environment-based variables (env vars) can be stored in [ConfigMaps Or Secrets](/k8s/in-depth/env-vars).  

Docker creates containers.   

[buildah](https://github.com/containers/buildah) creates containers. This even works with dockerfiles.  

[podman](https://github.com/containers/podman) creates containers.  

### An Overview Of Containerizing an App
- **create a dockerfile**
  - this holds the directions for docker to turn the repo into an image
- **build the instructions to containerize the app**
  - these instructions go in the dockerfile
  - for something like a rest api, start with a trusted "base" image (node), copy the api's needed files, add a run command (_these details are out of scope for this_)
- **turn the project into an image**
  - the image gets used and ran later on
  - this is a unit that is usable by a container runtime
  - tag the image - deets elsewhere on tagging
- **send the image to an image repo** for you & others to use
  - dockerhub exists
  - for some trade-offs, hosting our own image repo can work:
    - less network traffic
    - less content available to the web (and/or less fees for others to maintain the repo)
    - more internal administration (how long do we keep images around?)
    - more security

### An Overview of using images in K8s
```bash
kubectl create deployment my-deployment --image=my-repo/my-api:1.0.1
```
- tell kubectl 
  - the name of the image to use 
  - the tag of the image to use
  - the name of the docker image registry to use
