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
  - [Principle of least permissions](#principle-of-least-permissions)
  - [An Example of denied permissions](#an-example-of-denied-permissions)
  - [How Linux Describes Permissions](#how-linux-describes-permissions)
    - [Item Type with the First Character](#item-type-with-the-first-character)
    - [Read Write and Execute with RWX](#read-write-and-execute-with-rwx)
    - [Owner Permissions with the next 3 Characters](#owner-permissions-with-the-next-3-characters)
    - [Group Permissions with the next 3 Characters](#group-permissions-with-the-next-3-characters)
    - [Everyone Elses Permissions with the next 3 Characters](#everyone-elses-permissions-with-the-next-3-characters)
  - [Changing Things](#changing-things)
    - [Changing item owner with chown](#changing-item-owner-with-chown)
      - [Use-Cases](#use-cases)
    - [Changing item permissions with chmod](#changing-item-permissions-with-chmod)
      - [long-form syntax](#long-form-syntax)
      - [short form](#short-form)

## Principle of least permissions
Linux starts with, and works best when users + groups have the least privilege needed to do their job. If a user needs to do something to a file, that user should have the right to do that thing and that thing only. 
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
Here, the `ubuntu` user's home directory is only editable by the `ubuntu` user, so `jake` should, correctly, be denied the ability to work in the `ubuntu` dir.   

## How Linux Describes Permissions
using the `jake` user in the `ubuntu` users' home directory...
```bash
$ pwd
/home/ubuntu
$ whoami
jake
```

run `ls -l` to show each file, one-per-line. Might look something like this...
```bash
$ ls -l
total 32
drwxr-xr-x 2 ubuntu ubuntu 4096 May 16 08:20 Home
-rw-rw-r-- 1 ubuntu ubuntu    0 Jun  1 19:36 complex-errs.txt
drwxrwxr-x 2 ubuntu ubuntu 4096 May 26 13:36 dock
-rw-rw-r-- 1 ubuntu ubuntu  124 May 30 09:35 errors.txt
-rw-rw-r-- 1 ubuntu ubuntu 2122 Jun  1 19:33 ls.txt
-rw-rw-r-- 1 ubuntu ubuntu  118 Jun  1 19:36 ls2.txt
-rw-rw-r-- 1 ubuntu ubuntu   51 May 30 09:17 poiu.txt
drwx------ 3 ubuntu ubuntu 4096 May 16 08:20 snap
```  
Linux describes permissions with the first column, the `drwxr-xr-x` column. Each character in that string represents information and permissions of the file/directory.  
The string is a 10-character description.  
The first line, the `drwxr-xr-x` `Home` line, will be explored below.  

### Item Type with the First Character
The `d` or `-` here represent the "type" of item:
- `d` for directory
- `-` for file  

### Read Write and Execute with RWX  
The next 9 characters are variations on these 4 characters:
- `r` for read
- `w` for write
- `x` for execute
- `-` for none  
- 
### Owner Permissions with the next 3 Characters
The next 3 characters, `rwx`, represent the "owner permissions" on the directory. This has `read`, `write`, and `execute` permissions for the user that owns the file, the `ubuntu` user.  

### Group Permissions with the next 3 Characters
The next 3 characters, `r-x`, represent the "group permissions" on the directory. This has `read`, and `execute` permissions for the group that owns the file, the `ubuntu` group.  

### Everyone Elses Permissions with the next 3 Characters
The next 3 characters, `r-x`, represent the permissions that "everyone else" has on the directory. This has `read`, and `execute` permissions for the anyone other than the owner or in the group.  

## Changing Things
Linux allows the changing of owner && permissions of things.  
### Changing item owner with chown
`chown` means "change owner". When `chown` is run against a directory or file, the owner of the item changes. The `chown` syntax can be something like `chown grp:usr item-to-change`:
- `grp`: the group name of the new owner
- `usr`: the group name of the new owner
- `item-to-change`: the name of the item that is being changed

#### Use-Cases
chown has been useful when dealing with systems && users, like in "dockerland".  
When docker is running on a linux machine, as an example....
- a node api docker container is running and is writing to a log file
- the log file path is mounted to the host linux os, so when node is writing to a logfile in a container, docker is passing-along the log-file contents to the host machine
- the _host_ os, which contains docker and is running the container, has a user in-use
- the _container_ os, which is "inside" "dockerland", has a user in-use (_and in the supported node image the default user is "node"_)
- the _host_ os user may not have permission to create or write to this log file, so this `chown` command can make the logfile creat-able and writable by docker

Here, `chown` in action ->
```bash
# Using chown without permission
ubuntu@primary:~$ whoami
ubuntu
ubuntu@primary:~$ pwd
/home/ubuntu

# attempt to make a dir in a dir that ubuntu does not have permission to
ubuntu@primary:~$ cd /
ubuntu@primary:/$ mkdir new-dir
mkdir: cannot create directory ‘new-dir’: Permission denied

# make the dir with sudo
ubuntu@primary:/$ sudo mkdir new-dir
ubuntu@primary:/$ ls
bin   dev  home  lost+found  mnt      opt   root  sbin  srv  tmp  var
boot  etc  lib   media       new-dir  proc  run   snap  sys  usr

ubuntu@primary:/$ ls -l | grep "new-dir"
drwxr-xr-x   2 root root  4096 Jun  3 08:45 new-dir
# the above line shows that root:root is the owner of the new-dir

# fail attempt to make a file in 
ubuntu@primary:/$ touch new-dir/new-file.txt
touch: cannot touch 'new-dir/new-file.txt': Permission denied

# update the owner of new-dir
ubuntu@primary:/$ sudo chown ubuntu:ubuntu new-dir
ubuntu@primary:/$ ls -l | grep "new-dir"
drwxr-xr-x   2 ubuntu ubuntu  4096 Jun  3 08:45 new-dir

# succeed now
ubuntu@primary:/$ touch new-dir/new-file.txt
ubuntu@primary:/$ ls -l new-dir/new-file.txt
-rw-rw-r-- 1 ubuntu ubuntu 0 Jun  3 08:49 new-dir/new-file.txt

```

### Changing item permissions with chmod  
`chmod` can be used to change permission on a file.  
This is different from `chown` in that `chown` changes a file's owner, and `chmod` changes a file's read-write-execute permissions.  

#### long-form syntax
Here's chmod in action
```bash
# assure the 'ubuntu' user is being used
ubuntu@primary:~$ whoami
ubuntu

# navigate
ubuntu@primary:~$ cd ~
ubuntu@primary:~$ pwd
/home/ubuntu

# create a file as root
ubuntu@primary:~$ sudo touch only-sudo.txt

# inspect the permissions
ubuntu@primary:~$ ls -l only-sudo.txt
-rw-r--r-- 1 root root 0 Jun  3 20:50 only-sudo.txt

# fail at writing to file
ubuntu@primary:~$ echo "test string" >> only-sudo.txt 
-bash: only-sudo.txt: Permission denied

# chmod in action on only-sudo.txt
ubuntu@primary:~$ sudo chmod u=rw,g=rw,o=rw only-sudo.txt 

# inspect new permissions
ubuntu@primary:~$ ls -l only-sudo.txt 
-rw-rw-rw- 1 root root 0 Jun  3 20:50 only-sudo.txt  

# try again
ubuntu@primary:~$ echo "test string" >> only-sudo.txt 
```
An overview of the chmod command
- `chmod` is the command, change the "mode" if the item
- `u=rw` is the user permissions of the item, `rw` for read+write
- `g=rw` is the group permission of the item, `rw` for read+write
- `o=rw` is the owner permission of the item, `rw` for read+write

#### short form
The short form of setting permissioins with chmod involves numbers.  
- `4` for read
- `2` for write
- `1` for execute
- `0` for ...zero permissions

These numbers get added up:
- `1` for execute
- `3 (1 + 2)` for execute + write
- `5 (1 + 4)` for execute + read
- `6 (4 + 2)` for read + write
- `7 (4 + 2 + 1)` for all rights 

These numbers get put in an order, 1 number for each "level" of permissions. 3 numbers in order _(1)(2)(3)_.  
- the 1st digit for `user`
- the 2nd digit for `group`
- the 3rd digit for `other`  

In practice, these numbers can look like...

- `660` is read+write on user+group and no rights for anyone else
- `760` is read+write on group, all rights as owner, and no rights for anyone else

Using these in a `chmod` command looks like
```bash
ubuntu@primary:~$ chmod 760 the-file.txt
```