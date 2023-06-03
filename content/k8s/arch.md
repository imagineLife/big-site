---
title: K8s Architectural Concepts
parentDir: k8s
slug: k8s/architecture-overview
shortSlug: architecture-overview
author: Jake Laursen
excerpt: Parts of Kubernets - Nodes, Clusters, API Server, and more!
tags: ["Kubernetes", "k8s", "nodes", "clusters", "diagram"]
order: 2
---
# Kubernetes Concepts
- [Kubernetes Concepts](#kubernetes-concepts)
  - [Be Tedious](#be-tedious)
  - [Nodes](#nodes)
  - [Clusters](#clusters)
  - [A Master Node](#a-master-node)
  - [Worker Nodes](#worker-nodes)
    - [Worker Kubelets Manage Pod Resource Access](#worker-kubelets-manage-pod-resource-access)
    - [Worker Kube Proxy Manages Networking](#worker-kube-proxy-manages-networking)
  - [Components](#components)
    - [API Server](#api-server)
    - [ETCD Key Store](#etcd-key-store)
    - [Kubelet](#kubelet)
    - [Container Runtime](#container-runtime)
    - [Controllers](#controllers)
    - [Scheduler](#scheduler)
  - [Kubectl](#kubectl)
  - [Other Terminology](#other-terminology)
    - [Control Plane Node](#control-plane-node)
    - [Watch Loops](#watch-loops)
    - [DaemonSet](#daemonset)
    - [Cluster-Wide Tooling Not Available](#cluster-wide-tooling-not-available)
    - [Kube-ApiServer](#kube-apiserver)
    - [Kube-Scheduler](#kube-scheduler)
  - [Getting Started](#getting-started)
  - [A Diagram](#a-diagram)

With Kubernetes, one of the primary goals is to...
- deploy app(s)
- in containers
- on machines
- configured as "worker nodes" in a cluster

K8s does not deploy containers directly on a worker node, though.  
Containers are encapsulated in [pods](/k8s/on-pods): single instances of an app or suite of tightly-coupled apps. Pods are the smallest object that can be created/managed in K8s.  

Containers in a pod run in parallel by default.  

## Be Tedious
Be extremely attentitive to details - slow down and nail all the bits in any "directions" given to create and/or interact with a cluster 
- ports
- names of objects (_pods, containers, volumes, secretsm env var names, etc_)

## Nodes
A node is a machine, physical or virtual, where K8s is installed. Nodes might be known as minions.  

## Clusters
A cluster is a set of nodes. Clusters are helpful for load management, replication, and handling single-node failure.  

## A Master Node
A Node with K8s installed.  
This node "watches" && manages other nodes in a cluster.  
The master server has the kube API server on it. This "talks to" the kubelet tool on the worker nodes.
All info about the worker nodes is stored on the master with the etcd component/service.  
THe master has both the controller and scheduler on it.

## Worker Nodes
- contain the container runtime, docker here
- contain containers
- run the kubelet && kube-proxy

Minions. These host the container runtimes and containers. 
These have the kubelet agent on them, which is used to interact with the master node.  

### Worker Kubelets Manage Pod Resource Access
When a pod requires access to `storage`, or `secrets`, or `configMaps`, kubelet makes the access happen.  
Kubelet also "talks to" the kube-apiserver for registering the pod's state.  

### Worker Kube Proxy Manages Networking
Manages networking by using IpTables entries.  
Monitors services & endpoints wuth the userspace mode.  

## Components
Installing Kubernetes is installing some "components".
### API Server
- the "frontend" for K8s
- allows interaction w/ k8s cluster
- cli talks to api server to talk to the cluster
### ETCD Key Store
- stores data to manage the cluster
- a distributed reliable key-value store
- responsible for implementing logs within clusters to alleviate any potential conflicts between master nodes
- etcd stores info in ALL NODES IN THE CLUSTER

### Kubelet
- the agent that runs on each node in a cluster
- makes sure the containers are running as expected

### Container Runtime
- will prob be docker
- others exist!

### Controllers
- the "brain" behind orchestration
- "notice" when containers stop working
- starts new containers

### Scheduler
- Distributes work & containers across nodes
- looks for new containers && assigns them to notes

## Kubectl
A kube command-line tool.  
Used to deploy + manage kubernetes apps on a K8s cluster: 
- get cluster info
- get info about pods, services, etc

```bash
# deploy an app on a cluster
kubectl run hello-minikub

# see info about the cluster
kubectl cluster-info

# list the nodes in the cluster
kubectl get nodes
```

## Other Terminology

### Control Plane Node
The K8s master runs servers and manager processes for the cluster: the kube-apiserver, etc. 
### Watch Loops
another name for controllers.  

### DaemonSet
Ensures that all nodes run a copy of a pod.  
Interesting!  
An example DaemonSet config file, lifted from the [K8s Docs](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/):   
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-elasticsearch
  namespace: kube-system
  labels:
    k8s-app: fluentd-logging
spec:
  selector:
    matchLabels:
      name: fluentd-elasticsearch
  template:
    metadata:
      labels:
        name: fluentd-elasticsearch
    spec:
      tolerations:
      # these tolerations are to have the daemonset runnable on control plane nodes
      # remove them if your control plane nodes should not run pods
      - key: node-role.kubernetes.io/control-plane
        operator: Exists
        effect: NoSchedule
      - key: node-role.kubernetes.io/master
        operator: Exists
        effect: NoSchedule
      containers:
      - name: fluentd-elasticsearch
        image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2
        resources:
          limits:
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 200Mi
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
      terminationGracePeriodSeconds: 30
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
```

### Cluster-Wide Tooling Not Available
Fluentd, a CNCF project, is used for cluster-wide logging.  
Prmetheus is often used to gather metrics from nodes & sometimes apps.  

### Kube-ApiServer
Central to a K8s Cluster.  
Handles all calls, actions, validations, etc, both internally and externally.  
This is the only agent connected to the etcd db.  

### Kube-Scheduler
Determines which node(s) host which pod(s).  
Tries to view resource availability.  

## Getting Started
`kubeadm init` and `kubeadm join` are 2 commands that work to help setup kubernetes on some nodes.  
[kubernetes "implementation details" docs](https://kubernetes.io/docs/reference/setup-tools/kubeadm/implementation-details/) give more on the notes in this doc:
- be secure (_including RBAC and security keys, etc_)
- be user-friendly to setup a kubernetes cluster
- `/etc/kubernetes` is an important directory to find manifests and more

## A Diagram
```myMermaid
flowchart
  direction LR
  KCM["kube-controller-manager"]
  KSC["kube-scheduler"]
  KAS["kube-apiserver"]
  KLT[["kubelet"]]
  KPX["kube-proxy"]
  ETC["etcd"]

  KLT2[["kubelet"]]
  KPX2["kube-proxy"]
  DCK["docker/cri-o"]
  IPT["iptables/ipvs"]

  subgraph CPN["control plane (cp) node"]
    KLT -.->KPX 
    
    KAS --> KCM
    KAS --> KSC
    KAS --> KLT
    KAS --> ETC
  end

  subgraph WKN1["worker node 1"]
    KAS -..-> KLT2
    KAS -..-> KPX2

    KLT2 --> DCK
    KPX2 --> IPT
  end
```