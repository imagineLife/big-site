---
title: Leverage Helm to Abstract Away Details of Object Management in Kubernetes 
parentDir: k8s/in-depth
slug: k8s/in-depth/helm
author: Jake Laursen
excerpt: Helm can help remove object-by-object management when looking to manage a suite of Kubernetes objects
tags: Kubernetes, K8s, Helm, Objects, Management, Packages
order: 31
---

# Application Environments Are Complex
Docker can help simplify application deployment with "containers".  
Docker-compose can help manage interaction between several "containers".  
Kubernetes can help simplify deploying containers into pods, introduce communication layers through services, introduce secure secret storage through secrets, abstract away data-storage solutions through persistent volumes and persistent volume claims... etc.  
This is complex - especially in application suites where many parts are involved. Even a trivial traditional "full-stack" app, with a db, an api layer, and a frontend layer, can have all-of-the-above parts involved.

- [Application Environments Are Complex](#application-environments-are-complex)
  - [Yaml Files Are Everywhere](#yaml-files-are-everywhere)
  - [Heml To The Rescue](#heml-to-the-rescue)
    - [Get It Going](#get-it-going)
  - [Helm Charts](#helm-charts)
  - [Use the Helm Repo](#use-the-helm-repo)
    - [Consider alternative helm repositories](#consider-alternative-helm-repositories)
    - [Install a chart](#install-a-chart)
  - [Helm Commands](#helm-commands)


## Yaml Files Are Everywhere
- app.deployment.yaml
- nginx.deployment.yaml
- secret.yaml
- pv.yaml
- pvc.yaml
- app-service.yaml

Managing these can require touching several of these yaml files every time something across the deployment needs updating.  

## Heml To The Rescue
K8s doesn't really "care" about the details of the app.  
K8s creates objects.  
K8s manages object lifecycles.  
Helm looks at details of the parts involved across a k8s system, and "cares" more about the inter-connected details.  
Helm uses a `values.yaml` file.  
Details can be configured in the `values.yaml` file. 
```bash
# get it going
helm install app ...

# update one or part of the suite of K8s objects
helm upgrade app ...

# rollback the suite of K8s objects
helm rollback app ...

# remove the suite of K8s objects with 1 command
helm uninstall app ...
```

### Get It Going
Install Helm. Check the docs [here](https://helm.sh/docs/intro/install/).  
Get K8s and kubectl installed on the host machine - here, my laptop.  
```bash
# install with snap
sudo snap install helm --classic

# instsall with apt
# add key + sources list prior
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://](https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get install helm
```

## Helm Charts
Consider Kubernetes across environments: qa might require different details across k8s objects than production: container image versions, pv storage disk allocation limits, object passwords, etc.  
These Values can be abstracted out of K8s object config files, entirely, and referenced with `key: {{ .Values.value-key-here }}`. `Values.yaml` will then contain values to be used across the kubernetes objects. Templates for all of the the kubernetes objects can also be created.  
The templates and values are known as a helm chart.  
Again:
- `Templates`
- `values.yaml`
- `Chart.yaml`: this has info about the chart, itself - some metadata on top of metadata on top of...

## Use the Helm Repo
Use the web interface to search.  

Alternative to the web guis, use the cli:
```bash
# helm search hub <val here>
helm search hub wordpress
```

[Artifacthub](https://artifacthub.io) seems to be the growing place to store helm charts - something like the npm repo of k8s configurations.  
### Consider alternative helm repositories
There are a bunch of helm chart repos, like one in bitnami.  
```bash
# point to a different helm "hub", or chart repo - called bitnami
helm repo add bitnami https://charts.bitnami.com/bitnami

# use it
helm search repo wordpress

# see all repos available to reference on the host machine
helm repo list
```

### Install a chart
The "release name", below, is the helm chart instance friendly name we  assign to the applied chart.  

```bash
# helm install [release-name] [chart-name]
helm install release-1 bitnami/wordpress
helm install release-2 bitnami/wordpress
helm install release-3 bitnami/wordpress
```

## Helm Commands
```bash
# show installed packages
helm list

# remove a package
helm uninstall package-here

# untar extracts the contents from a tar file that is downloaded.  
helm pull --untar bitnami/wordpress
```