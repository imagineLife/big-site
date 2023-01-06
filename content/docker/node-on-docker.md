---
title: "Node On Docker: An Intro"
parentDir: docker
slug: docker/node-on-docker-intro
author: Jake Laursen
excerpt: Run NodeJS in a Docker Container From an Image
tags: Docker, containers, node
order: 3
---

# NodeJS on Docker
This can be applied to other language tools as well (python, etc).  

- [NodeJS on Docker](#nodejs-on-docker)
    - [start the node container, but open a bash gui](#start-the-node-container-but-open-a-bash-gui)
  - [Why tags matter](#why-tags-matter)

Here's a command to run node inside a docker container:  
```docker run -it node:16-stretch```
- `node` is the name of the official node container
- `16-stretch` is attached to debian stretch
- running the above command opens the node repl (read, evaluate, print, loop) in the current terminal
	- this is the automatic run process from the container

### start the node container, but open a bash gui
```docker run -it node:16-stretch bash```
- now can run things like ```node -v```

- we MIGHT NOT know what version of linux we are using, so the ```cat /etc/issue``` command is helpful in displaying what version of linux is being used


## Why tags matter
Tags are meant to help describe what is "in" the tagged image.  
There are [MANY versions (_tags_) of the node container](https://hub.docker.com/_/node/tags)
  - node
  - node:gallium
  - node:gallium-buster

tags can be leveraged to pin the version of some key dependencies:
- the version of node itself with `node:18.12.1`
- the version and type of OS: `node:18.12.1-buster`
- a "slimmed down" version of the above 2 images, with `node:18.12.1-slim` and `node:18.12.1-buster-slim`
