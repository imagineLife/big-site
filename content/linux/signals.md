---
title: The Power of the Control key
parentDir: linux
slug: linux/ctrl-and-signals
author: Jake Laursen
excerpt: The Control key is a powerful key in bash, allowing for shortcuts as well as "signal" sending
tags: linux, kernel, cli, ubuntu, shell, ctrl, shortcuts, signals
order: 5
---

# Control key
Ctrl + a handful of keys perform interesting "shortcuts" in a linux terminal ->  
|Ctrl + __| Performs | Signal sent | 
|:--|:--|--:|  
|Process Management|||
|C| Kills the current process|SIGINT|  
|Z| Suspends the current process|SIGTSTP|  
|D| Close the shell|EOF (_end-of-file_)|  
|Screen Management|||
|L| Clears the screen| (_similar to typing "clear" and pressing enter_)|   
|Controlling the cursor|||
|A|Go to the start of the line||  
|E|Go to the end of the line||  

[A great article on bash keyboard shortcuts](https://www.howtogeek.com/howto/ubuntu/keyboard-shortcuts-for-bash-command-shell-for-ubuntu-debian-suse-redhat-linux-etc/)  
