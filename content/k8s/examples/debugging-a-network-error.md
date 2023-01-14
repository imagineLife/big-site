---
title: 
parentDir: k8s/examples
slug: k8s/examples/debugging-a-network-error
author: Jake Laursen
excerpt: 
tags: ["Kubernetes", "K8s"]
order: 1
---
# Debug A Pod And A Service Error
Deployed on a cluster & node are two things: 
- a pod called secure-pod 
- a service called secure-service 

Incoming or Outgoing connections to this pod are not working.
Troubleshoot why this is happening.  

Make sure that incoming connection from the pod webapp-color are successful.  

## Steps To Debug And Fix
From webapp-color to the secure-service.  

- Review pods with `kubectl get pods`
- Review services with `kubectl get svc`
- Debug a pod-to-service connection: 
  - Connect to one of the pods, `webapp-color`, and see if the other pod's service is reachable by service name from within the webapp-color pod
    - `kubectl exec -it webapp-color sh`
    - network request, here with netcat, `nc -z -v secure-service 80`: this times-out in an example, indicating the network connection is being blocked
      - try with wget next, it is built-in i think
- check policies, `kubectl get netpol`
  - find a policy called `deny-all` & inspect that with `kubectl describe netlpol deny-all`
  - hmm
- create a new policy to allow connection between the `webpapp-color` pod and the `secure-pod`
  - use a current `deny-all` policy as a template for the new one
  - `kubect get <cur-policy-name> -o yaml > new-pol.yaml`
  - edit the new policy
    - `metadata:name: allow-webapp`
    - namespace to default

```yaml
# deny-all.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: default
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

Switch those details to 
```yaml
# color-to-secure.yaml

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: my-ingress
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
