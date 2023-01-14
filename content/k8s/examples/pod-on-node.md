---
title: Build a Pod to Spec And Deploy On A Specific Node
parentDir: k8s/examples
slug: k8s/examples/pod-on-a-node
author: Jake Laursen
excerpt: Some Pod Details and a node detail
tags: ["Kubernetes", "K8s", "pod", "deployment", "node"]
order: 7
---
Create a pod 
- called my-busybox 
- in a namespace `frontend` 
- using the busybox image 
- The container should 
  - be called `sleeper` 
  - sleep for 3600 seconds
  - mount a read-only secret volume called `secret-volume` at the path /etc/secret-volume
  - assume The secret being mounted has already been created for you and is called dotfile-secret
  - make sure that the pod is scheduled on `controlplane` and no other node in the cluster

One way to do it - 

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: my-busybox
  name: my-busybox
  namespace: dev2406
spec:
  volumes:
  - name: secret-volume
    secret:
      secretName: dotfile-secret
  # THIS! 
  nodeSelector:
    kubernetes.io/hostname: controlplane
  # ... and this!
  tolerations:
  - key: "node-role.kubernetes.io/master"
    operator: "Exists"
    effect: "NoSchedule"
  containers:
  - command:
    - sleep
    args:
    - "3600"
    image: busybox
    name: secret
    volumeMounts:
    - name: secret-volume
      readOnly: true
      mountPath: "/etc/secret-volume"
```