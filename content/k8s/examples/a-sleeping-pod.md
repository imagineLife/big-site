---
title: Build a Pod that Sleeps
parentDir: k8s/examples
slug: k8s/examples/a-sleepy-pod
author: Jake Laursen
excerpt: Perhaps reasonably simple
tags: Kubernetes, K8s
order: 8
---

Build an image:
- called `my-sleeper`
- runs the busybox image
- in a namespace called `sleepspace`
- call the container `secret`
- make the container only run `sleep 3600`
- set this up so that the pod is scheduled to only run on the `master` node - no other nodes in the cluster
- make the container mount a vol
  - read-only
  - secret
  - called `secret-volume`
  - at path `/etc/secret-volume`


`kubectl run my-sleeper --namespace=sleepspace --image=busybox --command=sleep 3600 --dry-run=client -o yaml > sleeper.yaml`

Update the pod yaml to include the volume:
```yaml
spec:
  volumes:
    - name: secret-volume
      secret:
        secretName: dotfile-secret
  containers:
  # ...the rest of the container lines
    - command:
      - sleep
      - "3600"
    volumeMounts:
    - mountPath: /etc/secret-volume
      name: secret-volume
      readOnly: true
    
```