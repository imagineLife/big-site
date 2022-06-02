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
  - [The super user and sudo](#the-super-user-and-sudo)

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

### Users have permissions
Linux uses the "principle of least power" when it comes to users + permissions: users have the least permissions possible.  

## The super user and sudo
`sudo` is a super power. `Switch User and do...`.  
`sudo` with a user to switch to defaults to the `root` user.
`root` is a superuser that can be used with `sudo su`.  
`root` can do everything.  
It should be used with extreme caution.  
Many things, like creating a new user, can only be done by the superuser.  


```bash
# use the superuser called root
ubuntu@primary:~$ sudo su
root@primary:/home/ubuntu# whoami
root

# switch back to the ubuntu user
root@primary:/home/ubuntu# exit
exit
ubuntu@primary:~$ whoami
ubuntu
```