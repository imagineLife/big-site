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

## Environments Have Variables
The primary use for environments is storing info in varibales.  
Variables can be set and used.  

### See all variables with printenv
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