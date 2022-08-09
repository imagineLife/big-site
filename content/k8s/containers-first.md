---
title: A Brief Review of Dockerfiles and Images
parentDir: k8s
slug: k8s/containers-first
author: Jake Laursen
excerpt: Dockerfiles, layers, instructions, args, etc
tags: Docker, dockerfile, containers
order: 16
---

# A review of Containerizing Applications

- [A review of Containerizing Applications](#a-review-of-containerizing-applications)
  - [Build a dockerfile](#build-a-dockerfile)
    - [Dockerfiles Are Instructions and Arguments](#dockerfiles-are-instructions-and-arguments)
    - [Dockerfiles Describe Layers](#dockerfiles-describe-layers)
  - [Build an Image from the Dockerfile](#build-an-image-from-the-dockerfile)
  - [Send the Image to the public Image Rep](#send-the-image-to-the-public-image-rep)
  - [What Can Be Containerized](#what-can-be-containerized)


## Build a dockerfile
Build a dockerfile. This will instruct docker how to build an image.  
This image is a mock python-to-mysql server.  
This could be called `python-api.Dockerfile`.  

```dockerfile
# START with a base image, here the ubuntu ok
FROM ubuntu

# install deps through "dockerland"
RUN apt-get update
RUN apt-get install python
RUN pip install flask
RUN pip install flask-mysql

# Copy source code from "host" into image
# into a directory at ./opt/source-code
# NOTE: copy . is a bit sloppy but par for course for learners
COPY . ./opt/source-code

# run the api server
ENTRYPOINT FLASK_AP=/opt/source-code/app.py flask run
```

### Dockerfiles Are Instructions and Arguments
Briefly, dockerfiles are a list of "instructions" and "args":
- `FROM ubuntu` - `FROM` is the instruction, `ubuntu` is the arg
- `RUN apt-get update`: `RUN` is the instruction, `apt-get update` is the arg
- etc

### Dockerfiles Describe Layers
Each instruction+argument creates a "layer".  
Above - 7 instructions, 7 layers.  
When Docker builds the image, layers are created and "cached" by docker.  
When the same Dockerfile is used to build a new image, docker checks each "layer" with previously-cached layers. When previously cached layers are present, Docker does not do the work of re-creating the image & instead just uses the previously cached layers.  

If a dockerfile changes and a new image built, say the above dockerfile adds a new `RUN some-other-command` after the last `RUN` command with a new line after line 8, Docker will use the layer created through line 8 and start creating new "layers" with the new command.  

## Build an Image from the Dockerfile
Build the image using docker.  
```bash
docker build -f python-api.Dockerfile -t py-api
```

The output will show the layers being built.  
The layers can also be inspected:  
```bash
docker history my-docker-username/py-api
```  

## Send the Image to the public Image Rep
Send the newly-build image into a docker registery. Here, the image will be pushed to the public registry. The image will be named `my-docker-acct/py-app`.  

## What Can Be Containerized
- dbs
- dev tools
- os's
- browsers
- "complete" applications