---
title: An Overview of Security in K8s
parentDir: k8s/in-depth
slug: k8s/in-depth/security-primitives
author: Jake Laursen
excerpt: Different User Types and Different Authorization require different auth configurations
tags: Kubernetes, K8s, authentication, authorization
order: 25
---


# Security In K8s
Access to hosts should only be used with ssh keys: no un+pw.   

- [Security In K8s](#security-in-k8s)
  - [The First Line Of Defense: Protect the Kube-Apiserver](#the-first-line-of-defense-protect-the-kube-apiserver)
  - [AuthN](#authn)
    - [Focusing On Devs, Admins, and Apps that Get Access](#focusing-on-devs-admins-and-apps-that-get-access)
      - [Leverage Static Files To Hold User AuthN Details](#leverage-static-files-to-hold-user-authn-details)
  - [AuthZ](#authz)
  - [Kubernetes leverages TLS for its built-in object communication](#kubernetes-leverages-tls-for-its-built-in-object-communication)
  - [Kubeconfig and Security](#kubeconfig-and-security)
    - [KubeConfig File Contents](#kubeconfig-file-contents)
      - [Clusters](#clusters)
      - [Users](#users)
      - [Contexts](#contexts)
      - [KubeConfig File Used By Kubectl](#kubeconfig-file-used-by-kubectl)
      - [KubeConfig Can Be Updated](#kubeconfig-can-be-updated)

## The First Line Of Defense: Protect the Kube-Apiserver
The kube-apiserver can perform almost all functions. This must be protected.

## AuthN
Who can use this stuff?!  

Files can hold access creds.  
Certs can exist.  
Machines can get service accounts.  

AuthN through static files, like below, are not necessarily recommended.  
At least put these files in mounted dirs.  

### Focusing On Devs, Admins, and Apps that Get Access
Kubernetes can create and manage serviceaccounts. Those can be used.  
All user access is managed by the apiserver.  
The kube-apiserver authenticates requests prior to processing the request.  
#### Leverage Static Files To Hold User AuthN Details
**Even though these static-file approaches are possible, this is not recommended.**  

Consider using a csv file with 3 cols: pw,un,uid.  
The filename can be passed as an option to the kube-apiserver....hmm...  
To auth with one of those users:  
`curl -v -k https://master-node-ip-here:6443/api/v1/pods -u "un:pw"`  


A 4th column can exist to assign users to groups.

Static Token Files can also work:
```csv
tokenval,un1,pw1,grp1
tokenval2,un2,pw2,grp1
tokenval3,un3,pw3,grp1
tokenval4,un4,pw4,grp1
```
These can be passed to the kubeapi server `--token-auth-file=the-toke-csv-file.csv`.  
This can be used during a curl to the k8s api server:
`curl -v -k https://master-node-ip-here:6443/api/v1/pods --header "Authorization: Bearer <a-user-token-here>"`

## AuthZ
What can these people do?  

RBAC can work.  
ABAC can work.  
Node Auth and webhook mode can work.  

## Kubernetes leverages TLS for its built-in object communication
All communication in the cluster happens with tls encryption: the etcd cluster, kubelet, kube controller manager, kube apiserver, kube proxy, kube scheduler... all of these things use tls encryption to talk to one another.  

## Kubeconfig and Security
Kubectl can be used to request k8s cluster data.  
```bash
kubectl get pods 
  --server the-k8s-server:6443 
  --client-key admin-key.key
  --client-certificate admin-cert.crt
  --certificate-authority ca.crt
```
Those details, although could be used every time one needs to request data about the cluster, can be moved to a file and referenced.  
The default location of this kubeconfig file is `$HOME/.kube/config` & can be overwritten:  
```bash
# $HOME/.kube/config
# a file named "config"
--server the-k8s-server:6443 
--client-key admin-key.key
--client-certificate admin-cert.crt
--certificate-authority ca.crt

# use it
# NOTE: the default location is used all the time, so no need to pass as param
kubectl get pod
```

### KubeConfig File Contents
The Config file has 3 "sections": Clusters, Users, and Contexts.  

```yaml
apiVersion: v1
kind: Config
clusters:
- name: my-playground
  cluster:
    certificate-authority: ca.crt
    server: https://my-k8s-playground:6443
users:
- name: my-k8s-admin
  user:
    client-certificate: admin.crt
    client-key: admin.key
contexts:
- name: my-k8s-admin@my-playground
  context:
    # matches clusters[x].name above
    cluster: my-playground
    # matches users[x].name above
    user: my-k8s-admin
```
#### Clusters
The K8s Clusters that I need access to - might be like dev/qa/prod, or cloud-provider specific...   

#### Users
The users with wich I have access to the clusters.  
Users might have different privileges across different clusters.  

#### Contexts
Define which user account uses which cluster - something like `admin@prod` could be admin user on prod server.  
This does not configure users on the cluster. This defines me, the user, and which user+server I'm going to use to work with K8s.  


#### KubeConfig File Used By Kubectl
Kubectl reads that file.  
Kubectl "knows" which context, from the list, to use.  
A field could be added to the file as the "default", `current-context: my-k8s-admin@my-playground`, at the root level of the dir.  

#### KubeConfig Can Be Updated
- `kubectl config use-context new-user@new-context`
Note the `kubectl config` cli output describes a bunch of cli's that can be used:
```bash
Modify kubeconfig files using subcommands like "kubectl config set current-context my-context"

 The loading order follows these rules:

  1.  If the --kubeconfig flag is set, then only that file is loaded. The flag may only be set once and no merging takes place.
  2.  If $KUBECONFIG environment variable is set, then it is used as a list of paths (normal path delimiting rules for your system). These paths are merged. When a value is modified, it is modified in the file that defines the stanza. When a value is created, it is created in the first file that exists. If no files in the chain exist, then it creates the last file in the list.
  3.  Otherwise, ${HOME}/.kube/config is used and no merging takes place.

Available Commands:
  current-context   Display the current-context
  delete-cluster    Delete the specified cluster from the kubeconfig
  delete-context    Delete the specified context from the kubeconfig
  delete-user       Delete the specified user from the kubeconfig
  get-clusters      Display clusters defined in the kubeconfig
  get-contexts      Describe one or many contexts
  get-users         Display users defined in the kubeconfig
  rename-context    Rename a context from the kubeconfig file
  set               Set an individual value in a kubeconfig file
  set-cluster       Set a cluster entry in kubeconfig
  set-context       Set a context entry in kubeconfig
  set-credentials   Set a user entry in kubeconfig
  unset             Unset an individual value in a kubeconfig file
  use-context       Set the current-context in a kubeconfig file
  view              Display merged kubeconfig settings or a specified kubeconfig file
```