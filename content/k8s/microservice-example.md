---
title: A Microservice K8s Demo
parentDir: k8s
slug: /k8s/microservice-demo
author: Jake Laursen
excerpt: Deploying a Microservice set of Applications with K8s
tags: Kubernetes, K8s, Microservices
order: 13
---

# The Microservices
A Brief review of the microservices here:  

- A frontend app with an api + a frontend, where users can login and vote 1 of 2 options (_simple webapp here_)
- A redis datastore
- A postgres DB
- A "worker" service that syncs data from the redis service to the postgres service
- Another frontend that show vote tallies, mocking an "analytics" frontend   

Each service will get a pod.  


- [The Microservices](#the-microservices)
  - [Definition File Directory Structure](#definition-file-directory-structure)
  - [The Definition Files](#the-definition-files)
  - [Building The Services with Kubectl](#building-the-services-with-kubectl)
    - [The Voting-App Services](#the-voting-app-services)
      - [See the Voting App with minikube](#see-the-voting-app-with-minikube)
    - [The Redis Services](#the-redis-services)
    - [The Postgres Services](#the-postgres-services)
    - [The Worker Service](#the-worker-service)
    - [The Results Services](#the-results-services)


## Definition File Directory Structure
```bash
# all configs go in a "cfgs" dir
/cfgs
  # config "types" get broken into sub-directories
  /pods
    pg.yaml           # postgres
    redis.yaml        # redis
    results-app.yaml  # web-app
    voting-app.yaml   # web-app
    worker.yaml       # db-syncing
  /services
    redis.yaml        # internal service
    pg.yaml           # internal service
```

## The Definition Files
Note: the externalIps key/val pair are to publicize the nodes through docker - some detail I'm not 1000% sure about
## Building The Services with Kubectl
### The Voting-App Services
```bash
# the voting-app pod
Jakes-4:k8s Jake$ kubectl create -f cfgs/pods/voting-app.yaml 
pod/voting-app-pod created

# the voting-app service
Jakes-4:k8s Jake$ kubectl create -f cfgs/services/voting-app.yaml 
service/voting-service created

# see em
Jakes-4:k8s Jake$ kubectl get all
NAME                 READY   STATUS    RESTARTS   AGE
pod/voting-app-pod   1/1     Running   0          108s

NAME                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/kubernetes       ClusterIP   10.96.0.1      <none>        443/TCP        12d
service/voting-service   NodePort    10.101.11.48   <none>        80:30005/TCP   35s

# 
# see em, differently
# 
Jakes-4:k8s Jake$ kubectl get pods,svc
NAME                 READY   STATUS    RESTARTS   AGE
pod/voting-app-pod   1/1     Running   0          3m9s

NAME                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/kubernetes       ClusterIP   10.96.0.1      <none>        443/TCP        12d
service/voting-service   NodePort    10.101.11.48   <none>        80:30005/TCP   116s
```
#### See the Voting App with minikube
```bash
Jakes-4:k8s Jake$ minikube service voting-service --url
http://127.0.0.1:51286
```
go there!

### The Redis Services
```bash
Jakes-4:k8s Jake$ kubectl create -f cfgs/pods/redis.yaml 
pod/redis-pod created
Jakes-4:k8s Jake$ kubectl create -f cfgs/services/redis.yaml 
service/redis-service created

# see it all
Jakes-4:k8s Jake$ kubectl get pods,svc
NAME                 READY   STATUS    RESTARTS   AGE
pod/redis-pod        1/1     Running   0          26s
pod/voting-app-pod   1/1     Running   0          11m

NAME                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/kubernetes       ClusterIP   10.96.0.1       <none>        443/TCP        12d
service/redis-service    ClusterIP   10.108.99.93    <none>        6379/TCP       20s
service/voting-service   NodePort    10.110.227.44   1.2.3.110     80:30005/TCP   6m19s
```

### The Postgres Services
```bash
Jakes-4:k8s Jake$ kubectl create -f cfgs/pods/pg.yaml 
pod/pg-pod created
Jakes-4:k8s Jake$ kubectl create -f cfgs/services/pg.yaml 
service/db created

# see it all
Jakes-4:k8s Jake$ kubectl get pods,svc
NAME                 READY   STATUS    RESTARTS   AGE
pod/pg-pod           1/1     Running   0          25s
pod/redis-pod        1/1     Running   0          2m10s
pod/voting-app-pod   1/1     Running   0          13m

NAME                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/db               ClusterIP   10.108.7.31     <none>        5432/TCP       18s
service/kubernetes       ClusterIP   10.96.0.1       <none>        443/TCP        12d
service/redis-service    ClusterIP   10.108.99.93    <none>        6379/TCP       2m4s
service/voting-service   NodePort    10.110.227.44   1.2.3.110     80:30005/TCP   8m3s
```

### The Worker Service
```bash
Jakes-4:k8s Jake$ kubectl create -f cfgs/pods/worker.yaml 
pod/worker-pod created
```

### The Results Services
```bash
Jakes-4:k8s Jake$ kubectl create -f cfgs/pods/result-app.yaml 
pod/result-app-pod created
Jakes-4:k8s Jake$ kubectl create -f cfgs/services/result-app.yaml 
service/result-service created
```