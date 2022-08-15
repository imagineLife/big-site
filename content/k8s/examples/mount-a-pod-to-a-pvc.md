---
title: 
parentDir: k8s/examples
slug: k8s/examples/add-a-vol-to-a-pod
author: Jake Laursen
excerpt: 
tags: Kubernetes, K8s
order: 2
---


# Create A PV
Create a Persistent Volume called log-volume.  
It should make use of a storage class name manual.  
It should use RWX as the access mode and have a size of 1Gi.  
The volume should use the hostPath /opt/volume/nginx.  

Next, create a PVC called log-claim requesting a minimum of 200Mi of storage. This PVC should bind to log-volume.

Mount this in a pod called logger at the location /var/www/nginx. This pod should use the image nginx:alpine.

## Steps To Make It Happen
- Seach the docs for a pv yaml example
- create pv.yaml
- copy/paste the example from the docs into the pv.yaml
