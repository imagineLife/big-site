---
title: Introduce Flexibility into Kubernetes Objects with Environment Variables
parentDir: k8s/in-depth
slug: k8s/in-depth/env-vars
author: Jake Laursen
excerpt: Pull dynamic values out of hard-coded object defclaration with Environment Variables
tags: Kubernetes, K8s, environment, variables
order: 5
---

# Env Vars
Start with a pod definition file
```yaml
# cfgs/pods/webapp.yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp-color
      ports:
        - containerPort: 8080
```

There are a few different ways to introduce env vars.  

## Plain Key Value Pair Format
Here, the env var is put in the object definition file in a list format under an env key in the container definition:
```yaml
# cfgs/pods/webapp.yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      # HERE! are env vars
      env:
        - name: APP_COLOR
          value: pink
```

## ConfigMap Format
Here, env var values are pulled out from the object definition file into a unique definition file.  
The separate env var file is then _referenced_ in the env object. 

Here, an external configMap file is referenced for a single env var ->
```yaml
# cfgs/pods/webapp.yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      # HERE! are env vars
      env:
        - name: APP_COLOR
          valueFrom:
            configMapKeyRef: file.here.yaml
```

### Reference ConfigMap file for all Env Var Keys and Values
Consider a (_growing nuisance_) pod that needs several env vars - and perhaps imagine several different pods that need the same or similar env vars
```yaml
# cfgs/pods/webapp.yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      # HERE! are env vars
      env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef: file.here.yaml
        - name: DB_NAME
          valueFrom:
            configMapKeyRef: file.here.yaml
        - name: DB_USER
          valueFrom:
            configMapKeyRef: file.here.yaml
        - name: DB_PW
          valueFrom:
            configMapKeyRef: file.here.yaml
        - name: DB_PORT
          valueFrom:
            configMapKeyRef: file.here.yaml
        - name: REDIS_HOST
          valueFrom:
            configMapKeyRef: file.here.yaml
        - name: REDIS_PORT
          valueFrom:
            configMapKeyRef: file.here.yaml
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef: file.here.yaml
```

This copy-paste env var formatting can become tedious to maintain.  

ConfigMap to the rescue.  

### Using ConfigMaps in Pod Definition files
```yaml
# cfgs/pods/webapp.yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      envFrom:
        - configMapRef:
            # maybe 1 env file for all pods?! 
            name: config-file-name-here
```

### An Example ConfigMap file
```yaml
DB_HOST: db
DB_NAME: my_db
DB_USER: my_db_user
DB_PW: ThisIsAPassword123!
DB_PORT: 8675309
REDIS_HOST: redis
REDIS_PORT: 1234
NODE_ENV: practice
```

### Creating configmaps Imperatively
```bash
# imperative creation
# the configMap name is my-config-map
kubectl create configmap my-config-map \
  --from-literal=DB_HOST=db \
  --from-literal=DB_NAME=my_db \
  --from-literal=DB_USER=my_db_user \
  # ...etc
```

Here, an "in-between" of imperative and declarative way of building ConfigMaps:
```bash
kubectl create configmap my-config-map \
  --from-file=config-map.yaml
```

### Creating ConfigMaps Declaratively
```yaml
# config-map.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config-map
# INTERSTING DETAIL, no spec
data:
  DB_HOST: db
  DB_NAME: my_db
  DB_USER: my_db_user
  DB_PW: ThisIsAPassword123!
  DB_PORT: 8675309
  REDIS_HOST: redis
  REDIS_PORT: 1234
  NODE_ENV: practice
```

```bash
# declarative use
kubectl create -f config-map.yaml
```

### Inspecting Config Maps
```bash
# view
kubectl get configmaps

# list config details & values
kubectl describe configmaps
```

### ConfigMap Tasks
Be able to do things like...
- create a pod definition file from a running pod && save to a yaml file
```bash
kubectl get pod horse-pod -o yaml > horse.yaml
```
- see how many configmaps are running in an env from the cli
- see a configMap value set from the cli: `kubectl describe configmaps the-config-map-name`
- create a configmap from the cli, without a file, with one env var value: `kubectl create configmap webapp-config-map --from-literal=APP_COLOR=darkblue`
- understand and get env var keys & values from a running pod: `kubectl describe pod <pod-name-here>` && find the env var section


## SecretKey Format
This is similar to the ConfigMap format, where the values of each env var are pulled out of the (pod/rs/deployment) definition file and stored elsewhere. The env file is again referenced in the object definiton file:  
```yaml
# cfgs/pods/webapp.yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-pod-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      # HERE! are env vars
      env:
        - name: APP_COLOR
          valueFrom:
            secretKeyRef: file.here.yaml
```