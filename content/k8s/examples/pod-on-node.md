---
title: Build a Pod to Spec And Deploy On A Specific Node
parentDir: k8s/examples
slug: k8s/examples/pod-on-a-node
author: Jake Laursen
excerpt: Some Pod Details and a node detail
tags: Kubernetes, K8s, pod, deployment, node
order: 7
---
Create a pod called my-busybox in the dev2406 namespace using the busybox image. The container should be called secret and should sleep for 3600 seconds.
The container should mount a read-only secret volume called secret-volume at the path /etc/secret-volume. The secret being mounted has already been created for you and is called dotfile-secret.
Make sure that the pod is scheduled on controlplane and no other node in the cluster.

An Incomplete attempt - forgot a few deets
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
  containers:
  - image: busybox
    name: my-busybox
    volumeMounts:
    - name: secret-volume
      mountPath: "/etc/secret-volume"
      readOnly: true
  nodeSelector:
    roles: control-plane
  volumes:
  - name: secret-volume
    secret:
      secretName: dotfile-secret
      optional: false # default setting; "mysecret" must exist
```
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
  nodeSelector:
    kubernetes.io/hostname: controlplane
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