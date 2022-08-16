---
title: Solve A Problem With A Pod
parentDir: k8s/examples
slug: k8s/examples/solve-a-problem-with-a-pod
author: Jake Laursen
excerpt: This requires a pod with a specific run command, a Config Map with some data, and a volume mount
tags: Kubernetes, K8s
order: 3
---

# Solve a problem with a pod
Create a pod
- named `check-time`
- in a namespace `bg-processes`
- run a container called `time-check` which uses the `busybox` image
- run a command `while true; do date; sleep $TIME_FREQ;done`
- sound write results to `/opt/time/time-check.log`
- mount a vol so that `/opt/time` in the pod writes to this vol

Create a config map
- called `time-config`
- data is `TIME_FREQ=10`
- same namespace

## How
Create the configmap
`kubectl create configmap -n bg-processes time-config --from-literal=TIME_FREQ=10`  

Create the pod 
- `kubectl run time-check --image=busybox --dry-run=client -o yaml > pod.yaml`

