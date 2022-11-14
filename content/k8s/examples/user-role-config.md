---
title: Setup A User, A Role, A RoleBinding, and Set Kubectl to use the new user account
parentDir: k8s/examples
slug: k8s/examples/user-role-config
author: Jake Laursen
excerpt: A Several-Step Process to get a new kubectl user up & running with explicit permissions on Kubernetes resources
tags: k8s, user, role, rolebinding, resources, permissions, kubeconfig, kubectl
order: 19
---

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