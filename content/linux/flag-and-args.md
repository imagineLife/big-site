---
title: Flags and Args
parentDir: linux
slug: linux/flags-and-args
author: Jake Laursen
excerpt: Intro to CLI command flags and arguments
tags: linux, kernel, cli, ubuntu, shell, flags, args
order: 4
---

#  Commands, Args, and Flags
[Commands, Args, and Flags](#commands-args-and-flags)
  - [Args in action](#args-in-action)
  - [Flags in action](#flags-in-action)


The Command line runs commands.  
The commands reviewed in the [previous section](/linux/interacting-with-ubuntu) are `pwd`, `ls`, and `cd`.  
These commands can "take" arguments, or args for short. 
Args get "passed to" commands. "Passed to" is a common description for writing arguments after commands.  


## Args in action
Taking `cd ubuntu` as an example, `cd` is the command and `ubuntu` is the arg _passed to_ the command.  

## Flags in action
Flags are similar to but different from args.  
A similarity is that flags and args are both "passed to" a command.  
A difference is that flags have a `--` prefix before the value whereas args do not.  

Taking the `ls` command as an example, some flags can be passed.  
Typing `ls --help` will print a "help"ful explanation of the `ls` command and the args/flags that the `ls` command can take.  

`--help` is a very common flag that can be passed to many commands as a way to discover some ways of using the command.  
