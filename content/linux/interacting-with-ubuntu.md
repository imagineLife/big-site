---
title: Interacting with Ubuntu
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