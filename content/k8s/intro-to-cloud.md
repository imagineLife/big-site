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

### Interact with the Cluster
- run the copied scrip in the in-browser shell
- 