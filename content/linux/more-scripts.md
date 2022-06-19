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

## Add Flexibility through Reading Parameters
`read` is a program that takes "user input" parameters: `read` will wait till you, the person in from of the terminal in this case, enter something _after running a program_. Then, read will "use" the input you've entered in the rest of the program. 

Here's a 1-line program that uses `read`:
```bash
# the program
ubuntu@primary:~$ echo "here's a program, write a person you'd like to say hello to!" && read person && echo "hello "$person
here's a program, write a person you'd like to say hello to!

# terminal "waits" for some input by you!
# write a name, press enter
george

# returns...
hello george
```
This program...
- has a one-line "explanation of itself (_here's a program...._)
- waits for some input from you with `read`
- prints a string with the value you entered

### Prompt for User Input with the Prompt Flag  
With one flag, the above program can use a proper "prompt" flag to promt the user for input. Also, instead of `echo` this is using another similar command `printf`:
```bash
# the program
ubuntu@primary:~$ read -p "here's a program, write a person you'd like to say hello to: " person && printf "\nhello "$person
here's a program, write a person you'd like to say hello to: frank

hello frankubuntu@primary:~$ 
```