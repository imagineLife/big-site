---
title: An Introduction to Kubernetes in the Cloud
parentDir: k8s
slug: k8s/intro-to-k8s-in-the-cloud
author: Jake Laursen
excerpt: Kubernetes can be deployed using tools like GCP, AWS, and Azure
tags: Kubernetes, K8s, cloud, GSP, AWS, Azure
order: 15
---

# An Introduction to Kubernetes in the Cloud
- [An Introduction to Kubernetes in the Cloud](#an-introduction-to-kubernetes-in-the-cloud)
  - [GKE](#gke)
    - [The Free Trial](#the-free-trial)
    - [Setting Up K8s in GKE](#setting-up-k8s-in-gke)
    - [Create a Cluster](#create-a-cluster)
    - [Connect to the Cluster](#connect-to-the-cluster)
    - [Setup Pods & Services on the Cluster](#setup-pods--services-on-the-cluster)
    - [Inspect Some Cluster Contents with GKE GUI](#inspect-some-cluster-contents-with-gke-gui)
    - [Check the app](#check-the-app)
## GKE
Google Kubernetes Engine.  
Google Cloud Account - get a free one [here](https://cloud.google.com/free/docs/gcp-free-tier).  
### The Free Trial
- 3 months
- 300$ free trial - dunno what that means
- "get started for free" button
- go through all the setup, including inputting address and form of payment (_its free!_)
- an initial "first project" will be made, but ignore that 

### Setting Up K8s in GKE
- open the "navigation" bar
- find the "Kubernetes Engine" item
- A new mini-dropdown will appear, but click on the "kubernetes engine" item, none of the items in the mini-dropdown
- click "enable" (_this may spin for a bit_)
- NO
- click the "clusters" option?!
- try the auto-pilot option, to have gke manage the node for me

### Create a Cluster
Nice: "Ccreate an Autopilot Cluster"
- I set the name to `example-voting-app`
- I set the region to `us-east1`
- click "create" button!!
  - this may take several minutes
  - the cluster will appear as a row in a table
  - click on the cluster to see the deployment details as they happen in a cluster-detail view

### Connect to the Cluster
- navigate back to the k8s cluster list view
- find the vertical ellipses at the right-most end of the `example-voting-app` row
- click that, open a d
- click the `connect` option
- a new modal appears with a few connection options
- Copy the suggested script in the modal
- select the `RUN IN CLOUD SHELL` option
- Notice!
  - `Cloud Shell comes with Cloud SDK gcloud, Cloud Code, an online Code Editor and other utilities pre-installed, fully authenticated and up-to-date.` ([Cloud Shell Docs](https://cloud.google.com/shell/docs/))

### Setup Pods & Services on the Cluster
- run the copied scrip in the in-browser shell
- try `kubectl get nodes` && see some nodes
- try `kubectl get services` and see the `kubernetes` `ClusterIP` service - this should feel similar to the previous posts about setting up k8s locally in docker + minikube
- Clone _my_ git repo with all of the config files in it into the gke env shell
  - if you are reading this, find me & ask me... or... see previous posts & do some config work :) 
- Adjust the configs of the voting-app service && the result-app service
  - set the type to `LoadBalancer`
  - remove the `nodePort` line
  - remove the `externalIps` line

Create the services:
```bash
# voting app deployment
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f deployments/voting-app.yaml
W0709 20:03:45.787401     998 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
Warning: Autopilot set default resource requests for Deployment default/voting-app-deploy, as resource requests were not specified. See http://g.co/gke/autopilot-defaults.
deployment.apps/voting-app-deploy created

# voting app service
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f services/voting-app.yaml
W0709 20:04:29.643591    1009 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
service/voting-service created



# Redis deployment
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f deployments/redis.yaml
W0709 20:05:07.662490    1018 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
Warning: Autopilot set default resource requests for Deployment default/redis-deploy, as resource requests were not specified. See http://g.co/gke/autopilot-defaults.
deployment.apps/redis-deploy created

# redis service
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f services/redis.yaml
W0709 20:05:16.189782    1029 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
service/redis created



# pg deployment
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f deployments/pg.yaml
W0709 20:05:56.479457    1038 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
Warning: Autopilot set default resource requests for Deployment default/pg-deploy, as resource requests were not specified. See http://g.co/gke/autopilot-defaults.
deployment.apps/pg-deploy created

# pg service
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f services/pg.yaml
W0709 20:06:02.529071    1047 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
service/db created



# worker deployment
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f deployments/worker.yaml
W0709 20:06:46.012595    1057 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
Warning: Autopilot set default resource requests for Deployment default/worker-deploy, as resource requests were not specified. See http://g.co/gke/autopilot-defaults.
deployment.apps/worker-deploy created


# results deployment + service
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f deployments/result-app.yaml
W0709 20:07:16.549460    1066 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
Warning: Autopilot set default resource requests for Deployment default/result-app-deploy, as resource requests were not specified. See http://g.co/gke/autopilot-defaults.
deployment.apps/result-app-deploy created
mretfaster@cloudshell:~/configs/k8s$ kubectl create -f services/result-app.yaml
W0709 20:07:21.348944    1075 gcp.go:120] WARNING: the gcp auth plugin is deprecated in v1.22+, unavailable in v1.25+; use gcloud instead.
To learn more, consult https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
service/result-service created


# see it all!
NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/pg-deploy           0/1     1            0           2m38s
deployment.apps/redis-deploy        1/1     1            1           3m27s
deployment.apps/result-app-deploy   0/2     2            0           78s
deployment.apps/voting-app-deploy   1/1     1            1           4m47s
deployment.apps/worker-deploy       0/1     1            0           106s

NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE
service/db               ClusterIP      10.83.130.157   <none>          5432/TCP       2m33s
service/kubernetes       ClusterIP      10.83.128.1     <none>          443/TCP        32m
service/redis            ClusterIP      10.83.131.6     <none>          6379/TCP       3m19s
service/result-service   LoadBalancer   10.83.129.126   <not-show-u>    80:31255/TCP   74s
service/voting-service   LoadBalancer   10.83.129.138   <not-show-u>    80:31652/TCP   4m4s
```

Notice: 
- the worker app takes a bit to deploy
- the LoadBalancer services have external ips! these are accessible from the www!


### Inspect Some Cluster Contents with GKE GUI
- go back to the browser view, and if the cluster is not selected from the cluster list, select it :)
- select a sidebar item, the `Services & Ingress` option
Notice:
- this is a nice gui option to view & click through the config - similar to the cli
- poke around ,see the pods, deployments, and services!

### Check the app
Find the service `EXTERNAL-IP` addresses for the `result-service` and the `voting-service`: note, they are not shown above but they are present in the GKE.  
Go to those in the browser!! Crazy. K8s deployed in the cloud.  
