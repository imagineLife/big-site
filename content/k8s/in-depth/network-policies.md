---
title: Build Rules for Pod Network Traffic
parentDir: k8s/in-depth
slug: k8s/in-depth/network-policies
author: Jake Laursen
excerpt: Ingress policies allow incoming network requests, and Egress policies all outgoing network requests 
tags: Kubernetes, K8s, ingress, egress networking, policies, network policies
order: 20
---

# Network Traffic Is Though Of From Where The Request Starts
In a traditional http data-transfer, each request has 2 parts: a request and a response. One unit makes a request to another unit, and the other unit fullfills the request and the http data-transfer "comes back" to the initial requester.  
```mermaid
flowchart LR
  A["I Want Something"]
  B["I Have What You Need"]
    A -- 1. Request --> B
    B -- 2. Response --> A
```


- [Network Traffic Is Though Of From Where The Request Starts](#network-traffic-is-though-of-from-where-the-request-starts)
  - [Kubernetes default allow-all policy](#kubernetes-default-allow-all-policy)
  - [A 3-Pod Networking Example](#a-3-pod-networking-example)
      - [Another View](#another-view)
    - [Ingress and Inbound traffic](#ingress-and-inbound-traffic)
    - [Egress and Outbound Traffic](#egress-and-outbound-traffic)
    - [Ingress and Egress as Rules](#ingress-and-egress-as-rules)
      - [Frontend Server](#frontend-server)
      - [API Server](#api-server)
      - [DB](#db)
    - [Ingress, Pods, and Services Through Network Policies](#ingress-pods-and-services-through-network-policies)
    - [Allow Traffic from non-pod I.P addresses](#allow-traffic-from-non-pod-ip-addresses)
  - [Network Policies are Enforced by the networking solutions](#network-policies-are-enforced-by-the-networking-solutions)
    - [Egress Definitions](#egress-definitions)
  - [Some Takeaways](#some-takeaways)
  - [Things to do](#things-to-do)

## Kubernetes default allow-all policy
Kubernetes applies an "allow-all" networking policy between objects.  
Network policies are used to restrict network activity to & from k8s objects.   

## A 3-Pod Networking Example
3 Servers. Example Ports. What happens when the users wants to use a page that gets data from a db through an api:  

```mermaid
sequenceDiagram
  user ->> FrontendServer: Req. on port 80
  FrontendServer ->> API_Server: Req. on port 3001
  API_Server ->> DB_Server: Req on port 27017

  DB_Server ->> API_Server : Response
  API_Server ->> FrontendServer : Response
  FrontendServer ->> user : Response
```

#### Another View
Here, actors and request ports.  
Requests, **ingress traffic**, are solid lines with port labels.  
Responses are dotted lines.  

```mermaid
flowchart TD
 %%
 %% NODES
 %%

 USR["End-User"]
 FE["Frontend"]
 API["API"]
 DB["DB"]

 USR --":80
  Frontend Ingress"
  --> FE
 
 FE -.-> USR

 FE --":5000
  Frontend Egress
  API Ingress
 " --> API
 
 API -.-> FE

 API --":27017
  API Egress
  DB Ingress
 " --> DB
 DB -.-> API

```

### Ingress and Inbound traffic
Ingress and Egress notes specifically about where dataflow _starts_.  
**Ingress** referrs to inbound traffic, like how ...
- **the frontend** server recieves ingress traffic from the user
- **the api** server recieves ingress traffic from the frontend server
- - **the db** recieves ingress traffic from the api server

### Egress and Outbound Traffic
Egress represents an object _making an outbound request_, like how...
- **the frontend** server creates egress traffic to the api
- **the api** server creates egress traffic to the db


### Ingress and Egress as Rules
Here, ingress and egress traffic are describes by each object in this 3-object diagram in 6 bullet points.  
These rules will translate to the K8s world.  
Also notice - indirectly, the frontend does not "need" to talk to the db server. 

#### Frontend Server
- allow ingress on port 80 from the world
- allow egress on port 5000 to the api pod

#### API Server
- allow ingress on port 5000 from the frontend server
- allow egress on port 27017 to the db 

#### DB
- allow ingress on port 27017 from the api server


### Ingress, Pods, and Services Through Network Policies
Here, a look at the db networking policy details:
```yaml
policyTypes: 
- Ingress
ingress:
- from:
  - podSelector:
      matchLabels:
        name: api-pod
  ports:
    - protocol: TCP
      port: 27017
```

in context of a more complete network policy def file: the db is being "protected" and assured that _only traffic on a specific port from a specific pod_ is allowed
```yaml
# db-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-network-policy
spec:
  # the pod(s) this will apply to, via matched labels
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  # only incoming data 
  - Ingress
  # the ingress description
  ingress:
  # where data can come from
  - from:
    # traffic source pod by "name" label
    - podSelector:
        matchLabels:
          name: api-pod
      # only pods from the "prod" namespace
      namespaceSelector:
        matchLabels:
          name: prod
    # traffic source port(s)
    ports:
      - protocol: TCP
        port: 27017
```

`kubectl create -f db-policy.yaml`


### Allow Traffic from non-pod I.P addresses
Perhaps network traffic is desired to this example db pod _from a machine that is not managed by kubernetes_.  
Perhaps a backup server will talk to the db and create backups.  
This will be an ingress connection on for the db network policy:  

```yaml
# db-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-network-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  ingress:
  - from:
    # api traffic
    #  matching pod label AND namespace label
    - podSelector:
        matchLabels:
          name: api-pod
      namespaceSelector:
        matchLabels:
          name: prod
    # db backup machine
    # matching pi address block
    - ipBlock:
        cidr: 192.168.99.10/32
    ports:
      - protocol: TCP
        port: 27017
```

## Network Policies are Enforced by the networking solutions
[K8s Has more docs on the details](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/):  
| SUPPORTING network policies | NOT supporting network policies |
|:--|:--|
|[Kube-router](https://www.kube-router.io/)|Flannel|
|[Calico](https://projectcalico.docs.tigera.io/getting-started/kubernetes/)||
|[Romana](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/romana-network-policy/)||
|[weave-net](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/)||
|Antrea||
|Cilium||


### Egress Definitions
A trivial egress-only example:  

```yaml
# db-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-network-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Egress
  egress:
  - to:
    - ipBlock:
        cidr: 192.168.99.10/32
    ports:  
      - protocol: TCP
        port: 80
```


## Some Takeaways
- Network Policies are enforced by the networking tool (see above)
- Networking Policies are to prevent unwanted network activity - not to enable 
- Networking policies consider _pods_, not replicasets or deployments: this is interesting!

## Things to do
Create a network policy that...
- allows traffic from an "internal" app
- to the "payroll-service" and the "db-service"
  - payroll on port 8080
  - db-service on 3306

Something like this...  

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: internal-policy
spec:
  podSelector:
    matchLabels:
      name: internal
  policyTypes:
  - Egress
  egress:
  - to:
    - podSelector:
        matchLabels:
          name: payroll
    ports:
    - protocol: TCP
      port:  8080
  - to:
    - podSelector:
        matchLabels:
          name: mysql
    ports:
    - protocol: TCP
      port: 3306
```