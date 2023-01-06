---
title: Setup Docker
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
- there are MANY versions of the node container...
  - node:alpine
  - node:10.17.0-buster
  - node:12.13.1-buster
tags can be leveraged to pin the version... if an app/container is created, and set on the shelf for a year, the TAGS save the versions of the modules, so that newer breaking versions aren't over-writing the working version 
- 16-stretch is a good one!