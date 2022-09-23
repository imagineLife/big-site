---
title: Run Kubernetes on 2 Virtual Machines in Google Cloud
parentDir: k8s/in-depth
slug: k8s/in-depth/k8s-on-gce-vms
author: Jake Laursen
excerpt: A Follow-Along set of notes ony setting Kubernetes up across 2 VMs in Google Cloud
tags: Kubernetes, K8s, GCE, VMs
order: 32
---

# Leveraging Google Cloud to Run Kubernetes 
Here, some stream-of-consciousness and follow-along notes through a process of levering Google's google cloud setup to...
- build 2 vms
  - set one up as a k8s controlplane node
  - set one up as a k8s worker node

- [Leveraging Google Cloud to Run Kubernetes](#leveraging-google-cloud-to-run-kubernetes)
  - [VM Hardware, OS, and Networking Configurations](#vm-hardware-os-and-networking-configurations)
    - [GCE Config Details](#gce-config-details)
  - [VM K8s Setup](#vm-k8s-setup)
    - [SSH Into the Machine](#ssh-into-the-machine)
    - [Perhaps a Screeching Halt](#perhaps-a-screeching-halt)
    - [A Run-Around on Setting up K8s for a control Plane Node](#a-run-around-on-setting-up-k8s-for-a-control-plane-node)

## VM Hardware, OS, and Networking Configurations
Here are some per-vm config details to consider:
- 2 CPUs
- 8GB of Ram - a reasonably low amount
- 25GB of disk on the "master" controlplane node
- should be accessible by ss (_and potentially http and https, we'll get there_)


### GCE Config Details
During my setup
- E2 series
- e2-standard-2 (_2 vCPU, 8 GB memory_)
- Automatic CPU Platform
- Boot Disk: 25gb, ubuntu 20.xx (_LTS_)
- Allowing some firewall details
- allow access to some cloud apis
- bunch of other details I did not care about, shot in the dark a bit here
- i named my "cp" to resemble "controlplane"
## VM K8s Setup
Once the vm is "setup" by gce, ssh into the machine.

### SSH Into the Machine
- navigate to the gce "console": This can be cumbersome and complicated if you've "messed around" a bit with this GCE setup - mine is a "compute engine"
- There will be a left-hand nav bar with "VM instances" - click that to see a "list" of vms... should be this one 
- find the "row" that lists this single vm && find the `Connect` header - there should be a bold `SSH` in there - click that!!
- a new window popped up on mine after waiting a few seconds - thought the thing was broken

### Perhaps a Screeching Halt
Give the [kubernetes docs](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) a shot at installing K8s on a GCE VM.  
I followed some other directions.  

### A Run-Around on Setting up K8s for a control Plane Node
Download a bunch of needed tooling:
- kubelet 
- kubeadm 
- kubectl
- probably a few more bits too

More:
- Update the networking to allow traffic between soon-to-be-innards
- Install, setup, and start containerd
- initialize the controlplane node with [kubeadm init](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/)
  - consider using the [`--pod-network-cidr` cli option](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#options) to specify a range of IPs for the pod network
- Setup the kubernetes root user
  - per the ["Create a cluster with kubeadm" docs, in the "More Information" section](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#more-information)  

```bash
# make a dir to store the kube config file
mkdir -p $HOME/.kube


sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
- consider some extra bits
  - a pod networking tool (_something like calico_)
  - helm ([the kubernetes "package manager"](https://helm.sh/))