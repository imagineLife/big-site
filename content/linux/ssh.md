---
parentDir: linux
title: SSH
slug: linux/ssh
shortSlug: ssh
author: Jake Laursen
excerpt: Remote CLI Sessions with a Secure Shell
tags: ["linux", "kernel", "cli", "ssh", "remote", "shell"]
order: 15
---

# SSH
SSH stands for "secure shell".  
SSH is a protocol used to connect between a client and server. One use-case scenario is where "I" use a computer, the client, to ssh into a remote server to do some work in/on the server using ssh.  

Using SSH is a regular practice for folks in the dev-ops, networking, system admin type roles.  

This doc will use multipass to 
- create a client, 
- create a server
- build & use all the tooling needed to ssh from the client into the server

- [SSH](#ssh)
  - [Start and Use a Secondary VM with Multipass](#start-and-use-a-secondary-vm-with-multipass)
  - [Create a user in the Secondary vm](#create-a-user-in-the-secondary-vm)
  - [Connect to the Secondary From Primary using SSH and Keys](#connect-to-the-secondary-from-primary-using-ssh-and-keys)
    - [Generate a Public key on the Primary Instance](#generate-a-public-key-on-the-primary-instance)
    - [Save the Primary public key in the Secondary vm](#save-the-primary-public-key-in-the-secondary-vm)
    - [Adjust the key permissions](#adjust-the-key-permissions)
    - [Use the Secondary IP to SSH from Primary](#use-the-secondary-ip-to-ssh-from-primary)

## Start and Use a Secondary VM with Multipass
This can be run from the terminal of the host machine (_my laptop, your laptop, etc._). Although almost all of the previous docs in this linux post series was intended to be used inside a multipass linux instance, this command is not.  

The goal here will to have
- one shell session open on a multipass ubuntu vm (_setup toward the beginning of these linux docs_)
- another shell session open on a second multipass ubuntu vm

```bash
# use multipass to "lauch" a new vm with the "friendly" name of "secondary"
multipass launch --name secondary

# let the above command run && "spin-up" a secondary vm with multipass

# should write something like...
# Retrieving image: XX%
# Launched: secondary

# ...then run 
multipass shell secondary

# should return a shell instance inside the new 'secondary' multipass vm
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-113-generic aarch64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri Jun 10 08:40:50 EDT 2022

  System load:             0.0
  Usage of /:              27.2% of 4.68GB
  Memory usage:            20%
  Swap usage:              0%
  Processes:               98
  Users logged in:         0
  IPv4 address for enp0s1: ...address here...
  IPv6 address for enp0s1: ...address here...


0 updates can be applied immediately.


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

ubuntu@secondary:~$ 

```
Notice the now-running bash against `ubuntu@secondary`: `secondary` was the name that was assigned to the vm. 

## Create a user in the Secondary vm

```bash
ubuntu@secondary:~$ sudo useradd -s /bin/bash -m -g ubuntu auser
ubuntu@secondary:~$ sudo passwd auser
# apassword
New password: 
Retype new password: 
```

## Connect to the Secondary From Primary using SSH and Keys
SSH Keys. Sorta complicated.  
**The Client** gets an SSH Key. This one is public. The client initates an SSH connection with the server.   
**The Server** get an SSH Key.  This is private.  This is not meant to be shared with anyone. The SSH protocol uses these keys to authenticate client requests and data traffic between the client and server.  

### Generate a Public key on the Primary Instance
The Primary ubuntu vm will generate an ID and public key using the `ssh-keygen` program.  
**NOTE**: below opts out of adding a "passphrase". In a more "serious" environment, passphrases make it so that anytime the ssh key is used the passphrase is needed to be entered - adds a little more security.  

``` bash
ubuntu@primary:~$ ssh-keygen -t rsa
Generating public/private rsa key pair.

# a few prompts, I press "enter" at each for ease of learning
Enter file in which to save the key (/home/ubuntu/.ssh/id_rsa): 

# 
Enter passphrase (empty for no passphrase): 

# 
Enter same passphrase again: 

Your identification has been saved in /home/ubuntu/.ssh/id_rsa
Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub
# results will show here...
```  
The `~/.ssh/id_rsa.pub` is the public key needed!  


### Save the Primary public key in the Secondary vm
Copy the `~/.ssh/id_rsa.pub` value. It will be used in the secondary machine.  

Go to the secondary vm terminal. Use the user created in a previous post:
```bash
ubuntu@secondary:~$ su auser
Password: 
auser@secondary:/home/ubuntu$ whoami
auser
```

Store the key from the primary in a new dir:
```bash
auser@secondary:~$ mkdir ~/.ssh
auser@secondary:~$ vi ~/.ssh/authorized_keys 

# paste in copied ssh id_rsa.pub from primary, write, and quit
```

### Adjust the key permissions
```bash
# 700 = no priv on anyone but this user, the 'auser', who can do all
auser@secondary:~$ chmod 700 ~/.ssh

# 600 = only editable by this user, the `auser`
auser@secondary:~$ chmod 600 ~/.ssh/authorized_keys
```

### Use the Secondary IP to SSH from Primary
Get the secondary IP Address using `ifconfig`. Note here, I had to install ifconfig following the directions in the shell ->
```bash
# in the secondary shell...

ifconfig
# may need to install, then run this again after it is installed
# ...get the XXX.XXX.XX.X
#  ...mine is 192.168.64.4
```
Copy that ip.  
Get to the shell instance of the primary vm.  
ssh into the secondary:
```bash
ssh horse@192.168.64.4
# will prompt to asure that you want to do this
```
Now, the "primary" shell is talking over the host "internet" (_in this case the host machine's "internal" network_) and is running a shell instance of the secondary machine logged in ash the `horse` user.  

Epic.  