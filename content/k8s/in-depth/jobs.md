---
title: Use Kubernetes Jobs to Manage Workloads That End 
parentDir: k8s/in-depth
slug: k8s/in-depth/jobs
author: Jake Laursen
excerpt: A Job Object can describe to kubernetes how to manage workloads that only need to run for the duration of the workload
tags: Kubernetes, K8s, pods, containers, jobs, workloads
order: 17
---

# Some Processes are Job Oriented
Some containerized workloads are job-specific & not like a web-server.  
Job-oriented workloads perform a task and then are done.  

- [Some Processes are Job Oriented](#some-processes-are-job-oriented)
  - [Jobs Can Run in Containers](#jobs-can-run-in-containers)
  - [Kubernetes Can Manage These Types of Containers](#kubernetes-can-manage-these-types-of-containers)
    - [K8s Wants The Container Running](#k8s-wants-the-container-running)
    - [Adjust The Restart Policy of a Pod](#adjust-the-restart-policy-of-a-pod)
  - [Leveraging K8s Jobs](#leveraging-k8s-jobs)
    - [Creating a Job](#creating-a-job)
    - [Inspect job output and cleanup the job](#inspect-job-output-and-cleanup-the-job)
  - [More Job Complexities](#more-job-complexities)
    - [Run Multiple Ccntainers](#run-multiple-ccntainers)
    - [Kubernetes Will Restart until the Completions are Successful](#kubernetes-will-restart-until-the-completions-are-successful)
    - [Run Jobs In Parralel](#run-jobs-in-parralel)
  - [CronJobs](#cronjobs)



## Jobs Can Run in Containers
Say we have a simple math problem to represent a job to do: 8 + 3.  
Docker can run a container to solve just this problem:  
```bash
docker run ubuntu expr 8 + 3  
11  

# Inspect the container status
docker container ls -a
CONTAINER ID    IMAGE     COMMAND       CREATED           STATUS                      PORTS     NAMES
bc8765118836   ubuntu     "expr 8 + 3"  13 seconds ago    Exited (0) 13 seconds ago             mystifying_noether
```  

Here, the container turns on, runs the job, returns the results, and then sits in an "Exited" state. The container is no longer running.  

## Kubernetes Can Manage These Types of Containers
A Pod Definition file:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simple-job-pod
spec:
  containers:
  - name: simple-job-box
    image: ubuntu
    command: ["expr", "8", "+", "3"]
```
Run this in k8s:
```bash
kubectl create -f simple-pod.yaml

# wait a few seconds, check the pod status
kubectl get pods
NAME            READY     STATUS    RESTARTS      AGE
simple-job-pod  0/1       Completed 1             1d
```
Here, the pod turns on, runs the container, and then sits in the "Completed" state.  

### K8s Wants The Container Running
K8s notices that the pod is in the "Completed" stage.  
K8s recreates the container in an attempt to keep the container running: K8s thinks it is broken & wants it to run.  
K8s will continue to run and recreate the container until a limited number of re-starts is reached.   

### Adjust The Restart Policy of a Pod
The [spec of a pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy) has a `restartPolicy` field that can be overwritten - this will adjust how the pod auto-restarts.  
By default, this is set to `Always`.  
Other options are `OnFailure` and `Never`.  

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simple-job-pod
spec:
  containers:
  - name: simple-job-box
    image: ubuntu
    command: ["expr", "8", "+", "3"]
  restartPolicy: Never
```

## Leveraging K8s Jobs
- Make sure all pods perform the tasks assigned to them and exits
- Manage creating an un-specified number of pods: the number of pods may be defined by the workload, itself

Replicasets make sure a specified number of pods is always running.  
**Jobs**, on the other hand, runs a set of pods to perform a task to completion.  

### Creating a Job
```yaml
# simple-job.yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: simple-job
spec:
  # the spec has a template
  template:
    # the template contains all spec contents of the pod
    spec:
      containers:
      - name: simple-job-box
        image: ubuntu
        command: ["expr", "8", "+", "3"]
      restartPolicy: Never
```

Manage the job with kubectl
```bash
# create the job
kubectl create -f simple-job.yaml

# check it out!
kubectl get jobs
NAME        DESIRED     SUCCESSFUL      AGE
simple-job  1           1               12s


# See the PODS that the job created
kubectl get pods
NAME                READY     STATUS    RESTARTS      AGE
simple-job-pod-986  0/1       Completed 1             2m
```

### Inspect job output and cleanup the job
```bash
# see the logs of the pod
kubectl logs simple-job-pod-986
11

# kill the job
kubectl delete job simple-job
```


## More Job Complexities
### Run Multiple Ccntainers
K8s allows for running a job many times, using many instances of the job pod. Here, run the job pod 3x, in sequence:  

```yaml
# simple-job.yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: simple-job
spec:
  # run till the job completes 3x
  completions: 3
  template:
    spec:
      containers:
      - name: simple-job-box
        image: ubuntu
        command: ["expr", "8", "+", "3"]
      restartPolicy: Never
```  

Manage the job with kubectl
```bash
# create the job
kubectl create -f simple-job.yaml

# check it out, wait a little longer for the 3 jobs to run
kubectl get jobs
NAME        DESIRED     SUCCESSFUL      AGE
simple-job  3           3               30s


# See the PODS that the job created
kubectl get pods
NAME                READY     STATUS    RESTARTS      AGE
simple-job-pod-a9j  0/1       Completed 1             2m
simple-job-pod-o3c  0/1       Completed 1             2m
simple-job-pod-pe2  0/1       Completed 1             2m
```

### Kubernetes Will Restart until the Completions are Successful
NOTE: the 2nd pod only gets created after the first pod finishes.  
Here, an image randomly fails:
```yaml
# simple-job.yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: simple-job
spec:
  completions: 3
  template:
    spec:
      containers:
      - name: simple-job-box
        image: kodekloud/random-error
      restartPolicy: Never
```  

Manage the job with kubectl
```bash
# create the job
kubectl create -f simple-job.yaml

# check it out, wait a little longer for the 3 jobs to run
kubectl get jobs
NAME        DESIRED     SUCCESSFUL      AGE
simple-job  3           3               30s


# See the PODS that the job created
kubectl get pods
NAME                READY     STATUS    RESTARTS      AGE
simple-job-pod-a9j  0/1       Completed 1             2m
simple-job-pod-o3c  0/1       Error     1             2m
simple-job-pod-pe2  0/1       Completed 1             2m
simple-job-pod-qwe  0/1       Error     1             2m
simple-job-pod-asd  0/1       Error     1             2m
simple-job-pod-zxc  0/1       Completed 1             2m
```

### Run Jobs In Parralel
Here, the Kubernetes Job will create 3 pods off the bat:  
```yaml
# simple-job.yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: simple-job
spec:
  completions: 3
  parallelism: 3
  template:
    spec:
      containers:
      - name: simple-job-box
        image: kodekloud/random-error
      restartPolicy: Never
```  
Here, K8s will "know" how many pods to recreate until success. It doesn't recreate 3 pods every time.  

## CronJobs
CronJobs can be scheduled, like CronTabs in linux: like something that runs a report, gets some data, and sends an email.  
```yaml
# simple-job.yaml

apiVersion: batch/v1
kind: CronJob
metadata:
  name: simple-cron-job
# cronJob spec
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    # job spec
    spec:
      completions: 3
      parallelism: 3
      template:
        # pod spec
        spec:
          containers:
          - name: simple-job-box
            image: kodekloud/random-error
          restartPolicy: Never
```  

Epic Imperative line:
```bash
kk create cronjob throw-dice-cron-job --image=kodekloud/throw-dice --schedule="30 21 * * *"
cronjob.batch/throw-dice-cron-job created
```