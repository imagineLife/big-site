---
title: Give DNS Records To Replicated Pods With Headless Services
parentDir: k8s/in-depth
slug: k8s/in-depth/headless-services
shortSlug: headless-services
author: Jake Laursen
excerpt: Headless Services assign DNS entries to pods, which can be useful for use-cases likes statefulSets and Master/Slave Pods
tags: ["Kubernetes", "k8s", "data", "persistence", "volumes"]
order: 24
---

# Create DNS Entries for Pods WIthout Load-Balancing with Headless Services
- [Create DNS Entries for Pods WIthout Load-Balancing with Headless Services](#create-dns-entries-for-pods-without-load-balancing-with-headless-services)
  - [A Problem with Services And Stateful Sets](#a-problem-with-services-and-stateful-sets)
  - [Headless Services Provide A DNS Entry Without Load-Balancing](#headless-services-provide-a-dns-entry-without-load-balancing)
  - [Headless Service Definition File](#headless-service-definition-file)
  - [Pod Definitions Need Updates](#pod-definitions-need-updates)
    - [Pod Def File To Work With a StatefulSet And A Headless Service](#pod-def-file-to-work-with-a-statefulset-and-a-headless-service)
    - [Deploying a pod via Deployment](#deploying-a-pod-via-deployment)
    - [Comparing to a stateful set](#comparing-to-a-stateful-set)

## A Problem with Services And Stateful Sets
Pods in a Stateful set get ordinal, stateful, unique names.  
Apps "talk to" one another through services.  
The services act as load-balancers, passing around traffic around to all nodes in a set.  
**In a stateful set**, such as a master db with slave replica dbs, load-balancing traffic between the master and slaves is not going to work.  

## Headless Services Provide A DNS Entry Without Load-Balancing
Headless services don't have I.Ps of their own.  
Headless services don't do load-balancing.  
Headless services create DNS entries for each pod - using pod + subdomain - `podname.headless-servicename-namespace.svc.cluster-domain`.  
With that naming scheme, the "master" pod for a db replica set has a unique name.  

## Headless Service Definition File
Here, the `clusterIP: none` is what tells k8s to make the service headless.  

```yaml
apiVersion: v1
name: Service
metadata:
  name: db-h
spec:
  ports:
    - port: 27017
  selector:
    app: mongodb
  # THIS makes the service headless!
  clusterIP: none
```

## Pod Definitions Need Updates
For pods to work with stateful sets and headless services, 2 fields must be added to the pod definition file. The pods will get dns records instead of the service, so a few details are required:
- `spec.hostname`
  - doesn't need to match the service
- `spec.subdomain`
  - this must match the name of the headless service in the service def `metadata.name` - see a pod def file example below

### Pod Def File To Work With a StatefulSet And A Headless Service
With this, DNS records get created per pod, with the `hostname` field and the `subdomain` field.  
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: db-pod
spec:
  # THIS! must match the headless service metadata.name
  subdomain: db-h
  # THIS!
  hostname: db-pod
  containers:
  - name: mongodb
    image: mongodb:5
```

### Deploying a pod via Deployment
Similar to the pod def file, a deployment would require new details.  
The Deployment needs
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: db-deployment
  labels:
    app: db
spec:
  replicas: 3
  matchLabels:
    app: db
  template:
    metadata:
      name: db-pod
      labels:
        app: db
    spec:
      containers:
      - name: mongodb
        image: mongodb:5
```

### Comparing to a stateful set
Deploying a stateful set, instead of a deployment, that connects to a headless service - a serviceName needs to be specified for the statefulset.  
K8s uses the servicename to apply subdomains to its pods, instaed of the `subdomain`+`hostname` field requirements listed above.  

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db-deployment
  labels:
    app: db
spec:
  # THIS! must match the headless-service metadata.name
  # this matches the pods in this statefulSet to the headless service
  serviceName: db-h
  replicas: 3
  matchLabels:
    app: db
  template:
    metadata:
      name: db-pod
      labels:
        app: db
    spec:
      containers:
      - name: mongodb
        image: mongodb:5
```