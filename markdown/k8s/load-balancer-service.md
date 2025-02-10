---
title: Balancing Network Traffic across many Pods with the LoadBalancer Service
parentDir: k8s
slug: k8s/load-balancer-service
shortSlug: load-balancer-service
author: Jake Laursen
excerpt: Not much here
tags: ["Kubernetes", "k8s", "services", "load balancer"]
order: 11
---

# LoadBalancer
Sit between the "frontend" apps and the world.  
NodePorts accept traffic on ports.  
Users need 1 url to access frontend apps.  
- The passes requests to cloud providers
- The Address that is created becomes available to the public
- Traffic is spread across pods (_balancing the network load_)

## 3rd Party Clouds Support LoadBalancers

- [LoadBalancer](#loadbalancer)
  - [3rd Party Clouds Support LoadBalancers](#3rd-party-clouds-support-loadbalancers)
  - [Dont Forget about ExternalName Services](#dont-forget-about-externalname-services)

## Dont Forget about ExternalName Services
[K8s docs](https://kubernetes.io/docs/concepts/services-networking/service/#externalname)    
These map a service to a dns name.   

```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-svc
  namespace: production
spec:
  type: ExternalName
  externalName: my.database.example.com
```