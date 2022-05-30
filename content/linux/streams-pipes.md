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
    - [Piping with 1>](#piping-with-1)
      - [from stdout](#from-stdout)
      - [from cat](#from-cat)
      - [Replaces only](#replaces-only)
  - [CLI Input with stdin](#cli-input-with-stdin)
## CLI Output with stdout
`stdout` (_standard outputput, standard out_) is where "output" goes. In [NodeJS](https://nodejs.org/dist/latest-v16.x/docs/api/) `console.log()`, which "logs" a statement to the console, goes to the `stdout`.  
```bash
ubuntu@primary:~$ echo "This was written and will go to stdout"
This was written and will go to stdout
```

### Piping with 1>  
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

## CLI Input with stdin
