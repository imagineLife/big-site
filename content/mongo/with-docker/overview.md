---
title: With Docker
slug: mongo/with-docker
parentDir: mongo
author: Jake Laursen
excerpt: Running the mongodb instance in a container is great for replicating db development environments for multiple developers
tags: mongo, docker, overview, containerization
order: 1
---

# Why Mongo With Docker

- [Why Mongo With Docker](#why-mongo-with-docker)
    - ["Decoupled" From The Host](#decoupled-from-the-host)
    - [DB Setup Explicitly Defined in Code](#db-setup-explicitly-defined-in-code)
    - [Freedom to decide on Statefulness](#freedom-to-decide-on-statefulness)
- [Running Mongo In Docker](#running-mongo-in-docker)
    - [Pulling and Starting a Mongo Instance](#pulling-and-starting-a-mongo-instance)
      - [Pull An Image](#pull-an-image)
      - [Run the Image as a Container](#run-the-image-as-a-container)
      - [Access the DB through the Mongo CLI](#access-the-db-through-the-mongo-cli)

### "Decoupled" From The Host

The mongo instance, itself, is not explicitly on a host. For a group of software engineers building content, this can be important when people may end up with different versions of the db, different versions of the cli, different data, different auth setup, etc.

### DB Setup Explicitly Defined in Code

Does the DB instance require authentication? See the code.  
Is there 'seed' type data that we can assume we need for our setup? See the code.  
What Version of of `mongod` are we using? See the code.  
What version of the cli tool are we using? See the code.

### Freedom to decide on Statefulness

Does one person on the team want to retain some data & another person on the team want a "fresh" instance of data? Putting Mongo up in a container allows for some quick-win flexibility between a "stateless" instance and an instance which uses data that is mounted from "outside" the container, making a "stateful" instance more available.

# Running Mongo In Docker

First, [download docker](https://www.docker.com/products/docker-desktop). Docker unlocks the "magic" for making the [development environment similar across hosts](#why-mongo-with-docker).

### Pulling and Starting a Mongo Instance

Here

- **Pull An Image**: an [officially supported image](https://hub.docker.com/_/mongo) will get pulled as an image onto the host by using the docker cli. Enter this into the terminal
- **Run The Image as a Container**: with an image stored on your machine, docker can use the image and run it as an [ephemeral container](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#create-ephemeral-containers)
- **Use the Mongo CLI**: run a few commands to interact with the db

#### Pull An Image

This will "pull" the docker image onto your host machine, assumedly a laptop or desktop. Run this in a command line terminal:

```bash
docker pull mongo:4
```

- `docker` is the cli tool
- `pull` is the command we are running with `docker` (_[see the docs](https://docs.docker.com/engine/reference/commandline/pull/) for more on that_)
- `mongo:4` is the [tagged image](https://docs.docker.com/engine/reference/commandline/tag/) that we are pulling: here, we are pulling the highest ["major"](https://semver.org/) `4.*.*` version of mongo, which at the time of writing looks like it is using `4.4.10`

To inspect that this image is, indeed, downloaded to your machine, run `docker image ls -a` in the terminal and you should see something like:

```bash
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
mongo        4         29915542a1ef   4 weeks ago    413MB
```

#### Run the Image as a Container

This will start a mongo instance from the docker image `mongo:4`. Run this in a terminal:

```bash
docker run --rm --name mongobox mongo:4
```

- `docker`, again, is the cli tool
- `run` is the command we are running with `docker`
- `--rm` will [automatically remove the container when it exits](https://docs.docker.com/engine/reference/commandline/run/), a "cleanup" command
- `--name mongobox` gives the container a "friendly" name: docker automatically could generate a random friendly name without this command. This is a chosen name `mongobox`
- `mongo:4` tells docker to use that image+tag combo to use as the "base" for the container

Running that will start a docker container that runs a mongo instance on startup. the Terminal should return a bunch of logs about the mongo instance running. This mongo instance is tightly coupled to the current terminal window.

**NOTE:** Another flag is often used to run the mongo instance "in the background" so that the terminal window that ran the above `docker run` command can be used for other terminal commands. the flag here is `-d`, which runs the container in "detached" mode && could be integrated into the run command like `docker run --rm -d --name mongobox mongo:4`. Running the container this way will not output the mongo logs, only the container ID.

To inspect that this container is running without the `-d` flag, the terminal should output the mongo instance logs. This shows the successful startup of the container. Another way to inspect running containers in docker is to use a new terminal window and type `docker container ls -a`. The output should look something like:

```bash
CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS              PORTS       NAMES
a474b4331069   mongo:4   "docker-entrypoint.s…"   About a minute ago   Up About a minute   27017/tcp   mongobox
```

#### Access the DB through the Mongo CLI
