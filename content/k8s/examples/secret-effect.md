---
title: A Secret Mounted to a Pod in Kubernetes
parentDir: k8s/examples
slug: k8s/examples/secrets-in-action
author: Jake Laursen
excerpt: Encoding a string, Creating a Secret Object, And Mounting the secret to a pod
tags: ["k8s", "secrets", "volumes", "mounts", "encoding"]
order: 16
---

Here
- a mock password will be encoded
- a kubernetes secret object will be created using the encoded pw
- a pod will mount the secret via a volume
- a container in the pod will use the mounted secret
- the pod will be shelled into and reveal the mounted secret


### 1. encode a pwd
```bash
$ echo secret-password | base64
c2VjcmV0LXBhc3N3b3JkCg==
```

### 2. Create a Secret Object
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-pw
data:
  # the VALUE here is the encoded string from above, in step 1
  pw: c2VjcmV0LXBhc3N3b3JkCg==
```
```bash
kubectl create -f the-secret.yaml

# show the secret
kubectl get secrets
NAME        TYPE     DATA   AGE
secret-pw   Opaque   1      XXs
```

### 3. Mount the secret to the pod and container
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-secret
spec:
  securityContext:
    runAsUser: 1000
  containers:
  - name: container-with-secret
    image: busybox
    command:
      - sleep
      - "3600"
    securityContext:
      runAsUser: 2000
      allowPrivilegeEscalation: false
    volumeMounts:
    - name: sql
      mountPath: /sqlpw
  volumes:
  - name: sql
  secret:
    # this matches the metadata.name of the scret object
    secretName: secret-pw
```

### 4. Inspect the secret in the pod
```bash
# create the pod with the secret
$ kubectl create -f pod-with-secret.yaml

# shell into the pod
$ kubectl exec -it pod-with-secret -- /bin/sh

# find + show the mounted volume dir as defined in the pod "spec.containers[0].volumeMounts[0].mountPath" location
$ ls
# should show the 'sqlpw' as one of the directories here
$ ls sqlpw/
# should show 'pw' as a nested dir here

# NOW, reveal the secret, decoded, available in the pod!
# ... in clear text!
$ cat sqlpw/pw
secret-password
```