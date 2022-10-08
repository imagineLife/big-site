---
title: A Look at how security contexts affect a pod
parentDir: k8s/examples
slug: k8s/examples/security-context-effects
author: Jake Laursen
excerpt: Setting securityContext on a container and/or a pod will impact what privileges the pod/container has within the host os
tags: k8s, security contexts, security,
order: 15
---

A look into the impact of a securityContext being applied:
- a pod running a container
- the pod will have a security rule, running as user `1000`
- the container will have 2 security rules
  - run as user `2000`
  - do not allow privilege escalation


## Create A Pod And Container With Security Specs
```yaml
# pod-security-play.yaml
apiVersion: v1
kind: Pod
metadata:
  name: limitedpod
spec:
  securityContext:
    runAsUser: 1000
  containers:
  - name: limitedimg
    image: busybox
    command:
      - sleep
      - "3600"
    securityContext:
      runAsUser: 2000
      allowPrivilegeEscalation: false
```

```bash
kubectl create -f pod-security-play.yaml
```

## Inspect the Impact of the Security SEttings on the Pod And Container
### User ID
Processes run by the container and pod are now using the user ID set by the yaml config:

```bash
# shell into the pod
$ kubectl exec -it limitedpod -- sh

# show the processes running
$ ps aux
PID   USER     TIME  COMMAND
    1 2000      0:00 sleep 3600
    7 2000      0:00 sh
   14 2000      0:00 ps aux
```
NOTICE:
- the sleep and shell and aux commands are all as user id `2000`: this was set in the pod description file

### Append Some Capabilities
#### Background with the proc fs
There is a [`/proc` directory setup in linux](https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/proc.html).  
This contains contents about processes: some by process ID, some about the whole system regardless of processes.  
- this is a virtual fs
- apparently a bunch of system utilities call the files in this dir
  - `lsmod` === `cat /proc/modules`
- editing stuff in this dir can change kernel params (_sysctl_) while the system is runnin

#### Using The proc dir to see capabilities
Containers have "capabilities", or "privileges". Inspect the priveleges in the container.
```bash
# shell into the container, like above, if not already in
kubectl exec -it limitedpod -- sh

# glance at a large file for details on process id 1
# the process running the "sleep" command
cat /proc/1/status

# slim down the output to be ONLY "CapXXX" items, 
#   representing "capabilities" in a fancy code
cat /proc/1/status | grep Cap

# shows...
CapInh: 00000000a80425fb
CapPrm: 0000000000000000
CapEff: 0000000000000000
CapBnd: 00000000a80425fb
CapAmb: 0000000000000000
```
Decode the `CapInh` in the host machine
```bash
# exit the container
exit

# now should be in the host shell
$ capsh --decode=00000000a80425fb

# shoud show something like...
WARNING: libcap needs an update (cap=40 should have a name).
0x00000000a80425fb=cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap
```
- each item in the comma-separated list is a capability that the process has


#### Adjusting container capabilities in k8s yaml config
Here, the "SYS_TIME" capability will be explicitly added to the container:
```yaml
# adjust the file
apiVersion: v1
kind: Pod
metadata:
  name: limitedapp
spec:
  securityContext:
    runAsUser: 1000
  containers:
  - name: limitedimg
    image: busybox
    command:
      - sleep
      - "3600"
    securityContext:
      runAsUser: 2000
      allowPrivilegeEscalation: false
      capabilities:
              add: ["SYS_TIME"]
```

- delete the running pod
- re-create the pod with the updated yaml file
- see the impact on the provisioned capabilities, like above
  - shell into the pod
  - list the capabilities
  - exit the pod
  - decode the capabaility from the `CapInh`
  - notice that `cap_sys_time` should not be incldued in the list!