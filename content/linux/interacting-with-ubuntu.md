---
title: Interacting with Ubuntu
parentDir: linux
slug: linux/interacting-with-ubuntu
author: Jake Laursen
excerpt: Getting a cli up and running
tags: linux, kernel, cli, ubuntu, shell
order: 3
---
#  Get Ubuntu Set Up
- [Get Ubuntu Set Up](#get-ubuntu-set-up)
  - [The Shell, the REPL, and the FS](#the-shell-the-repl-and-the-fs)
    - [A Repl](#a-repl)
    - [A Shell](#a-shell)
    - [A FileSystem](#a-filesystem)
  - [FS commands](#fs-commands)
    - [pwd: where am I](#pwd-where-am-i)
    - [ls: show me a list](#ls-show-me-a-list)
    - [cd: changing directory](#cd-changing-directory)
      - [backing out](#backing-out)
      - [going down](#going-down)
      - [getting specific](#getting-specific)

Try [multipass](https://multipass.run) from the folks who make ubuntu. This allows us to ["Get an instant Ubuntu VM with a single command"](https://multipass.run).
- download that
- "open" the app
  - this doesn't really "open" anything visible for me other than a toolbar icon
  - the toolbar icon has a dropdown when clicked - open the dropdown and then click the  `Open Shell` option - THIS is the beginning of the shell and Linux :) 

If you 

## The Shell, the REPL, and the FS
### A Repl
A REPL is a **R**ead-**E**valuate-**P**rint-**L**oop cycle.  
This REPL cycle is what is "happening" in the terminal/shell/command prompt.  
The terminal's "job" is to Read, then Evaluate, then Print, then Loop. The content the terminal is REP-ing is the text that gets entered in the terminal.  

### A Shell
_The_ shell, and particularly the _Bourne Again Shell (bash)_ interprets the command-line UI. 
Bash is also a scripting language.  

Mac now comes with zsh, a different type of shell.  
Windows come with PowerShell, another type of shell.  

### A FileSystem  
The shell is always "in" a folder - just like the "finder" on a mac or the file explorer on a windows machine.  
Sometimes files are referred to as directories,`dir`, or files. Directories or dir work better as descriptors than "files" - files are often used to describe documents.  
the "present working directory" is the current directory that the shell is "in" or "at".  
The shell can be used to "navigate" or browser around files/directories through the "file system" - the "system" of files.  
Each directory and file "lives" at a file system "path". The path looks like a bunch of words, directory names, separated by `/` slashes. 
A path could be something like `/Users/Jake/Desktop/projects/linux-blog/interacting-with-ubuntu.md`.

## FS commands
### pwd: where am I
`pwd` shows the "present working directory" path.  
Typing `pwd` and pressing `<Enter>` will tell the terminal to Read the input, evaluate the direction, and print the result.  
In a ubuntu environment, the default "location" of the shell is at `/home/ubuntu` and the `pwd` command should return that!  
The current directory represents the `ubuntu` user in the `home` directory.  
Every user gets a directory && the default user is the `ubuntu` user - hence `home/ubuntu`.  

### ls: show me a list
`ls` is like `show me a list of files in the pwd`.  
Typing `ls` in the terminal should show 2 things that look like `Home  snap`.  
The `ls` is like looking around a "room" noticing all of the directories in the room and printing everything visible.  

### cd: changing directory
`cd` is short for `change directory`.  
`cd ..` will "back out" of the current directory. "back out" is a phrase used to represent moving the terminals location "up" one directory...  
With the `pwd` at `/home/ubuntu` the `ubuntu` directory is "in" the `home` directory, hierarchically. Maybe like putting a paper folder inside another paper folder.  

#### backing out
typing `cd ..` will "move" the terminal to be "in" the `home` directory.  
With the terminal at the `home` directory, typing `ls` will show the `ubuntu` directory that the shell was just in before typing `cd ..`.  

#### going down
typing `cd ubuntu` will "move" the terminal "down" into the ubuntu directory.  

So,  
`cd ..` can be used to go "back" or "out" or "up" one directory.  
`ls` can be used to show all contents in the current directory.  
`cd <a-nested-directory>` can be used to go "into" a directory at the same "level" as the terminal.  

#### getting specific
`cd` can be used to go several directories "down" and several directories "back".  
`cd` can be given more specific directories to change into && out of:  
with the `pwd` at `/home`, typing `cd ubuntu/snap/multipass-sshfs/` will change "down" 3 directories.    
Here, typing `pwd` will show `/home/ubuntu/snap/multipass-sshfs`.  
`cd` can also be given more specific "backing out" instructions -  
with the `pwd` at `/home/ubuntu/snap/multipass-sshfs`, typing `cd ../../../` will "back out" into the `/home` directory.  
Here, typing `pwd` will show `/home`.  

