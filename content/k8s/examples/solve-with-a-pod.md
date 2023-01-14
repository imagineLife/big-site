---
title: Solve A Problem With A Pod
parentDir: k8s/examples
slug: k8s/examples/solve-a-problem-with-a-pod
author: Jake Laursen
excerpt: This requires a pod with a specific run command, a Config Map with some data, and a volume mount
tags: ["Kubernetes", "K8s"]
order: 3
---

# Solve a problem with a pod
Create a pod
- named `check-time`
- in a namespace `bgprocesses`
- run a container called `time-check` which uses the `busybox` image
- run a command `while true; do date; sleep $TIME_FREQ;done`
- should write results to `/opt/time/time-check.log`
- mount a vol so that `/opt/time` in the pod writes to this vol

Create a config map
- called `time-config`
- data is `TIME_FREQ=10`
- same namespace

## How
First, create the namespace: `kubectl create namespace bgprocesses`.  
### Create a configmap
`kubectl create configmap -n bgprocesses time-config --from-literal=TIME_FREQ=10`  

### Create A Pod
- `kubectl run time-check --image=busybox --namespace=bgprocesses --dry-run=client -o yaml > pod.yaml`
Edit the yaml to look something like...

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: check-time
  namespace: bgprocesses
spec:
  # create a volume
  volumes:
    - name: this-vol
  containers:
    - image: busybox
      name: check-time
      # set && 'pass' the env var to the container
      env:
      - name: TIME_FREQ
        valueFrom:
          configMapKeyRef:
            name: time-config
            key: TIME_FREQ
      # set the running command
      command: [ "/bin/sh", "-c", "while true; do date; sleep $TIME_FREQ; done > /opt/time/time-check.log" ]
      # mount the vol
      volumeMounts:
      - mountPath: /opt/time
        name: this-vol

```

# Add some Checks To A Pod
Use K8s to...
- determine when the pod is ready