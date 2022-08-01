---
title: Ingress Requires a ServiceAccount, a Deployment, a ConfigMap, a Service, and and Ingress
parentDir: k8s/in-depth
slug: k8s/in-depth/ingress
author: Jake Laursen
excerpt: Kubernetes helps manage traffic, load-balancing, routing, and more through its ingress implementation
tags: Kubernetes, K8s, ingress, networking, dns, proxy, load balancing
order: 19
---

# Ingress
A Layer-7 Load-Balancer built in to tk8s cluster.  
Can be built like any other object in k8s - with a yaml file!  
The Ingress does need to be exposed to the world, published with a NodePort or with a Cloud-Native LoadBalancer.  
Ingress helps with load-balancing, auth, ssl, url-based routing config on the ingress controller.  

Without ingress, a reverse-proxy might be useful as a type of  "ingress controller" to configure them to route traffic based on urls.  

- [Ingress](#ingress)
  - [Ingress Requires Rules and A Controller](#ingress-requires-rules-and-a-controller)
  - [K8s Clusters Require a 3rd-Party Ingress Controller](#k8s-clusters-require-a-3rd-party-ingress-controller)
    - [Roles of the Controller](#roles-of-the-controller)
    - [Options for the Controllers](#options-for-the-controllers)
  - [Ingress Controller as Another Object In the Cluster](#ingress-controller-as-another-object-in-the-cluster)
    - [Configuration Requirements](#configuration-requirements)
    - [Deployment Config File](#deployment-config-file)
    - [ConfigMap Object](#configmap-object)
    - [Service Exposing Ingress Controller to the World](#service-exposing-ingress-controller-to-the-world)
    - [Service Account Config](#service-account-config)
  - [Ingress Resources](#ingress-resources)
    - [A Trivial definition File](#a-trivial-definition-file)

## Ingress Requires Rules and A Controller  
With Ingress, 2 parts are required. A Controller/reverse-proxy like nginx, haproxy or traefik. Config, rules, is also required. 

## K8s Clusters Require a 3rd-Party Ingress Controller
K8s does not come with an Ingress controller by default.  
Ingress Resources will not work without this controller.  
Try nginx as a first implementaiton. 

### Roles of the Controller
A Load-Balancer.  
Additional details, "intelligence", to monitor the cluster for new definitions or new ingress resources.  

### Options for the Controllers
A number of solutions exist:
- GCE
- NginX
- Contour
- HaProxy
- Traefik
- Istio

Per K8s Docs, ["_Kubernetes as a project supports and maintains AWS, GCE and nginx ingress controllers._"](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).  

## Ingress Controller as Another Object In the Cluster
### Configuration Requirements
A few things are required:
- **A ConfigMap**, full of env vars: path to store logs, session timeouts, keep-alive threshold, and more
- **A Deployment Definition file**, describing the deployment of the nginx-ingress pod
- **Env Vars** passed to the def file: the pod name and the namespace that it is deployed to
- **Ports used by the ingress controller**, here 80 (_http_) and 443 (_https_)
- **A Service To Expose the Ingress Controller**, a NodePort service linking this service to the ingress pod deployment
- **A Service Account** with permissions for the ingress controller to do its job

### Deployment Config File
Here, a yaml for an nginx ingress controller. Here, the image is [specially built for k8s](https://github.com/kubernetes/ingress-nginx/blob/main/README.md#readme).
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-ingress-controller
spec:
  replicas: 1
  selector:
    matchLabels:
      name: nginx-ingress
  template:
    # deployment metadata
    metadata:
      labels:
        name: nginx-ingress
    spec:
      containers:
        - name: nginx-ingress-controller
          image: controller/nginx-ingress-controller:0.21.0
      args: 
        # the path where the nginx controller lives in the docker image
        - /nginx-ingress-controller
        # configmap through cli params
        - --configmap=$(POD_NAMESPACE)/nginx-configuration
      # pod name + namespace for nginx to read config data from within the pod
      env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
      ports:
        - name: http
          containerPort: 80
        - name: https
          containerPort: 443
```

### ConfigMap Object
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
```

### Service Exposing Ingress Controller to the World
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-ingress
spec:
  type: NodePort
  ports:
    - name: http
      protocol: http
      port: 80
      targetPort: 80
    - name: https
      protocol: https
      port: 443
      targetPort: 443
  selector:
    # matches the deployment metadata.name field in deployment config file
    name: nginx-ingress
```

### Service Account Config
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: nginx-ingress-serviceaccount
```


## Ingress Resources
Rules + Config on the Ingress Controller: route traffic to different apps (_pods_) based on urls, and/or domain doman.

### A Trivial definition File
Here, an ingress resource def file:
```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-wear-app
spec:
  # where traffic gets routed to
  backend:
    serviceName: wear-service
    servicePort: 80
```

