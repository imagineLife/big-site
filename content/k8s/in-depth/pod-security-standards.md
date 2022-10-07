---
title: Three policies that broadly cover security options for pods in a Kubernetes Cluster
parentDir: k8s/in-depth
slug: k8s/in-depth/pod-security-standards
author: Jake Laursen
excerpt: Namespaces can contain one-of-three pod-security labels that give broad summaries of "levels" of pod security
tags: Kubernetes, K8s, volumes, lifecycle
order: 35
---

# Pod Security Standards
[K8s docs on the topic](https://kubernetes.io/docs/concepts/security/pod-security-standards).  
Pod Security Gets defined at the namespace level.  
3 Examples:
- privileged
- baseline
- restricted

```yaml
# Privileged
# pods here can do a lot
apiVersion: v1
kind: Namespace
metadata: 
  name: freebird
  labels:
    pod-security.kubernetes.io/enforce: privileged
    pod-security.kubernetes.io/enforce-version: latest
```

```yaml
# Baseline
# some restrictions apply
apiVersion: v1
kind: Namespace
metadata:
  name: basespace
  labels:
    pod-security.kubernetes.io/enforce: baseline
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/warn: baseline
    pod-security.kubernetes.io/warn-version: latest
```

```yaml
# Restricted
# the most restricted, apparently this is the best-practice
apiVersion: v1
kind: Namespace
metadata:
  name: restrictedspace
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/warn: restricted
    pod-security.kubernetes.io/warn-version: latest
```