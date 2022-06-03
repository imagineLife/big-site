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
  - [How Linux Describes Permissions](#how-linux-describes-permissions)
    - [Type with the First Character](#type-with-the-first-character)
    - [Read Write and Execute with RWX](#read-write-and-execute-with-rwx)
    - [Owner Permissions with the next 3 Characters](#owner-permissions-with-the-next-3-characters)
    - [Group Permissions with the next 3 Characters](#group-permissions-with-the-next-3-characters)
    - [Everyone Elses Permissions with the next 3 Characters](#everyone-elses-permissions-with-the-next-3-characters)
  - [Changing Things](#changing-things)
    - [Changing owner with chown](#changing-owner-with-chown)
    - [Changing permissions with chmod](#changing-permissions-with-chmod)


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

### Type with the First Character
The `d` or `-` here represent the "type" of item:
- `d` for directory
- `-` for file  

### Read Write and Execute with RWX  
The next 9 characters are variations on
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
### Changing owner with chown
### Changing permissions with chmod