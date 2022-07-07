---
title: Deploy a Microservice Set of Applications with K8s and Deployments
parentDir: k8s
slug: k8s/microservice-with-deployments
author: Jake Laursen
excerpt: Use Kubernetes Deployment Objects to deploy replica sets of each service in a microservice-style application
tags: Kubernetes, K8s, Microservices, deployments
order: 14
---

# From Sensitive Single-Pod Deployments to Replica Set Resilliancy
In a [previous post](/k8s/microservice-demo), a k8s cluster manages a handful of objects:
- 5 pods, each 1 "service" in a "microservice" style application
- 4 services, allowing explicit connectivity between the pods
  - 2 open-to-the-world services, webapps
  - 2 internal-only data stores, postgres and redis

This style of deployment is great for illustrating one "simple" way of deploying apps with pods, services, and kubernetes - for me specifically using minukube and k8s in docker, due to my current M1 mac restrictions and some online suggestions!  

- [From Sensitive Single-Pod Deployments to Replica Set Resilliancy](#from-sensitive-single-pod-deployments-to-replica-set-resilliancy)
  - [More Pods for Frontend Apps](#more-pods-for-frontend-apps)
  - [Comparing Pod-Based Deployments to Deployment-Managed Deployemnts](#comparing-pod-based-deployments-to-deployment-managed-deployemnts)
## More Pods for Frontend Apps
Here, The frontend-facing apps (_voting-app and result-app_) will get replica-sets through deployments. Deployments will "manage" the replica sets of the pods.  

## Comparing Pod-Based Deployments to Deployment-Managed Deployemnts  
In some ways, using kubernetes deployemnt objects is "easier" that pod definition files. Deployments at least have more features:  
- the deployment will "manage" pods with a bit more automation than manual pod management
- the deployment config file can include the number of replica pods to manage
  - when 1+ pod(s) "dies" in a deployment, it gets automagically re-created by k8s

The deployment of the pods and services is also a bit different between this deployment-managed approach and a single-od-deployment approach:
- in a single-pod approach, each pod gets a definition file and a deploy command
- in a deployment-managed approach each **deployment** gets a definition file and a deploy command
  - the difference here is implicit in that each deployment can have many pods per single definition file!!

