---
title: Use Commands and Argunments to Configure Pods and Containers
parentDir: k8s/in-depth
slug: k8s/in-depth/commands-and-args
author: Jake Laursen
excerpt: Pass Commands and Arguments to the Docker Containers that are run inside of pods
tags: ["Kubernetes", "K8s", "commands", "args", "docker", "cli"]
order: 4
---

# Commands and Arguments
**Commands**, here, will refer to the command that a docker container runs on startup.  
A node server might run `npm run server` if it were using npm to run the server, or `node server.js` if it were using node directly.  

**Arguments**, here, will refer to any, well, arguments passed to the command(s) that are run when a docker container is run.  
A node server may expect a db connection name as `DB_NAME=<db-name-here>` and will be expecting it after the node run command, like this -> `node index.js DB_NAME="pg-box"`.  

- [Commands and Arguments](#commands-and-arguments)
  - [Modify a pod definition file to have a new command](#modify-a-pod-definition-file-to-have-a-new-command)
    - [Use a list to describe commands in a pod definition](#use-a-list-to-describe-commands-in-a-pod-definition)
  - [Mapping between Pod Definitions and COntainer Definitions](#mapping-between-pod-definitions-and-container-definitions)
## Modify a pod definition file to have a new command
Make this ubuntu image sleep for 10K seconds
```yaml
# pod-def-1.yaml
apiVersion: v1
kind: Pod
metadata:
  name: tired-ubuntu
spec:
  containers:
    - name: ubuntu
      image: ubuntu
    # THIS can get added to make the machine sleep for 10,000 seconds
      command: ["sleep", "10000"]
```
### Use a list to describe commands in a pod definition
Same def file as above, just expressed differently
```yaml
# pod-def-1.yaml
apiVersion: v1
kind: Pod
metadata:
  name: tired-ubuntu
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: 
        - "sleep"
        # NOTE these must be strings, not numbers
        - "10000"
```

## Mapping between Pod Definitions and COntainer Definitions
- Containers use 
  - `ENTRYPOINT` to define the command that is run
    - i.e `ENTRYPOINT ["node", "."]`
  - `CMD` to define arguments passed to the entrypoint command
  - i.e `CMD ["DB_NAME", "PG_DB", "REDIS_NAME", "REDIS_BOX"]`
- K8s Pod Def files, though, use different words to override the same things...
  - `command` to override the `ENTRYPOINT` of a dockerfile
    - i.e `command: npm run start` instead of `node .` above
  - `args` to override the `CMD` of a dockerfile
    - i.e `args: ["DB_NAME", "HORSE", "REDIS_NAME", "DOG"]` instead of above `CMD` args
  
