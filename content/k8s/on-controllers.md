---
title: On Pods
parentDir: k8s
slug: /k8s/replica-controllers
author: Jake Laursen
excerpt: Controllers, ans Replicas
tags: Kubernetes, K8s, controllers, replicas
order: 5
---

## Controllers
The "brain" behind k8s.  
Processes.  
They monitor K8s Objects && respond to the objects.  

## Replicas
When a single-node, single-pod setup fails, replicas help deal with this.  

### Replication Controllers
These are K8s objects, in the same way pods are k8s objects.  
These help run multiple instances of a single pod.  
These can bring up a new pod in a node when a pod fails.  
These can create multiple pods to share load.  
Replication controllers can even deploy multiple pods across multiple nodes:

Scenario 1, a pod in a node:
- Node N1, running 
  - pod P1
    - running container C1
    - being watched by a replication controller

When the pod traffic gets to be too much, the replication controller duplicates the pod:  
- Node N1, running 
  - pod P1
    - running container C1
    - being watched by a replication controller
  - pod P2
    - running container C2
    - being watched by the same replication controller


The replication controller can even scale to add more pods across multiple nodes:
- Node N1, running 
  - pod P1
    - running container C1
    - being watched by a replication controller
  - pod P2
    - running container C2
    - being watched by the same replication controller
- Node N2, running 
  - pod P3
    - running container C3
    - being watched by the same replication controller
  - pod P4
    - running container C4
    - being watched by the same replication controller

### Different than a Replica Set
A Controller is the "older" tech being replaced by replica sets.  

#### Creating a Replication Controller
```yml
# replication-controller.yml
apiVersion: v1
kind: ReplicationController
metadata:
  name: repl-con
  labels:
    app: repl-app
    type: front-end
spec:
  # provide a pod template here!!
  template:
    metadata:
      name: nginx-pod
      labels:
        app: nginx-app
        type: frontend
    spec:
      containers:
        - name: nginx-container
          image: nginx
  replicas: 3
    
```
Notes:
- same 4 parent fields as a pod definition file
- the `template` contents are nearly identical to the pod definition file that the replication controller is "watching"
  - two of the four required root-level yaml config fields are present: `metadata` and `spec`
  - two fields are missing: `apiVersion` and `kind`
- the `replicas` tells the ReplicationController how many pods to make