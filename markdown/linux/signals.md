---
title: The Power of the Control key
parentDir: linux
slug: linux/signals
shortSlug: signals
author: Jake Laursen
excerpt: The Control key is a powerful key in bash, allowing for shortcuts as well as "signal" sending
tags:
  ['linux', 'kernel', 'cli', 'ubuntu', 'shell', 'ctrl', 'shortcuts', 'signals']
order: 5
---

# Control key

Ctrl + a handful of keys perform interesting "shortcuts" in a linux terminal ->  
|Ctrl + \__| Performs | Signal sent |
|:--|:--|--:|  
|Process Management|||
|C| Kills the current process|SIGINT|  
|Z| Suspends the current process|SIGTSTP|  
|D| Close the shell|EOF (\_end-of-file_)|  
|Screen Management|||
|L| Clears the screen| (_similar to typing "clear" and pressing enter_)|  
|Controlling the cursor|||
|A|Go to the start of the line||  
|E|Go to the end of the line||

[A great article on bash keyboard shortcuts](https://www.howtogeek.com/howto/ubuntu/keyboard-shortcuts-for-bash-command-shell-for-ubuntu-debian-suse-redhat-linux-etc/)

# Linux Signals

[Linux programs can receive signals](https://man7.org/linux/man-pages/man7/signal.7.html).  
Signals are like "notifications" that a program or a user can "send" to the program.  
To see a list of signals, type `kill -l`, which passes the `-l` flag to the `kill` command - here's what the output might look like:

```bash
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
16) SIGSTKFLT	17) SIGCHLD	18) SIGCONT	19) SIGSTOP	20) SIGTSTP
21) SIGTTIN	22) SIGTTOU	23) SIGURG	24) SIGXCPU	25) SIGXFSZ
26) SIGVTALRM	27) SIGPROF	28) SIGWINCH	29) SIGIO	30) SIGPWR
31) SIGSYS	34) SIGRTMIN	35) SIGRTMIN+1	36) SIGRTMIN+2	37) SIGRTMIN+3
38) SIGRTMIN+4	39) SIGRTMIN+5	40) SIGRTMIN+6	41) SIGRTMIN+7	42) SIGRTMIN+8
43) SIGRTMIN+9	44) SIGRTMIN+10	45) SIGRTMIN+11	46) SIGRTMIN+12	47) SIGRTMIN+13
48) SIGRTMIN+14	49) SIGRTMIN+15	50) SIGRTMAX-14	51) SIGRTMAX-13	52) SIGRTMAX-12
53) SIGRTMAX-11	54) SIGRTMAX-10	55) SIGRTMAX-9	56) SIGRTMAX-8	57) SIGRTMAX-7
58) SIGRTMAX-6	59) SIGRTMAX-5	60) SIGRTMAX-4	61) SIGRTMAX-3	62) SIGRTMAX-2
63) SIGRTMAX-1	64) SIGRTMAX
```

## Common Signals

- `SIGINT: CTRL + C`
  - interrupt the process
  - useful when a process is ongoing that _will potentially run forever_
- `SIGQUIT: CTRL + D`
  - Bash responds here, even if programs don't
  - Kills bash sessions
  - similar/same as typing `exit`
- `SIGTERM`
  - no shortcut
  - send this to a program to kill it
- `SIGKILL: kill -9`
  - `kill -9` will send the sigkill to a program
  - stops without cleanup
