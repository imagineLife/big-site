---
title: A Brief Overview of Service Meshes
parentDir: k8s/in-depth
slug: k8s/in-depth/service-mesh
author: Jake Laursen
excerpt: An abstract layer of proxies to help with complex network scenarios
tags: ["Kubernetes", "K8s", "service mesh"]
order: 36
---

A Service mesh has
- edge proxies
- embedded proxies
- the proxies handle traffic based on rules from the control plane

Heres 3 service mesh options:
- envoy
  - open-source!
  - [website](https://www.envoyproxy.io)
- istio
  - leverages envoy
  - [website](https://istio.io)e
- linkerd
  - [website](https://linkerd.io/)

## Trying Linkerd
### get linkerd
  - check the latest stable version [here](https://linkerd.io/releases/): at the time of writing it looks like `2.12.2`
  - get the setup instructions: `curl -sL run.linkerd.io/install > setupLinkerd.sh`
  - run it with `sh setupLinkerd.sh`
Output might look like
```bash
Downloading linkerd2-cli-stable-2.12.2-linux-amd64...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100 46.6M  100 46.6M    0     0  82.7M      0 --:--:-- --:--:-- --:--:-- 82.7M
Download complete!

Validating checksum...
Checksum valid.

Linkerd stable-2.12.2 was successfully installed 🎉


Add the linkerd CLI to your path with:

  export PATH=$PATH:/home/<your-hostname>/.linkerd2/bin

Now run:

  linkerd check --pre                     # validate that Linkerd can be installed
  linkerd install | kubectl apply -f -    # install the control plane into the 'linkerd' namespace
  linkerd check                           # validate everything worked!
  linkerd dashboard                       # launch the dashboard

Looking for more? Visit https://linkerd.io/2/tasks
```
  - note and follow the instructions
  - `export PATH=$PATH:/home/<yourhost>/.linkerd2/bin`
  - export PATH=$PATH:/home/mretfaster/.linkerd2/bin

Now `linkerd` is an available cli!

### Validate the setup
Linkerd check:
```bash
# https://linkerd.io/2.12/reference/cli/check/
linkerd check --pre

Linkerd core checks
===================

kubernetes-api
--------------
√ can initialize the client
√ can query the Kubernetes API

kubernetes-version
------------------
√ is running the minimum Kubernetes API version
√ is running the minimum kubectl version

pre-kubernetes-setup
--------------------
√ control plane namespace does not already exist
√ can create non-namespaced resources
√ can create ServiceAccounts
√ can create Services
√ can create Deployments
√ can create CronJobs
√ can create ConfigMaps
√ can create Secrets
√ can read Secrets
√ can read extension-apiserver-authentication configmap
√ no clock skew detected

linkerd-version
---------------
√ can determine the latest version
√ cli is up-to-date

Status check results are √
```

Linkerd install 
```bash
linkerd install | kubectl apply -f -
```

### Install a buncha k8s objects
```bash
# get the config files
linkerd install --crds | kubectl apply -f -

# run em
linkerd install | kubectl apply -f -

# check em
linkerd check
```
NOTE this check: I have 2 google vms setup with a pretty small amount of resources. I removed some unused pods/deployments etc in order for this check to complete :) 

### Install and setup linkerd viz
[linkerd viz](https://linkerd.io/2.12/reference/cli/viz/) "_manages the linkerd-viz extension of (the) Linkerd service mesh_".  
```bash
# install
$ linkerd viz install | kubectl apply -f -

# validate
$ linkerd viz check

# check the localhost url of the DASHBOARD!
linkerd viz dashboard &
```

In order to see the first linkerd viz, a "dashboard"
- the `web` deployment, in the `linkerd-viz` namespace needs to be edited
  - a line in the container args needs adjusting
  - `kubectl edit deploy web -n linkerd-viz`
  - from `- -enforced-host=q374trob23bt8ofabef1239h`
  - to `- -enforced-host=` (_remove all the garbly-gook after the = sign_) 
- the service that exposes the web deployment needs adjusting
  - convert the type to a nodeport from a clusterIP (_by default, the dashboard is available on "localhost" of the host node_)
  - set a nodePort value on the `http` port - maybe something that you'll remember!