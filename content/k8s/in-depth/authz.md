---
title: Roles Are A Great Way To Manage User Authorization To K8s Objects
parentDir: k8s/in-depth
slug: k8s/in-depth/authorization
author: Jake Laursen
excerpt: Create Roles and RoleBindings to configure customizable authorization across K8s objects
tags: Kubernetes, K8s, authorization, roles, role bindings
order: 27
---


# Authorization in K8s
Admin users can do all kinds of stuff, potentially any operation.  
Other User Accounts can be made for other types of users. These can have restricted functions, so as to make sure specific users don't do things that they "shouldn't" be able to do, or need to do.   

- [Authorization in K8s](#authorization-in-k8s)
  - [Authorization On Objects](#authorization-on-objects)
    - [Internal Access of the K8s Cluster](#internal-access-of-the-k8s-cluster)
      - [Nodes](#nodes)
    - [External Access Outside of the Cluster](#external-access-outside-of-the-cluster)
    - [ABAC](#abac)
    - [RBAC](#rbac)
    - [WebHooks](#webhooks)
    - [Always](#always)
    - [Updating The Default Authz Mode Config](#updating-the-default-authz-mode-config)
  - [RBAC In More Depth](#rbac-in-more-depth)
    - [A Developer Role Example](#a-developer-role-example)
      - [Create The Role](#create-the-role)
      - [Bind The Role To A User](#bind-the-role-to-a-user)
  - [Cluster-Wide Objects ANd Cluster-Wide Roles](#cluster-wide-objects-and-cluster-wide-roles)
    - [ClusterRoles and ClusterRoleBindings](#clusterroles-and-clusterrolebindings)
  - [See my own access](#see-my-own-access)
## Authorization On Objects
### Internal Access of the K8s Cluster
#### Nodes
The Kubeapi server is accessed by folks, as well as by kubelet.  
These requests are handled by the node authoriser.  
There is a "system node" group that contains users that are authorized by the node authoriser.  

### External Access Outside of the Cluster 
There are a few auth mechanisms and "modes": abac, rbac, webhooks, alwaysAllow and alwaysDeny here.  
The modes are set using authorization-mode option on the kubeapi-server. It is default set to alwaysAllow. 
### ABAC
Users get associated with permissions: CRUD pods, etc.  
This is managed by a policy file.  
This file gets passed into the api server.  
ABAC are more difficult to manage than RBAC, and might require more manual updates to manage.  

### RBAC
Wrap a bunch of permissions into a role.  
Assign roles to users - a developer role for developers, a security role for security users.  

### WebHooks
OpenPolicyAgent is a tool that can help.  
K8s can "call" that agent, for info about a user, and get the users' authz deets.  

### Always
AlwaysAllow and AlwaysDeny. The name says it all.  

### Updating The Default Authz Mode Config
The mode config can be updated in the kubeapi-server: `---authorization-mode=Node,RBAC,Webhook`.  
Multiple modes go through each authz mode: First handled by the node authorizer (for node requests), RBAC checks, then webhooks. When one step is denied, the next is processed. When one succeeds, the authz process does not continue.  

## RBAC In More Depth
### A Developer Role Example
#### Create The Role
A new config file. Config for all!  

This could be called dev-role.yaml or something.
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["list", "get", "create", "update", "delete"]
- apiGroups: [""]
  resources: ["ConfigMap"]
  verbs: ["create"]
```
NOTE: resources can be specified:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: webapp-developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["list", "get", "create", "update", "delete"]
  resourceNames: ["webapp", "nginx"]
```

Create the role:
```bash
kubectl create -f dev-role.yaml
```

#### Bind The Role To A User
Another config file.  
This could be called dev-to-role-binding.yaml
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: dev-to-role-binding
  # NOTE: can include namespace specifics here - default namespace is used when not specified
subjects:
# user details
- kind: User
  name: dev-user
  apiGroup: rbac.authorization.k8s.io
# role details
roleRef:
  kind: Role
  name: developer
  apiGroup: rbac.authorization.k8s.io
```
create it
```bash
kubectl create -f dev-to-role-binding.yaml
```

See Roles & Bindings:
```bash
# see all roles
kubectl get roles

# see role bindings
kubectl get rolebindings

# more deets on a role
kubectl describe role developer

# more deets on a rolebinding
kubectl describe rolebinding dev-to-role-binding
```

## Cluster-Wide Objects ANd Cluster-Wide Roles
Many objects are namespace-scoped:
- pods
- replicasets
- jobs
- deployments
- services
- secrets
- roles
- rolebindings
- configmaps
- persistent volume claims

Some Objects are "broader" than a namespace, and more-so fit in the cluster scope:
- nodes
-  clusterroles
-  clusterrolebindings
-  certificatesigningrequests
-  namespaces
-  persistent volumes

### ClusterRoles and ClusterRoleBindings
allow actions on nodes, pvs, etc.  
K8s comes with cluster roles.  
Call this something like cluster-admin-role.yaml
```yaml
apiVersion: rbac.authorization.l8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-administrator
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["list", "get", "create", "delete"]
```

Bind the role to a user with a culsterRoleBinding:
```yaml
apiVersion: rbac.authorization.kubernetes.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admin-role-binding
subjects:
- kind: User
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-administrator
  apiGroup: rbac.authorization.k8s.io
```



## See my own access
```bash
# obeject then function
kubectl auth can-i create deployments
kubectl auth can-i delete pods

# as a user
kubectl auth can-i delete pods --as dev-user

# in a "horse" namespace
kubectl auth can-i delete pods --as dev-user --namespace horse
```