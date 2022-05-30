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
    - [Piping stdout with 1>](#piping-stdout-with-1)
  - [CLI Input with stdin](#cli-input-with-stdin)
## CLI Output with stdout
`stdout` (_standard outputput, standard out_) is where "output" goes. In [NodeJS](https://nodejs.org/dist/latest-v16.x/docs/api/) `console.log()`, which "logs" a statement to the console, goes to the `stdout`.  
```bash
ubuntu@primary:~$ echo "This was written and will go to stdout"
This was written and will go to stdout
```

### Piping stdout with 1>  
`stdout` contents, like the string above, can be redirected, or piped.  
`1>` will redirecto `stdout` to a file.
```bash

ubuntu@primary:~$ echo "this string here" 1> stdout-pipe.txt

ubuntu@primary:~$ cat stdout-pipe.txt
this string here
```

## CLI Input with stdin
