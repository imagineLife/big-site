---
title: 
parentDir: k8s/examples
slug: k8s/examples/detailed-redis-deployment
author: Jake Laursen
excerpt: 
tags: Kubernetes, K8s, deployment, redis, resources
order: 5
---

# Create A Deployment
- called `redis`
- use image `redis:alpine`
- have 1 replica
- request `.2` pu units
- have a label `app` set to `redis`
- mount 2 volumes
  - an empty directory volume called `data` at path `/redis-master-data`
  - a configmap volum called `redis-config` at path `/redis-master`
- expose port `6379`