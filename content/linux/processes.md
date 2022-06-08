---
parentDir: linux
title: Processes
slug: linux/processes
author: Jake Laursen
excerpt: 
tags: linux, kernel, cli, environment, processes
order: 14
---

# Processes
A process is a command that is running.  
Opening a terminal is running a process.  

- [Processes](#processes)
  - [See processes with ps](#see-processes-with-ps)
  - [Kill a running process with Kill](#kill-a-running-process-with-kill)
  - [Running in the Foreground or Background](#running-in-the-foreground-or-background)
    - [The Foreground](#the-foreground)
    - [The Background](#the-background)

## See processes with ps
`ps` will output processes that are running.  
`ps` stands for `process snapshot`.  

```bash
# run "ps"
ubuntu@primary:~$ ps
    PID TTY          TIME CMD
  43759 pts/0    00:00:00 bash
  47519 pts/0    00:00:00 ps


# try ADDING a sleep command to the ps line
# see 'sleep' added to the list
ubuntu@primary:~$ sleep 5 & ps
[1] 58266
    PID TTY          TIME CMD
  43759 pts/0    00:00:00 bash
  58266 pts/0    00:00:00 sleep
  58267 pts/0    00:00:00 ps
```
**note**: `sleep 5` creates a process that waits 5 sec. and then exits.  

## Kill a running process with Kill
```bash
# create a long-running 'sleep' process to kill
ubuntu@primary:~$ sleep 100 & ps
[1] 58271
    PID TTY          TIME CMD
  43759 pts/0    00:00:00 bash
  58271 pts/0    00:00:00 sleep
  58272 pts/0    00:00:00 ps
ubuntu@primary:~$ ps
    PID TTY          TIME CMD
  43759 pts/0    00:00:00 bash
  58271 pts/0    00:00:00 sleep
  58273 pts/0    00:00:00 ps

# use the process id to stop the process
ubuntu@primary:~$ kill -s SIGKILL 58271

# see that the process has been killed
ubuntu@primary:~$ ps
    PID TTY          TIME CMD
  43759 pts/0    00:00:00 bash
  58274 pts/0    00:00:00 ps
[1]+  Killed                  sleep 100
```
A brief overview of the command `kill -s SIGKILL 58271`:
- `kill` is the command to send a signal
- `-s` is the flag to send a signal _name_
  - `-n` can be used instead, and pass the signal _number_
- `SIGKILL` is the signal being sent 
- `58271` is the signal number that is recieving the `SIGKILL` signal

## Running in the Foreground or Background
Processes run either the foreground or background.  


### The Foreground
In the foreground, processes run and the output appears in the shell.  
In the foreground, the shell is consumed by the running process && no other processes can be run whil the foreground is consumed.  
The foreground is where processes run by default: if you see it, its probably in the foreground. That's why running `ps` shows 2 processes: the shell and the `ps` that was just run:
```bash
ubuntu@primary:~$ ps
    PID TTY          TIME CMD
  43759 pts/0    00:00:00 bash
  58518 pts/0    00:00:00 ps
```
There _are a lot of other processes running_, but those are in the background.  

### The Background
In the bg, processes can be run that "free up" the shell. The terminal/cmd prompt can be used while processes run in the bg.  

