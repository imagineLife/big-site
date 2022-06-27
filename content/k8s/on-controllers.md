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
  - the `replicas` is a sibling of `template`
- run it
```bash
Jakes-4:k8s Jake$ kubectl create -f configs/rc/rc.yml
replicationcontroller/first-rc created

# check status
Jakes-4:k8s Jake$ kubectl get replicationcontroller/first-rc
NAME       DESIRED   CURRENT   READY   AGE
first-rc   3         3         3       30s

# wider
Jakes-4:k8s Jake$ kubectl get replicationcontroller/first-rc -o wide
NAME       DESIRED   CURRENT   READY   AGE   CONTAINERS        IMAGES   SELECTOR
first-rc   3         3         3       47s   nginx-container   nginx    app=nginx-app,type=front-end

# see the pods
Jakes-4:k8s Jake$ kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
first-rc-gp5fk   1/1     Running   0          75s
first-rc-jrwzd   1/1     Running   0          75s
first-rc-t6r45   1/1     Running   0          75s

# see the pods, wider
Jakes-4:k8s Jake$ kubectl get pods -o wide
NAME             READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
first-rc-gp5fk   1/1     Running   0          95s   172.17.0.5   minikube   <none>           <none>
first-rc-jrwzd   1/1     Running   0          95s   172.17.0.6   minikube   <none>           <none>
first-rc-t6r45   1/1     Running   0          95s   172.17.0.7   minikube   <none>           <none>

```