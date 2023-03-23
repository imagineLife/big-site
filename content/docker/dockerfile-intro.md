---
title: "Dockerfile: An Intro"
parentDir: docker
mySlug: dockerfile-intro
slug: docker/dockerfile-intro
author: Jake Laursen
excerpt: Beginning With A 2-Line Dockerfile 
tags: ["Docker", "Dockerfile"]
order: 4
---

# Creating Images With Dockerfiles
A common workflow with docker is to first build an image and then run a container from the image.  
A container is an "instance" of the image. Several running containers can be going based on the same image.  
Docker docs [explain what an image is](https://docs.docker.com/glossary/#container-image):  
"_An image is an ordered collection of root filesystem changes and the corresponding execution parameters for use within a container runtime. An image typically contains a union of layered filesystems stacked on top of each other._"   
Images can be things like
- an instance of a Debian running nodeJS hosting a rest api
- an instance of alpine running an nginx server

## DockerFile
Docker reads a dockerfile as a set of instructions on building an image. Each line is an instruction, a part of the file's "proceedure".

### Make one
make a directory & create a dockerfile:
```bash
mkdir container-v1
cd container-v1
```

make the Dockerfile
```bash 
touch Dockerfile
```
#### Prep the file
the dockerfile represents a series of instructions that the os runs. Each line or "section" in the dockerfile is an instruction that Docker uses to prep an image.

```bash
# get the node container from dockerHub
FROM node:18

# do something when it starts up
# give it a command to run with **CMD** and an arr of comman args
# `node -e console.log("hey now")` would convert to 
# `["node","-e","console.log(\"hey now\")"]`

CMD ["node", "-e", "console.log(\"omg hi lol\")"]
```

Without all the comments, the file is a slim 2 line file:
```bash
FROM node:18
CMD ["node", "-e", "console.log(\"omg hi lol\")"]
```

### build the image
build the docker image. Here, docker reads the dockerfile and its instructions and build an image.
```bash
docker build .
# ...should spit out stats that it is building the image, including image name and a hash of the image


### run the container
docker run -it <container-hash>
```

the container can also build using a friendly name, a tag

```docker build --tag friendly-name-here .```

just tagged the container as friendly-name-here!
