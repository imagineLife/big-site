---
title: Create Custom Resources For Your Own Specific Needs In Kubernetes
parentDir: k8s/in-depth
slug: k8s/in-depth/custom-resources
author: Jake Laursen
excerpt: Leverage Kubernetes to create new resources types, custom specs on a resource, and custom controllers
tags: Kubernetes, K8s, custom resource, resource, controller
order: 29
---

# An Overview Of Resources and Controllers.  
We, as devs, can create definition files for an object, say a deployment. The deployment is **a resource**.   
We, as devs, run `kubectl create` to tell kubectl to talk to the kubeapi-server to make the resource.  
K8s creates the deployment and stored data about it in the **etcd datastore**.  
We, as devs, can kuse kubectl against the kubeapi-server to do things like create, get, and delete the deployment, which will adjust the etcd data.  
**A controller** in K8s does the work of monitoring the etcd data store, and updates the "real" cluster objects (deployments, pods, etc).  

- [An Overview Of Resources and Controllers.](#an-overview-of-resources-and-controllers)
  - [An Example Mock Custom Resource, A Vacation Agreement Resource](#an-example-mock-custom-resource-a-vacation-agreement-resource)
    - [Tell K8s To Learn A New Resource Type](#tell-k8s-to-learn-a-new-resource-type)
    - [Create One Of These Custom Resources](#create-one-of-these-custom-resources)
    - [Create A Custom Controller To Work With The Resource](#create-a-custom-controller-to-work-with-the-resource)


## An Example Mock Custom Resource, A Vacation Agreement Resource
Tell Kubernetes that we want to make a new object type, a `VacationSearch` object through a new definition file, a custom resource definition (crd):

### Tell K8s To Learn A New Resource Type
```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: VacationSearch.vacations.com
spec:
  # this will be scoped to a namespace
  scope: Namespaced
  # matches the apiVersion in the VacationSearch object definition file, below
  group: vacations.com
  names:
    kind: VacationSearch
    singular: VacationSearch
    plural: VacationSearches
    shortNames:
      - vaca
  versions:
    - name: v1
      served: true
      storage: true
  # all the fields allowed in the object def spec section
  schema:
    openAPIV3Schema:
      type: object
      properties:
        spec:
          type: opbect
          properties:
            where:
              type: string
              required: true
            nightlyMaxRate:
              type: integer
            ammenities:
              type: ...array...?!
            nights:
              type: number
              required: true
```  

### Create One Of These Custom Resources
Here, a vaca-agreement resource to work with through this custom resource work.
```yaml
apiVersion: vacationSearch.com/v1
kind: VacationSearch
metadata:
  name: cali-trip
spec:
  where: SanFrancisco
  nightlyMaxRate: 150
  ammenities: ['wifi', 'dishwasher']
  nights: 14
```
Say this resource type is allowed in K8s.  
Say we can crud this through typical kubectl commands.  
The ETCD Datastore would be updated with info about the resource by using `kubectl <action>` commands.    
Say we also create a VacationSearchController.  
This controller, this **custom controller** would...
- be written in something like nodejs
- watch VacationSearch resources in etcd
- would make api calls to rental sites, with params

### Create A Custom Controller To Work With The Resource
Creating a custom Controller requires, you guessed it, a config file: 
```yaml

```

