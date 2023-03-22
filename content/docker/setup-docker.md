---
title: Setup Docker
parentDir: docker
slug: docker/setup-docker
mySlug: setup-docker
author: Jake Laursen
excerpt: Getting Docker Setup On a Machine
tags: ["Docker", "containers", "setup", "download"]
order: 2
---

# Setting Up Docker
- [Setting Up Docker](#setting-up-docker)
    - [Check Out Docker Hub](#check-out-docker-hub)
    - [Running Docker Images](#running-docker-images)
    - [Made to be ephemeral](#made-to-be-ephemeral)
    - [docker run shortcut](#docker-run-shortcut)
    - [run a command after starting a container](#run-a-command-after-starting-a-container)
    - [order of  commands matters](#order-of--commands-matters)
    - [how to clear docker images that are running](#how-to-clear-docker-images-that-are-running)
    - [run a container in the bg](#run-a-container-in-the-bg)
    - [attach a bg container](#attach-a-bg-container)
    - [kill a container](#kill-a-container)
    - [Naming a container](#naming-a-container)
    - [NOTE: cant use a container name 2x](#note-cant-use-a-container-name-2x)


### Check Out [Docker Hub](https://hub.docker.com/search?q=&type=image)
Docker hub is something like an 'npm' of docker pre-built images.
- [mongo](https://hub.docker.com/_/mongo) (_downloaded 1 BILLION+ times!!_)
- [mongo-express](https://hub.docker.com/_/mongo-express) (_downloaded 100 MILLION+ times!!_)
- [redis](https://hub.docker.com/_/redis)(_downloaded 1 BILLION+ times!_)
- [nginx](https://hub.docker.com/_/nginx)(_downloaded 1 BILLION+ times!_)

### Running Docker Images
```docker run```
thats the main command.

Here's a more realistic command...
```
docker run --interactive --tty alpine:3.10 # or, to be shorter: docker run -it alpine:3.10
  ```

Developers might be more interested in RUNNING containers rathe than BUILDING them.
 
 - apline is the flavor of linux being run , sourced from docker-hub
 - COULD run ```docker run alpine```
	 - this would implicitly run alpine:latest
	 - try to be explicit about versions being used
 - ALPINE IS...
	 - tiny linux, has bare-bone necessities for running web-servers

check  cur version
```cat /etc/issue```
...etc/issue is a linux file that prints which version of linux is being run
should return ```Welcome to Alpine...```

### Made to be ephemeral
docker containers are made to be spun up && thrown out

### docker run shortcut
```
docker run -it alpine:3.10
``` 
- puts me interactively inside the container
- docker run alpine 3.10 runs && quits

### run a command after starting a container
```
docker run alpine:3.10 ls
```
- ls of the container (the root of the container)

### order of  commands matters
- docker
- run (the command)
- flags (--t --rm)
- name of container (alpine:3.10)
- command to run (ls, etc)

### how to clear docker images that are running
```
docker image prune
```

### run a container in the bg 
```
docker run -it --detach ubuntu:bionic
```
- detach spits out the hash
- runs container in bg

### attach a bg container
```
docker attach <container-name-here>
```

### kill a container
``` docker kill <container-id OR name>```


### Naming a container
``` docker run -it --name my-container apline:3.10```
- NAMES the container my-container


### NOTE: cant use a container name 2x
- particularly after 'kill'ing a container
- MUST run ```docker rm my-alpine```