---
parentDir: linux
title: Writing Scripts with Bash
slug: linux/script-writing
author: Jake Laursen
excerpt: Scripts, bash, automation
tags: linux, kernel, cli, scripts
order: 19
---

# Using Bash to Write Scripts
Bash can be used to put many commands together into what are commonly referred to as "_scripts_", or a shell script, or a program. I'll be referring to these as programs.  
The program is the file that has all the bash code in it.  

- [Using Bash to Write Scripts](#using-bash-to-write-scripts)
  - [Create a dir and some files](#create-a-dir-and-some-files)
    - [Making File-Creator A Runnable Command with #!](#making-file-creator-a-runnable-command-with-)
      - [#!](#)
      - [Update the File Permissions to be executable](#update-the-file-permissions-to-be-executable)
    - [Making File-Creator a Runnable Command](#making-file-creator-a-runnable-command)
      - [Storing the shell program in a local bin directory](#storing-the-shell-program-in-a-local-bin-directory)
      - [Make the Users bin dir Runnnable With a PATH Update](#make-the-users-bin-dir-runnnable-with-a-path-update)
## Create a dir and some files
```bash

ubuntu@primary:~$ pwd
/home/ubuntu

# create a new file
ubuntu@primary:~$ touch file-creator.sh

# edit the file with vi
ubuntu@primary:~$ vi file-creator.sh 


# make & enter a dir
mkdir -p ~/program-created
cd ~/program-created

# create a few files
touch file{1..10}.txt

# back-out to where we came from
cd ..

echo "done creating files in program-created"
```
Exit vi with write+quit (`:wq`).  
Run the program with any of these: 
```bash
ubuntu@primary:~$ . file-creator.sh 
ubuntu@primary:~$ source file-creator.sh 
ubuntu@primary:~$ bash file-creator.sh 
```

As a brief recap:
- a program was created in `file-creator.sh`
- the program creates a dir, creates a few files, and echos a string to the terminal
- the program gets run by bash with one of the keywords `bash` or `.` or `source`

### Making File-Creator A Runnable Command with #!
Many built-in programs are runnable without the `bash` or `.` or `source` keyword.  
Programs like `cp` or `ls` or `mv`... all of these may be a "no duh" that they don't need any other keyword to run.  
Interestingly, the `file-creator.sh` file can include a simple one-liner that makes bash look at the file and run it without the requirement of the keyword `bash` or `.` or `source`.  

```bash
#! /bin/bash
```
Thats it.  
Put that as the first line in a file.  
The file will be runnable without a keyword before the file name.  

I'll do this one way
```bash
# copy the file to a new file, similarly named
ubuntu@primary:~$ cp file-creator.sh runnable-file-creator.sh

# edit with vi
ubuntu@primary:~$ vi runnable-file-creator.sh

# ...vi opens...


#! /bin/bash
mkdir -p ~/script-created
cd ~/script-created
touch file{1..10}.txt
cd ..
echo "done creating files in script-created"

# ...exit vi with :wq

# see the new file
ubuntu@primary:~$ cat runnable-file-creator.sh 
#! /bin/bash
mkdir -p ~/script-created
cd ~/script-created
touch file{1..10}.txt
cd ..
echo "done creating files in script-created"
```
This is the _same exact file_, accept with a different name and only 1 line difference - the first line.  

#### #!
pronounced Hashbang.  
I learned it as "shebang" (_pronounced something like shi-bang_).  
Has to be the first line in the file.  
Then gets followed by an absolute path. In this case by `/bin/bash`.  

#### Update the File Permissions to be executable
```bash
# see current permissions
ubuntu@primary:~$ ls -lah runnable-file-creator.sh 
-rw-rw-r-- 1 ubuntu ubuntu 132 Jun 17 09:27 runnable-file-creator.sh

# NOTICE: nobody has the x, so the file is not executable.

# update the permissions && see the results
ubuntu@primary:~$ chmod 700 runnable-file-creator.sh 
ubuntu@primary:~$ ls -lah runnable-file-creator.sh 
-rwx------ 1 ubuntu ubuntu 132 Jun 17 09:27 runnable-file-creator.sh
```

Now, run it:
```bash
ubuntu@primary:~$ ls
# ...might show more stuff, but should definitely include
runnable-file-creator.sh 
# ...

ubuntu@primary:~$ ./runnable-file-creator.sh 
done creating files in script-created
```

### Making File-Creator a Runnable Command
Above, the runnable-file-creator is referenced by filename with `./runnable-file-creator.sh`, where the file _path_ is described and includes the `./`.  
Bash allows for turning this type of file into a runnable command much like `cp` and `ls` are runnable commands.  

#### Storing the shell program in a local bin directory
The "root" of a linux machine has a `bin` directory.  
Creating a bin directory for the present user will be helpful, as that directory is where _all_ runnable bash programs can go.  

```bash
# get to the user's root dir
ubuntu@primary:~$ cd ~
ubuntu@primary:~$ pwd
/home/ubuntu
ubuntu@primary:~$ whoami
ubuntu

# create the bin dir & move the file into here
ubuntu@primary:~$ mkdir bin
ubuntu@primary:~$ mv runnable-file-creator.sh bin/file-creator

# validate
ubuntu@primary:~$ ls bin/
file-creator
```

#### Make the Users bin dir Runnnable With a PATH Update
Users get a "global" variable called `PATH`.
```bash
ubuntu@primary:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```  
The path string is a bunch of file paths where programs "live" in the os. Each path is separated by a `:`.    
Running a program tells linux to "look through" the $PATH at each path, and when the first (_farthest left in the path string_) path includes a program that matches the user-input, linux uses that path+program as the program to run.  
In this case, the path can be updated to _first look in this user's "bin" dir_ for any programs to run. This way, any programs stored in the user's bin will be recognized wuthout a file-path or a file extension in the command name.  

```bash
ubuntu@primary:~$ PATH=~/bin:$PATH

ubuntu@primary:~$ echo $PATH
/home/ubuntu/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```
Notice that now the first path in the `$PATH` var is `/home/ubuntu/bin` which is the user's bin dir.  
Also, this command _only sets the path for the current terminal session._  
The `$PATH` can be updated for all terminal sessions by updating the `~/.bashrc` file with this same Path update:  

```bash
ubuntu@primary:~$ vi ~/.bashrc

# add this to the first line of the bashrc
PATH=~/bin:$PATH

# :wq to write + quit

# Reset the bash profile
ubuntu@primary:~$ . ~/.bashrc
```  

Now, the `file-creator` can be run directly from the command line:
```bash
ubuntu@primary:~$ file-creator
done creating files in script-created

```