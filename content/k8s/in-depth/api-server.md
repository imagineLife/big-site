---
title: Get Info About The K8s Environment Through the K8s Api-Server
parentDir: k8s/in-depth
slug: k8s/in-depth/api-server
author: Jake Laursen
excerpt: A built-in api can allow for api-driven discovery and config
tags: Kubernetes, K8s, authentication, authorization, visualization, diagram
order: 26
---


# There Is A Kubernetes Api Server
Check out the [K8s docs](https://kubernetes.io/docs/reference/access-authn-authz/authentication/) for more.  

There are a bunch of endpoints that can be accessed at `curl https://kube-master-node-ip:6443/<many-endpoints>`:
- metrics
  - monitor health of cluster
- healthz
  - monitor health of cluster
- version
  - cluster version
- api
- apis
- logs
  - integrating with 3rd-party logging apps


- [There Is A Kubernetes Api Server](#there-is-a-kubernetes-api-server)
  - [Access to the api is protected](#access-to-the-api-is-protected)
    - [Authentication](#authentication)
    - [Authorization](#authorization)
      - [A Few Notes On RBAC](#a-few-notes-on-rbac)
    - [Admission Controls](#admission-controls)
      - [Enable a plugin](#enable-a-plugin)
      - [Disable a plugin](#disable-a-plugin)
      - [Dynamic Admission Controllers](#dynamic-admission-controllers)
  - [Use Auth When requesting to the api](#use-auth-when-requesting-to-the-api)
    - [Note Differences Between Kube Proxy and Kubectl Proxy](#note-differences-between-kube-proxy-and-kubectl-proxy)
  - [Apis Responsible For Cluster Functionality](#apis-responsible-for-cluster-functionality)
  - [A Visual](#a-visual)
  - [APIs might be versioned](#apis-might-be-versioned)
    - [APIs can be enabled and disabled](#apis-can-be-enabled-and-disabled)
    - [APIs Get Deprecated](#apis-get-deprecated)
      - [Removing Endpoint by excluding in new verisons](#removing-endpoint-by-excluding-in-new-verisons)
      - [Prior Version Maintenance SChedules](#prior-version-maintenance-schedules)
      - [Use Kubectl Convert to get new apis](#use-kubectl-convert-to-get-new-apis)
  - [kubectl Create Token](#kubectl-create-token)
  - [Todo](#todo)


## Access to the api is protected
Through a 3-stage process of authentication, authorization, and admission controls. (_Check out the [K8s docs](https://kubernetes.io/docs/concepts/security/controlling-access/) on this for more_).  

### Authentication
- certs
- tokens
- username+password
- users are managed elsewhere, not created in k8s
- webhooks can varify bearer tokens & oidc providers
Some Auth settings defined in the `kube-apiserver` file are
- `--basic-auth-file`
- `--oidc-issuer-url`
- `--token-auth-file`
- `authorization-webhook-config-file`



### Authorization
3 modes of authorization:
- node
- rbac
- webhook

These settings can be config'd in the `kube-apiserver` file:
- `--authorization-mode=Node,RBAC` or something like `--authorization-mode=Webhook`
The apiserver is(_can be?_) a pod & the pod definition can be seen with something like...
```bash
kubectl get pod kube-apiserver-controlplane --namespace=kube-system -o yaml
```

#### A Few Notes On RBAC
RBAC seems to be the preferred authz method.  
Note the [K8s Docs on RBAC Auth](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).  
- figure out the namespace the user needs access to
- create cert creds for the user
- set creds of the user+namespace with a context
- create a role associated with the user's tasks
  - see [this other post](/k8s/in-depth/authorization) for way more details on roles and authorization as a whole
- bind the user to the role
- ALL resources are api objects in K8s: roles, rolebindings, etc.
- 

### Admission Controls
- software
- this can access, modify, and/or validate contents of objects being CRUD by api requests
- this can deny the api request when above validation fails

Settings like these can be set for the kube-apiserver pod, as args.  
The default kube-apiserver file is located at `/etc/kubernetes/manifests/kube-apiserver.yaml`.

#### Enable a plugin
```bash
--enable-admissions-plugins=LimitRanger,NamespaceLifecycle
```
#### Disable a plugin
```bash
--disable-admissions-plugins=PodNodeSelector
```
#### Dynamic Admission Controllers
[K8s Docs](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).  
These are http callbacks that get requests & do something with them. Validation and mutating are the two types.    


## Use Auth When requesting to the api
One option is to pass cert details to curl
```bash
curl https://localhost:6443 -k
  --key admin.key
  --cert admin.crt
  --cacert ca.crt
```

Another option is to use a built-in kubectl proxy client. This launches a proxy service on port 8001 && uses creds +certs from the default kubecconfig file. This way, keys + certs are not required for every api request
```bash
# setup the proxy
kubectl proxy
# starting to serve on 127.0.0.1:8001

curl https://localhost:8001 -k
# works!
```

### Note Differences Between Kube Proxy and Kubectl Proxy
The kubectl proxy is for api access.  
The Kube Proxy is a k8s object enabling connectivity between k8s objects in the k8s cluster.  

## Apis Responsible For Cluster Functionality
kubectl uses these apis under the hood, i think!

- `/api`
  - core group of apis
  - `/v1`
    - namespaces
    - events
    - bindings
    - configmaps
    - pods
    - endpoints
    - PV
    - secrets
    - rc
    - nodes
    - pvc
    - services
- `/apis`
  - apps
    - v1
      - deployments
        - list, get, create, delete, update, watch
      - replicasets
        - list, get, create, delete, update, watch
      - statefulsets
        - list, get, create, delete, update, watch
  - extensions
  - networking.k8s.io
    - v1
      - networkpolicies
  - storage.k8s.io
  - authentication.k8s.io
  - certificates.k8s.io
    - v1
      - certificatesigningrequests




## A Visual
The api resource url "hierarchy": 
Visual Coming soon...
```md
flowchart TD
  %% 
  %% NODES
  %% 
  APIS["/apis"]
  APPS["/apps"]
  EXT["/extensions"]
  NTWK["/networking.k8s.io"]
  STR["/storage.k8s.io"]
  AUTH["/authentication.k8s.io"]
  CRT["/certificates.k8s.io"]
  
  
  V11["/v1"]
  V12["/v1"]
  V13["/v1"]

  DEP["/deployments"]
  REPL["/replicasets"]
  STF["/statefulsets"]

  NTWKP["/networkpolicies"]
  CRTSR["/certificatesigningrequests"]

  LS["list"]
  GT["get"]
  CRT["create"]
  DL["delete"]
  UPD["update"]
  WTCH["watch"]

  subgraph APIG["API Groups ."]
    direction TB
    APPS
    EXT
    NTWK
    STR
    AUTH
    CRT
  end

  subgraph VRBS[" use verbs  ."]
    direction TB
    LS
    GT
    CRT
    DL
    UPD
    WTCH
  end

  subgraph APPV1RES["Resources  ."]
    direction LR
    DEP
    REPL
    STF
  end

  APIS --> APIG

  %% /apps-to-verbs
  APPS --> V11
  V11 --> APPV1RES
  DEP --> VRBS
  REPL --> VRBS
  STF --> VRBS

  %% /networking-to-verbs
  NTWK --> V12
  V12 --> NTWKP
  NTWKP --> VRBS

  %% /cert-to-verbs
  CRT --> V13
  V13 --> CRTSR
  CRTSR --> VRBS
```

## APIs might be versioned
Each API can have versions: 
- `v1Alpha1`
  - can implement in an object def file with `apiVersion: internal.apiserver.k8s.io/v1alpha1`
  - first developed + merged to k8s codebase
  - may have bugs
  - may be dropped
  - experts can use it and give feedback
  - these alpha apis are not enabled by default
- `v1Beta1`, `v1Beta2`
  - once major bugs are fixed, anbd e2e tests are built, alpha apis move here
  - not GA
  - may have minor bugs
  - commitment that the api may be moved to GA
- `v1` is the GA stable verison 
  - expected to be highly reliable
- **multiple versions might be supported at a time**
  - **the preferred** version is set in `cluster/apis/<api-here>`, like `batch`
  - **the storage** is which the object is STORED: may be different than the explicitly defined in an object definition file
    - the stored version of an object, and its api-version can be discovered by querying the etcd db, where the object is at - an example get query for a deployment named `blue`

```bash
ETCDCTL_API=3 etcdctl
 --endpoints=https://[127.0.0.1]:2379
 --cacert=/etc/kubernetes/pki/etcd/ca.crt
 --cert=/etc/kubernetes/pki/etcd/server.crt
 --key=/etc/kubernetes/pki/etcd/server.key
 get "/registry/deployments/default/blue" --print-value-only
```

### APIs can be enabled and disabled
The version must be added to the runtime config parameter of the kube-apiserver service with new lines like this mock: `--rintime-config=<api/version>`
- `--runtime-config=batch/v2alpha1`

### APIs Get Deprecated
API deprecation policies express when to stop supporting apis.  
As an example, say we make an api for k8s called `/imaginelife` with sub-routes at `/imaginelife/courses` and `/imaginelife/webinar`.  
When its ready to be merged to k8s, it gets merged as `/imaginelife/v1alpha1/courses`, etc.  
This can now be used with something like
```yaml
apiVersion: imaginelife/v1alpha1
kind: Course
metadata:
  name: first-course-here
spec:
# specs....
```

#### Removing Endpoint by excluding in new verisons
To "remove" an endpoint really only works by NOT INCLUDING the deprecated enpoint in a new version of the api. To "remove" the `webinar` endpoint, per say, that endpoint would just not be included in a `v1alpha2` release alongside the `imaginelife/v1alpha2/courses` release.  

#### Prior Version Maintenance SChedules
Other than the most recent API version of each endpoint, co-inciding with kubernetes version releases, prior API versions are required to be supported after their "announced deprecation" for a min duration of ....
- `GA`: 12 months or 3 releases, the longer of the two
- `beta`: 9mo or 3 releases, the longer of the two
- `alpha` none-zo!
  - must announce api version changes in k8s release notes

Api Version can only deprecate same-"level" of availability or lower: 
- new alpha releases can deprecate prior alpha releases
- new beta releases can deprecate prior alpha AND beta releases
- new GA releases can deprecate prior alpha, beta, and GA releases
- new alpha CANNOT deprecate beta or GA releases
- new beta CANNOT deprecate GA releases


#### Use Kubectl Convert to get new apis
[K8s docs on kubectl-convert](https://kubernetes.io/docs/reference/using-api/deprecation-guide/#migrate-to-non-deprecated-apis).  

When an api is deprecated, the `kubectl convert` command can be used to help migrate a k8s config file to a new api version:

```bash
# kubectl-convert -f old-config-file.yaml --output-version new-version-here
kubectl-convert -f app-deployment.yaml --output-version apps/v1
```  


## kubectl Create Token
[Kubectl command docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-token-em-): Request a service account token.  
[Kubernetes docs](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#service-account-tokens).  
`kubectl create serviceaccount devopsuser`.  
`kubectl create token devopsuser`.  
That will create a token (_a jwt_) for the serviceaccount & returns the token.  
THe token can be used to auth as the service account as a Bearer token.  



## Todo
- show the "short names" of resources in k8s, say deployments and cronjobs
  - `kubectl api-resources | grep 'deployments\|replicasets'`
- identify parts of a semver
- id wich api "group" (_version_) a given resource is part of, say the `job` resource
  - `kubectl explain job`
- id the preferred version for `authorization.k8s.io` api group
- enable a `v1alpha1` version for `rbac.authorization.k8s.io` api group on the `controlplane` node
  - edit the `/etc/kubernetes/manifests/kube-apiserver.yaml` file
  - include a new line, `--runtime-config=rbac.authorization.k8s.io/v1alpha1`
- install kubectl convert
  - `curl -LO https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl-convert`
  - verify it is installed with `ls`: should include `kubectl-convert`
  - change the permission of the file with `chmod +x kubectl-convert`
  - move the file to `/usr/local/bin` with `mv kubectl-convert /usr/local/bin/kubectl-convert`
- convert a resource to use an updated api version
  - `kubectl-convert -f old-file.yaml --output-version v1`
  - take the cli output, put it in a new file
  - run the file `kubectl create the-new-file.yaml`