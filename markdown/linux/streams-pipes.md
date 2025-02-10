---
parentDir: linux
title: Input, Output, Streams, anddata-flow direction with Pipes
slug: linux/streams-pipes
shortSlug: streams-pipes
author: Jake Laursen
excerpt: Linux treats input, output and errors as streams
tags: ["linux", "kernel", "cli", "input", "output", "streams", "pipes"]
order: 9
---

# Streams
- [Streams](#streams)
  - [CLI Output with stdout](#cli-output-with-stdout)
    - [Piping with 1\> to overwrite](#piping-with-1-to-overwrite)
      - [from stdout](#from-stdout)
      - [from cat](#from-cat)
      - [Replaces only](#replaces-only)
    - [Piping with 1\>\> to add](#piping-with-1-to-add)
  - [Error output with stderr](#error-output-with-stderr)
    - [Piping errors with 2\>\> to add](#piping-errors-with-2-to-add)
  - [Multiple outputs with Multiple Commands](#multiple-outputs-with-multiple-commands)
  - [Directing contents to a program with stdin](#directing-contents-to-a-program-with-stdin)
- [Pipes](#pipes)
  - [pass cat to grep](#pass-cat-to-grep)
  - [pass ps to grep](#pass-ps-to-grep)
## CLI Output with stdout
`stdout` (_standard outputput, standard out_) is where "output" goes. In [NodeJS](https://nodejs.org/dist/latest-v16.x/docs/api/) `console.log()`, which "logs" a statement to the console, goes to the `stdout`.  
```bash
ubuntu@primary:~$ echo "This was written and will go to stdout"
This was written and will go to stdout
```

### Piping with 1> to overwrite
#### from stdout
`stdout` contents, like the string above, can be redirected, or piped.  
`1>` will redirecto `stdout` to a file.
```bash

ubuntu@primary:~$ echo "this string here" 1> stdout-pipe.txt

ubuntu@primary:~$ cat stdout-pipe.txt
this string here
```

#### from cat
`cat` can take a file content an con`cat`enate it to `stdout`.  
`>` can take the file content, from `cat`, and pipe the content to another file -  

```bash
ubuntu@primary:~$ cat stdout-pipe.txt 1> qwer.txt

ubuntu@primary:~$ cat qwer.txt
this string here
```
The `this string here` was cloned from `stdout-pipe.txt` into `qwer.txt`.  

#### Replaces only
`1>` replaces/overwriters contents of a file and does not add to an existing file:
```bash
# write to zxcv.txt
ubuntu@primary:~$ echo "poiuy poiuy" 1> zxcv.txt
ubuntu@primary:~$ cat zxcv.txt 
poiuy poiuy

# run same command on same file with different contents
ubuntu@primary:~$ echo "lkjhg lkjhg" 1> zxcv.txt
ubuntu@primary:~$ cat zxcv.txt 
lkjhg lkjhg
```  

### Piping with 1>> to add
`1>>` will _append_ to a file rather than overwriting contents like `1>`.  

```bash
# write to poiu.txt
ubuntu@primary:~$ echo "new string of text here" 1>> poiu.txt
ubuntu@primary:~$ cat poiu.txt 
new string of text here

# run same command on same file with different contents
ubuntu@primary:~$ echo "second string of text here" 1>> poiu.txt
ubuntu@primary:~$ cat poiu.txt 
new string of text here
second string of text here
```

## Error output with stderr
`2>` can deal with `stderr` in the same way that `1>` deals with `stdout`.  
`stderr` is where error info goes.  


```bash
# this produces an error
ubuntu@primary:~$ cat fake-file.txt
cat: fake-file.txt: No such file or directory
# the above line is the error output describing the error

# pipe the err message to an errors.txt file
ubuntu@primary:~$ cat fake-file.txt 2> errors.txt

# prove it
ubuntu@primary:~$ cat errors.txt 
cat: fake-file.txt: No such file or directory
```

### Piping errors with 2>> to add
```bash

# get the date
ubuntu@primary:~$ date
Mon May 30 05:00:12 EDT 1492

# store the date in a var "D"
ubuntu@primary:~$ D=$(date)

# use that, and concat an err to the error text file
ubuntu@primary:~$ cat "$D: fake-file.txt" 2>> errors.txt

# see the output
ubuntu@primary:~$ cat errors.txt 
cat: fake-file.txt: No such file or directory
cat: 'Mon May 30 09:31:24 EDT 2022: fake-file.txt': No such file or directory

```


## Multiple outputs with Multiple Commands
`1>` for stdout and `2>` for stderr can be combined in a single command:  

```bash
ubuntu@primary:~$ ls -lsah `> stdout.txt 2> stderr.txt
```  

## Directing contents to a program with stdin  
`<` can be used to pipe contents TO a program.  
This is sort-of like a reverse from the previous commands.  
The previous commands can take output from one command, something like `cat file.txt`, and pipe to an output.  

```bash
# a trivial example
# passing errors.txt to the "cat" command
ubuntu@primary:~$ cat < errors.txt

# another, grepping for a specific string
ubuntu@primary:~$ grep "Mon May 30" < errors.txt
cat: 'Mon May 30 09:31:24 EDT 2022: fake-file.txt': No such file or directory
```

A complex example:
```bash
grep "Mon May 30" < errors.txt < ls.txt 1> ls2.txt 2> /dev/null
```


# Pipes
Pipes, compared to streams, pass _programs_ to one another, not just data.  

## pass cat to grep
```bash
cat ls.txt | grep "errors.txt"
```
- `cat` the `ls.txt` file
- `pipe` the outputs from the cat TO `grep`
- `grep` the output from the `cat` command


## pass ps to grep
```bash
ps aux | grep "ps aux"
```
- run `ps aux`: `ps` is "process status", listing currently running processes  && some info about them
- `pipe` the output from the `ps` command to the next command, `grep`
- `grep` the output for the "ps aux" string