---
parentDir: linux
title: Users
slug: linux/users
author: Jake Laursen
excerpt: Users and accounts of the Linux OS
tags: ["linux", "kernel", "cli", "users"]
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
  - [An Example](#an-example)
    - [Creating A User](#creating-a-user)
    - [Deleting a User](#deleting-a-user)
  - [One-Line User switching](#one-line-user-switching)

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

## An Example 
### Creating A User
Only certain users can create other users:  

```bash
# start as the ubuntu user (in a multipass prompt)
ubuntu@primary:~$ whoami
ubuntu

# try adding a user
ubuntu@primary:~$ useradd thisisme
useradd: Permission denied.
useradd: cannot lock /etc/passwd; try again later.

# switch to the root user
ubuntu@primary:~$ sudo su
root@primary:/home/ubuntu# whoami
root

# try adding the new user as the root user
root@primary:/home/ubuntu# useradd thisisme
# it worked!

# leave the root user
root@primary:/home/ubuntu# exit
```
### Deleting a User  
Only certain users can create other users:  

```bash
# start as the ubuntu user (in a multipass prompt)
ubuntu@primary:~$ whoami
ubuntu

# try deleting a user
ubuntu@primary:~$ userdel thisisme
userdel: Permission denied.
userdel: cannot lock /etc/passwd; try again later.

# switch to the root user
ubuntu@primary:~$ sudo su
root@primary:/home/ubuntu# whoami
root

# try deleting the new user as the root user
root@primary:/home/ubuntu# userdel thisisme
# it worked!

# leave the root user
root@primary:/home/ubuntu# exit
```

## One-Line User switching
Running a command with the `sudo` prefix is a one-line way to be the root user.  
```bash
ubuntu@primary:~$ whoami
ubuntu
ubuntu@primary:~$ sudo whoami
root

# sudo add a user + pwd
ubuntu@primary:~$ sudo useradd jake
ubuntu@primary:~$ sudo passwd jake
New password: 
Retype new password: 
passwd: password updated successfully

# change to 'jake' user
ubuntu@primary:~$ whoami
ubuntu
ubuntu@primary:~$ su jake
Password: 
$ whoami
jake

# notice the prompt prefix changed! interesting
$ pwd
/home/ubuntu

# attempt to sudo su
$ sudo su
[sudo] password for jake: 
jake is not in the sudoers file.  This incident will be reported.
```