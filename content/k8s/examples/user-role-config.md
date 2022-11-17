---
title: Setup A User, A Role, A RoleBinding, and Set Kubectl to use the new user account
parentDir: k8s/examples
slug: k8s/examples/user-role-config
author: Jake Laursen
excerpt: A Several-Step Process to get a new kubectl user up & running with explicit permissions on Kubernetes resources
tags: k8s, user, role, rolebinding, resources, permissions, kubeconfig, kubectl
order: 19
---

- [Enable User Credentials for User "Jake"](#enable-user-credentials-for-user-jake)
- [Setup a Role That Jake Will Be Connected To](#setup-a-role-that-jake-will-be-connected-to)
- [Bind Jake to The Role with a RoleBinding](#bind-jake-to-the-role-with-a-rolebinding)
- [Set the current context for jake](#set-the-current-context-for-jake)
- [Use the new context](#use-the-new-context)

## Enable User Credentials for User "Jake" 
Here, "jake" gets added as a user to the kubeconfig file.
```bash
# Set a user entry in kubeconfig for "jake"
# leverage a crt + key par that already exist
kubectl config set-credentials jake --client-certificate ./jake.crt --client-key ./jake.key

# interesting alternative to leverage oidc!
kubectl config set-credentials jake --auth-provider=oidc --auth-provider-arg=client-id=auth-id-here
--auth-provider-arg=client-secret=auth-client-secret-here
```

## Setup a Role That Jake Will Be Connected To
This role...
- named `devops-engineer`
- in the `dev` namespace
- can crud on pods, services, persistent volume claims, and deployments

```bash
kubectl create role devops-engineer --resource=pods,svc,pvc,deployment --verb="*" -n dev
```

## Bind Jake to The Role with a RoleBinding
Connect Jake + the role
```bash
kubectl create rolebinding jake-devops-rb --role=devops-engineer --user=jake -n dev
```
## Set the current context for jake
Here, a context named `devopsengineer` will be created for "jake" in the "kubernetes" cluster
```bash
kubectl config set-context devopsengineer --cluster kubernetes --user jake
```

## Use the new context
```bash
kubectl config use-context devopsengineer
```