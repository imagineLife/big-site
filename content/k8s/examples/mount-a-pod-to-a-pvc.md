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


```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: task-pv-volume
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data
```
NOTE: no quotes around the path string.  


pvc
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: log-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 200Mi
```

pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: task-pv-pod
spec:
  volumes:
    - name: task-pv-storage
      persistentVolumeClaim:
        claimName: task-pv-claim
  containers:
    - name: task-pv-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: task-pv-storage
```

- once the pvc is mounted to a pod and bound to a pv, the pvc cannot be deleted: the pvc will "hang" in "terminating" state