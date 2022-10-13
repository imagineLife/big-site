---
title: Adjust a service in real-time to toggle deployment accessibility
parentDir: k8s/examples
slug: k8s/examples/real-time-service-adjustment
author: Jake Laursen
excerpt: Create 2 http servers and toggle a deployment to switch which server is served through the k8s service
tags: k8s, services, deployments, real-time
order: 17
---

Here, create 2 http servers, and toggle which one is presented when curled by simply editing a selector label in a service definition file.

## Create An http server that can be curl-able from the host node
  - create a deployment
    - use the image `nginx`
    - set 1 replica for this (_repplicas are not necessary right now_)
    - `kkc deployment nxdep --image=nginx --port=80`
### Create a service to  make this deployment available
```yaml
# nx-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: httpsvc
spec:
  ports:
    - port: 80
      protocol: TCP
  selector:
    app: nxdep
  sessionAffinity: None
status:
  loadBalancer: {}
```
- `kkc -f nx-service.yaml`

## Create another http server
`kkc deployment httpdep --image=http`

## Test And Adjust the Service
The service should have a cluster IP:
```bash
kkg svc
# something like...
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
httpsvc    ClusterIP   10.107.133.xxx    <none>        80/TCP     30m
```
This service is curlable from the host node, and should show the default nginx http page on port 80:

```bash
curl http://10.107.133.xxx
```

### Adjust And Re-Test the service
```bash
kubectl edit svc httpsvc
# change the selector from its current selector to `name: httpdep`


curl http://10.107.133.xxx
# should how the httpd static http page!
```
