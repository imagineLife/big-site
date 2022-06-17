---
parentDir: linux
title: packages and package management
slug: linux/pkgs
author: Jake Laursen
excerpt: Packages, Package Management, APT and Snaps
tags: linux, kernel, cli, apt, snap, packages, package management
order: 18
---

# Packages and Package Management
Ubuntu comes with tools.  
Tools are like "packages", bundled bits of useful commands.  
Packages get managed: updated, bugs reported, versioned, etc. There are a lot of packages, as well as package managers.  

## There are many package managers
- `dpkg` is the package manager for Debian (_the "parent" of ubuntu_)
- `APT` is _based on_ `dpkg` && is available is debian linux distrobutions
- `YUM` is built on `RPM` (_which was a package manager by red hat_)
- `DNF` a next-gen of `YUM`
- `Pacman` is for the Arch distro
- `APK` is the manager of alpine

### APT-GET
The `APT` in `APT-GET` stands for "advanced package tooling".   
`APT-GET` is older than apt.  


### APT 
`apt install` is the command to download packages.   

#### install lolcat
Here, download a tool that turns cli output into a rainbow: 
`lolcat`.  
`sudo apt install lolcat`.  
Then send some content to lolcat with `ls -lah | lolcat`

#### install node
```bash

# search for apt packages with node in the name
# will return a bunch of packages
ubuntu@primary:~$ apt search nodejs

# show details on nodejs
ubuntu@primary:~$ apt show nodejs
ubuntu@primary:~$ apt show nodejs
Package: nodejs
Version: 10.19.0~dfsg-3ubuntu1
Priority: extra
Section: universe/web
Origin: Ubuntu
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Debian Javascript Maintainers <pkg-javascript-devel@lists.alioth.debian.org>
Bugs: https://bugs.launchpad.net/ubuntu/+filebug
Installed-Size: 153 kB
Depends: libc6 (>= 2.17), libnode64 (= 10.19.0~dfsg-3ubuntu1)
Recommends: ca-certificates, nodejs-doc
Suggests: npm
Conflicts: nodejs-legacy
Replaces: nodejs-legacy
Homepage: http://nodejs.org/
Download-Size: 61.2 kB
APT-Sources: http://ports.ubuntu.com/ubuntu-ports focal/universe arm64 Packages
Description: evented I/O for V8 javascript - runtime executable
Node.js is a platform built on Chrome\'s JavaScript runtime for easily
building fast, scalable network applications. Node.js uses an
event-driven, non-blocking I/O model that makes it lightweight and
efficient, perfect for data-intensive real-time applications that run
across distributed devices.
.
Node.js is bundled with several useful libraries to handle server
tasks:
.
System, Events, Standard I/O, Modules, Timers, Child Processes, POSIX,
HTTP, Multipart Parsing, TCP, DNS, Assert, Path, URL, Query Strings.

# install nodejs
# will print the install logs
ubuntu@primary:~$ sudo apt install nodejs

# try it out!
ubuntu@primary:~$ node -e "console.log(12 * 4)"
48
```