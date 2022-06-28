---
title: On Services
parentDir: k8s
slug: /k8s/intro-to-services
author: Jake Laursen
excerpt: Only an Intro
tags: Kubernetes, K8s, services
order: 8
---

# Services
K8s services enable communication between components.  
Inside and outside an single.  
I.E. - groups of pods where...
- some are frontends
- some are "backends"
- some connect to data sources
Services help with communication, with loose coupling between components.  

## Types of Services
### Node Port
- an object
- lives in a  node
- listens to ports on the node
- fwds req from a port to a port the pod
- allows for pod-access from "outside" the k8s world

### Cluster IP 
- creates a virtual ip in a cluster
- lives in a cluster
- enables communication between services

### Load Balancer
- provisions a load-balancer
- distribute load across servers

## External Communicaton
- a container, in
- a pod, with an internal pod network and IP (_lets say 10.244.0.2 that is in a range of 10.244.0.0-2XX or something_) in
- a node with an IP (_lets say 192.168.1.2_)
- **a service** in the node, the node port service
  - the service is an object
  - listens to ports on the node
  - fwds req from a port to a port the pod
  - **its a node port service**
- my laptop with an ip (_lets say 192.168.1.10_)
- NOTE: the laptop and the node have the same network

Get access to the pods webpage
- ssh into the k8s node
  - get to the pod address (_10.244.0.2_)

### Node Port in depth
3 ports are involved
- the pod port, **the target pport**
  - where a web-server could be running
  - where the service forward the req to
- the port on the service, **the port**
  - has its own ip address, the **cluster ip of the service**
- the port on the node, **the node port**
  - example range between 30000-32767

#### Creating a Node Port from yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-port-service
spec:
  type: NodePort
  ports:
      # pod port
    - targetPort: 80
      # service port on pod-side 
      port: 80
      # service
      nodePort: 30008
  selector:
    # same labels as the pod
    app: myapp
    type: front-end
```
NOTES:
- the `port` is the only required fieeld in the `ports` section
  - with no `targetPort`, k8s uses the same val in `port`
  - with no `nodePort`, k8s picks arbitrarily between 30000-32767
- labels & selectors link services to pods
  - `selector:<label>:<val>` where label + val are exactly the smae as pod labels+values