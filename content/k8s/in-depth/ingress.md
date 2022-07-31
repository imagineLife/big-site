---
title: Ingress
parentDir: k8s/in-depth
slug: k8s/in-depth/ingress
author: Jake Laursen
excerpt: Ingress
tags: Kubernetes, K8s
order: 18
---

# Ingress

## Consider a Mock App Example
### An App
An app, maybe an online e-commerce platform.  
Build it into a docker img.  
Deploy it on a K8s Pod, in a K8s Deployment object.  

### A DB And A Service To Allow the Two to Talk
The db needs a db, so a db gets built.  
A new Pod gets deployed on the same node.  
The App pod needs to talk to the db, so a new K8s service gets created to allow this pod-to-pod communication.  
```mermaid
flowchart TD
  %%
  %%  Nodes
  %%

  APP((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]

  subgraph K8["K8s Node"]
    direction TB
    APP --> DBS
    DBS --> DB
  end
```

### Make it Available with a NodePort Service
Another service is made, a NodePort service, that opens the app to the world via a url+port, at something like http://<the-k8s-node-ip>:<the-nodePort-port>.  

```mermaid
flowchart TD
  %%
  %%  Nodes
  %%
  USER[End-User]

  NPS[[NodePort Service: port 38080]]
  APP((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]

  subgraph K8["K8s Node"]
    direction TB
    NPS --> APP
    APP --> DBS
    DBS --> DB
  end
  
  

  USER -- "www.k8s-node-ip:38080" --> K8
  K8 --> NPS
```

### Address App Scaling Needs With ReplicaSets
Once Traffic gets busy enough, build a ReplicaSet to scale the App pods. the NodePort service will split traffic between the replicated pods.  
```mermaid
flowchart TD
  %%
  %%  Nodes
  %%
  USER[End-User]

  NPS[[NodePort Service: port 38080]]
  APP((Web-App Pod))
  APP2((Web-App Pod))
  APP3((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]

  subgraph RS [ReplicaSet]
    APP
    APP2
    APP3
  end

  subgraph K8["K8s Node"]
    direction TB
    NPS --> RS
    RS --> DBS
    DBS --> DB
  end
  
  

  USER -- "www.k8s-node-ip:38080" --> K8
  K8 --> NPS
```

### Allow For Friendly URL with DNS Config
Configure the dns server in use to redirect `my-demo-app.com` to `<the-k8s-node-ip>`. Now, users can access the app at http://my-demo-app.com:<the-nodePort-port>`.  

```mermaid
flowchart TD
  %%
  %%  Nodes
  %%
  USER[End-User]
  
  DNS[[DNS: demo-app to k8s-node-ip]]

  NPS[[NodePort Service: port 38080]]
  APP((Web-App Pod))
  APP2((Web-App Pod))
  APP3((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]
  
  

  subgraph RL["(routing logic)"]
    DNS
  end

  subgraph RS [ReplicaSet]
    APP
    APP2
    APP3
  end

  subgraph K8s Node
    direction TB
    NPS --> RS
    RS --> DBS
    DBS --> DB
  end
  
  

  USER -- "www.demo-app.com:38080" --> RL
  RL --> NPS
```

### Remove the Need For the Port in the URL with A Proxy Server
Configure a proxy-server to sit between the world and the DNS, so that the world can access the url without the port.  
The Proxy server will forward port 80 (_open ot the world_) to the nodePort service port.  
```mermaid
flowchart TD
  %%
  %%  Nodes
  %%
  USER[End-User]
  
  PXY[[Proxy-Server: port 80 to 38080]]
  DNS[[DNS: demo-app to k8s-node-ip]]

  NPS[[NodePort Service: port 38080]]
  APP((Web-App Pod))
  APP2((Web-App Pod))
  APP3((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]

  subgraph RL["(routing logic)"]
    PXY --> DNS
  end

  subgraph RS [ReplicaSet]
    APP
    APP2
    APP3
  end

  subgraph K8s Node
    direction TB
    NPS --> RS
    RS --> DBS
    DBS --> DB
  end
  
  

  USER -- "www.demo-app.com (port 80)" --> RL
  RL --> NPS
```

### Host K8s In A Cloud Platform
Take GCP as an example. A few things get updated:
- the NodePort service can be converted to a `LoadBalancer` service type, which ...
  - allows NodePort service details to exist (_make the node available through a port_)
  - K8s sends req to GCP to provision a network load-balancer for the service: where GCP deploys a load-balancer to split traffic across multiple nodes (_if that ever happens_)
  - the GCP load-balancer comes with an external ip
- The DNS needs to be updated to change my-app-url to the gcp-ip-addr

```mermaid
flowchart TD
  %%
  %%  Nodes
  %%
  USER[End-User]
  
  DNS[[DNS: demo-app to gcp-provided LoadBalancer IP]]
  GCPLB["GCP LoadBalancer:
    - IP Provided + port proxying included
    - fwd req from 80 to 38080 (K8s LoadBalancer Service Port)"]

  NPS[[LoadBalancer Service: port 38080]]
  APP((Web-App Pod))
  APP2((Web-App Pod))
  APP3((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]

  subgraph RTNGL["routing logic"]
    direction TB
    DNS --> GCPLB 
  end

  subgraph RS [ReplicaSet]
    direction TB
    APP
    APP2
    APP3
  end

  subgraph K8N["K8s Node"]
    NPS --> RS
    RS --> DBS
    DBS --> DB
  end

  subgraph GCP["google cloud platform"]
    RTNGL 
    K8N
  end
  
  

  USER -...- |"www.demo-app.com (port 80)"| DNS
  GCPLB -..-> NPS
```