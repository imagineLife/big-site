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
Jakes-4:k8s Jake$ kubectl get replicationcontroller
NAME       DESIRED   CURRENT   READY   AGE
first-rc   3         3         3       25s

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

## Replica Set
A definition file
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs
  labels:
    app: rs-app
    type: front-end
spec:
  template:
    metadata:
      name: rs-pod
      labels:
        app: myapp-here
        type: front-end
    spec:
      containers:
        - name: nginx-box
          image: nginx
  replicas: 3
  selector:
    matchLabels:
      type: front-end
```
Note:
- `selector` 
  - describe "what pods apply here" - replica sets can manage other pods not explicitly describe in the definition file - epic
  - assumes to be the same as the spec template
  - MAJOR DIFFERENCE betweeen replica set and replication controller
  - hmm, the matchLabels - hmm
- Replica Sets can be spun up to monitor existing already-running pods
  - CAN create pods if they are not already present
  - on pod failure, re-create the busted pod
  - 


## Labels and Selectors
Labels are the "shorthand" that replica set "monitors" use to "watch" pods.  
When pods are already up && running, the `spec:template` section of the replSet def file still is required. Interesting and redundant perhaps.  

## Updating a replica set 
say more pods are needed.  
- Update the yaml
- `kubectl replace -f repl-def-file.yml`
- OR
- `kubectl scale --replicas=6 repl-def-file.yml`
- OR
- another "advanced" way based on load


## Takeaways
- `kubectl create -f replicated-def.yml`
- `kubectl get replicaset`
  - see repl sets
  - `replicaset` should be the name of the set
- `kubectl delete replicaset` 
  - `replicaset` should be the name of the set
- `kubectl replace -f replicated-def.yml`
- `kubectl scale --replicas=6 -f repl-def.yml`
  - updates a running replica set
  - does not alter the replica set difinition file

One more:
```bash
Jakes-4:k8s Jake$ kubectl get replicationcontrollers
NAME       DESIRED   CURRENT   READY   AGE
first-rc   3         3         3       115m
Jakes-4:k8s Jake$ kubectl get replicationcontrollers -o wide
NAME       DESIRED   CURRENT   READY   AGE    CONTAINERS        IMAGES   SELECTOR
first-rc   3         3         3       115m   nginx-container   nginx    app=nginx-app,type=front-end
```


## Creating a Replica Set from yaml
See `configs/rc/replica-set.yml` for an example of a replicaSEt yaml file. Here it is:  
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  # no upper-case letters here!
  name: first-replica-set
  labels:
     app: replica-set-app
spec:
  selector:
    matchLabels:
      app: replica-set-app
  replicas: 3
  template:
    metadata:
      name: nginx-from-replica-set
      labels:
        app: replica-set-app
    spec:
      containers:
        - name: nginx-container
          image: nginx
```
Run it: 
```bash
# create it
Jakes-4:rc Jake$ kubectl create -f replica-set.yml
replicaset.apps/first-replica-set created

# see the rs
Jakes-4:rc Jake$ kubectl get replicaset
NAME                DESIRED   CURRENT   READY   AGE
first-replica-set   3         3         3       10s

# see the pods
Jakes-4:rc Jake$ kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
first-replica-set-6vx5t   1/1     Running   0          118s
first-replica-set-mrs27   1/1     Running   0          118s
first-replica-set-t7fhg   1/1     Running   0          118s
```

### Messing with replica sets
- see the pods
- pick one & delete it
- watch the replica watcher spin up another pod instantaneously

```bash
# delete a pod then check on it
Jakes-4:rc Jake$ kubectl delete pod first-replica-set-6vx5t

# see the updates
Jakes-4:rc Jake$ kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
first-replica-set-ddp57   1/1     Running   0          3s
first-replica-set-mrs27   1/1     Running   0          4m30s
first-replica-set-t7fhg   1/1     Running   0          4m30s
```