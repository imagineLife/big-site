---
title: Include Docker Container Security Instructions In Kubernetes Pod Definition Files
parentDir: k8s/in-depth
slug: k8s/in-depth/security-with-containers
shortSlug: security-with-containers
author: Jake Laursen
excerpt: 
tags: ["Kubernetes", "k8s", "Security", "Docker", "Users", "Privileges"]
order: 6
---

# Docker Security Details to Know
A host has docker installed on it.  
This host has processes running on it.  
Say, for an example, a docker container is running that just .... runs sleep for some time.  

- [Docker Security Details to Know](#docker-security-details-to-know)
  - [Root Users Can Do Anything](#root-users-can-do-anything)
  - [Docker Containers Relate to the Host](#docker-containers-relate-to-the-host)
  - [Setting Docker Container Security Settings](#setting-docker-container-security-settings)
  - [Things to be able to do](#things-to-be-able-to-do)
  - [The Deprecated PSP](#the-deprecated-psp)

## Root Users Can Do Anything
Linux has users.  
The root type users can do lots of things:
- chown
- dac
- kill
- setfcap
- setgid
- setuid
- net_bind
- net_raw
- broadcast
- net_admin
- sys_admin
... and a bunch more


## Docker Containers Relate to the Host
Containers are isolated by namespaces in linux: containers have their own namespace on the host.  
Containers can only see their own processes - none outside its scope on the host.  

Processes listed on the host do, indeed, show the docker processes.  
Processes listed in the docker box only show it's "internal" processes.  

The Docker host has users: root and others.  
Docker runs as root on the host by default.  
The host user that runs docker can be set in the docker run command:
```bash
docker run --user=1000 alpine sleep 100000
```

Docker implements security features to limit the container's root user.  

By default, containers have limited capabilities - not full root capabilities. More abilities can be set during the `docker run` command:
```bash
docker run --cap-add NET_ADMIN alpine sleep 20000
```

## Setting Docker Container Security Settings  
[K8s docs on the topic](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
- The description of security constrainst is called a "security context" and leverage the `securityContext` setting in yaml defintions
- security contexts can be set on a pod and on a container
- linux settings are set at the container level

Pod-Level Settings:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod
spec:
  containers:
    - name: alpine
      image: alpine
      command: ["sleep", "200000"]
  # THIS! sibline of containers line
  # security at the pod level
  securityContext:
    # set user ID on the pod
    runAsUser: 1000
```

Container-Level Settings:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod
spec:
  containers:
    - name: alpine
      image: alpine
      command: ["sleep", "200000"]
      # THIS! sibline of container args lines
      # security at the container level
      securityContext:
        runAsUser: 1000
        # AND the container-level can include specific capability deets
        capabilities:
          add: ["MAC_ADMIN"]
```


## Things to be able to do
- figure out what pod-level user runs a command
- be abled to edit a pod's user ID
- be able to parse settings set at bot the container and pod level:
  - in the below yaml...
    - the "web" container runs as user 1002
    - the "sidecar" container runs as user 1001
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-pod
spec:
  securityContext:
    runAsUser: 1001
  containers:
  -  image: ubuntu
     name: web
     command: ["sleep", "5000"]
     securityContext:
      runAsUser: 1002

  -  image: ubuntu
     name: sidecar
     command: ["sleep", "5000"]
```

## The Deprecated PSP
[K8s docs on the deprecation](https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future/).  
This was used to set security details on pods.  