---
title: Allow Communication between Host and Pod with the NodePort Service
parentDir: k8s
slug: k8s/networking-intro/node-port-service
shortSlug: node-port-service
author: Jake Laursen
excerpt: Allow External network connectivity to a Kubernetes service
tags: ["Kubernetes", "k8s", "services", 'nodeport']
order: 9
---

# Node Port
The NodePort service is...
- an object
- lives in a  node
- listens to ports on the node
- fwds req from a port on the node to a port the pod
- allows for pod-access from "outside" the k8s world
- useful for leveraging a pre-existing static IP (_maybe opened by a security team through a firewall_)

- [Node Port](#node-port)
  - [External Communicaton](#external-communicaton)
  - [Node Port Overview](#node-port-overview)
    - [Handling Multiple  Pods](#handling-multiple--pods)
    - [Creating a Node Port Service from yaml](#creating-a-node-port-service-from-yaml)
  - [NodePort Service in action](#nodeport-service-in-action)


## External Communicaton
Take an example:
- **a container**, in
- **a pod,** with an internal pod network and IP (_lets say 10.244.0.2 that is in a range of 10.244.0.0-2XX or something_) in
- **a node** with an IP (_lets say 192.168.1.2_)
- **a service** in the node, the node port service
  - the service is an object
  - listens to ports on the node
  - fwds req from a port to a port the pod
  - **its a node port service**
- **my laptop** with an ip (_lets say 192.168.1.10_)
- NOTE: the laptop and the node have the same network

## Node Port Overview
3 ports are involved: the target port, the port, and the node port
- **the target port**, the pod port
  - where a web-server could be running
  - where the service forward the req to
- **the port**, the port on the service
  - has its own ip address, the **cluster ip of the service**
- **the node port**, the port on the node
  - the only allowed valid range for these node ports is between 30000-32767

### Handling Multiple  Pods
A single Node can have multiple pods, instances, of an app. The pods have the same labels.  
The service finds X number of pods.  
The service uses them all.  
The service uses
- `random` algorithm
- `sessionAffinity` too

Multiple Nodes can each have a pod.  
K8s will create the service to span multiple nodes.  
The app in pods in separate nodes will be accessible.  

Basically, the service-creation process is the same wether many pods in a node or many nodes each with a pod.  

### Creating a Node Port Service from yaml
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
      # 30000-32767 is the "allowed" range
      nodePort: 30008
  # THIS identifies the pod that the service should connect to
  # same labels as the pod
  selector:
    app: myapp
    type: front-end
  # THIS is to deal with k8s in docker with minikube
  externalIPs:
    - 1.2.3.110
```
NOTES:
- the `port` is the only required fieeld in the `ports` section
  - with no `targetPort`, k8s uses the same val in `port`
  - with no `nodePort`, k8s picks arbitrarily between 30000-32767
- labels & selectors link services to pods
  - `selector:<label>:<val>` where label + val are exactly the smae as pod labels+values
  - **THIS is what associates a service with pods** directly - the pod and service have matching labels
- `ports` is an array
  - can have a bunch of port mappings in a single service
- the `externalIPs` was a note to get the service available through docker


```bash
# Run it
kubectl create -f service-def.yml

# check it
Jakes-4:k8s Jake$ kubectl get services
NAME                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes          ClusterIP   10.96.0.1       <none>        443/TCP        6d
node-port-service   NodePort    10.97.106.144   1.2.3.110     80:30004/TCP   45h

# get the app!
# use the ip of the node
curl 
```

## NodePort Service in action
The scenarion:  
A deployment is up and running.  
There are many pods up & running, as part of the `replicas` definition in the deployment.  
See & use the [services definition file above](#creating-a-node-port-from-yaml).  

```bash
# Run it  
Jakes-4:k8s Jake$ kubectl create -f configs/services/nodeport.yml 
service/node-port-service created

# new, check on services
# NOTE: one service is k8s itself on the host laptop
Jakes-4:k8s Jake$ kubectl get svc
NAME                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes          ClusterIP   10.96.0.1       <none>        443/TCP        3d17h
node-port-service   NodePort    10.100.158.27   <none>        80:30008/TCP   27s
```