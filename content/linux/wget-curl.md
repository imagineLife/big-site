---
parentDir: linux
title: wget & curl
slug: linux/wget-curl
author: Jake Laursen
excerpt: Request info from the www using wget and curl
tags: linux, kernel, cli, wget, networking
order: 17
---

# Request info from the web 

## Using wget
`wget` can be used to get info from the world wide web in bash. `wget` will be used to pull a file from the web.
```bash
horse@secondary:~$ wget https://raw.githubusercontent.com/btholt/bash2048/master/bash2048.sh
--2022-06-15 20:57:17--  https://raw.githubusercontent.com/btholt/bash2048/master/bash2048.sh
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.109.133, 185.199.111.133, 185.199.108.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.109.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 9514 (9.3K) [text/plain]
Saving to: ‘bash2048.sh’

bash2048.sh               100%[==================================>]   9.29K  --.-KB/s    in 0.001s  

2022-06-15 20:57:18 (11.1 MB/s) - ‘bash2048.sh’ saved [9514/9514]

# update the permissions
horse@secondary:~$ chmod 700 bash2048.sh 

# run it, 2048 in the shell!
horse@secondary:~$. bash2048.sh
```   
One interesting thing about `wget`: it will crawl & download any contents in a document it gets from the web, sort of "recursively".  
## using curl
cUrl is used a bunch.

### Spin Up an http server with python
Luckily, ubuntu comes with python.  
Python has a built-in http server.  
This will turn on an http server.

```bash
# FIRST, get the ip of the multipass vm on my machine
ubuntu@primary:~$ ifconfig
# mine returned 192.168.64.2

# NEXT, look for files &/or create a text file in the root dir
# of the multipass vm to serve through an endpoint

# turn on an http server, and make the http server accessible from the host machine
ubuntu@primary:~$ python3 -m http.server 8000 --bind 0.0.0.0

# now, the server is available through the browser: try
# http://192.168.64.2:8000/this-file.txt

```