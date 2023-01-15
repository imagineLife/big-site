---
title: On Services
parentDir: k8s
slug: k8s/intro-to-services
author: Jake Laursen
excerpt: Only an Intro
tags: ["Kubernetes", "k8s", "services"]
order: 8
---

# Services
K8s services enable communication between components within and outside of K8s apps.    
I.E. - groups of pods where...
- some might be "frontends"
- some might be "backends"
- some connect to data sources
- some might be service-oriented
**Services help with communication, with loose coupling between components.**   

- [Services](#services)
  - [Types of Services](#types-of-services)
    - [Node Port](#node-port)
    - [Cluster IP](#cluster-ip)
    - [Load Balancer](#load-balancer)
  - [External Communicaton](#external-communicaton)
  - [A Method For Setting Up A Cluster And Services](#a-method-for-setting-up-a-cluster-and-services)
  - [Services Use Selectors](#services-use-selectors)
  - [Use kubectl expose to create a service for a deployment](#use-kubectl-expose-to-create-a-service-for-a-deployment)
  - [Services can be made without selectors](#services-can-be-made-without-selectors)
  - [Things To Do](#things-to-do)
## Types of Services
### Node Port
A NodePort service...
- is an object
- lives in a  node
- listens to ports on the node
- fwds req from a port to a port the pod
- allows for pod-access from "outside" the k8s world
- makes the pod available via a port on the node

### Cluster IP 
The ClusterIP Service...
- creates a virtual ip in a cluster
- lives in a cluster
- enables communication between services

### Load Balancer
LoadBalancer services...
- provision a load-balancer
- i.e distribute load across servers

## External Communicaton
Lets take...
- **a container**, in
- **a pod**, with an internal pod network and IP (_lets say 10.244.0.2 that is in a range of 10.244.0.0-2XX or something_) in
- **a node** with an IP (_lets say 192.168.1.2_)
- **a service** in the node, the node port service
  - the service is an object
  - listens to ports on the node
  - fwds req from a port to a port the pod
  - **its a node port service** (see [A Page on NodePorts](/k8s/node-port-service))
- **my laptop** with an ip (_lets say 192.168.1.10_)
- NOTE: the laptop and the node have the same network

A K8s service, specifically the NodePort service, can "map" the outside world request to internal objects - pods.

## A Method For Setting Up A Cluster And Services
Here's one way to go about developing pods, replica sets, deployments, and services:  
1. Create [Deployments](/k8s/on-deployments) of pods && replica sets
2. Create [ClusterIP Services](/k8s/cluster-ip-service) to manage communication between nodes
3. Create [LoadBalancer Services](/k8s/load-balancer-service)


## Services Use Selectors
Services use selectors to "know" which k8s objects to connect to.  
Two types of selectors work:
- equality-based
  - by label key/value pair
- set-based
  - like `in`, `notin`, `exists`

## Use kubectl expose to create a service for a deployment
```bash
kubectl get deployments
# say there's a deployment called frontend

# create the service for the deployment!
kubectl expose deployment/frontend --port=80 --type=NodePort

kubectl get svc frontend -o yaml
# will return a yaml def of the service!
```
Expose can take some args:
- port
- targetPort

## Services can be made without selectors
Perhaps a deploymenet is not ready, but the goals of the service are ready.  
Create the service without the deployment.  
Services could also "point to" another service! interesting. 

## Things To Do
- get how many services exist in a namespace
- id the...
  - service type of a service
  - TargetPort of the service
  - labels of a service
  - id how many endpoints are attached to a service
- create a NodePort service with...
  - a name
  - the right type
  - targetport of 8080
  - nodePort of 30080
  - selecting pods with the label `name: simple-webapp`