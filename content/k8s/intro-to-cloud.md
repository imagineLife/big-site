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
```