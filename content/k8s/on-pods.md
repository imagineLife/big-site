---
title: On Pods
parentDir: k8s
slug: /k8s/on-pods
author: Jake Laursen
excerpt: A "wrapper" around
tags: Kubernetes, K8s, pods, services, workloads
order: 4
---

# Workloads and Pods
([K8s docs on this](https://kubernetes.io/docs/concepts/workloads/))  

- [Workloads and Pods](#workloads-and-pods)
  - [Pods](#pods)
    - [One or more Containers](#one-or-more-containers)
    - [Linux under the Hood](#linux-under-the-hood)
    - [A Pod Definition](#a-pod-definition)
    - [One Pod for One Application Instance](#one-pod-for-one-application-instance)
  - [On Scaling](#on-scaling)
    - [Scalability with Pods](#scalability-with-pods)
    - [Scalability with Nodes](#scalability-with-nodes)
  - [One Pod with Many Containers](#one-pod-with-many-containers)
  - [Parallels to Docker](#parallels-to-docker)
  - [Deploying a pod using the cli](#deploying-a-pod-using-the-cli)
    - [See Pods available](#see-pods-available)
    - [Deploying with minikube in docker](#deploying-with-minikube-in-docker)
    - [Checking Pod "status"](#checking-pod-status)
    - [Describing a Pod in Detail](#describing-a-pod-in-detail)
    - [Describing a pod in one-line](#describing-a-pod-in-one-line)
  - [Deploying a Pod using a yaml definition](#deploying-a-pod-using-a-yaml-definition)
    - [Steps](#steps)
  - [Delete a pod](#delete-a-pod)
  - [Some Big-Picture Takeaways](#some-big-picture-takeaways)
## Pods
Pods are [_"...the smallest deployable units of computing..."_](https://kubernetes.io/docs/concepts/workloads/) that can be made and "managed" by k8s.  
Pods may look & feel like a composed network of docker containers that, in dockerland, are all working together under a single `docker-compose.yml` file.  

### One or more Containers
Pods run containers.  
Pods share storage.  
Pods share network resources.  
Pods share a "spec" on how to run the containers.  
Based on the k8s docs,  
[_"Note: Grouping multiple co-located and co-managed containers in a single Pod is a relatively advanced use case. You should use this pattern only in specific instances in which your containers are tightly coupled."_](https://kubernetes.io/docs/concepts/workloads/pods/#workload-resources-for-managing-pods).  

### Linux under the Hood
Pods [share linux namespaces, cgroups,](https://kubernetes.io/docs/concepts/workloads/pods/#what-is-a-pod), and configurably more.  
This might feel && sound like a docker container.  

### A Pod Definition
A pod [is defined in a yaml file](https://kubernetes.io/docs/concepts/workloads/pods/#using-pods):  
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```
That pod
- is running a single container 
- the container is using the docker image `nginx:1.14.2` and
- the name of the container is `nginx`  

A pod can be run with
```bash
kubectl apply -f https://k8s.io/examples/pods/simple-pod.yaml
```

### One Pod for One Application Instance
Scale horizontally === more pods, one per instance of an app.  
_Replication_.  
A Replicated pod or set of pods [_"are usually created and managed as a group"_](https://kubernetes.io/docs/concepts/workloads/pods/#workload-resources-for-managing-pods) by a workload resource and its controller.  

One pod, one container (_maybe a norm here_).  

## On Scaling
### Scalability with Pods
One hierarchical look a this:
- A: A cluster, wraps
  - B: a single-node k8s cluster, wraps
    - C: a pod, wraps
      - D: a single instance of a docker container, running
        - E: a single instance of an app

When the number of users grows to introduce a scaling problem? With K8s, a new pod gets created, multiplying the "C" layer and below:

- A: A cluster, wraps
  - B: a single-node k8s node, wraps
    - C1: a pod, wraps
      - D1: a single instance of a docker container, running
        - E1: a single instance of an app
    - C2: a pod, wraps
      - D2: a single instance of a docker container, running
        - E2: a single instance of an app


### Scalability with Nodes
In the previous scaling example, 2 pods are present:
When the number of users grows to introduce a scaling problem? With K8s, a new pod gets created, multiplying the "C" layer and below:

- A: A cluster, wraps
  - B: a single-node k8s node, wraps
    - C1: a pod, wraps
      - D1: a single instance of a docker container, running
        - E1: a single instance of an app
    - C2: a pod, wraps
      - D2: a single instance of a docker container, running
        - E2: a single instance of an app

When the number of users grows to introduce a scaling problem where the number of pods is making the parent "node" stretched thin? Add a node:

- A: A cluster, wraps
  - B1: a single-node k8s node, wraps
    - C1: a pod, wraps
      - D1: a single instance of a docker container, running
        - E1: a single instance of an app
    - C2: a pod, wraps
      - D2: a single instance of a docker container, running
        - E2: a single instance of an app
  - B2: a single-node k8s node, wraps
    - C21: a pod, wraps
      - D21: a single instance of a docker container, running
        - E21: a single instance of an app

Above, the "B2" node can be introduces with even a single pod in it, where room to grow can be introduced into this new pod.  


## One Pod with Many Containers
A Single pod _can have multiple containers_.  
Multiple containers in a single pod are best used when the containers are _tightly coupled_: supporting containers of a primary use-case container.  

Containers in a single pod can all access one another through `localhost`.  


## Parallels to Docker
- deploy an app in a container
  - `docker run api-app`
- **need more resource?** deploy more instances, here 3 will run total
  - `docker run api-app`
  - `docker run api-app`
- **app has introduced a new "service"**?
  - add new "helper containers that link to the primary apps. Here, 3 "helper" container services are added, 1 per primary instance of the app
    - `docker run helper-box -link api-app-1`
    - `docker run helper-box -link api-app-2`
    - `docker run helper-box -link api-app-3`
    - THIS
      - would require shared...
        - networking
        - volumes
        - monitoring of container management

PODS, comparatively, solve the container-linking resource-sharing needs:
- put a primary & helper container in a pod
- containers have same...
  - storage
  - network
  - up & down coordination



## Deploying a pod using the cli
Here, deploying an nginx container
kubectl...
- deploys a container
- creates a pod

```bash
# nginx getes downloaded from dockerhub here
kubectl run nginx --image=nginx
```  
### See Pods available
```bash
kubectl get pods
```
- see pods
- see a "status"
  - containerCreating
  - Running

### Deploying with minikube in docker
A brief overview:
- k8s can be running in a docker container
- minikube && kubectl are installed on the host machine (my laptop)

With the command noted above, run that on the host machine && it will start a pod in the k8s cluster that is running in docker
```bash
# again, on host laptop, not in the container
kubectl run nginx --image=nginx
```

### Checking Pod "status"
Immediately after starting this pod, k8s will pull the image from dockerhub.  
This will delay the start of the pod.  
To see the pod status, use this on host machine. This is an example where I checked the status frequently until the status changed from `ContainerCreating` to `Running`:
```bash

# the run command
Jakes-4:projects Jake$ kubectl run nginx --image=nginx
pod/nginx created

# getting the status...
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          2s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          3s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          5s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          6s
Jakes-4:projects Jake$ 
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          8s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          10s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          13s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          16s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          18s
Jakes-4:projects Jake$ kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          24s
```

### Describing a Pod in Detail
kubectl comes with a utility called `describe`. per `kubectl describe --help`, the describe command will...`Show details of a specific resource or group of resources.`  
describe can be used here with a pod, and the named pod we just started called `nginx`:  

```bash
# describe in action
Jakes-4:k8s Jake$ kubectl describe pod nginx
Name:         nginx
Namespace:    default
Priority:     0
Node:         minikube/192.168.49.2
Start Time:   Sun, 26 Jun 2022 11:36:24 -0400
Labels:       run=nginx
Annotations:  <none>
Status:       Running
IP:           172.17.0.5
IPs:
  IP:  172.17.0.5
Containers:
  nginx:
    Container ID:   docker://7b8a0d0643e0a9750fde14bd0f6e791e7dca6ec54dda6e85db4c5fe5ba898f46
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:10f14ffa93f8dedf1057897b745e5ac72ac5655c299dade0aa434c71557697ea
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Sun, 26 Jun 2022 11:36:45 -0400
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-k9q6r (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-k9q6r:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  32m   default-scheduler  Successfully assigned default/nginx to minikube
  Normal  Pulling    32m   kubelet            Pulling image "nginx"
  Normal  Pulled     32m   kubelet            Successfully pulled image "nginx" in 19.706368092s
  Normal  Created    32m   kubelet            Created container nginx
  Normal  Started    32m   kubelet            Started container nginx
```
Interesting notes in the `describe` output:
- the name of the pod
- a label assigned to the pod
- the "node" name and the i.p address with `Node:`
- the ip of the pod with `IP:`
- Container info
  - here 1 container named `nginx`
  - where the image was pulled from
- pod (_& container_) event info 
  - list of events happening since pod creation
    - scheduled
    - pulling
    - pulled
    - created
    - started


### Describing a pod in one-line
The `get pods` can be used for a one-liner of the pods, as seen above.  
A "wide" output flag can be added to that command that gives more info in the one-line output.   
Here's a comparison of the `get pods` with and without the `wide` flag:  
```bash
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          42m
Jakes-4:k8s Jake$ kubectl get pods -o wide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          42m   172.17.0.5   minikube   <none>           <none>
```


## Deploying a Pod using a yaml definition
Pod yaml definitions have 4 "top" level keys:
- `apiVersion`
  - version of K8s api
  - for pod & service definitions, could be `v1`
  - for replica set and deployment definitions, could be `apps/v1`
- `kind`
  - the "type" of object the file is for
    - pod
    - replicaSEt
    - Service
    - deployment
- `medatada`
  - a dictionary with name, labels, etc
  - must be k8s-expected fields
    - LABELS, though, can be pretty customizable
- `spec`
  - some container specs
  - this is "kind" specific


```yaml
# name this nginx-pod.yml
apiVersion: v1
kind: Pod
metadata:
  name: trial-pod
  labels:
    app: my-trial-pod
spec:
  containers:
    - name: nginx-box
      image: nginx
```
Use this with
```bash
kubectl create -f ngix-pod.yml
```
NOTE:
- the `spec:containers:image` is where the full path can go for images sourced from somewhere other than dockerhub - interesting

### Steps
- Create a yaml file with the config above
  - I put mine in a relative dir `<pwd>/configs/pods/nginx-pod.yml`
- run it && check that it is up && running:
```bash
Jakes-4:k8s Jake$ kubectl apply -f configs/pods/nginx-pod.yml
# apparently a pod can also be created with kubectl create -f configs/pods/nginx-pod.yml
pod/nginx-pod created
Jakes-4:k8s Jake$ kubectl get pods
NAME        READY   STATUS    RESTARTS   AGE
```

## Delete a pod
Here, we'll delete the pod we made through the cli.  
Then, we'll create a pod using a yaml file definition, like above.
```bash
kubectl delete pod nginx
```

Here, we'll delete the pod that was made through the yaml way:
```bash
Jakes-4:k8s Jake$ kubectl get pods
NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          86s
Jakes-4:k8s Jake$ kubectl delete pod nginx-pod
pod "nginx-pod" deleted
Jakes-4:k8s Jake$ kubectl get pods
No resources found in default namespace.
```
## Some Big-Picture Takeaways
- The "smallest" unit manageable directly by K8s is the pod: not the container
- A pod maybe "usually" has 1 container
  - more-than-one container in a pod should expect the pods to be "tightly-coupled"
- Scaling an application can look like...
  - first, replicate a pod when the pod resources are getting over-consumed. This will replicate a container in a one-container-per-pod setup
  - second, replicate a node when the node and it's pods are all getting over-consumed
    - start with a new node with one pod, leaving room for more pods in the new node
    - 