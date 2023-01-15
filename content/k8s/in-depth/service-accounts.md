---
title: Service Accounts Provide Identity To Container Processes
parentDir: k8s/in-depth
slug: k8s/in-depth/service-accounts
author: Jake Laursen
excerpt: Service accounts, intended to be used by machines and not humans, can be used for things like getting cluster data from within the cluster itself
tags: ["Kubernetes", "k8s", "Security", "Docker", "Users", "Privileges"]
order: 7
---

# Kubernetes Service Accounts
According to the [K8s docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/),  
`A service account provides an identity for processes that run in a Pod.`  

There are two Types of accounts in K8s:
- **User accounts** are used by humans
  - an admin accesses a cluster
  - a dev accesses the cluster to deploy an app
- **Service accounts** are used by machines
  - an app accesses a cluster (_prometheus_)
  - jenkins deploys apps after pipelines

An Example:
- a K8s Dashboard app, a python app
- gets a list of pods in the cluster
- displays pods on a webpage
- Uses a service account
- Uses the [token](#comes-with-a-token) that comes along with the service account to make REST calls to the k8s api for dashboard info

Here, the service account would be used by the app to "talk to" the cluster and get cluster details to show in the resulting app webpage.  <br/><br/>


- [Kubernetes Service Accounts](#kubernetes-service-accounts)
  - [Create a Service Account](#create-a-service-account)
    - [Comes with a Token](#comes-with-a-token)
    - [Comes with a Secret Object](#comes-with-a-secret-object)
  - [Inspect The Elemens](#inspect-the-elemens)
    - [All Service Accounts](#all-service-accounts)
    - [One Service Account](#one-service-account)
    - [One Secret](#one-secret)
  - [Using the Secret Token During a K8s REST API Request](#using-the-secret-token-during-a-k8s-rest-api-request)
  - [Hosting A K8s App In A Cluster That Uses A Service Account](#hosting-a-k8s-app-in-a-cluster-that-uses-a-service-account)
    - [Leverage the Default Service Account and Default Secret](#leverage-the-default-service-account-and-default-secret)
  - [An Example Of A Dashboard App Pod And A Service Account](#an-example-of-a-dashboard-app-pod-and-a-service-account)
  - [Binding A Service Account To A Cluster Role](#binding-a-service-account-to-a-cluster-role)
  - [Things to be able to do](#things-to-be-able-to-do)
## Create a Service Account
```yaml
kubectl create service account dashboard-sa
```
### Comes with a Token
Creating a service account also builds a token for the account.  

### Comes with a Secret Object
The token is stored in a k8s secret object.  
This K8s secret object name can be inspected by [inspecting a service account](#inspect-one-service-account).


## Inspect The Elemens 
### All Service Accounts
```bash
# show 1-liners, 1 for each account
kubectl get serviceaccount
```


### One Service Account
```bash
# kubectl describe serviceaccount <account-name>
kubectl describe serviceaccount cicd-user
Name:                       cicd-user
Namespace:                  default
Labels:                     <none>
Annotations:                <none>
Image pull secrets:         <none>
Mountable secrets:          some-string-here-qwer
Tokens:                     some-string-here-qwer
Events:                     <none>
```

### One Secret
The above service account includes a token, which is stored in a K8s secret object, for the service account `cicd-user`. The k8s secret object is named `some-string-here-qwer`. This object can be inspected to reveal the token stored within it:  
```bash
kubectl describe secret some-string-here-qwer

Name:           some-string-here-qwer
Namespace:      default
Labels:         <none>

Type:           kubernetes.io/service-account-token

Data
===
ca.cart:        1025 bytes
namespace:      7 bytes
token:
eyONUGNlugnuyfv5bjy8gB*&Gbkubg.TVI^&FKUbkyugvj6vfb 
```

## Using the Secret Token During a K8s REST API Request
```bash
curl https://k8s.ip.addr:6443/api -insecure --header "Authorization: Bearer <token-goes-here>"
```

## Hosting A K8s App In A Cluster That Uses A Service Account
Say the dashboard app is hosted in the same K8s cluster that is being dashboarded. This setup means that the secret token can be more-easily managed, because the dashboard app is within the cluster:
- the secret object can be stored as/in a volume
- the volume can be mounted to the dashboard pod
- the token can be used, more directly, by the app - rather than passing the token as a rest api auth bearer header above

### Leverage the Default Service Account and Default Secret
There is a default service account made for every namespace called ` default `.  
The default service account and token are automatically mounted to the pod as a volume mount.  

## An Example Of A Dashboard App Pod And A Service Account
Pull this "dashboard" image && build a pod:
```yaml
apiVersion: v1
kind: Pod
medatada:
  name: my-kubernetes-dashboard
spec:
  containers:
    - name: my-kubernetes-dashboard
      image: kodekloud/my-kubernetes-dashboard
```

The pod should be running! Inspect the pod to see some details about the secret & the volume mount:  
```yaml
kk describe pod my-kubernetes-dashboard

Name:         my-kubernetes-dashboard
Namespace:    default
Priority:     0
Node:         minikube/192.168.49.2
Start Time:   Thu, 14 Jul 2022 09:22:42 -0400
Labels:       <none>
Annotations:  <none>
Status:       Running
IP:           172.17.0.2
IPs:
  IP:  172.17.0.2
Containers:
  my-kubernetes-dashboard:
    Container ID:   docker://9af545727333c7a77fd7016b4926194e9401b353c76b14d9c50f4bd2a8b0ed99
    Image:          kodekloud/my-kubernetes-dashboard
    Image ID:       docker-pullable://kodekloud/my-kubernetes-dashboard@sha256:51261309eebea4f4d2224fe95dcbb664e0fea03bbaecb4ec930fb972c475d927
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Thu, 14 Jul 2022 09:22:51 -0400
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-l7lgz (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-l7lgz:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
```
NOTE:
- the `Containers:my-kubernetes-dashboard:Mounts` section
  - lists `/var/run/secrets/kubernetes.io/serviceaccount`: this is where the secret is!
- the `Volumes:kube-api-access-17lgz` section
  - thats a volume that contains the secret :) 

See the secret content inside the pod:  
```bash
kubectl exec my-kubernetes-dashboard -- ls /var/run/secrets/kubernetes.io/serviceaccount

# should return
ca.crt
namespace
token
```
Note:
- the secret for the service account has 3 part
  - ca.crt
  - namespace
  - token

Inspecting the namespace:
```bash
kubectl exec my-kubernetes-dashboard -- cat /var/run/secrets/kubernetes.io/serviceaccount/namespace
# returns
default
```
Note:
- k8s automatically uses the ` default ` service account
- the default service account only has authz to run K8s api queries
- other service accounts can be used, but need to be defined in the pod def file
  - `serviceAccountName: new-account-who-dis` as a sibling of `spec:containers`
  - This can be done with a deployment :) not directly against a running pod - don't forget!

Inspecting the token:
```bash
kubectl exec my-kubernetes-dashboard -- cat /var/run/secrets/kubernetesviceaccount/token
# returns
eyJhbGciOiJSUzI1NiIsImtpZCI6Il8tOTNrdTloSUpLSEZmazg2NE40enBHZUYxTXJQM1hrbERscTMwb0hINWsifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNjg5MzQwOTYyLCJpYXQiOjE2NTc4MDQ5NjIsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJkZWZhdWx0IiwicG9kIjp7Im5hbWUiOiJteS1rdWJlcm5ldGVzLWRhc2hib2FyZCIsInVpZCI6IjZhMjQ1NDJkLWQ4YTEtNDk0Yy1hZGI1LTA5ZThiNDA0MjA5MyJ9LCJzZXJ2aWNlYWNjb3VudCI6eyJuYW1lIjoiZGVmYXVsdCIsInVpZCI6ImI0YThhY2VlLWUyOTItNGZiMi05NmE3LTE5YmVhYmViMWExYSJ9LCJ3YXJuYWZ0ZXIiOjE2NTc4MDg1Njl9LCJuYmYiOjE2NTc4MDQ5NjIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ...more...

```


## Binding A Service Account To A Cluster Role
A Service Account definition file
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: secrets-account
```

A ClusterRole Definition File
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: get-secrets-role
rules:
- apiGroups:
  - ""
  resources:
  - secrets:
  verbs:
  - get
  - list
```

A RoleBinding Definition File
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: secrets-role-binding
subjects:
- kind: ServiceAcount
  name: secrets-account
roleRef:
  kind: ClusterRole
  name: get-secrets-role
  apiGroup: rbac.authorization.k8s.io  
```

Adding this service account to a pod:
- edit a pod def file...
```yaml
# ...
spec:
  # add this line!
  serviceAccountName: secrets-account
# ...
```

One way to see that this service account is connected to a pod is by 
```bash
kubectl get pod secrets-pod -o yaml | grep serviceAccount
```


## Things to be able to do
1. identify which service accounts are un an env
2. identify which secret is associated with a service account
3. identify an image that was used in a deployment
- 
```bash
# 1
kubectl get serviceaccounts

# 2 
kubect describe serviceaccount <s.a.name>
# find the Tokens: <val-here>

# 3
kubectl describe deployment <d.name>

```