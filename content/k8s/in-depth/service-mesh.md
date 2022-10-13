---
title: A Brief Overview of Service Meshes
parentDir: k8s/in-depth
slug: k8s/in-depth/service-mesh
author: Jake Laursen
excerpt: An abstract layer of proxies to help with complex network scenarios
tags: Kubernetes, K8s, service mesh
order: 36
---

A Service mesh has
- edge proxies
- embedded proxies
- the proxies handle traffic based on rules from the control plane

Heres 3 service mesh options:
- envoy
  - open-source!
  - [website](https://www.envoyproxy.io)
- istio
  - leverages envoy
  - [website](https://istio.io)
- linkerd
