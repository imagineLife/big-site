---
title: Working with Users, Clusters, and Contexts For Authentication
parentDir: k8s/in-depth
slug: k8s/in-depth/authentication
author: Jake Laursen
excerpt: Users Can Gain Access to Clusters Through Kubeconfig Files and Contexts
tags: Kubernetes, K8s, authentication, users, clusters, certs, diagram
order: 25
---

# Security In K8s
Access to hosts should only be used with ssh keys: no un+pw.   

- [Security In K8s](#security-in-k8s)
  - [The First Line Of Defense: Protect the Kube-Apiserver](#the-first-line-of-defense-protect-the-kube-apiserver)
  - [AuthN](#authn)
    - [Focusing On Devs, Admins, and Apps that Get Access](#focusing-on-devs-admins-and-apps-that-get-access)
      - [Leverage Static Files To Hold User AuthN Details](#leverage-static-files-to-hold-user-authn-details)
        - [Static User Details](#static-user-details)
        - [Static Token Files](#static-token-files)
  - [AuthZ](#authz)
  - [Kubernetes leverages TLS for its built-in object communication](#kubernetes-leverages-tls-for-its-built-in-object-communication)
  - [Kubeconfig and Security](#kubeconfig-and-security)
    - [KubeConfig File](#kubeconfig-file)
      - [Contents](#contents)
      - [Clusters](#clusters)
      - [Users](#users)
      - [Contexts](#contexts)
      - [KubeConfig File Used By Kubectl](#kubeconfig-file-used-by-kubectl)
      - [Current Context Can Be Updated Through Kubectl and the KubeConfig File](#current-context-can-be-updated-through-kubectl-and-the-kubeconfig-file)
      - [Config Default Namespaces In The KubeConfig File](#config-default-namespaces-in-the-kubeconfig-file)
      - [Options for Declaring Certificate Data In KubeConfig](#options-for-declaring-certificate-data-in-kubeconfig)
  - [How To Setup User Auth: Steps](#how-to-setup-user-auth-steps)
    - [Basic Auth Style](#basic-auth-style)
      - [Create The Credential File](#create-the-credential-file)
      - [Edit The Kube-ApiServer Pod Definition File](#edit-the-kube-apiserver-pod-definition-file)
      - [Create The Role for the user](#create-the-role-for-the-user)
      - [Create the Role Binding for the user](#create-the-role-binding-for-the-user)
      - [Authenticate with the cred](#authenticate-with-the-cred)
  - [Things To Do](#things-to-do)

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
##### Static User Details
**Even though these static-file approaches are possible, this is not recommended.**  

Consider using a csv file with 3 cols: pw,un,uid.  
A 4th column can also exist to assign users to groups.  

The filename can be passed as an option to the kube-apiserver - 

To auth with one of those users:  
`curl -v -k https://master-node-ip-here:6443/api/v1/pods -u "un:pw"`  

##### Static Token Files
Static Token Files can also work:
```csv
tokenval,un1,pw1,grp1
tokenval2,un2,pw2,grp1
tokenval3,un3,pw3,grp1
tokenval4,un4,pw4,grp1
```
These can be passed to the kubeapi server `--token-auth-file=the-toke-csv-file.csv`.  
This can be used during a curl to the k8s api server:
`curl -v -k https://master-node-ip-here:6443/api/v1/pods --header "Authorization: Bearer <a-user-token-here>"`. 


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

### KubeConfig File
#### Contents
The Config file has 3 "sections": Clusters, Users, and Contexts.  
The file can be viewed with redacted contents with `kubectl config view`.  
The file can be `cat` with `cat $HOME/.kube/config`. This one will show full cert auth contents.  

Here, a dummy kubeconfig yaml definition: 
```yaml
apiVersion: v1
kind: Config
# THIS current-context defines the "default" context 
# when a mult-context config is present
current-context: my-k8s-admin@my-playground
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
  # THIS FIELD, namespace, can scope a context to a namespace
  namespace: dev-space
```
#### Clusters
The K8s Clusters that I need access to - might be like dev/qa/prod, or cloud-provider specific...   
Server Specs go here.  

#### Users
The users with wich I have access to the clusters.  
Users might have different privileges across different clusters.  
Kubernetes, itself, does not deal with user accounts.  
Kubernetes gets user data from other places: files, files with certs, ldap services, etc.  
Service accounts, though, are dealt with and managed by k8s.  
User Keys + Certs data go here.  

#### Contexts
Define which user account uses which cluster - something like `admin@prod` could be admin user on prod server.  
This does not configure users on the cluster. This defines me, the user, and which user+server I'm going to use to work with K8s.  


#### KubeConfig File Used By Kubectl
Kubectl reads that file.  
Kubectl "knows" which context, from the list, to use.  
A field could be added to the file as the "default", `current-context: my-k8s-admin@my-playground`, at the root level of the dir.  

#### Current Context Can Be Updated Through Kubectl and the KubeConfig File
After updating the kubeconfig file with something like a new context, use kubectl to adjust the "current" context of the cluster:
- `kubectl config use-context new-user@new-context`  
This will change the `current-context` field in the kubeconfig yaml file.  

Note: running the `kubectl config` command shows some output describing a bunch of options that can be used with kubectl config:

```bash
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

#### Config Default Namespaces In The KubeConfig File
Update the Context section:
```yaml
contexts:
- name: my-k8s-admin@my-playground
  context:
    # matches clusters[x].name
    cluster: my-playground
    # matches users[x].name
    user: my-k8s-admin
    # a default namespace
    namespace: the-namespace
```

#### Options for Declaring Certificate Data In KubeConfig
Two ways can be used to leverage cert authority in this KubeConfig file:
```yaml
clusters:
  - name: demo-cluster
    # FIRST EXAMPLE
    certificate-authority: /abs/path/to/the/cert/file/ca.crt
    # SECOND EXAMPLE
    certificate-authority-data: the-cert-data-itself-converted-to-base64-1234qwfajzufl
```
For the second example, first convert the cert contents to base64 with something like this in the shell: `cat ca.crt | base64`.   
NOTE: An encoded val can also be decoded with `encodedstring | base64 --decode`.  



## How To Setup User Auth: Steps
### Basic Auth Style
#### Create The Credential File
Create a user credential csv file called `user-creds.csv`, with the columns password,username,userId. This goes at `/tmp/users/user-details.csv`:
```csv
pw123,userFirst1,u0001
pw123,userSecond2,u0002
pw123,userThird3,u0003
pw123,userFourth4,u0004
pw123,userFifth5,u0005
```

#### Edit The Kube-ApiServer Pod Definition File
The Kube-ApiServer works with a pod def file at `/etc/kubernetes/manifests/kube-apiserver.yaml`.  
The Kube-apiserver is located at `/etc/kubernetes/manifests/kube-apiserver.yaml`.  
The Kube-apiserver is located at `/etc/kubernetes/manifests/kube-apiserver.yaml`.  

Add the command to the command list to include the user-auth csv created above:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    # ...more here...
    # ...more here...
    # ...more here...
     - --basic-auth-file=/tmp/users/user-details.csv
    image: k8s.gcr.io/kube-apiserver-amd64:v1.11.3
    name: kube-apiserver
    volumeMounts:
    - mountPath: /tmp/users
      name: usr-details
      readOnly: true
  volumes:
  - hostPath:
      path: /tmp/users
      type: DirectoryOrCreate
    name: usr-details
```


#### Create The Role for the user
```yaml
apiVersion: rbac/authorization.k8s.io/v1
kind: Role
metadtata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

#### Create the Role Binding for the user
this will allow the/a user to use the role:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods-rb
  namespace: default
subjects:
- kind: User
  # user HERE MATCHES one of the users from the csv
  name: userSecond2
  apiGroup: rbac.authorization.k8s.io
roleRef:
  #one of Role or ClusterRole
  kind: Role
  # HERE MATCHES the name of the Role or ClusterRole
  name: pod-reader bind to
  apiGroup: rbac.authorization.k8s.io
```

#### Authenticate with the cred
`curl -v -k https://localhost:6443/api/v1/pods -u "userSecond2:pw123"`


## Things To Do
- update the 3 parts of the kubeconfig file:
  - users
    - the crt can be content or a file
  - clusters
    - 
  - contexts
    - a combo of user + cluster
- update the current context through the cli
  - `kubectl config use-context context-name-here`
- get the current context
  - `kubectl config current-context`