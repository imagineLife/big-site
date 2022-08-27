---
title: Build a Pod that Sleeps
parentDir: k8s/examples
slug: k8s/examples/a-sleepy-pod
author: Jake Laursen
excerpt: Perhaps reasonably simple
tags: Kubernetes, K8s
order: 9
---

# Set Up A Node
Apply a label app_type=beta to node controlplane. 

# Create A Deployment
Create a new deployment called beta-apps with image: nginx and replicas: 3. 
**Set Node Affinity to the deployment to place the PODs on controlplane only.**  
