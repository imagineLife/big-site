---
title: Why "Containers"? What are they? What do they do?
parentDir: docker
slug: docker/why-containers
author: Jake Laursen
excerpt: Summarizing Containers, VMs, and Virtualization
tags: Docker, containers, serverss, virtualizaton
order: 1
---

# Virtualizing Servers
## Servers Here, Server There, Servers Everywhere
As a "full-stack" (_how "full" is the stack, really?!_) developer, working with servers is constant, dynamic, and complex. Systems are complex: maybe 1 "service" sends emails, while another stores user-application data, and maybe another stores user authentication data. Maaybe another one or two are "cache" layers between apis and data stores.  

## Virtual Machines
Virtual Machines (_vms_) are a type of software that emulates hardware and the OS: CPU, RAM, Disk, Networking, etc.  

## Containers
Unlike VMs, containers don't include as much content. Containers don't include a complete OS.  
Containers are more "light-weight". This won't cover an in-depth comparison between VMs and containers. I'm also not an expert in those details.  
Containers are significantly smaller than VMs, significantly simpler to work with than VMs, and containers leverage tools like docker or podman or containerd or something else.  
Container have large open-source and third-party-supported ecosystems of pre-built containers, called images (_more on that in a different post_).  