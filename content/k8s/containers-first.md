---
title: A Brief Review of Dockerfiles and Images
parentDir: k8s
slug: k8s/containers-first
author: Jake Laursen
excerpt: Dockerfiles, layers, instructions, args, etc
tags: ["Docker", "dockerfile", "containers"]
order: 16
---

# A review of Containerizing Applications

- [A review of Containerizing Applications](#a-review-of-containerizing-applications)
  - [Build a dockerfile](#build-a-dockerfile)
    - [Dockerfiles Are Instructions and Arguments](#dockerfiles-are-instructions-and-arguments)
    - [Dockerfiles Describe Layers](#dockerfiles-describe-layers)
  - [Build an Image from the Dockerfile](#build-an-image-from-the-dockerfile)
  - [Check Out Some Info About An Image](#check-out-some-info-about-an-image)
    - [The History of the Image](#the-history-of-the-image)
    - [The Starting OS](#the-starting-os)
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

## Check Out Some Info About An Image
### The History of the Image
[`docker image history`](https://docs.docker.com/engine/reference/commandline/image_history/) will show some info about an image:   
```bash
 docker image history mongo:5.0.2
IMAGE          CREATED         CREATED BY                                      SIZE      COMMENT
31299b956c79   11 months ago   /bin/sh -c #(nop)  CMD ["mongod"]               0B        
<missing>      11 months ago   /bin/sh -c #(nop)  EXPOSE 27017                 0B        
<missing>      11 months ago   /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B        
<missing>      11 months ago   /bin/sh -c #(nop) COPY file:df3353d9b2c25ef8…   13.2kB    
<missing>      11 months ago   /bin/sh -c #(nop)  VOLUME [/data/db /data/co…   0B        
<missing>      11 months ago   /bin/sh -c mkdir -p /data/db /data/configdb …   0B        
<missing>      11 months ago   /bin/sh -c set -x  && export DEBIAN_FRONTEND…   554MB     
<missing>      11 months ago   /bin/sh -c #(nop)  ENV MONGO_VERSION=5.0.2      0B        
<missing>      11 months ago   /bin/sh -c echo "deb http://$MONGO_REPO/apt/…   72B       
<missing>      11 months ago   /bin/sh -c #(nop)  ENV MONGO_MAJOR=5.0          0B        
<missing>      11 months ago   /bin/sh -c #(nop)  ENV MONGO_PACKAGE=mongodb…   0B        
<missing>      11 months ago   /bin/sh -c #(nop)  ARG MONGO_REPO=repo.mongo…   0B        
<missing>      11 months ago   /bin/sh -c #(nop)  ARG MONGO_PACKAGE=mongodb…   0B        
<missing>      11 months ago   /bin/sh -c set -ex;  export GNUPGHOME="$(mkt…   1.16kB    
<missing>      11 months ago   /bin/sh -c mkdir /docker-entrypoint-initdb.d    0B        
<missing>      11 months ago   /bin/sh -c set -ex;   savedAptMark="$(apt-ma…   14.7MB    
<missing>      11 months ago   /bin/sh -c #(nop)  ENV JSYAML_VERSION=3.13.1    0B        
<missing>      11 months ago   /bin/sh -c #(nop)  ENV GOSU_VERSION=1.12        0B        
<missing>      11 months ago   /bin/sh -c set -eux;  apt-get update;  apt-g…   7.25MB    
<missing>      11 months ago   /bin/sh -c groupadd -r mongodb && useradd -r…   333kB     
<missing>      11 months ago   /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      11 months ago   /bin/sh -c #(nop) ADD file:cec21619ecbd37b4c…   65.6MB   
```
### The Starting OS 
```bash
docker run -it mongo:5.0.2 cat /etc/os-release

# output ->
NAME="Ubuntu"
VERSION="20.04.3 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.3 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
Jakes-4:in-depth Jake$ docker run -it mongo:5.0.2 cat /etc/os-release
NAME="Ubuntu"
VERSION="20.04.3 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.3 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
```
## Send the Image to the public Image Rep
Send the newly-build image into a docker registery. Here, the image will be pushed to the public registry. The image will be named `my-docker-acct/py-app`.  

## What Can Be Containerized
- dbs
- dev tools
- os's
- browsers
- "complete" applications