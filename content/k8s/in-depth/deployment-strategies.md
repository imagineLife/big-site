---
title: Apply Complex Deployment Strategies to A K8s Cluster For More Reliability
parentDir: k8s/in-depth
slug: k8s/in-depth/deployment-strategies
author: Jake Laursen
excerpt: Blue-Green and Canary deployments are not built into K8s, but can be used with some strategic object manipulation
tags: Kubernetes, K8s, deployments, canary, blue/green, deployment strategies
order: 30
---

# Deploying Apps Through a Few Strategies
- [Deploying Apps Through a Few Strategies](#deploying-apps-through-a-few-strategies)
  - [Recreate with Downtime](#recreate-with-downtime)
  - [Rolling Update without Downtime](#rolling-update-without-downtime)
  - [Deploy Then Test Then Redirect Traffic With Blue-Green](#deploy-then-test-then-redirect-traffic-with-blue-green)
    - [Understand the Current state](#understand-the-current-state)
    - [Include labels to the Deployment and the service](#include-labels-to-the-deployment-and-the-service)
    - [Create A New Deployment With The New App Version](#create-a-new-deployment-with-the-new-app-version)
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

  subgraph DPG2["Deployment"]
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

  subgraph Deployment
    LB1
    DP
  end

  subgraph SVC1["Prod Service"]
    LB2
    SVC
  end

  SVCG2 --> DPG2
  SVC1 --> Deployment
  
```


## Canary