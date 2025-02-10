---
title: Why Containers?
parentDir: docker
slug: docker/why-containers
author: Jake Laursen
excerpt: Summarizing Containers, VMs, and Virtualization
tags: ['Docker', 'containers', 'servers', 'virtualizaton']
order: 1
---

- [Virtualizing Servers](#virtualizing-servers)
  - [Servers Here, Server There, Servers Everywhere](#servers-here-server-there-servers-everywhere)
  - [We Code In Environments](#we-code-in-environments)
  - [We Can Minimize Code Changes due to Environment Changes](#we-can-minimize-code-changes-due-to-environment-changes)
  - [Virtual Machines](#virtual-machines)
  - [Containers](#containers)
- [Containers As The Focus](#containers-as-the-focus)
  - [Containers As A Bundled Set Of Kernel Features](#containers-as-a-bundled-set-of-kernel-features)
    - [Namespaces](#namespaces)
    - [CGroups](#cgroups)
    - [ChRoot](#chroot)

# Virtualizing Servers

## Servers Here, Server There, Servers Everywhere

As a "full-stack" (_how "full" is the stack, really?!_) developer, working with servers is constant, dynamic, and complex. Systems are complex: maybe 1 "service" sends emails, while another stores user-application data, and maybe another stores user authentication data. Maaybe another one or two are "cache" layers between apis and data stores.

## We Code In Environments

This might feel overly simplistic, but our "environment" matters. What makes up my environment?

- I use a mac laptop
  - it has an amount of ram, hard-drive, and CPU (_hardware resources_)
  - it runs an operating system
- I use a version of node, with api's that work in this version that may become outdated new versions and may not be present in older versions
- I make apis that connect to a database, which introduces networking, `localhost`, permissions, db users & passwords, etc.

**Other people will have different environments**: different machines, different versions of node, different databases to connect to.  
**Work environments can be significantly different**: security matters more, scale is different, hardware and OS details are probably different, etc.

## We Can Minimize Code Changes due to Environment Changes

Environment variables in application code can help encapsulate environment-specific details: database connection parameters. etc.  
Containers have become a common way to abstract _even more_ than application code: hardware limits, OS versions, server names, networking, resource versions (db's, coding language, etc), and more.

## Virtual Machines

Virtual Machines (_vms_) are a type of software that emulates hardware and the OS: CPU, RAM, Disk, Networking, etc.

## Containers

Unlike VMs, containers don't include as much content. Containers don't include a complete OS.  
Containers are more "light-weight". This won't cover an in-depth comparison between VMs and containers. I'm also not an expert in those details.  
Containers are significantly smaller than VMs, significantly simpler to work with than VMs, and containers leverage tools like docker or podman or containerd or something else.  
Container have large open-source and third-party-supported ecosystems of pre-built containers, called images (_more on that in a different post_).

# Containers As The Focus

## Containers As A Bundled Set Of Kernel Features

The [kernel](<https://en.wikipedia.org/wiki/Kernel_(operating_system)>) is a bit of a "middle-man" between physical hardware parts of a computer and the operating system.  
THe [Linux Kernel](https://en.wikipedia.org/wiki/Linux_kernel#/media/File:Linux_kernel_map.png) does many things, including these 3 that containers encapsulate: chroot, namespacing, and control-groups (cgroups).

### Namespaces

[Namespaces](https://www.nginx.com/blog/what-are-namespaces-cgroups-how-do-they-work/) split up processes that can and cannot "see" one another.  
Maybe something like user accounts on a laptop: I have my account/namespace, you have your account/namespace. Namespaces are something like a "lower level" technical version of that.  
There are a few "types" of namespaces: user, pid, network, mount, IPC (_interprocess communication_), and UTS (_unix time-sharing_).

### CGroups

[Control Groups](https://www.nginx.com/blog/what-are-namespaces-cgroups-how-do-they-work/#What-Are-cgroups) limit resource acces for different processes. Resources are like CPU usage, RAM ("memory"), Disk space (storage), network access, etc - hardware bits.

With a bit of imagination, it is clear how restricted process sharing (_namespaces_) AND reource access (_cgroups_) can work together. Maybe something like a more technical version of creating a "user" account on a laptop who can only save 10 gigabytes of info to the hard drive, and only use 8 gigabytes of ram: the two can work together!

### ChRoot

[chRoot](https://www.howtogeek.com/devops/what-is-chroot-on-linux-and-how-do-you-use-it/) sets a root directory of a process - somewhere where the "work" of a process "lives". Each new "root" project "thinks" that it is indeed the "root" of the filesystem of the host machine.  
Again, marrying process root with resource restriction and process interaction, all together, can be a very "isolated" setup for a unit of work to be done with some level of security & singleness-of-purpose.
