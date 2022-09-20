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