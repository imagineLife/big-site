---
title: Markdown Template
slug: linux/starting-with-unix
author: Jake Laursen
excerpt: building an http server
tags: http, web, server, node, express
order: 1
---

# Start with Unix
- [Start with Unix](#start-with-unix)
    - [A Brief history](#a-brief-history)
      - [1969: The Birth](#1969-the-birth)
      - [1973: Converted to C](#1973-converted-to-c)
      - [1975: BSD Release](#1975-bsd-release)
      - [1979: Bourne Shell Release](#1979-bourne-shell-release)
      - [1982: Several Distributions Released](#1982-several-distributions-released)
      - [1984: TCP/IP Introduction](#1984-tcpip-introduction)
      - [1986: NFS and AIX](#1986-nfs-and-aix)
      - [1987: Posix, OSF1 and UI](#1987-posix-osf1-and-ui)
      - [1989: Motif and the GUI Tooklit](#1989-motif-and-the-gui-tooklit)
      - [1990: Plan 9 and Distributed Computing](#1990-plan-9-and-distributed-computing)
  - [Linux is not unix](#linux-is-not-unix)
    - [Unix-Like](#unix-like)
Unix might be known as the "grandfather" of all current computer operating systems: windows, mac, android, and _linux_.  

A brief "history" of OS -  

**Multics**: an OS by Ken Thompson. MIT and GE.  

**Unics**: 1970 came along and this new operating system came along - a "castrated" operating system compared to multics (_hence the unic_).  

**C**: the "C" programming language came out after unics came out. 

**Unix**.  
- started in/around 1969 by two guys - Kenneth Thompson && Dennis Ritchie from AT&T

### A Brief history

#### 1969: The Birth
Unix is born in 1969.  
Kenneth Thomson and Dennis Ritchie, from AT&T.  

#### 1973: Converted to C
Unix gets updated in the language of C.  
Dennis ritchie created the C programming language.  

#### 1975: BSD Release
The BSD ("_Berkeley Software Distribution_") release of Unix, formerly referred to as Berkeley Unix, was created from the University of California. [Berkeley Unix "Rabbit Hole" book](https://www.oreilly.com/openbook/opensources/book/kirkmck.html)  

#### 1979: Bourne Shell Release
A default "shell" for unix was developed and released by  Stephen Bourne.  

#### 1982: Several Distributions Released
- **HP-UX**: First unix to offer ACL, access control lists for file access permissions
- **SunOS**: Made by sun microsystems
- Two others: USG System II, and Ultrix-11

#### 1984: TCP/IP Introduction
Until this time, Unix had UUCP networking to copy files to-and-fro.  
Here, in the BSD release 4.2, a new network protocol suite was introduced, this TCP/IP.    
TCP is the transmission Control Protocol, a byte/stream service abstraction.  
IP is the internet protocol, an ["un-reliable datagram carriage across the entire internet"](https://gunkies.org/wiki/TCP/IP).  


#### 1986: NFS and AIX
AIX is a version of unix made and sold by IBM.  
4.3 BSD version of unix incorporated the SunOS "NFS" code.  
NFS, network file system, is a [distributed file system protocol](https://en.wikipedia.org/wiki/Network_File_System).  
NFS allows users access to files over a network.

#### 1987: Posix, OSF1 and UI 
OSF is a variation on unix developed by the [Open Software Foundation](https://en.wikipedia.org/wiki/Open_Software_Foundation), a non-profit that created standards for implementing Unix.  

#### 1989: Motif and the GUI Tooklit
[Motif](https://en.wikipedia.org/wiki/Motif_(software)) was released - some common standards and "building blocks" rules for a User Interface, what we see on the screen.  

#### 1990: Plan 9 and Distributed Computing
[Plan 9](https://en.wikipedia.org/wiki/Plan_9_from_Bell_Labs), released by [bell labs](https://en.wikipedia.org/wiki/Bell_Labs) (_now nokia_), worked at treating a de-centralized network of computers as a single unit. UIs (rio) would access CPU-intensive servers to do to work. Storage was also de-centralized.   



## Linux is not unix
Linux is free, Unix costs $$.  
A core part of linux is GNU, which stands for "gnu is not unix".  

### Unix-Like
Linux is ["unix-like"](https://en.wikipedia.org/wiki/Unix-like)
