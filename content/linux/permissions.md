---
parentDir: linux
title: Permissions
slug: linux/permissions
author: Jake Laursen
excerpt: 
tags: linux, kernel, cli, users, groups
order: 12
---

# Permissions
Linux has the concept of permissions.  
Since the "core" of linux is a file system accessed and used by users, files have permissions that can be assigned/delegated to users.  


- [Permissions](#permissions)
  - [An Example of denied permissions](#an-example-of-denied-permissions)


## An Example of denied permissions
```bash
# switch user to'jake'
ubuntu@primary:~$ su jake
Password: 
# go into the "home" directory of the 'ubuntu' user
$ cd /home/ubuntu
$ pwd
/home/ubuntu

# try creating a file
$ touch jake.txt
touch: cannot touch 'jake.txt': Permission denied
```
