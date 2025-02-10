---
title: Ingress Helps Simplify Some Networking Details
parentDir: k8s/in-depth
slug: k8s/in-depth/why-ingress
shortSlug: why-ingress
author: Jake Laursen
excerpt: Ingress solves some networking nuianced configuration details
tags: ["Kubernetes", "k8s", "ingress", "networking", "dns", "proxy"]
order: 18
---

- [An Example Of A Growing Tech Stack](#an-example-of-a-growing-tech-stack)
  - [An App](#an-app)
  - [A DB And A Service To Allow the Two to Talk](#a-db-and-a-service-to-allow-the-two-to-talk)
  - [Make it Available with a NodePort Service](#make-it-available-with-a-nodeport-service)
  - [Address App Scaling Needs With ReplicaSets](#address-app-scaling-needs-with-replicasets)
  - [Allow For Friendly URL with DNS Config](#allow-for-friendly-url-with-dns-config)
  - [Remove the Need For the Port in the URL with A Proxy Server](#remove-the-need-for-the-port-in-the-url-with-a-proxy-server)
  - [Host K8s In A Cloud Platform](#host-k8s-in-a-cloud-platform)
- [The Product Grows And A new Application Gets Introduced](#the-product-grows-and-a-new-application-gets-introduced)
- [This is where Ingress Helps](#this-is-where-ingress-helps)
## An Example Of A Growing Tech Stack
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
  
  USER[End-User]

  NPS[[NodePort Service: port 38080]]
  APP((Web-App Pod))
  APP2((Web-App Pod))
  APP3((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]

  subgraph RS [ReplicaSet]
    direction TB
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

  USER[End-User]
  
  DNS[[demo-app to k8s-node-ip]]

  NPS[[NodePort Service: port 38080]]
  APP((Web-App Pod))
  APP2((Web-App Pod))
  APP3((Web-App Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]
  
  

  subgraph RL["(DNS Server: routing logic)"]
    DNS
  end

  subgraph RS [ReplicaSet]
    direction TB
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

  USER[End-User]
  
  PXY[[Proxy-Server: port 80 to 38080]]
  DNS[[demo-app to k8s-node-ip]]

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
  USER[End-User]
  
  DNS[[DNS: demo-app to gcp-provided LoadBalancer IP]]
  GCPLB["GCP LoadBalancer: - IP Provided + port proxying included - fwd req from 80 to 38080"]

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

  subgraph RS [WebApp ReplicaSet]
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


## The Product Grows And A new Application Gets Introduced
Following the mock product example, the Org wants to host instructional videos about the products it sells. The efforts involved here become their own workload, with unique people, unique goals, and unique needs.  
This develops into its own:
- url (demo-app.com/how-to)
- application codebase (vid-app)
- containers + pods + replica set
- K8s Service Object
- accessible port on the K8s Node
- a new load-balancer on the GCP Platform


```mermaid
flowchart TD
  USER[End-User]
  
  DNS[[DNS: demo-app to gcp-provided LoadBalancer IP]]
  GCPLB1["Root Route: GCP LoadBalancer: - IP Provided + port proxying included - fwd req from 80 to 38080 - $$ paid $$"]
  GCPLB2["How-To Route: GCP LoadBalancer: - IP Provided + port proxying included - fwd req from 80 to 38080 - $$ paid $$"]

  LB1[[Root: LoadBalancer Service: port 38080]]
  LB2[[How-To: LoadBalancer Service: port 38282]]
  APP((Pod))
  APP2((Pod))
  APP3((Pod))
  WATCHAPP((Pod))
  WATCHAPP2((Pod))
  WATCHAPP3((Pod))
  DBS[[ClusterIP Service - Inner-Node-Communication]]
  DB[(Database Pod)]

  subgraph RTNGL["routing logic"]
    direction TB
    DNS --> GCPLB1
    DNS --> GCPLB2
  end

  subgraph RS [Webapp-ReplicaSet]
    direction TB
    APP
    APP2
    APP3
  end

  subgraph RS2 [Watch-App-ReplicaSet]
    direction TB
    WATCHAPP
    WATCHAPP2
    WATCHAPP3
  end

  subgraph K8N["K8s Node"]
    LB1 --> RS
    LB2 --> RS2
    RS --> DBS
    RS2 --> DBS
    DBS --> DB
  end

  subgraph GCP["google cloud platform"]
    RTNGL 
    K8N
  end
  
  

  USER -...- |"www.demo-app.com (port 80)"| DNS
  GCPLB1 -..-> LB1
  GCPLB2 -..-> LB2
```

Also.  
Want more protection & security? Configure Https.  
Many options there.  

## This is where Ingress Helps
- Cloud-Native Load-Balancers cost $$
- Route-Based Load-Balancers become redundant "config"
- firewall config
- https config

K8s offers Ingress to create yet another object with a definition file.  
Ingress provides A single externally accessible url, configurable to route to differente services within a cluster.   
Ingress allows ssl config as well.  
Ingress still needs to be exposed - published as a nodePort or a cloud-native load-balancer.  
**Load-balancing, Auth, SSL, Url-Based Routing** all happen in an ingress controller.  
