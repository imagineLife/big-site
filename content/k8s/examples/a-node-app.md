---
title: Create And Deploy An App Using Podman
parentDir: k8s/examples
slug: k8s/examples/a-container-with-podman
author: Jake Laursen
excerpt: A Brief and overly simple example of working a node process through an image-creation lifecycle
tags: k8s, node, node, podman
order: 14
---

## Some Goals
- make a toy node script
- make a dockerfile to "containerize" the node process
- download podman + build an image from the Dockerfile (_crazy how simple this whole thing can seem!_)
- use podman to run the image
- view the output of the process - the output may be different than expected in this case

## TOC
- [Some Goals](#some-goals)
- [TOC](#toc)
- [Build The Project](#build-the-project)
  - [Start with node and a node script](#start-with-node-and-a-node-script)
  - [Assemble the project into a directory](#assemble-the-project-into-a-directory)
  - [Write The Directions to Create The Image in the Dockerfile](#write-the-directions-to-create-the-image-in-the-dockerfile)
  - [Build And Run An Image Using Podman](#build-and-run-an-image-using-podman)


## Build The Project
### Start with node and a node script
Starting with a machine that doesn't even have node on it, install node. This way, the node script can be tested on the machine.  
Here, a node script that adds 2 random numbers between 1 & 10.  
NOTE: using `fs.appendFile` like this is not recommended in a production environment. Using `fs.createWriteStream` would be better for continuously writing to a file - this here is a trivial example, so appendFile it is!  

```js
// dependency
const { appendFile } = require('fs')

// variables + functions
const LOWEST = 1;
const HIGHEST = 10;
const FILE_PATH_TO_WRITE_TO = './nodeOut.txt';

function getRandomBetween({ low, high }) {
  return Math.floor(Math.random() * high) + low;
}

function appendCallback(err){
  if (err) {
    console.error(err);
  }
  console.log('wrote');
}

// do it!
setInterval(() => {
  // get 2 random numbers
  const first = getRandomBetween({ low: LOWEST, high: HIGHEST });
  const next = getRandomBetween({ low: LOWEST, high: HIGHEST });
  
  // printable string of "1 + 2 = 3 \n";
  const STRING_TO_PRINT = `${first} + ${next} = ${first + next} + \n`;

  // write to the file
  appendFile(FILE_PATH_TO_WRITE_TO, STRING_TO_PRINT, appendCallback);
}, 2500);
```

### Assemble the project into a directory
In order for this to become an image, lets do some project organizaiton.
- Put the file into a directory, something sensibly named like `toy-node-process`
- name the file `index.js`: this allows node to run the file without explicitly naming the file, like `node .` when the terminal session is "in" the `toy-node-process` dir
- Add a file called `Dockerfile` to the directory - no extensions on the filename, nothing else there besides `Dockerfile`
The directory should be something like
```bash
toy-node-app
  - index.js
  - Dockerfile
```
Now, node can run the process in the directory.  
Also, container tooling like docker and/or podman in this case can use the Dockerfile in the directory to create an image!

### Write The Directions to Create The Image in the Dockerfile
Fill out the dockerfile.  
The dockerfile contains directions on how to create an image from the directory.  
This tells "container-land" (_a joke_) how to make an image.    

```Dockerfile
# start with a pre-made image, node v16 with alpine as the "os", a smaller image than the "node:16" image for this example
FROM node:16-alpine

# pull the js file into "container-land", at the root of the image dir structure
COPY index.js .

# Run the node process
CMD ["node", "."]
```

### Build And Run An Image Using Podman
Without comments, this is 4 lines of functional code - very short!   
All of these can be done with the terminal session "inside" the node project directory.  

```bash
# 
# Get Podman installed
# 
# download the tarfile for podman
$ curl -fsSL -o podman-linux-amd64.tar.gz \https://github.com/mgoltzsche/podman-static/releases/latest/download/podman-linux-amd64.tar.gz

# unzip the file
$ tar -xf podman-linux-amd64.tar.gz

# copy the output to the 
$ sudo cp -r podman-linux-amd64/usr podman-linux-amd64/etc /

# use the Dockerfile to build the project image
# here, tagged toy-node version 1.0
# NOTE: During this build step, the podman cli currently requests which registry to use
#   - i use the "docker.io/library/xxx" repo option, as that is the dockerhub repo
$ sudo podman build -t toy-node:1.0 .

# VALIDATION
# see the image on your machine!
$ sudo podman images

# should show something like...
REPOSITORY                TAG         IMAGE ID      CREATED         SIZE
localhost/toy-node        1.0         some-string   1 minute ago    118 MB


# 
# Run the image as a container
# 
# - include the localhost prefix, and the ":1.0" tag
sudo podman run localhost/toy-node:1.0

# TO STOP THE CONTAINER FROM RUNNING FOREVER
#   open another terminal session to the host machine 
#   and run...
#   sudo podman stop localhost/toy-node:1.0

# find the node output
sudo find / -name nodeOut.txt
# will probably output something like...
# /var/lib/containers/storage/overlay/garbly-gook/diff/nodeOut.txt

# show the output of the file if you'd like!
# cat <the-directory-path-about>

```