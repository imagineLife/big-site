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
    - [System-Wide with /etc/profile.d/*.sh](#system-wide-with-etcprofiledsh)
    - [Scriptable System-Wide with /etc/profile and /etc/bashrc](#scriptable-system-wide-with-etcprofile-and-etcbashrc)
  - [Customizing the Bash Shell with bashrc and bash_profile](#customizing-the-bash-shell-with-bashrc-and-bash_profile)
    - [bash_profile for login shells](#bash_profile-for-login-shells)
    - [bashrc for every shell instance](#bashrc-for-every-shell-instance)
    - [telling bash_profile to refer to bashrc](#telling-bash_profile-to-refer-to-bashrc)
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

### System-Wide with /etc/profile.d/*.sh
There's a directory at `etc/profile.d`. (_The `.d` in the file name might look confusing, it seems out-of-place to me_).  
This can store `*.sh` files where more variables can get stored that are available "globally", similar to the `/etc/enviorment`. 
This gets run when a shell is opened both as a console (_like these blog posts have been about_) or even when accessed over ssh.  
It seems like files in this `/etc/profile.d/custom-file.sh` location are for single-purpose use-cases.  

### Scriptable System-Wide with /etc/profile and /etc/bashrc
`/etc/profile` looks controversial to edit: a ubuntu "help" doc reads...   
["While /etc/profile is often suggested for setting environment variables system-wide, it is a configuration file of the base-files package, so it's not appropriate to edit that file directly. Use a file in /etc/profile.d instead..."](https://help.ubuntu.com/community/EnvironmentVariables#A.2Fetc.2Fprofile.d.2F.2A.sh)

## Customizing the Bash Shell with bashrc and bash_profile
The shell can be customized: things like text coloring, git tooling, setting package versions (node, python, etc).  

Bash has "startup files", much like the above noted `/etc/profile.d` and `/etc/environment` files: `~/.bash_profile` and `~/.bashrc` are the focus here.  

### bash_profile for login shells
I'm still learning, but the "login shell" seems to be run when starting the machine && not run again after that during the use of the computer.  
`.bash_profile` is for the 'login shell' variables: things that are run 1x when the os starts, and never again.  

### bashrc for every shell instance
`.bashrc`, on the other hand, is run on every shell instance, every window or tab. This `.bashrc` is often the place that "makes the most sense" to edit when customizing the shell.  

This "instance" is like a custom config for every time a "local" shell is instantiated.  

### telling bash_profile to refer to bashrc
It looks like people prefer the `.bashrc` so much that there's a commin script to make even the `.bash_profile` _look to_ the `.bashrc` for how to configure the environment. In the `.bash_profile` doc:  
```bash
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

