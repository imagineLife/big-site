---
title: Logging In K8s Is Similar to Logging in Docker
parentDir: k8s/in-depth
slug: k8s/in-depth/logging-and-monitoring
author: Jake Laursen
excerpt: Syntax to log a pod in kubernetes is nearly identical to logging with docker
tags: ["Kubernetes", "k8s", "pods", "containers", "logs"]
order: 15
---

# Logging And Monitoring
- get errors from the command line
- get pod logs
- get the status of pods
- troubleshoot networking bugs
- validate resource allocation

## Logging For Docker Containers
```bash
# docker logs -f container-id
docker logs -f api-box
```

## Logging For Pods in K8s
```bash
# kubectl logs -f pod-name
kubectl logs -f api-pod
```

## Logging Containers in Multi-Container Pods
```bash
# kubectl logs -f pod-name container-name
kubectl logs -f api-pod api-emailing-sidecar-box
```

## System Logs
`systemd` matters here - with `systemd`, logs go to journalct, viewable through the cli tool `jourcnalctl -a`.  
Without `systemd`, logs go to `/var/log/<agent-name>.log`.  
Things that log:
- kube-scheduler
- kube-proxy
- kubelet
- Docker

## Fluentd for cluster-wide details
[fluentd](https://kubernetes.io/docs/concepts/cluster-administration/logging/) can help aggregate logs across a cluster:
- fluentd agents run on each node via a `DaemonSet`Troubleshooting
- they agg logs
- they feed them to an elasticsearch instane 
- can be viz'd in a kibana dashboard!

# Monitoring
Metric are collected with the `kubelet`:
- `kubelet` is the agent on each node - it writes logs to the local fs via the docker logging driver
- gets directions from master server
- contains `cAdvisor`, getting performance metrics from pods
- Get this up & running with
  - `minikube addons enable metrics-server`
  - or
  - git clone https://github.com/kubernetes-incubator.metrics-server.git then kubectl create -f deploy/1.8+/
  - `kubectl top node` will show a little cli table
  - `kubectl top pod` will show a little cli table
- `kubectl logs` GETS the logs that the `kubelet` wrote

Several options are out there:
- Metrics Server
  - an in-memory option && cannot see historical performance data
- Prometheus
- Elastic Stack
- DataDog
- Dynatrace
### Monitoring Resource Consumption
- cpu
- network
### Monitoring Objects And Object Health
- number of nodes
- health of nodes
- pod count
- pod cpu & memory usage

### Other CNFC monitoring and tracing tools
The [Cloud Native Computing Foundation](https://www.cncf.io) has a few open-source tools for monitoring: Prometheus, Fluentd, OpenTracint, and Jaeger.  
A bunch of these tools have batteries-included examples to spin up with docker, an express api, etc.
#### Prometheus
[Prometheus](https://prometheus.io)
- focuses on alerting and metrics
- provides a db that is time-series oriented, query-able
- cluster-wide alerts
- integrates with grafana
- [grafana](https://github.com/grafana/grafana)

#### Fluentd
[Fluentd](https://www.fluentd.org):
- an open-source data collector
- unifies data collection & consumption
- JSON formatted logs
- plugin-architecture: plugins galore
- low hardware reqs:
  - "_30-40MB of memory and can process 13,000 events/second/core_" (from docs)

#### OpenTracing
NOTE: it looks like the openTracing has "moved" to [OpenTelemetry](https://github.com/open-telemetry).  

[OpenTracing](https://opentracing.io)
- "distributed tracing"
- maybe optimal for microservice archutecture
- an API spec, has frameworks and libs that implement the spec
- [here](https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/) is an example of the nodejs example running a simple express app

#### Jaeger
[Jaeger](https://www.jaegertracing.io). Developed by uber! 
[Uber's blogpost](https://www.uber.com/blog/distributed-tracing/) on their evolution of distributed tracing.  
Jaeger is used to "_Monitor and troubleshoot transactions in complex distributed systems_".  
- transaction monitoring
- RCA
- service dependency analysis
- perf/latency optimization


## Kubectl Debug
[k8s docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#debug):
- can "debug" an object (i.e. pod)
- can create an ephemeral container to _an already running process!_
- access a nodes FS by creating a pod in a nodes host namespace

```bash
kubectl debug -h
# was kubectl alpha debug

# debug the master node
#   create a "busybox" image to run on the node
kubectl debug node master -it --image=busybox

# in the new container, view processes on the host node
ps
# in the container, print logs of a different pod
kubectl logs the-other-pod
```

## References for Logging, Debugging and Troubleshooting
- [Monitoring, Logging, and Debugging](https://kubernetes.io/docs/tasks/debug/) K8s docs
- [Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/) K8s docs
- [Debug Services](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/) k8s docs
- [Troubleshooting Clusters](https://kubernetes.io/docs/tasks/debug/debug-cluster/) K8s docs
- [K8s Github Issues](https://github.com/kubernetes/kubernetes/issues)  
- [K8s Slack](https://kubernetes.slack.com)

## Things to be able to do
- install a metrics server
  - git clone https://github.com/kodekloudhub/kubernetes-metrics-server.git
- create all the k8s objects from the downloaded resources
  - cd kubernetes-metrics-server
  - kk create -f .
    - note the dot! :) 
- see some stats about nodes
  - kk top node
- see some pod stats 
  - kk top pod
