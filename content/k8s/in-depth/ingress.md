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
  - [Ingress Requires 2 Things: Rules and A Controller](#ingress-requires-2-things-rules-and-a-controller)
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
    - [Rules](#rules)
      - [Domain Or HostName](#domain-or-hostname)
      - [Path](#path)
  - [Consider Re-Writing Urls](#consider-re-writing-urls)
  - [Useful Commands & References](#useful-commands--references)
  - [Things To Be Able To Do](#things-to-be-able-to-do)

## Ingress Requires 2 Things: Rules and A Controller  
With Ingress, 2 parts are required. A Controller/reverse-proxy like nginx, haproxy or traefik. Configuration, aka "ingress rules", is also required. 

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
- **A ConfigMap**, full of env vars - storing config vars in a configMap allows for toggling congif vars _only_ in this configMap file, not deep in some other pod or deployment def file
  - path to store logs 
  - session timeouts 
  - keep-alive threshold
  - .... more config vars are available
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
      # ports used by this ingress controller
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
Exposing this new ingress object to the world with a NodePort Service:
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
    # matches the deployment metadata.name field in ingress deployment config file - above
    name: nginx-ingress
```

### Service Account Config
The Ingress controllers have intelligence.  
The Ingress controllers monitor the K8s cluster for ingress resources.  
The Ingress controllers configure the underlying nginx server when something changes.  
The ingress controller requires a service account with "correct" permissions.  
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
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-wear-app
spec:
  # where traffic gets routed to
  backend:
    serviceName: wear-service
    servicePort: 80
```

### Rules
Rules are explicit to deal with routing.  

#### Domain Or HostName 
Traffic can be dealt with by domain or host:
- home.store.com
- learn.store.com

All paths for each domain get routed to the same service, perhaps a single-page app or something like that!  

A Domain-Name Config File:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-wear-app
spec:
  rules:
  # two hosts, 1 service per host
  - host: watch.store.com
    http:
      paths:
        - backend:
            service:
              name: watch-service
              port: 
                number: 80
  - host: learn.store.com
    http:
      paths:
        - backend: 
            service:
              name: learn-service
              port: 
                number: 80
```

#### Path 
- store.com/watch
- store.com/cart


A look at an ingress def file with rules.  
NOTE: No host field in the rules - this applies to all "*" host paths.
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-wear-app
spec:
  rules:
  - http:
      # path-based routing
      paths:
        # each path gets its own backend section
      - path: /watch
        pathType: Prefix
        backend: 
          service: 
            name: watch-service
            port: 
              number: 80
      - path: /learn
        pathType: Prefix
        backend: 
          service: 
            name: learn-service
            port: 
              number: 80
```
Inspect these with `kubectl describe ingress instress-wear-app`. Notice a "default backend"! Deploy that one, default-http-backend or whatever it is called.  

## Consider Re-Writing Urls

```yaml

```
## Useful Commands & References
See [k8s ingress docs](https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types).  
See [Kubectl Commands Docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-ingress-em-) for more, but here's a short list:
```bash
# create an ingress
# kubectl create ingress <ing-name> --rule="host/path=service:port"
kubectl create ingress ing-test --rule="learn.store.com/videos*=videos-service:80"

# create a "catch-all", perhoaps for error handling
kubectl create ingress all-else --class=otheringress --rule="/path=error-service:80"
```

## Things To Be Able To Do  
- Inspect a k8s setup
  - kk get namespaces, find a bunch of namespaces
- get deployments across namespaces
  - `kkg deployments.app --all-namespaces -o wide`
- know that ingress might use a Deployment object
- figure out what namespace...
  - an ingress controller is deployed to
  - a bunch of pods/apps are deployed to
  - an ingress resource is deployed to
- Which namespace is an ingress resource deployed in
  - `kkg ingress --all-namespaces`
- which hosts are configured on an ingress resource
- whats the name of an ingress resource
- what is the backend of an ingress resource
  - `kkd -n <the-namespace> ingress <the-ingress-name>`
- what paths are each service available on
- what services are available at what path
- what service(s) are served on requests to funky backends
- Change an ingress config, serve a service from another route
  - get ingress config into yaml
  - edit yaml per requirement
  - kk delete current ingress -n namespace
  - kk apply -f ingress-def-file.yaml
- create a namespace
- for nginx ingress controller: create a configmap and assign it to a namespace
- for nginx ingress controller: create a service-account and assign it to a namespace
- create a service that...
  - lives in a specified namespace
  - exposes a deployment by name
  - named "ingress"
  - exposes port 80 from the pod port 80
  - is of type NodePort for public accessibility
`kk -n ingress-space expose deployment ingress-controller --name ingress --port=80 --target-port=80 --type=NodePort --dry-run=client -o yaml > svc.yaml`