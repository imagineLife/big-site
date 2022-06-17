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

```