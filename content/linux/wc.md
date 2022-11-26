---
parentDir: linux
title: Count Words, Lines, and/or bytes with 2 wc
slug: linux/wordcount
author: Jake Laursen
excerpt: 
tags: linux, bash, wc, cli, commands
order: 27
---

# WordCount
per `man wc`,
```bash
wc – word, line, character, and byte count
```

## In action
Take an example text file, here `testfile.txt`:
```text
this is one line.  
This is another line.
This is the third line.
```

```bash
wc testfile.txt
       2      13      65 testfile.txt
```