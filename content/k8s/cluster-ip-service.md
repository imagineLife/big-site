---
title: Allow Communication Within A Cluster with the ClusterIP Service
parentDir: k8s
slug: k8s/node-port-service
author: Jake Laursen
excerpt: Allow External network connectivity to a Kubernetes service
tags: Kubernetes, K8s, services, odeport
order: 10
---

# ClusterIP
The ClusterIP service is...
- an object
- acts as a "middleman" between replica pods and other pods 
- allows "internal cluster" traffic
- this is the "default" service type

- [ClusterIP](#clusterip)
  - [A Situation](#a-situation)
    - [Some Problems](#some-problems)
    - [ClusterIP To the Rescue](#clusterip-to-the-rescue)
  - [Setting up a ClusterIP Service with yaml](#setting-up-a-clusterip-service-with-yaml)
  - [A Local Proxy Is Available](#a-local-proxy-is-available)

## A Situation 
- several frontend web-server pods
- several backend service pods
- several memory pods (like redis)
- several database-connector pods

### Some Problems
How does each pod "know" which pod to communicate to?  
Pods can go down and come back up without other pods "knowing" about it.  

### ClusterIP To the Rescue
the ClusterIP Service acts as an object "between" a set of relica pods and the rest of the K8s world.  
Each set of pod "services", replicas, can communicate with this clusterIP service, and the clusterIP service will talk to another set of pod services.  

## Setting up a ClusterIP Service with yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: back-end-cluster-ip
spec:
  type: ClusterIP
  ports:
    # where the "backend" is exposed
    - targetPort: 80
    # where the "service" is exposed
      port: 80
  # link the service to pods by label
  selector:
    app: myapp
    type: back-end
```


```bash
# Run it
Jakes-4:k8s Jake$ kubectl create -f configs/services/cluster-ip.yml 
service/back-end-cluster-ip created

# see it
Jakes-4:k8s Jake$ kubectl get services
NAME                  TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
back-end-cluster-ip   ClusterIP   10.105.32.165   <none>        80/TCP         18s
kubernetes            ClusterIP   10.96.0.1       <none>        443/TCP        6d
node-port-service     NodePort    10.97.106.144   1.2.3.110     80:30004/TCP   45h
```

The service can be accessed by pods by the clusterIP or the service name.  

## A Local Proxy Is Available
[K8s docs](https://kubernetes.io/docs/tasks/extend-kubernetes/http-proxy-access-api/#using-kubectl-to-start-a-proxy-server).  
[kubectl proxy docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#proxy).  

```bash
kubectl proxy --port=8080
```
That will open the kube-api server to `http://localhost:8080/api`.  
Epic.  
```bash
# get a list of pods in the default namespace
curl http://localhost:8080/api/v1/namespaces/default/pods
```

