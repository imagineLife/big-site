---
title: Mutate And Validate Request Details With Admission Controllers
parentDir: k8s/in-depth
slug: k8s/in-depth/admission-controllers
author: Jake Laursen
excerpt: A properly configured k8s server leverages admissionControllers for automated request processing
tags: Kubernetes, K8s, admission controllers, requests, mutations, validations, visualization, diagram
order: 28
---

# Admission Controllers
Every time a _request goes through_ the kubectl cli...
- the req. goes to api server
- the req. gets **authenticated**, usually through certificates
  - kubectl uses the kubeconfig file, which has certs configured
- the req is **authorized**
  - does the user have the permission to do what they are trying to? RBAC check, usually
- the api serve runs **mutation admissionControllers**
  - these change the reques
- the api serve runs **validation admissionControllers**
  - these allow/deny events from happening
- info is persistent in the etcd database

NOTE: built-in admission controllers run in an order. The order makes logical sense in order of applicability.  

```mermaid
flowchart LR

  KTL["Kubectl gui"]
  AUTHN["Authentication"]
  AUTHNOTE>"Kubectl gets user authN \n from $HOME/.kube/config"]
  AUTHZ["Authorization"]
  AUTHZNOTE>"Kube ApiServer Checks for RBAC \n via roles and roleBindings"]
  WRK["Do The Work"]
  MTC["Mutation AdmissionControllers"]
  VDC["Validation AdmissionControllers"]

  KTL --> AUTHN
  AUTHN -.-> AUTHNOTE
  AUTHN --> AUTHZ
  AUTHZ -.-> AUTHZNOTE
  AUTHZ --> MTC
  MTC --> VDC
  VDC --> WRK
```


- [Admission Controllers](#admission-controllers)
  - [Permissions can be more granular than user RBAC with Admission Controllers](#permissions-can-be-more-granular-than-user-rbac-with-admission-controllers)
    - [Why We Need Admission Controllers](#why-we-need-admission-controllers)
    - [AdmissionControllers Validate and Mutate](#admissioncontrollers-validate-and-mutate)
    - [Some Built-In AdmissionControllers](#some-built-in-admissioncontrollers)
    - [View All Enabled Admission Controllers](#view-all-enabled-admission-controllers)
    - [Add An Admission Controller](#add-an-admission-controller)
  - [Custom External Admission Controllers with Webhooks](#custom-external-admission-controllers-with-webhooks)
    - [Build & Deploy a webhook server](#build--deploy-a-webhook-server)
  - [Things To Do](#things-to-do)
    - [Demo Config files](#demo-config-files)
      - [A Deployment](#a-deployment)
      - [A Service](#a-service)
      - [Webhook Config](#webhook-config)

## Permissions can be more granular than user RBAC with Admission Controllers
Some use-cases for different authz checks:
- review pod config for specifics
  - non-public images allowed
  - block the tag `latest`
  - block running containers as root user
  - assure metadata has specific labels present

AdmissionControllers to the rescue.  
AdmissionControllers "live" in the apiserver, and are bits of code.  
AdmissionControllers can change requests and do its own work during a request.  

### Why We Need Admission Controllers
Per the [K8s Docs on this subject](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#why-do-i-need-them), with seemingly strong language,  
_"...a Kubernetes API server that is not properly configured with the right set of admission controllers is an incomplete server..."_

### AdmissionControllers Validate and Mutate
Mutations first.  
Validations second.  
Also, these controllers can perform side-effects on non-request objects.  

During the request lifecycle, if either of the controllers reject the request due to some missed mutation or validation, the entire request is rejected with an err.  

### Some Built-In AdmissionControllers
- `AlwaysPullImages`
  - ensures images are pulled prior to pod creation
- `DefaultStorageClass`
  - observes creation of pvcs and sets a default storage class if none is present
- `EventRateLimit`
  - sets limit on requests to prevent the api server from flooding with req
- `NamespaceExists`, deprecated
  - rejects requests to namespaces that don't exist
- `NamespaceAutoProvision`
  - **not automatically enabled, and deprecated** but present and allowed to be enabled
  - when a new namespace is referenced, but the namespaces is not created first, the namespace is created on-the-fly
- `NamespaceLifecycle`
  - replaces the above 2 admission controllers
  - default namespace cant be deleted
  - auto-rejects object handling in namespaces that are not present
- ...there are a more

### View All Enabled Admission Controllers
```bash
kube-apiserver -h | grep enable-admission-plugins
```  
### Add An Admission Controller
Edit the kube-apiserver.service file.  
```bash
# add this flag, here with example vals
--enable-admission-plugins=NodeRestriction,NamespaceAutoProvision
```


## Custom External Admission Controllers with Webhooks
Webhooks can be configured to point to a server. The server can be hosted _within or outside of the kubernetes cluster_. The server has custom admission services.  
After the built-in admission controllers finish, the webhook admission functions het hit & applied.   
A json blob, a "admission review object", gets passed to the admission webhook server, and returns a result object depending on the success/failure of the hook applied. The result has a `allowed: <bool>` key value, indicating its success or failure.  

### Build & Deploy a webhook server
[Heres an example of a webhook](https://github.com/kubernetes/kubernetes/blob/v1.13.0/test/images/webhook/main.go).  
This can be any api server. The only requirement is for the api to 
- accept the payload from k8s, from the admission controllers
  - this should permit or reject a request
- return a response to k8s that k8s is expecting
  - the response should contain the "allowed" key

With a server developed, 
- run it as a container+pod+deployment
- put it in the same k8s cluster
- give it a service

Config the cluster to reach out to the service with a new config:
```yaml
apiVersion: admissionregistration.k8s.io/v1
# kind: MutatingWebhookConfiguration
kind: ValidatingWebhookConfiguration
metadata:
  name: "pod-policy.example.com"
webhooks:
# list of webhooks
- name: "pod-policy.example.com"
  # where the location of the server is
  # when external, a url to the server
  clientConfig:
    # url: for-externally-hosted-servers
    service:
      # quotes are expected
      namespace: "webhook-namespace-name"
      # the SERVICE, not the pod
      name: "webhook-service"
    # Webhook server has to be over tls, and use certs
    caBundle: "certstringhere"
  # WHEN to call the server
  # here, on pod creation
  rules:
  - apiGroups: [""]
    apiVersions: ["v1"]
    operations: ["CREATE"]
    resources: ["pods"]
    scope: "Namespaced"
```


## Things To Do
- Create a namespace, `webhook-space`
- Create a secret, with a provided crt + key && base64 encrypt the values prior to inserting into secret values
- create a provided deployment of webhook pods  
  - see below deployment file example
- create a provided service for the webhook deployment
  - see below service file example
- apply a webhook config
  - see below webhook config file example
- deploy some carious pods that work differently with the webhook
- 

### Demo Config files
#### A Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webhook-server
  namespace: webhook-demo
  labels:
    app: webhook-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: webhook-server
  template:
    metadata:
      labels:
        app: webhook-server
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1234
      containers:
      - name: server
        image: stackrox/admission-controller-webhook-demo:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8443
          name: webhook-api
        volumeMounts:
        - name: webhook-tls-certs
          mountPath: /run/secrets/tls
          readOnly: true
      volumes:
      - name: webhook-tls-certs
        secret:
          secretName: webhook-server-tls
```

#### A Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: webhook-server
  namespace: webhook-demo
spec:
  selector:
    app: webhook-server
  ports:
    - port: 443
      targetPort: webhook-api
```

#### Webhook Config
```yaml
piVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
metadata:
  name: demo-webhook
webhooks:
  - name: webhook-server.webhook-demo.svc
    sideEffects: None
    admissionReviewVersions: ["v1"]
    clientConfig:
      service:
        name: webhook-server
        namespace: webhook-demo
        path: "/mutate"
      caBundle: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURQekNDQWllZ0F3SUJBZ0lVSmZnS1RxcUExM2FOM3c0WkJQY29TT2phdWJnd0RRWUpLb1pJaHZjTkFRRUwKQlFBd0x6RXRNQ3NHQTFVRUF3d2tRV1J0YVhOemFXOXVJRU52Ym5SeWIyeHNaWElnVjJWaWFHOXZheUJFWlcxdgpJRU5CTUI0WERUSXlNRGd4TWpFeE1USXpPVm9YRFRJeU1Ea3hNVEV4TVRJek9Wb3dMekV0TUNzR0ExVUVBd3drClFXUnRhWE56YVc5dUlFTnZiblJ5YjJ4c1pYSWdWMlZpYUc5dmF5QkVaVzF2SUVOQk1JSUJJakFOQmdrcWhraUcKOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXlIcjhkdVJJTml5M1ZQZlRIR1hFckNQWW9JUG5Pd2N6UjM2Vwpma0pINjIxczZlRGU0VUNMbW5jTUptbGRSclZGdmxjMitGMC9ZOU5nc2tqbDN0MVEwVXI4M3g5Q2hmUEZiTjNoCi9IaDdsTjNNQjZSYWdhL3ExS3AvclY2Zndvcm1MYTV3a0txSFFFUUVTUFMwRjZYSDJaU24xemo0RHcvWHc4SHUKcmpidDhPejdCaFBibG10YUYrWWxyR2N5UkxSTk83Mml6RVMrNDBBRklSZmlRYUNXNzd5N21HZ3NhUU1zU2RJaQp3U3BId3pza0JpZURTNFNqaGJ4NFpZOTVUOHNMTUJqek1oaVo3ZlhKQ0Q0RWdLZXV5VUxrL0xCQ1grTi8vcHFYCkJDNFJBWjlaY1JyOVFITC8wb2RIQlY1MVN0eTJVeG1EaERIS1BRSUkydzB4UE5KWEZ3SURBUUFCbzFNd1VUQWQKQmdOVkhRNEVGZ1FVaDBidjFPWk5PRWUzaS92ZGtsQVhscFNjV2V3d0h3WURWUjBqQkJnd0ZvQVVoMGJ2MU9aTgpPRWUzaS92ZGtsQVhscFNjV2V3d0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBTkJna3Foa2lHOXcwQkFRc0ZBQU9DCkFRRUFFb1FZSTJWSXd5bEFnSUZDK1NTcGxNeGZVK0RrT2hLSjk5NTltNTV6d2h6SjB1dHpRMExIZ0dhZndlUDIKeXUvQW16eW1ETWFHdjI3MHBoajhYNms0Zit2VTRWbzN5cnJDWFM3NjY0ajRiRVllREozMFJYNE1SVDZxZmgrMgpmK0tKVlg5VEk3MWJvL2tSVnh0RzQ2U3ZtVjdEMVM2cTZWNkMzTWt2SWpqVUhsYjNPekt6UERIMHBRTHdJVFViCmVZTzdZckZET3U1eWlhUTJyUVhGOWlJWlBzcXdFOHhzNHR1YURPRGFZNWlMbmpoSE96b3Q4OENNM25GOGlYSFgKL1JqdjRudTVLM0MvR0FaUmJBVWRyekRGOGR5YVc0bXQ2TjNuT3RNOFV2d056RFo1SlV4MkNuL3FPcXJwa1dURQp0QitOZkRlUWVsQVFhVFVmbjB1dG16T2pwZz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
    rules:
      - operations: [ "CREATE" ]
        apiGroups: [""]
        apiVersions: ["v1"]
        resources: ["pods"]
```