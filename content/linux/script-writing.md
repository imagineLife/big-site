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
Bash can be used to put many commands together into what are commonly referred to as "_scripts_", or a shell script, or a program. I'll be referring to these as programs.  
The program is the file that has all the bash code in it.  

- [Using Bash to Write Scripts](#using-bash-to-write-scripts)
  - [Create a dir and some files](#create-a-dir-and-some-files)
    - [Making File-Creator A Runnable Command](#making-file-creator-a-runnable-command)
## Create a dir and some files
```bash

ubuntu@primary:~$ pwd
/home/ubuntu

# create a new file
ubuntu@primary:~$ touch file-creator.sh

# edit the file with vi
ubuntu@primary:~$ vi file-creator.sh 


# make & enter a dir
mkdir -p ~/program-created
cd ~/program-created

# create a few files
touch file{1..10}.txt

# back-out to where we came from
cd ..

echo "done creating files in program-created"
```
Exit vi with write+quit (`:wq`).  
Run the program with any of these: 
```bash
ubuntu@primary:~$ . file-creator.sh 
ubuntu@primary:~$ source file-creator.sh 
ubuntu@primary:~$ bash file-creator.sh 
```

As a brief recap:
- a program was created in `file-creator.sh`
- the program creates a dir, creates a few files, and echos a string to the terminal
- the program gets run by bash with one of the keywords `bash` or `.` or `source`

### Making File-Creator A Runnable Command
Many built-in programs are runnable without the `bash` or `.` or `source` keyword.  
Programs like `cp` or `ls` or `mv`... all of these may be a "no duh" that they don't need any other keyword to run.  