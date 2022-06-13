---
parentDir: linux
title: SSH
slug: linux/sftp
author: Jake Laursen
excerpt: Share files with SFTP
tags: linux, kernel, cli, ssh, sftp
order: 16
---

# SFTP
Whereas ssh is about conncting 2 machine together through a terminal, sfpt is about sharing files.  
SFTP stands for "Secure File Transfer Protocol".  


```bash
# install smtp

sudo apt install opensmtpd
# in the PRIMARY instance,
# sftp into secondary by the secondary ip
sftp horse@192.168.64.4
```