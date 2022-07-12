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
Here, ConfigMaps and Secrets!

- [Env Vars](#env-vars)
  - [Plain Key Value Pair Format](#plain-key-value-pair-format)
  - [ConfigMap Format](#configmap-format)
    - [Reference ConfigMap file for all Env Var Keys and Values](#reference-configmap-file-for-all-env-var-keys-and-values)
    - [Using ConfigMaps in Pod Definition files](#using-configmaps-in-pod-definition-files)
    - [An Example ConfigMap file](#an-example-configmap-file)
    - [Creating configmaps Imperatively](#creating-configmaps-imperatively)
    - [Creating ConfigMaps Declaratively](#creating-configmaps-declaratively)
    - [Inspecting Config Maps](#inspecting-config-maps)
    - [ConfigMap Tasks](#configmap-tasks)
  - [SecretKey Format](#secretkey-format)
    - [Why Secrets Instead of ConfigMaps](#why-secrets-instead-of-configmaps)
    - [Creating Secrets Imperatively](#creating-secrets-imperatively)
    - [Creating Secrets Declaratively](#creating-secrets-declaratively)
      - [Encoding and Decoding Values with linux](#encoding-and-decoding-values-with-linux)
      - [A Secrets yaml def](#a-secrets-yaml-def)
    - [See Secret Obejcts](#see-secret-obejcts)
    - [Config a Secrets Object with a Pod](#config-a-secrets-object-with-a-pod)
    - [Secreet Things To Be Able To Do](#secreet-things-to-be-able-to-do)
    - [Secrets and Security](#secrets-and-security)

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
- create a configmap from the cli, without a file, with one env var value: `kubectl create configmap webapp-config-map --from-literal=ENV_KEY_NAME=env-key-value --from-literal=ANOTHER_VAR=another-val`
- understand and get env var keys & values from a running pod: `kubectl describe pod <pod-name-here>` && find the env var section


## SecretKey Format

### Why Secrets Instead of ConfigMaps
Config Maps are cleartext.  
Secrets are encoded!  

### Creating Secrets Imperatively
This syntax is very similar to the configmap syntax:  
```bash
kubectl creat secret generic my-secrets \
  --from-literal=DB_HOST=db_name_here
  --from-literal=DB_USER=db_user_here

# another in-between imperadeclarative
kubectl create secret generic my-secrets \
  --from-file=app-secrets.yaml
```

### Creating Secrets Declaratively
Create a yaml file.

A Pre-requisite, though - the data values must be encoded (_not sure how it "knows" that the contents are encoded though!_)  

#### Encoding and Decoding Values with linux
The Linux cli can be used to encode values:

```bash
echo -n 'my_db_name' | base64
bXlfZGJfbmFtZQ==
```
Run this for all the env vars needed (_maybe make a bash script file as a side-project?_) and then the resulting garbly-gook encoded strings can be used in the yaml file.  

To decode these, use the same command, but with the encoded value and a `--decode` flag:
```bash
echo -n 'bXlfZGJfbmFtZQ==' | base64 --decode
```
#### A Secrets yaml def
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secrets

# NOTE: no spec here! just data
data:
  # value taken from linux base64 output example aboce
  DB_NAME: bXlfZGJfbmFtZQ==
```


### See Secret Obejcts
```bash
# summary
kubectl get secrets
NAME          TYPE    DATA     AGE
horse-secret  Opaque  3         10m

# details with key names
kubectl describe secrets

# details with keys + values
kubect get secret horse-secret -o yaml
# will return the yaml output
```

### Config a Secrets Object with a Pod
Seems like secrets first, then pods:
here, with the envFrom approach:
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
        - secretRef:
          # use the secret name here
            name: horse-secret
```

here, with the single-val approach:
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
      env:
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: horse-secret
              key: DB_HOST
```

here, with the volume approach - note that each secret attr is created as a file with the value of the secret as its content:  `/opt/horse-secret-vol/DB_HOST` will have a value of something like `bXlfZGJfbmFtZQ==` in it:  

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
      volumes:
        - name: app-secret-vol
          secret:
            secretName: horse-secret
```

### Secreet Things To Be Able To Do
Find how many secret objects in an env:
```bash
kubect get secrets
```
Find how many secret vals are in a secret obj:
```bash
kubect describe secret <secret-object-name>
# for a more detailed expression of the secret obj
```
- fix a busted pod due to secrets
  - create a secret
    - named secret-horse
    - pass a few env vars
  - get a yaml file from a running pod
  - edit the yaml to include secrets from a k8s secrets object
  - stop + start the "same" pod with the env vars
```bash
# create a secret
kubectl create secret generic secret-horse \
  --from-literal=HOST=water \
  --from-literal=UN=juice \
  --from-literal=PW=box \

# create a yaml from a running pod name busted
# writing to a file called "qwer.yaml"
kubectl get pod busted -o yaml > qwer.yaml  


# update the pod def file to source env vars from the above k8s secret object
vi qwer.yaml

# basically, append this 
spec:
  containers:
  #  ... the rest of the container definition
    envFrom:
    - secretRef:
        name: secret-horse

# then, connect this to the pod
kubectl apply -f qwer.yaml
```
### Secrets and Security