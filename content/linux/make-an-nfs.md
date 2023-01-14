---
parentDir: linux
title: Create an NFS server
slug: linux/create-an-nfs
author: Jake Laursen
excerpt: Leverage a few commands in a linux environment to share files across a network
tags: ["linux", "bash", "nfs", "server"]
order: 24
---

# Create an NFS Server In Linux
NFS ["_allows a system to share directories and files with others over a network. By using NFS, users and programs can access files on remote systems almost as if they were local files_"](https://ubuntu.com/server/docs/service-nfs).  

## Some Steps
- update apt
```bash
sudo apt-get update
```
- install the nfs-kernel-server
```bash
sudo apt-get install -y nfs-kernel-server
```
- start the server
```bash
sudo systemctl start nfs-kernel-server.service
```