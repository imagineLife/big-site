---
title: "Node On Docker: An Intro"
parentDir: docker
slug: docker/node-on-docker-intro
author: Jake Laursen
excerpt: Run NodeJS in a Docker Container From an Image with a tag
tags: Docker, containers, node
order: 5
---

# NodeJS on Docker
This can be applied to other language tools as well (python, etc).  

- [NodeJS on Docker](#nodejs-on-docker)
    - [start the node container, but open a bash gui](#start-the-node-container-but-open-a-bash-gui)
  - [Why tags matter](#why-tags-matter)
    - [Tag Details](#tag-details)
      - [OS](#os)
      - [Language](#language)

Here's a command to run node inside a docker container:  
```docker run -it node:18-stretch```
- `node` is the name of the official node container
- `18-stretch` is attached to debian stretch
- running the above command opens the node repl (read, evaluate, print, loop) in the current terminal
	- this is the automatic run process from the container

### start the node container, but open a bash gui
```docker run -it node:18-stretch bash```
- now can run things like ```node -v```

- we MIGHT NOT know what version of linux we are using, so the ```cat /etc/issue``` command is helpful in displaying what version of linux is being used


## Why tags matter
Tags are meant to help describe what is "in" the tagged image.  
There are [MANY versions (_tags_) of the node container](https://hub.docker.com/_/node/tags)
  - node
  - node:gallium
  - node:gallium-buster

### Tag Details
tags can be leveraged to pin the version of some key dependencies:
- the version of node itself with `node:18.12.1`
- the version and type of OS: `node:18.12.1-buster`
- a "slimmed down" version of the above 2 images, with `node:18.12.1-slim` and `node:18.12.1-buster-slim`

#### OS 
**Bullseye, Stretch, Buster, Or Jessie** are "friendly" names for [Debian release versions](https://wiki.debian.org/DebianReleases):
- **Bullseye** is v11, released 2021-08-14 with e.o.l 2024-07, no lts marked on that doc link
- **Buster** is v10, released 2019-07-06 with e.o.l on 2022-09-10
- Stretch and Jessie are older

[Alpine](https://www.alpinelinux.org/about/) is a small linux version, seemingly build FOR containers. Alpine makes tiny containers & there are mixed reviews and complications depending on what the image needs and doesn't need.

#### Language
Node, as the focus here, has its own [release versions and friendly names](https://github.com/nodejs/release#release-schedule):
- **18.x** at the time of writing is the lts version of node - 16.x and earlier are, well, earlier versions of node
- **Hydrogen** is the friendly name of the node v18.x. Gallium is for 16.x and Fermium is for 14.x
