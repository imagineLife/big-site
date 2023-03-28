---
title: Flags and Args
parentDir: linux
slug: linux/flags-and-args
shortSlug: flags-and-args
author: Jake Laursen
excerpt: Intro to CLI command flags and arguments
tags: ["linux", "kernel", "cli", "ubuntu", "shell", "flags", "args"]
order: 4
---

#  Commands, Args, and Flags
- [Commands, Args, and Flags](#commands-args-and-flags)
  - [Args in action](#args-in-action)
    - [args with echo](#args-with-echo)
  - [Flags in action](#flags-in-action)
    - [flags with ls](#flags-with-ls)
  - [Combining flags](#combining-flags)
  - [Combining flags and params](#combining-flags-and-params)


The Command line runs commands.  
The commands reviewed in the [previous section](/linux/interacting-with-ubuntu) are `pwd`, `ls`, and `cd`.  
These commands can "take" arguments, or args for short. 
Args get "passed to" commands. "Passed to" is a common description for writing arguments after commands.  


## Args in action
Taking `cd ubuntu` as an example, `cd` is the command and `ubuntu` is the arg _passed to_ the command.  
`ls` can also take args: with the terminal at the location `/`, one directory "above" or "outside" of `home`, typing `ls home` will list out all contents of the home directory.  

### args with echo
`echo` is another command that is used to "print" contents to the terminal.  
Typing `echo water <enter>` will print "water" to the terminal. in this command, the "water" word is the arg passed to echo.  
 
## Flags in action
Flags are similar to but different from args.  
A similarity is that flags and args are both "passed to" a command.  
A difference is that flags have a prefix of `--` or `-` before the value whereas args do not.  

Taking the `ls` command as an example, some flags can be passed.  
Typing `ls --help` will print a "help"ful explanation of the `ls` command, including args/flags that the `ls` command can take.  

`--help` is a very common flag that can be passed to many commands as a way to discover some ways of using the command.  

### flags with ls
`ls -l` will use the `ls` command with the `-l` flag.  
According to the `ls --help` doc, the `-l` flag will `use a long listing format`. This format prints a bunch more details about each file or directory.   

`ls -a` will use the `ls` command with the `-h` flag.  
According to the `ls --help` doc, the `-h` flag will `with -l and -s, print sizes like 1K 234M 2G etc.`.   

## Combining flags
Flags can be combined sometimes. With `ls` as an example, `ls -lh` works!  
`ls -lh` is `ls -l` and `ls -h` put into one single command.  
The flags are merged after the single dash.  

## Combining flags and params
flag and params can be combined:  
`ls -lh home` will run `ls -lh` against the `home` directory.  