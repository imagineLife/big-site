---
title: Setup A Pod To Deploy To A Specific Tainted Node
parentDir: k8s/examples
slug: k8s/examples/deployment-to-node
author: Jake Laursen
excerpt: Taint a node and deploy a pod with a toleration to the tainted node
tags: ["k8s", "node", "pod", "taint", "toleration"]
order: 11
---

Add a taint to a node, node `firstnode`.  
keu of `app_type`.  
value of `alpha`.  
Set the effect to `NoSchedule`.  

Create a pod.  
- named `alpha`
- use image `node:alpine`
- tolerate the `firstnode` node