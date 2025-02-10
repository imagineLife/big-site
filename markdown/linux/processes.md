---
parentDir: linux
title: Processes
slug: linux/processes
shortSlug: processes
author: Jake Laursen
excerpt: 
tags: ["linux", "kernel", "cli", "environment", "processes"]
order: 14
---

# Processes
A process is a command that is running.  
Opening a terminal is running a process.  

- [Processes](#processes)
  - [Processes Start and Exit](#processes-start-and-exit)
    - [View a previous process exit code](#view-a-previous-process-exit-code)
    - [Exit Codes Rundown](#exit-codes-rundown)
  - [See processes with ps](#see-processes-with-ps)
  - [Monitor Processes with top](#monitor-processes-with-top)
    - [Using top in a mac](#using-top-in-a-mac)
  - [Kill a running process with Kill](#kill-a-running-process-with-kill)
  - [Running in the Foreground or Background](#running-in-the-foreground-or-background)
    - [The Foreground](#the-foreground)
    - [The Background](#the-background)
      - [Working With Background Jobs](#working-with-background-jobs)
  - [Run Processes Synchronously](#run-processes-synchronously)
    - [If Previous Process Succeeds](#if-previous-process-succeeds)
    - [If Previous Process Fails](#if-previous-process-fails)
    - [Regardless of Previous Command output](#regardless-of-previous-command-output)
  - [Subcommands](#subcommands)


## Processes Start and Exit
They start.  
They stop, which is also referred to as `exit`.  
When processes exit, they return an "exit code" which can be useful. The exit code gives info about the "success" or "failure" of the process. 
### View a previous process exit code

```bash
# run a process, a small one here, "ps"
ubuntu@primary:~$ ps
    PID TTY          TIME CMD
  43759 pts/0    00:00:01 bash
  71881 pts/0    00:00:00 ps

# check out the exit code
ubuntu@primary:~$ echo $?
0

# try a process that doesn't exist, "horse"
ubuntu@primary:~$ horse

Command 'horse' not found, did you mean:

  command 'morse' from deb bsdgames (2.17-28build1)
  command 'morse' from deb morse (2.5-1build1)
  command 'morse' from deb morse-simulator (1.4-6build1)
  command 'hose' from deb netpipes (4.2-8build1)
  command 'horst' from deb horst (5.1-2)

Try: sudo apt install <deb name>

ubuntu@primary:~$ echo $?
127
```

### Exit Codes Rundown
- `0`: success
- `1`: there was an err
- `2`: a bash error: the process & program tried to use bash, itself, and a bash err happened
- `126`: permission err
- `127`: command not found  
- `128`: the exit command, itself, threw an err
- `130`: program was ended with `CTRL + C`
- `137`: program was ended with `SIGKILL`

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
**note**: `sleep 5` creates a process that waits 5 sec. and then exits. `sleep` will be used throughout this doc as `sleep` is a low-impact command that consumes a process.    

## Monitor Processes with top
According to `man top`,
```bash
top – display sorted information about processes
```
Top stands for "table of processes", and shows an analysis of a bunch of data about running processes on a linux machine.  

### Using top in a mac
`top` will work on a mac shell, and I have node installed on my machine, so I'm going to use my mac, node, and the shell to illustrate top:
```bash
# in one terminal, start a node process
node

# in another terminal 
# get all the processes
Jakes-4:content Jake$ ps
  PID TTY           TIME CMD
  280 ttys000    0:00.09 -bash
  722 ttys000    0:00.10 node
89470 ttys001    0:00.08 /bin/bash -l
  726 ttys002    0:00.05 -bash

# NOTICE: node pid = 722
Jakes-4:content Jake$ top -pid 722


Processes: 404 total, 3 running, 401 sleeping, 2413 threads                                                              20:00:06
# 
# ...a bunch of other stuff...
# 
PID  COMMAND      %CPU TIME     #TH  #WQ  #POR MEM  PURG CMPR PGRP PPID STATE    BOOSTS    %CPU_ME %CPU_OTHRS UID  FAUL COW  MSGS
722  node         0.0  00:00.09 11   0    33   12M  0B   11M  722  280  sleeping *0[1]     0.00000 0.00000    501  2252 113  57 
```

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
Working with background processes feels to me a little mysteryious. To "see" them running is not as clear, obviously, as what is in the terminal, making process-management... a whole new world.  

```bash
# start a short-lived process in the bg
ubuntu@primary:~$ sleep 2 &
[1] 58543

# wait a few seconds till after that is done
# just press enter
ubuntu@primary:~$ 
[1]+  Done                    sleep 2
```
It looks like linux will "tell" the shell that the bg process is done on any command run after the bg process finished. Interesting Detail

#### Working With Background Jobs
Some processes might be "long-running": things like installing dependencies, updating dependencies, etc. Using the background can be helpful when working with a long-running job and using the background to run other processes at the same time.

- `jobs` is a command that shows background processes
-  `CTRL + Z` can be used to stop a process from completing
-  `bg` can be used to "move" a process from the running foreground to the background
-  `fg` can be used to "move" a process from the background to the running foreground
   -  NOTE: `bg` && `fg` get a number added after the command - here the number will be `1` && is incremental by the number of jobs in.... the job line...?

```bash
# make a foreground "sleep"
ubuntu@primary:~$ sleep 20

# can't do anything with the current terminal, waiting 20....

# quickly press CTRL+Z to stop the running process
^Z
[1]+  Stopped                 sleep 20

# inspect the process, see that it is stopped
ubuntu@primary:~$ jobs
[1]+  Stopped                 sleep 20
# NOTE: use the -l flag to get the pid, why not!
ubuntu@primary:~$ jobs -l
[1]+ 71862 Running                 sleep 20 &

# "move" the stopped job to the gb
ubuntu@primary:~$ bg 1
[1]+ sleep 20 &

# see the status of the bg process, "job"
ubuntu@primary:~$ jobs
[1]+  Running                 sleep 20 &

# bring the running job back to the foreground
ubuntu@primary:~$ fg 1
sleep 20

# cant do anything till the 20s passes
```


## Run Processes Synchronously 
### If Previous Process Succeeds
`&&` can be used to run a program when a previous program succeeds...
```bash
ubuntu@primary:~$ touch this-file.txt && ls >> this-file.txt && ps >> this-file.txt
```
That command uses the `&&` operator a few times so that if any program fails the following program(s) will not run.

### If Previous Process Fails
`||` can be used to catch when the previous program fails.  

```bash
# typo, forcing a failure that the || will catch
ubuntu@primary:~$ touc bad-command.txt || echo "dang"

Command 'touc' not found, did you mean:

  command 'touch' from deb coreutils (8.30-3ubuntu2)

Try: sudo apt install <deb name>

dang

# notice the "dang" above!
```

### Regardless of Previous Command output
`;` can be used to run commands regardless of previous command's output status.
```bash
ubuntu@primary:~$ touc bad-command.txt; echo "echo string"; echo "runs no matter what"

Command 'touc' not found, did you mean:

  command 'touch' from deb coreutils (8.30-3ubuntu2)

Try: sudo apt install <deb name>

echo string
runs no matter what
```

## Subcommands
These.  
Run commands in commands.  
Inception.  
Use this: `$(sub-command here)`:

```bash
ubuntu@primary:~$ echo Hi, my name is $(whoami)
Hi, my name is ubuntu
```