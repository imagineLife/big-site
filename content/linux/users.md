---
parentDir: linux
title: Users
slug: linux/users
author: Jake Laursen
excerpt: Users and accounts of the Linux OS
tags: linux, kernel, cli, users
order: 10
---

# Users
Linux has users of its os.  
The multipass app gives a default user of `ubuntu`.  

- [Users](#users)
  - [Detecting the current user with whoami](#detecting-the-current-user-with-whoami)
  - [see all users with cat](#see-all-users-with-cat)
  - [Users have permissions](#users-have-permissions)

## Detecting the current user with whoami
`whoami` is a command that returns the currently-logged-in user.  
```bash
ubuntu@primary:~$ whoami
ubuntu
```
Again, `ubuntu` is the name of the user that multipass gives.  


## see all users with cat
```bash
# show ALL users on the machine
ubuntu@primary:~$ cat /etc/passwd
```
## Users have permissions  
