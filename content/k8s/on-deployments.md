---
title: On Deployments
parentDir: k8s
slug: k8s/deployments
author: Jake Laursen
excerpt: Deploying the Cluster
tags: ["Kubernetes", "k8s", "deployments"]
order: 6
---

# Deployments
Deployments are 1 "layer" "above" replica sets:

- take 1 web-server
- use many instances of the web-server
- **Opportunities**
  - the web-server dependencies incerease
  - a container has a new version
  - need more instaces to address scaling needs
- **Approaches**
  - rolling upgrades, 1 instance at a time
- **Problems**
  - an error occurs during an upgrade
- **Approaches**
  - rolling downgrades


- [Deployments](#deployments)
  - [K8s Deployment](#k8s-deployment)
    - [Deployment config](#deployment-config)
      - [An example](#an-example)
  - [Updating, Rollouts, and Versioning](#updating-rollouts-and-versioning)
    - [Two Deployment Strategies](#two-deployment-strategies)
      - [Destroy and Create](#destroy-and-create)
      - [One At A Time](#one-at-a-time)
      - [Updating in action](#updating-in-action)
    - [Under The hood](#under-the-hood)
  - [Rolling Back](#rolling-back)
  - [Commands](#commands)
  - [An Example](#an-example-1)
  - [Things To Do](#things-to-do)
## K8s Deployment
K8s deployments can handle all of those issues: scaling, rolling upgrades, rollbacks, etc.  

- container
  - encapsulated in a **pod**
    - multiple pods are in replica sets or **replication controllers**
      - deployments manage replica sets & thus pods

### Deployment config
A yaml file.  
Looks nearly identitcal to a replica-set file, all bu thte `kind` should be `Deployment`.  


#### An example
see 
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  labels:
    tier: frontend
    app: nginx-deployment
spec:
  selector:
    matchLabels:
      app: myapp
  replicas: 3
  template:
    metadata:
      name: nginx-pod
      labels:
        app: myapp
    spec:
      containers:
        - name: nginx-box
          image: nginx
```

run it
```bash
Jakes-4:k8s Jake$ kubectl create -f configs/deps/nx-dep.yml
deployment.apps/first-deployment created

# check it out
Jakes-4:k8s Jake$ kubectl get deployments
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
first-deployment   3/3     3            3           21s

Jakes-4:k8s Jake$ kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
first-deployment-7c76b75db-8wcpk   1/1     Running   0          34s
first-deployment-7c76b75db-w9q5s   1/1     Running   0          34s
first-deployment-7c76b75db-z6q86   1/1     Running   0          34s

# describe it
Jakes-4:k8s Jake$ kubectl describe deployment first-deployment
Name:                   first-deployment
Namespace:              default
CreationTimestamp:      Mon, 27 Jun 2022 18:01:09 -0400
Labels:                 app=nginx
                        tier=frontend
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=myapp
Replicas:               3 desired | 3 updated | 3 total | 3 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=myapp
  Containers:
   nginx-box:
    Image:        nginx
    Port:         <none>
    Host Port:    <none>
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   first-deployment-7c76b75db (3/3 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  73s   deployment-controller  Scaled up replica set first-deployment-7c76b75db to 3

```

Commands review:
```bash
kubectl create -f deployment-def.yml

kubectl get deployments
kubectl get replicaset
kubectl get pods

# a fancy version of the get command
kubectl get all

# on my host machine, this returns...
Jakes-4:k8s Jake$ kubectl get all
NAME                                   READY   STATUS    RESTARTS   AGE
pod/first-deployment-7c76b75db-8wcpk   1/1     Running   0          107s
pod/first-deployment-7c76b75db-w9q5s   1/1     Running   0          107s
pod/first-deployment-7c76b75db-z6q86   1/1     Running   0          107s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   3d3h

NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/first-deployment   3/3     3            3           107s

NAME                                         DESIRED   CURRENT   READY   AGE
replicaset.apps/first-deployment-7c76b75db   3         3         3       107s
```

## Updating, Rollouts, and Versioning
Deployments trigger rollouts with revisions.  
When, say, a container version is updated, a new rollout is created. A new revision is made.  
Rollouts & revisions can help for tracking deployment version history.  

```bash
# see status of a follout
kubectl rollout status <depoloyment-name>

# see history of a rollout
kubectl rollout history <depoloyment-name>
```

### Two Deployment Strategies
#### Destroy and Create
First, detroy all.  
Then, deploy all.  
This causes application downtime.  
This is the `Recreate` strategy.  
This is **not the default strategy**.  

#### One At A Time
The `Rolling` update.  
This is the default deployment strategy.  
Take down 1-at-a-time.  
Replace 1-by-1.  

#### Updating in action
- update a deployment config file
- apply the changes with `kubectl apply -f deploy-file.yml`
- OR
- `kubectl set image deployment/<deployment-name> containername=new:image:tag`
  - NOTE: this does not update the config file, only the running deployment
  - `set image` will update an image of a container
  - `deployment/<deployment-name>` will reference a deployment by name
  - `containername` should match the `spec:template:spec:containers[x]:name`
  - `new:image` should be a valid image with optional tag: `node` and `node:18` both will work to reference 2 difference images

```bash
kubectl describe deployment <deployment-name>
```
NOTE: depending on the rollout strategy, the event log will look different.  

### Under The hood
- deployment object creates a replica set
  - which creates expected pod count
- takes down the old rs one-by-one


## Rolling Back
```bash
kubectl rollout undo deployment<deployment-name>
```
- deployment will destroy pods
- deployment will spin up pods in old/previous replica set

## Commands
```bash
# make a deployment
kubectl create -f dep-file.yml

# see deployment deets
kubectl get deployments

# update a deployment in real time!! with a file
# update the deployment file
# run this
kubectl apply -f new-file-who-dis.yml

# update a deployment in real time!! with the cli
# NOTE: if a deployment definition file was used, 
#   the file will not have the current deployment iteration details included
kubectl set image deployment/<dep-name> imagename:new:image:tag
kubectl set image deployment/init-deployment nginx=nginx:1.9.1

# check rollout status & history
kubectl rollout status deployment/<dep-name>
kubectl rollout history deployment/<dep-name>

# go to previous rollout
kubectl rollout undo deployment/<dep-name>

# pause one!
kubectl rollout pause deployment/<dep-name>

# restart/resume the deployment
kubectl rollout resume deployment/<dep-name>
```


## An Example
```bash
# create a deployment
Jakes-4:k8s Jake$ kubectl create -f configs/deps/nx-dep.yml

# check out the rollout
# NOTE: this needs to be ran FAST to see the output
Jakes-4:k8s Jake$ kubectl rollout status deployment.apps/first-deployment
Waiting for deployment "first-deployment" rollout to finish: 0 of 3 updated replicas are available...
Waiting for deployment "first-deployment" rollout to finish: 1 of 3 updated replicas are available...
Waiting for deployment "first-deployment" rollout to finish: 2 of 3 updated replicas are available...
deployment "first-deployment" successfully rolled out

# check out the history
Jakes-4:k8s Jake$ kubectl rollout history deployment.apps/first-deployment
deployment.apps/first-deployment 
REVISION  CHANGE-CAUSE
1         <none>


# interesting:
# delete and do this
Jakes-4:k8s Jake$ kubectl create -f configs/deps/nx-dep.yml --record
Flag --record has been deprecated, --record will be removed in the future
deployment.apps/first-deployment created

# then check it out
Jakes-4:k8s Jake$ kubectl rollout history deployment.apps/first-deployment
deployment.apps/first-deployment 
REVISION  CHANGE-CAUSE
1         kubectl create --filename=configs/deps/nx-dep.yml --record=true


# edit the config file
Jakes-4:k8s Jake$ kubectl edit deployments first-deployment --record
# set the image to nginx:1.18

# check out the status
Jakes-4:k8s Jake$ kubectl rollout status deployment.apps/first-deployment

# check out the rollout history, see a new line
Jakes-4:k8s Jake$ kubectl rollout history deployment.apps/first-deployment
deployment.apps/first-deployment 
REVISION  CHANGE-CAUSE
1         kubectl create --filename=configs/deps/nx-dep.yml --record=true
2         kubectl edit deployments first-deployment --record=true
```
Also!  
Rollouts can be checked by the "revision" number - use the `--revision` flag in kubectl:
```bash
kubectl rollout history deployment.apps/first-deployment --revision=2
```


## Things To Do
- get the number of pods deployed in a deployment
  - `kubectl get deployments`, see the "Ready" numerator/denominator
- get the image of pods deployed by a deployment
- get a deployment strategy
```bash
controlplane ~ ✖ kk describe deployment | grep Strategy
StrategyType:           RollingUpdate
RollingUpdateStrategy:  25% max unavailable, 25% max surge
```
- edit a deployment: change the image of the containers in a running deployment without taking down any pods && check the deployment status
```bash
 kubectl edit deployments first-deployment --record
#  edit the deployment

kk rollout status deployment.apps/frontend
kk rollout history deployment.apps/frontend
```
- get the allowed pod down percentage of the deployment

```bash
kk describe deployments frontend | grep RollingUpdateStrategy
```
- change the strategy of a running deployment
  - kk describe -o yaml to a yaml file
  - edit the yaml file
    - NOTE: a rollingUpdate strategy changing to a recreate strategy requires removing some extra fields besides the strategy field value
  - 