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

- [Packages and Package Management](#packages-and-package-management)
  - [There are many package managers](#there-are-many-package-managers)
    - [APT-GET](#apt-get)
    - [APT](#apt)
      - [install lolcat](#install-lolcat)
      - [install node](#install-node)
      - [More Commands](#more-commands)
    - [More Recent Package Management with Snaps](#more-recent-package-management-with-snaps)
      - [Sandboxed](#sandboxed)
      - [Delta-Driven Updates](#delta-driven-updates)
      - [auto updates](#auto-updates)
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


#### More Commands
A brief overview of some more `apt` commands:
```bash
# remove unused dependencies
ubuntu@primary:~$ apt --help
# ...shows more, here's a brief rundown...

Most used commands:
  list - list packages based on package names
  search - search in package descriptions
  show - show package details
  install - install packages
  reinstall - reinstall packages
  remove - remove packages
  autoremove - Remove automatically all unused packages
  update - update list of available packages
  upgrade - upgrade the system by installing/upgrading packages
  full-upgrade - upgrade the system by removing/installing/upgrading packages
  edit-sources - edit the source information file
  satisfy - satisfy dependency strings
```


### More Recent Package Management with Snaps
Linux packages get packaged in several ways with several tools.  
`APT` is a little unsafe - bad code can be introduced.  
People try to install untrusted code and/or make code installable.  
`APT` code is reviewed by open-source devs: this is fallable, not scalable, and not really "secure".  
This happens with `npm`, the node package manager.  

There are several initiatives to approach this problem & `snaps` is officially supported by canonical that is for ubuntu. These can also run on any linux distro, not just ubuntu.  
`APT`, though, is just for ubuntu.

GUI tools, in ubuntu, are installed with `snap`.  

Mint & Redhat (_distros of linux_) need snaps installed - they don't come with it.  

```bash
# use snap to download a module
# NOTE: REVIEW THESE FLAGS if you want
sudo snap install --channel=16/stable --classic node
```
[Here's a q&a](https://askubuntu.com/questions/866511/what-are-the-differences-between-snaps-appimage-flatpak-and-others) comparing some nuts & bolts of packaging tools for reference.  

#### Sandboxed
Packages are enclosed && include all the code needed to run it. Code doesn't have the ability to do anything beyond its own codebase.  

#### Delta-Driven Updates
Apparently, `apt`, when updating a package, throws away the old version and downloads the new version.  
`snaps`, though, can only ship the changes - less code over the web and less code to update.  

#### auto updates
`snaps` auto-update: browsers auto-update... interesting parallel.  
