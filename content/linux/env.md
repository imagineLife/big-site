---
parentDir: linux
title: Env and Env Vars
slug: linux/env
author: Jake Laursen
excerpt: 
tags: linux, kernel, cli, environment, variables
order: 13
---

# Environments
The Linux shell (or terminal or cmd line) runs in "environments".  
There is something like a "global" environment and also a "local" environment.  

- [Environments](#environments)
  - [Terminals are Temporary Sessions](#terminals-are-temporary-sessions)
  - [The Host Machine is a Global Session](#the-host-machine-is-a-global-session)
  - [Environments Have Variables](#environments-have-variables)
    - [See all variables with printenv](#see-all-variables-with-printenv)
  - [See a single variable with echo](#see-a-single-variable-with-echo)
  - [Set a Temporary Variable](#set-a-temporary-variable)
  - [Set System-Wide Permanent Variables](#set-system-wide-permanent-variables)
    - [System-Wide with /etc/environment](#system-wide-with-etcenvironment)
## Terminals are Temporary Sessions
Every time a terminal/cmd window is open, it is a bash "session".  
Each session can "remember" information. 

## The Host Machine is a Global Session
When your laptop/desktop/other starts up, a "global" session is also "running".  
The temporary bash sessions of each terminal window are consumers of the global session contents.  
Maybe like rooms in a house - the terminal window is like a room that can have some of its own data inside the house of the machine.  

## Environments Have Variables
The primary use for environments is storing information in varibales.  
These are often referred to as `environment variables`.   

In the web-development javascript space this is maybe most often similar to the differences between how an app might run in `dev`,`qa`,`staging`, `production`, `blue`, `green`, `@next`, etc. The `dev,qa,prod` values are often the environment variables. In a node api these might be accessed through `process.env.NODE_ENV`.  

Interesting notes found [here](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html) and [here](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html), starting with `variable expansion`.  

### See all variables with printenv
Environment variables are stored with a name and a value, like `NAME=value`.  
```bash
ubuntu@primary:~$ printenv
# ...will print all variables
```
## See a single variable with echo
```bash
# see the USER variable
# note the '$' prefix
ubuntu@primary:~$ echo $USER
ubuntu
```

## Set a Temporary Variable 

```bash
# set & use a var in 2 commands
ubuntu@primary:~$ WHAT=is-this
ubuntu@primary:~$ echo $WHAT
is-this

# cant set a var in the same command as the attempted use
ubuntu@primary:~$ ANOTHER_ONE=not-here-yet echo here is $ANOTHER_ONE
here is

# NEED the '&&' to declare 2 commands in one line
ubuntu@primary:~$ ANOTHER_ONE=not-here-yet && echo here is $ANOTHER_ONEhere is not-here-yet
```

## Set System-Wide Permanent Variables  
There are a few files on a linux os that store environment variables.  

### System-Wide with /etc/environment
`/etc/environment` is a file that stores contents that can be used in any shell any time. Store one var per line in this file, not many-variables in a single line.  
