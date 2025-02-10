---
title: Learn About Operating System Interactions
slug: node/os
author: Jake Laursen
excerpt: Architecture, cpu info, user info, hostname, and more
tags: ["node", "os", "core"]
parentDir: node
order: 1
---

# OS Information
Node includes the [os module](https://nodejs.org/dist/latest-v18.x/docs/api/os.html), which contains a bunch of details that a node program can use to get info about the operating system.  
Here's a few details:

```js
const { 
  arch,
  cpus,
  freemem,
  hostname, 
  homedir, 
  platform,
  tmpdir,
  totalmem,
  type,
  uptime,
  userInfo 
} = require('os')

console.log({
  arc: arch(),
  cpus: cpus(),
  freemem: freemem(),
  hostname: hostname(), 
  homedir: homedir(), 
  tmpdir: tmpdir(),
  totalmem: totalmem(),
  platform: platform(),
  type: type(),
  uptime: uptime(),
  userInfo: userInfo()
})
```

## arch
The os CPU architecture (_i.e on a mac m1 it returs "arm64"_).  

## cpus
An array of objects, where each object represents info about one of the cpus of the machine: model, speed (in MHz), and a few pieces of "time" data about the cpu.  

## freemem  
available memory by the system. Note this is not the "total" memory, which can be produced by [totalmem](#totalmem).  

## hostname
the hostname of the os

## homedir
the current user's home directory path.  

## tmpdir
the path of the OS's default storage location of temporary files

## totalmem  
The total amount of memory that the system has.  

## platform
The os platform where the [_"node binary was compiled"_](https://nodejs.org/dist/latest-v18.x/docs/api/os.html#osplatform). On my mac this returns `darwin`.  

## type
the os name (maybe similar to platform). On a mac this returns `Darwin`.  

## uptime
The total amount of time, in seconds, that the system has be "up" or running.  

## userinfo
info about the current user:
```js
{
  uid: 501,
  gid: 20,
  username: 'Me',
  homedir: '/Users/Me',
  shell: '/bin/bash'
}

