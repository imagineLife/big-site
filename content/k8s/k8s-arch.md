---
title: Some Architecture Principles for Kubernetes Applications
parentDir: k8s
slug: k8s/k8s-app-arch
shortSlug: k8s-app-arch
author: Jake Laursen
excerpt: Dockerfiles, layers, instructions, args, etc
tags: ["k8s", "Architecture"]
order: 17
---

# Applications In Kubernetes Require Unique Care And Considerations

- Resources are best when decoupled
  - if an API currently does a few "processes" that could each be unique and decoupled, K8s works best when each "process" gets broken-out into its own container/pod etc - many implementation pattern(s) could be applied here
- Resource connection parameters are best when extracted into "environment variables": things like...
  - db host connection strings
  - api urls + ports 
  - conditional frontend production-only build configs + enablement/disablement
- Resources are best when treated as "transient"
  - work to make each "process" able to be trashed
  - K8s DOES offer [StatefulSets](/k8s/in-depth/stateful-sets), which are one way to deal with resources that need to be more "persistent"
- An "allow all" approach is default in K8s for resource communication
  - restricting resource communication from, say, a db to a frontend proxy server (_when the db only needs to allow inbound requests from an api_) is a choice and requires specifc effort to do so
- labels might be the best "go-to" for identifying and "selecting" resources between one another
  - deployments "select" containers by label
  - pods can be more "picky" about which node they get deployed onto with nodeSelectors, which select labels on nodes
  - labels can "group" resources together to meet company + organization needs (_a "frontend" label present on several frontend pods, a "blue/green" set of labels for blue/green deployments for a "growth" team, an "analytics" label for an internal-analytics team across several log pods, etc_)
  - labels can be used to interact with items via kubectl
    - `kubectl delete labelKey=labelValue pod`
- [Multi-Container Pods](/k8s/in-depth/multi-container-pods) are a thing to consider