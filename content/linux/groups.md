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
  - [Switching a users group](#switching-a-users-group)

## See all groups
A few ways to see groups:
```bash
# see the groups the currently-logged-in user is assigned to
# here, the ubuntu user
ubuntu@primary:~$ groups
ubuntu adm dialout cdrom floppy sudo audio dip video plugdev netdev lxd

# see ALL groups the system currently has
ubuntu@primary:~$ cat /etc/group
root:x:0:
daemon:x:1:
bin:x:2:
sys:x:3:
adm:x:4:syslog,ubuntu
tty:x:5:syslog
disk:x:6:
lp:x:7:
mail:x:8:
news:x:9:
uucp:x:10:
man:x:12:
proxy:x:13:
kmem:x:15:
dialout:x:20:ubuntu
fax:x:21:
voice:x:22:
cdrom:x:24:ubuntu
floppy:x:25:ubuntu
tape:x:26:
sudo:x:27:ubuntu
audio:x:29:ubuntu
dip:x:30:ubuntu
www-data:x:33:
backup:x:34:
operator:x:37:
list:x:38:
irc:x:39:
src:x:40:
gnats:x:41:
shadow:x:42:
utmp:x:43:
video:x:44:ubuntu
sasl:x:45:
plugdev:x:46:ubuntu
staff:x:50:
games:x:60:
users:x:100:
nogroup:x:65534:
systemd-journal:x:101:
systemd-network:x:102:
systemd-resolve:x:103:
systemd-timesync:x:104:
crontab:x:105:
messagebus:x:106:
input:x:107:
kvm:x:108:
render:x:109:
syslog:x:110:
tss:x:111:
uuidd:x:112:
tcpdump:x:113:
ssh:x:114:
landscape:x:115:
admin:x:116:
netdev:x:117:ubuntu
lxd:x:118:ubuntu
systemd-coredump:x:999:
ubuntu:x:1000:
jake:x:1001:
``` 
Looks like ubuntu + multipass come with a bunch of groups out-of-the-box!  

Also, it looks like new users, in this case the `jake` user, get assigned a group with their name!
```bash
ubuntu@primary:~$ su jake
Password: 
$ groups
jake
```

## Switching a users group
Here, `jake` will be added to the `sudo` group - this gives `jake` superpower privileges. `jake` will also be able to use the `sudo` prefix to run a superuser command.   
```bash
# the magic command
ubuntu@primary:~$ sudo usermod -aG sudo jake

# switch to jake and see the new group!
ubuntu@primary:~$ su jake
Password: 
$ groups
jake sudo
$ exit
ubuntu@primary:~$ 
```
