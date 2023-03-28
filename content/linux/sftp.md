---
parentDir: linux
title: SSH
slug: linux/sftp
shortSlug: sftp
author: Jake Laursen
excerpt: Share files with SFTP
tags: ["linux", "kernel", "cli", "ssh", "sftp"]
order: 16
---

# Manage Files Remotely with SFTP
Whereas ssh is about conncting 2 machine together through a terminal, sfpt is about sharing files.  
SFTP stands for "Secure File Transfer Protocol".  
SFTP allows for very similar abilities as ssh.

- [Manage Files Remotely with SFTP](#manage-files-remotely-with-sftp)
  - [SFTP is active in Both Locations](#sftp-is-active-in-both-locations)
  - [Moving Files with get and put](#moving-files-with-get-and-put)
## SFTP is active in Both Locations
When using sftp, one shell connects to another machine. In this case, sftp connects from one vm to another, both running on the host machine (_the laptop_). The Primary instance will sftp into the secondary instance:
```bash
# in the PRIMARY instance,
# sftp into secondary by the secondary ip
sftp horse@192.168.64.4
```

Now, the primary shell can run commans against both the primary vm and the secondary vm. This might be the primary difference between sftp and ssh: ssh is _only_ in the "remote" machine, whereas sftp is active in both:
```bash
# sftp into secondary
ubuntu@primary:~$ sftp horse@192.168.64.4
Connected to 192.168.64.4.

# notice the shell prefix changes to "sftp>"
sftp> ls

# prefix a command with an "l" for "local"
# this runs "ls" in the primary instance
sftp> lls
Home		 dock	     sauce	 snap
bad-command.txt  errors.txt  secret.txt  this-file.txt

# in secondary
sftp> pwd
Remote working directory: /home/horse

# in primary
sftp> lpwd
Local working directory: /home/ubuntu
sftp> 
```

## Moving Files with get and put
```bash
# sftp into secondary
ubuntu@primary:~$ sftp horse@192.168.64.4
Connected to 192.168.64.4.

# notice the shell prefix changes to "sftp>"
# look at files in current machine working dir
sftp> lls
Home		 dock	     sauce	 snap
bad-command.txt  errors.txt  secret.txt  this-file.txt

# move the this-file.txt to the other machine as that-file.txt
sftp> put this-file.txt that-file.txt
Uploading this-file.txt to /home/horse/that-file.txt
this-file.txt                                                      100%  147    56.7KB/s   00:00  

# GET a file from the remote
sftp> get that-file.txt got-file.txt
Fetching /home/horse/that-file.txt to got-file.txt
/home/horse/that-file.txt                                                                                                                                                 100%  147    67.7KB/s   00:00    
```