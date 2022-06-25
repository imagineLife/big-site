---
title: An Overview of K8s Setup
parentDir: k8s
slug: /k8s/setup-overview
author: Jake Laursen
excerpt: A few different options for setting up K8s
tags: Kubernetes, K8s, setup
order: 3
---
# Building A Kubernetes Cluster
There are many tools around for running Kubernetes - so many that [special interest groups (SIGs)](https://kubernetes.io/blog/2016/08/sig-apps-running-apps-in-kubernetes/) have been around supporting the development and operations of Kubernetes.  

- [Building A Kubernetes Cluster](#building-a-kubernetes-cluster)
  - [Clusters On A Single Host](#clusters-on-a-single-host)
    - [minikube](#minikube)
    - [kind](#kind)
    - [K3s](#k3s)
    - [microk8s](#microk8s)
    - [kubeadm](#kubeadm)
  - [Hosted](#hosted)
  - [Browser-Ready](#browser-ready)
  - [Minikube In-Depth](#minikube-in-depth)
    - [Minikube on an M1 with Docker](#minikube-on-an-m1-with-docker)
## Clusters On A Single Host
A Laptop. A VM.  
[Here's](https://shipit.dev/posts/minikube-vs-kind-vs-k3s.html) one comparison of cluster tools.  

### minikube
A SIG project.  
Spawns a VM, "...essentially a single node K8s cluster".  
Can be used on all major OS.
```bash
minikube start
# ...wait...

kubectl

# try this for a gui-driven overview of the cluster
minikube dashboard
```

### kind
A SIG project.  
The cluster that kind starts is in docker containers.  

```bash
kind create cluster
# ...wait...

# load a local image into a cluster
kind load docker-image image-name:tag-version
```

### K3s
Built by [Rancher Labs](https://rancher.com).  
This is a mini kubernetes.  
Uses sqlite instead of etcd3.  
This seems, perhaps, best run in containers & not directly on the host - leverage the [racher/k3s](https://hub.docker.com/r/rancher/k3s) image.  
K3s has auto-deployment: deployable manifests+charts, watches for changes, and applies changes automagically.  

### microk8s
Cannonical. ubuntu. K8s.  
Single &/or multi-node cluster.  

### kubeadm
Seems like a mvp k8s setup supported directly by [kubernetes.io](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)?!  


## Hosted
GCP. AWS. Microsoft Azure.  
These all support cloud-hosted k8s clusters.  

## Browser-Ready
kodekloud.com

## Minikube In-Depth
Minikube gives a single-node k8s cluster in a docker image.  
Requires:  
- a hypervisor
  - prob will use virtualbox
- kubectl
- minikube.exe  

Some Tools to checkout && potentially download:
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)  
- [MiniKube](https://kubernetes.io/docs/tasks/tools/install-minikube/)  
  - when using minikube with a virtualization tech, use a flag on startup: `minikube start --vm-driver=<driver-name>` ([docs here](https://kubernetes.io/docs/setup/learning-environment/minikube/#specifying-the-vm-driver))


### Minikube on an M1 with Docker
Install Docker.  
Download && install minikube:
```bash
# download
# ~73MB for me
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64
# NOTE: the -L flag tells curl to follow any url relocation 
# NOTE: the -O flag tells curl to save the output to a similarly-named file that it found

# install 
sudo install minikube-darwin-arm64 /usr/local/bin/minikube
```

Run minikube
```bash
minikube start --driver=docker --alsologtostderr
# this took some time...with a bunch of logs
```

See a new docker container running!
```bash
docker container ls -a
```
should show 1 with
- image of `gcr.io/k8s-minikube/kicbase:vX.X.XX`
- name of `minikube`
- ports... a bunch of ports...
  - `0.0.0.0:57832->22/tcp` 
  - `0.0.0.0:57828->2376/tcp`
  - `0.0.0.0:57830->5000/tcp`
  - `0.0.0.0:57831->8443/tcp`
  - `0.0.0.0:57829->32443/tcp`