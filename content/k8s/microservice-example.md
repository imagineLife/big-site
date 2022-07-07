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
  - [Building The Services with Kubectl](#building-the-services-with-kubectl)


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

## Building The Services with Kubectl
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
```