---
parentDir: linux
title: Groups
slug: linux/groups
author: Jake Laursen
excerpt: Users with a shared group attribute
tags: linux, kernel, cli, users, groups
order: 11
---

# Groups
Linux has the concept of Groups.  
Groups give "shared" privileges to all users assigned to a group.  

- [Groups](#groups)
  - [See all groups](#see-all-groups)

## See all groups
```bash
ubuntu@primary:~$ groups
ubuntu adm dialout cdrom floppy sudo audio dip video plugdev netdev lxd
``` 
Looks like ubuntu + multipass come with a bunch of groups out-of-the-box!  
