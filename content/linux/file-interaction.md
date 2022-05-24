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

## Reading Files
### less  
less is used to read files.  
With a linux terminal `pwd` at `/home/ubuntu`, and a text file in the directory (_noted in a previous page_) called something like `newfile.txt` less can be used to read the file with `less newfile.txt`.  

...I don't use less to read files. I usually use `cat` or `tail` depending on the need to read the file. I've heard `less` is a more robust file reader, but for longer reads I usually open a text-editor like vscode. To check out more details on `less` see the help `less --help` or read the manual with `man less`.  

### cat  
`cat` reads the file && prints its contents to the screen.  
`cat newfile.txt` will print the entire newfile.txt to the terminal output.  

### head 

### tail

