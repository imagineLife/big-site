---
title: Apply Complex Deployment Strategies to A K8s Cluster For More Reliability
parentDir: k8s/in-depth
slug: k8s/in-depth/deployment-strategies
author: Jake Laursen
excerpt: Blue-Green and Canary deployments are not built into K8s, but can be used with some strategic object manipulation
tags: ["Kubernetes", "k8s", "deployment", "canary", "blue/green", "deployment strategies"]
order: 30
---

# Deploying Apps Through a Few Strategies
A Service like [istio](https://istio.io/) is  developed to help address networking issues that may be "beyond the scope" of kubernetes. Istio, or something like it, can help manage network traffic for things like canary deployments.    

- [Deploying Apps Through a Few Strategies](#deploying-apps-through-a-few-strategies)
  - [Recreate with Downtime](#recreate-with-downtime)
  - [Rolling Update without Downtime](#rolling-update-without-downtime)
  - [Deploy Then Test Then Redirect Traffic With Blue-Green](#deploy-then-test-then-redirect-traffic-with-blue-green)
    - [Understand the Current state](#understand-the-current-state)
    - [Include labels to the Deployment and the service](#include-labels-to-the-deployment-and-the-service)
    - [Create A New Deployment With The New App Version](#create-a-new-deployment-with-the-new-app-version)
    - [Adjust the Label Selector on the Production Service](#adjust-the-label-selector-on-the-production-service)
    - [See This In Code](#see-this-in-code)
      - [App Deployment Def V1](#app-deployment-def-v1)
      - [App Service Def V1](#app-service-def-v1)
      - [App Deployment Def V2](#app-deployment-def-v2)
      - [Change Label On Service Def](#change-label-on-service-def)
  - [Canary](#canary)

## Recreate with Downtime
First, destroy all existing versions of the app.  
Then, release new versions.  
Problem: App goes down during the process.  

## Rolling Update without Downtime
Take down 1 instance of the app at a time.  
App never goes down, better than recreate. This is the default in k8s :)  

## Deploy Then Test Then Redirect Traffic With Blue-Green
The new app gets deployed along-side the old one.  
Routing helps here - tests are run on the new version. Once tests pass, routing is redirected to the new app.  
Service Meshes can be helpful here.  

How does this work in K8s?

### Understand the Current state
  - a deployment of pods of the app is present
  - a service routing traffic to the pods is also present

```mermaid
flowchart 
  direction TB
  DP["Deployment"]
  SVC["Service"]

  SVC --> DP
```

### Include labels to the Deployment and the service
Here something like "version:1". Note the wrapper boxes here are just to "tie" the labels to the objects visually.  
The label on the deployment should also be included in the selector in the service definition file. This step can also be done when _creating the objects initially_: maybe including a `version: 1` on both the deployment and service to begin with.  

```mermaid
flowchart 
  direction TB
  
  LB1>"version:1"]
  LB2>"version:1"]
  DP["Deployment Object"]
  SVC["Service Object"]

  subgraph Deployment
    LB1
    DP
  end

  subgraph SVC1["Prod Service"]
    LB2
    SVC
  end

  SVC1 --> Deployment
```

### Create A New Deployment With The New App Version
Deploy a new Deployment of the new version of the app.  
Have the deploymet accessible through a new service, accessible by some folks to test with, perphaps internal dogfooding or something.  

```mermaid
flowchart 
  direction TB
  
  %%
  %%  second section
  %%
  LB3V2>"version:2"]
  LB4V2>"version:2"]
  DP2["Deployment Object"]
  SVC2["Service Object"]

  subgraph DPG2[" QA/Test Deployment"]
    LB3V2
    DP2
  end

  subgraph SVCG2["QA/Test Service"]
    LB4V2
    SVC2
  end


  %%
  %%  first section
  %%
  LB1>"version:1"]
  LB2>"version:1"]
  DP["Deployment Object"]
  SVC["Service Object"]

  subgraph PRDP["Prod Deployment"]
    LB1
    DP
  end

  subgraph SVC1["Prod Service"]
    LB2
    SVC
  end

  SVCG2 --> DPG2
  SVC1 --> PRDP
```

### Adjust the Label Selector on the Production Service
Tell the Production service to matchLabels for the new version.  
This will leave...
- the qa service talking to the qa/latest instance of the app stil
- the prod service talking to the latest instance of the app
- the previous deployment of the app "dangling" without incoming traffic

```mermaid
flowchart 
  direction TB
  
  %%
  %%  second section
  %%
  LB3V2>"version:2"]
  LB4V2>"version:2"]
  DP2["Deployment Object"]
  SVC2["Service Object"]

  subgraph DPG2[" (was) QA/Test Deployment"]
    LB3V2
    DP2
  end

  subgraph SVCG2["QA/Test Service"]
    LB4V2
    SVC2
  end


  %%
  %%  first section
  %%
  LB1>"version:1"]
  LB2>"version:1"]
  DP["Deployment Object"]
  SVC["Service Object"]

  subgraph PRDP["(was) Prod Deployment"]
    LB1
    DP
  end

  subgraph SVC1["Prod Service"]
    LB2
    SVC
  end

  SVCG2 --> DPG2
  SVC1 --> DPG2
```

### See This In Code
#### App Deployment Def V1
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
  labels:
    app: webapp
    type: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      version: 1
  template:
    metadata:
      name: webapp-pod
      labels:
        version: 1
    spec:
      containers:
        - name: webapp-box
          image: web-api:1
```

#### App Service Def V1
```yaml
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  selector:
    version: 1
```

#### App Deployment Def V2
This would be the new version of the deployment.  
Here, Colors can be used to decipher the deployments from one-another. ROYGBIV might be useful for matching colors to objects in "order".  
The differences here from the first version are:
- the dpeloyment name
- the deployment selector label value
- the pod label
- the container image version


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment-green
  labels:
    app: webapp
    type: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      version: 2
  template:
    metadata:
      name: webapp-pod
      labels:
        version: 2
    spec:
      containers:
        - name: webapp-box
          image: web-api:2
```

#### Change Label On Service Def
Same file as v1 above, just a new `spec:selector:version` value.  

```yaml
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  selector:
    version: 2
```

## Canary
- Canary, like blue-green, deploys both current + "future" instances of the app
- Canary, unlike blue-green, routes traffic to _both_ the "current" and "future" version of the app && the "future" version is referred to as the canary version
- Canary routes a _little bit of traffic_ to the new version for a time, retaining traffic to the current version as well


A Point of Knowledge here: Services distribute traffic "evenly" across pods: 4 pods, each get 25% of the traffic - 5 pods, each get 20%, etc.  

- spin up the current version deployment, the current service, and a new deployment with the new canary version of the pods/apps
- Add a common label to both deployments, something like `midCanary: true` or something
- here, if both deployments have the same number of pods, the service will route 50/50 to each deployment
  - One way to do this: leverage the "natural order" of how services route traffic by having something like 4 pods in the "current" deployment and 1 pod in the "canary" deployment
  - Another way, 
