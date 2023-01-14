---
title: One Way To Approach Debugging Kubernetes Object Errors
parentDir: k8s/in-depth
slug: k8s/in-depth/debugging-workflow
author: Jake Laursen
excerpt: Starting with "familiar" k8s bits to logs and iptables
tags: ["Kubernetes", "K8s", "debugging", "workflow"]
order: 37
---

Troubleshooting seems like a regular rhytm in K8s development - pods, nodes, service connectivity, ingress config, deployment "style" config, etc.  

## An Approach

- [An Approach](#an-approach)
  - [get pod info](#get-pod-info)
    - [find a pod of specific interest](#find-a-pod-of-specific-interest)
  - [notices some specifics of pod description](#notices-some-specifics-of-pod-description)
  - [look into container logs](#look-into-container-logs)
  - [look into container-to-network connectivity](#look-into-container-to-network-connectivity)
  - [look into service-to-pod connectivity](#look-into-service-to-pod-connectivity)
### get pod info
- `kkg pods`
#### find a pod of specific interest
say `apipod`.  

- get details about the pod
- `kkdesc pod apipod`
### notices some specifics of pod description
- `Conditions`
  - best case: review that the pod is `Initialized`, `Ready` nd `PodScheduled`
- `Events`
  - best case: review that the pod events look something like 
    - `pulling <your-image>`
    - `Successfully pulled image <your-image>`
    - `Created container`
    - `Started container`
### look into container logs
- `kk logs apipod <api-container-name>`
### look into container-to-network connectivity
- best case: the container can access the internet
  - shell into a container && nslookup a url
  - `kubectl exec -it apipod -c <container-name> -- sh`
  - `nslookup www.google.com`
- one permissioning issue could be that the container uid does not have permissions to access specific web resources like an html doc
### look into service-to-pod connectivity
- an example: assuming a service is connecting to a pod and making the pod/container available through port publishing
- review available & running services
  - `kkg svc`
  - best case: a service that you know is up & running, say `api-svc`
- get config info on that service of interest
  - `kkg svc api-svc -o yaml`
- review that an ENDPOINT! is available for the svc
    - `kkg ep` - best case: the svc port and name are connected to an available endpoint
  - get config deets of the endpoint
    - `kkg ep apiapp -o yaml`
- if the above are all working as expected (_containers, pods, services, endpoints_) check out more deets
  - Check the status of the kube-proxy:
    - `ps | grep kube-proxy` (_maybe add flags `-elf `_)
      - to stdout, in a list
    - or perhaps `journalctl -a | grep proxy`
  - check out the logs of the kube-proxy
    - `kubectl -n kube-system logs kube-proxy-randoCharsHere`
  - Check that the expected "rules" are being created for a servuce
    - `sudo iptables-save | grep <a-service-here>`
