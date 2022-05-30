---
parentDir: linux
title: Input, Output, Streams, anddata-flow direction with Pipes
slug: linux/streams-pipes
author: Jake Laursen
excerpt: Linux treats input, output and errors as streams
tags: linux, kernel, cli, input, output, streams, pipes
order: 9
---

# Streams
- [Streams](#streams)
  - [CLI Output with stdout](#cli-output-with-stdout)
    - [Piping with 1> to overwrite](#piping-with-1-to-overwrite)
      - [from stdout](#from-stdout)
      - [from cat](#from-cat)
      - [Replaces only](#replaces-only)
    - [Piping with 1>> to add](#piping-with-1-to-add)
  - [Error output with stderr](#error-output-with-stderr)
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