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

## using curl