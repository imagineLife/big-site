---
title: Build An Ingress to Meet Some Access Needs
parentDir: k8s/examples
slug: k8s/examples/build-an-ingress
author: Jake Laursen
excerpt: Route Traffic from multiple backend services to multiple urls
tags: ["Kubernetes", "k8s", "ingress", "routing"]
order: 6
---
Create an ingress resource 
- called `watch-and-buy`
- routes HTTP traffic to multiple hostnames
  - a service `video-service` should be accessible on `http://watch.ecom-store.com:30093/video`
  - a service `apparels-service` should be accessible on `http://apparels.ecom-store.com:30093/wear`
  - NOTE: `30093` is the port used by the Ingress Controller

# 
```yaml
kind: Ingress
apiVersion: networking.k8s.io/v1
metadata:
  name: ingress-vh-routing
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: watch.ecom-store.com
    http:
      paths:
      - pathType: Prefix
        path: "/video"
        backend:
          service:
            name: video-service
            port:
              number: 8080
  - host: apparels.ecom-store.com
    http:
      paths:
      - pathType: Prefix
        path: "/wear"
        backend:
          service:
            name: apparels-service
            port:
              number: 8080
```