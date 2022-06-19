---
parentDir: linux
title: Doing More With Scripts
slug: linux/more-scripts
author: Jake Laursen
excerpt: Scripts, bash, variables, args, and more
tags: linux, bash, scripts, variablese
order: 20
---

# Beefing Up Bash Programs
Bash programs (_scripts_) can be "flexible".  
**A common "problem"** with this type of code is its static content. In order to do something _subtly different_, a "copy-paste-edit" appraoch is overly common.  

As a review of a simple bash program, here's an example stored in `~/bin/file-creator`:  

```bash
#! /bin/bash

# make and enter a new dir
mkdir -p ~/script-created
cd ~/script-created

# create 10 files *.txt
touch file{1..10}.txt

# back out & notify
cd ..
echo "done creating files in script-created"
```
