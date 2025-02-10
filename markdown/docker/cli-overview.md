---
title: 'The Docker CLI: An Overview'
parentDir: docker
slug: docker/cli-overview
author: Jake Laursen
excerpt: Some Commands That May Become Second Nature
tags: ['Docker', 'CLI']
order: 3
---

# Docker CLI

Docker has a [command-line interface](https://docs.docker.com/engine/reference/commandline/docker/). The CLI can be used to interact with docker to do things like pull images, build images from dockerfiles, run containers, inspect containers, and more.

- [Docker CLI](#docker-cli)
  - [docker inspect](#docker-inspect)
  - [docker pause and unpause](#docker-pause-and-unpause)
  - [run vs exec](#run-vs-exec)
  - [connect to a container using exec](#connect-to-a-container-using-exec)
  - [history](#history)
  - [kill all containers](#kill-all-containers)
  - [docker info](#docker-info)
  - [docker top container-id-here](#docker-top-container-id-here)
  - [docker rm container-hash-here](#docker-rm-container-hash-here)
  - [docker rmi](#docker-rmi)
  - [docker container prune](#docker-container-prune)
  - [docker restart container-name-here](#docker-restart-container-name-here)
  - [search docker hub for a python container](#search-docker-hub-for-a-python-container)

## docker inspect

`docker inspect node:16-stretch`
spits out metadata about the image+tag...

- hash
- tags
- env vars
- entrypoint

## docker pause and unpause

`docker pause <container-id>`
'pauses' the container...

- freezes the process

`docker unpause <container-id>`

## run vs exec

- `run` starts a new container
- `exec` runs something on an existing container
- `docker exec <container-name> bash`
  - opens bash in a container

## connect to a container using exec

```bash
docker exec -it <container-name> bash
```

## history

`docker history node:12-stretch`

- see changes in container/image history

## kill all containers

`docker kill $(docker ps -q)`

## docker info

```bash
docker info
```

- dumps a bunch of info about the HOST machine running docker...
  - # of containers running
  - osType
  - ...more

## docker top container-id-here

- use top to see all process running in a container

## docker rm container-hash-here

removes a container

## docker rmi

removes an IMAGE

## docker container prune

removes all stopped container

## docker restart container-name-here

restarts the container
... some containers don't notice 'restart' signals, like node

## search docker hub for a python container

```
docker search python
```

searches dockerHub for containers matching the string
