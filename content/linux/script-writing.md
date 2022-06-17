---
parentDir: linux
title: Writing Scripts with Bash
slug: linux/script-writing
author: Jake Laursen
excerpt: Scripts, bash, automation
tags: linux, kernel, cli, scripts
order: 19
---

# Using Bash to Write Scripts
Bash can be used to put many commands together into what are commonly referred to as "_scripts_", or a shell script, or a program.  
The script is the file that has all the bash code in it.  

## Create a dir and some files with Bash
```bash

ubuntu@primary:~$ pwd
/home/ubuntu

# create a new file
ubuntu@primary:~$ touch file-creator.sh

# edit the file with vi
ubuntu@primary:~$ vi file-creator.sh 


# make & enter a dir
mkdir -p ~/script-created
cd ~/script-created

# create a few files
touch file{1..10}.txt

# back-out to where we came from
cd ..

echo "done creating files in script-created"
```