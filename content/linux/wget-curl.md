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
`wget` and `curl` are 2 tools that can be used to "fetch" info from the web.  

- [Request info from the web](#request-info-from-the-web)
  - [Using wget](#using-wget)
  - [using curl](#using-curl)
    - [Spin Up an http server with python](#spin-up-an-http-server-with-python)
    - [use curl](#use-curl)
      - [use curl in a multipash bash shell](#use-curl-in-a-multipash-bash-shell)
      - [curl works on macs too](#curl-works-on-macs-too)
      - [curl works on windows](#curl-works-on-windows)
## Using wget
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
In this case, the files in the `primary` multipass instance will be available through a browser (_chrome_).  
Luckily, ubuntu comes with python.  
Python has a built-in http server.  
This will turn on an http server.  
The server will make files on the os available through something like a browser url.  

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

### use curl
With an http server up & running to use as target practice,  `cUrl` can be used in bash to get info from the multipass+python server (_somewhat like a browser getting info from 192.168..._).  
#### use curl in a multipash bash shell
Open a new terminal session into the multipass primary instance:
```bash
# open a new terminal on your laptop/machine
# open a new terminal session connected to the primary multipass vm
multipass shell primary
```

Use curl to fetch the contents of a file from the python http server:
```bash
ubuntu@primary:~$ curl http://192.168.64.2:8000/this-file.txt
# NOTE: the contents of the file you pick will appear in the terminal
```

Making a request to the multipass vm without a file attached to the url (_for me the http://192.168.64.2:8000_) will also work, and will return a list of files/folders that are available.  
#### curl works on macs too
curl can be used from a terminal instance in a mac shell session.  
If you have a mac, you can open a terminal instance and use curl without needed to open a multipass instance into the primary vm.  

```bash
ubuntu@primary:~$ curl http://192.168.64.2:8000
# NOTE: this should return a string that represents an html doc.  

```

#### curl works on windows
I don't have a windows machine.  
Word-on-the-street is that curl works on every windows instance with windows 10 or newwer!