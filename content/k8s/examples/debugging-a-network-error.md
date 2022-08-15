---
title: K8s Example - Create An NginX Volume Alongside A Volume for logging
parentDir: k8s/in-depth
slug: practice-k8s/
author: Jake Laursen
excerpt: Create a PV, a PVC, and a pod to all work together
tags: Kubernetes, K8s
order: 1
---

## ToDo
### Create A PV
Create a Persistent Volume called log-volume.  
It should make use of a storage class name manual.  
It should use RWX as the access mode and have a size of 1Gi.  
The volume should use the hostPath /opt/volume/nginx.  

Next, create a PVC called log-claim requesting a minimum of 200Mi of storage. This PVC should bind to log-volume.

Mount this in a pod called logger at the location /var/www/nginx. This pod should use the image nginx:alpine.

#### How
- Seach the docs for a pv yaml example
- create pv.yaml
- copy/paste the example from the docs into the pv.yaml



### Debug A Pod And A Service Error
Deployed are two things: 
- a pod called secure-pod 
- a service called secure-service 

Incoming or Outgoing connections to this pod are not working.
Troubleshoot why this is happening.

Make sure that incoming connection from the pod webapp-color are successful.  

#### How
- Review pods with `kubectl get pods`
- Review services with `kubectl get svc`
- Debug a pod-to-service connection: 
  - Connect to one of the pods, `webapp-color`, and see if the other pod's service is reachable by service name from within the webapp-color pod
    - `kubectl exec -it webapp-color sh`
    - `nc -z -v secure-service 80`: this times-out in an example, indicating the network connection is being blocked
- check policies, `kubectl get netpol`
  - find a policy & inspect that with `kubectl describe netlpol <policy-name>`
  - hmm
- create a new policy to allow connection between the `webpapp-color` pod and the `secure-pod`
  - use example policy as a template for the new one
  - `kubect get <cur-policy-name> -o yaml > new-pol.yaml`
  - edit the new policy
    - `metadata:name: allow-webapp`
    - namespace to default
    - some of the yaml contents here...

```yaml
spec:
  podSelector:
    matchLabels:
      run: secure-pod
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          name: webapp-color
  ports:
  - protocol: TCP
    port: 80
```
- apply the config `kubectl apply -f new-pol.yaml`
- validate that the webapp-color pod can talk to the 
