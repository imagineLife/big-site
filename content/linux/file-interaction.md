---
title: Interacting with Files
parentDir: linux
slug: linux/file-interaction
author: Jake Laursen
excerpt: 
tags: linux, kernel, cli, files
order: 7
---

# Working with files and folders
- [Working with files and folders](#working-with-files-and-folders)
  - [Reading Files](#reading-files)
    - [less](#less)
    - [cat](#cat)
    - [head](#head)
    - [tail](#tail)
  - [Creating, Removing, Copying, and Moving Files and Directories](#creating-removing-copying-and-moving-files-and-directories)
    - [Make a Directory with mkdir](#make-a-directory-with-mkdir)
    - [Make a File with touch](#make-a-file-with-touch)
    - [Remove Files and Folders with rm](#remove-files-and-folders-with-rm)
      - [Watch out](#watch-out)
      - [Remove a File](#remove-a-file)
      - [Remove a file and ask](#remove-a-file-and-ask)
    - [Copying with cp](#copying-with-cp)
    - [Moving with mv](#moving-with-mv)
  - [Bundling with tar](#bundling-with-tar)
    - [tar flags](#tar-flags)
    - [uncompressed bundling](#uncompressed-bundling)
    - [compressed bundling](#compressed-bundling)
    - [Extracting a Compressed tar file](#extracting-a-compressed-tar-file)

## Reading Files
### less  
less is used to read files.  
With a linux terminal `pwd` at `/home/ubuntu`, and a text file in the directory (_noted in a previous page_) called something like `newfile.txt` less can be used to read the file with `less newfile.txt`.  

...I don't use less to read files. I usually use `cat` or `tail` depending on the need to read the file. I've heard `less` is a more robust file reader, but for longer reads I usually open a text-editor like vscode. To check out more details on `less` see the help `less --help` or read the manual with `man less`.  

### cat  
`cat` reads the file && prints its contents to the screen.  
`cat newfile.txt` will print the entire newfile.txt to the terminal output.  

### head  
`head` takes the first bunch of lines of a files && prints them to the termial. By default, `head` prints 10 lines.   
### tail  
`tail` takes the last bunch of lines of a files && prints them to the termial. By default, `tail` prints 10 lines.  
This `tail` command can be useful for inspecting a file that captures application log activity. `tail -f the-log-file.txt` will aid in reviewing application logs as the logs are occuring in real-time.  
The `-f` flag means "follow", and using `tail -f the-log-file.txt` will "follow" new contents being added to said log file and print the new contents, as they appear, in the terminal output.  

## Creating, Removing, Copying, and Moving Files and Directories

### Make a Directory with mkdir
`mkdir` makes a directory.  
`mkdir this-new-dir` will make a new directory called `this-new-dir`.  

`mkdir -p one/two/three` leverage the "-p" flag, which represents "parent", to create all subdirectories needed.  
Here, directory `one` is a parent of `two`, `two` is a child of `one` and a parenet of `three`, and `three` is a child of `two`.  

### Make a File with touch
`touch` can be used to create a file.  
`touch new-file-who-dis.txt` will create the file `new-file-who-dis.txt`.  
**NOTE**: running `touch` on a file that already exists updates the last-modified date and last-accessed date.  

### Remove Files and Folders with rm
#### Watch out
We might be used to the `are you sure` type messages when deleting content from apps.  \
Here, though, watch out. Those types of alerts usually need to be manually triggered, and running `rm` will most likely delete everything without a confirmation request unless you tell the command to ask you for permission.  

#### Remove a File
With the terminal at the directory of `/home/ubuntu` where `ls` reveals a file called `newfile.txt`,  
run `rm newfile.txt`.  
Notice nothing seems to happen.  
Run `ls` and see that the `newfile.txt` is gone. Forever. No `whoops I forgot do to that` here.  

#### Remove a file and ask
Create a new file called `asdf.txt`by using `touch asdf.txt`. We will use this to delete the file.  
`rm -i asdf.txt` will prompt for your approval:
```bash
ubuntu@primary:~$ rm -i asdf.txt 
rm: remove regular empty file 'asdf.txt'?
```


### Copying with cp
`cp` is used to copy stuff.  
`cp originalFile.txt destination-file.txt` will copy `originalFile.txt` to `destination-file.txt`.  
`cp init.txt new-dir/` will copy `init.txt` to a new directory called `new-dir`.  
`cp -R this-dir that-dir` will copy the `this-dir` directory into a new directory `that-dir`.  

### Moving with mv
`mv this.txt that.txt` will "move" the `this.txt` to a new file called `that.txt`. This is sort of like re-naming the file here.  
Maybe a more common use could be `mv this.txt dir/this.txt`.  

## Bundling with tar
`tar` is used to put files together.  
### tar flags
Tar has a lot of flags. Here's some more common ones for the infrequent tar users:
- `-c`: create a tar archive, short for `--create`  
- `-f`: use an archive file, short for `--file=ARCHIVE`  
- `-z`: put the tar archive through gzip compression  
Those 3 flags together are often used as `-cfz` to bundle a file in a compressed format.  
- `-x`: extract files from an archive

The `-x` flag is often combined with other flags to decompress and "untar" a compressed + tarred file.  

### uncompressed bundling
Lets bundle 3 things:
- a file called `qwer.txt`
- a directory called `dir`
- a file in the `dir` directory called `asdf.txt`
This will get bundled into a tar filed called `uncompressed.tar`.  

The command to do this looks like  
```bash
tar -cf uncompressed.tar qwer.txt dir
```
Revealing the file using `ls` will show `uncompressed.tar`.  

### compressed bundling
Noted above is a single flag to add, the `-z` flag.  
The name of the bundled tarfile here will change to `compressed.tar.gz`.  The `gz` is common to allude to the compressed nature of the file.  

The command to do this looks like  
```bash
tar -cfz compressed.tar.gz qwer.txt dir
```
Revealing the file using `ls` will show `compressed.tar.gz`.  

### Extracting a Compressed tar file
```bash
# create the new location
mkdir untarred

# un-tar the compressed file
tar -xfz compressed.tar.gz -C untarred/
```
Notice that the 3 flags to _tar+compress_ the compressed file are `-cfz` and the 3 flags to _untar+uncompress_ the file are `-xfz`.  
These are nearly identical. the `-c` and the `-x` are exchanged, `-c` for compressing and `-x` for extracting