---
parentDir: linux
title: Count Words, Lines, and/or bytes with 2 wc
slug: linux/wordcount
author: Jake Laursen
excerpt: Use this 2-character cli to get some simple counts
tags: ["linux", "bash", "wc", "cli", "commands"]
order: 27
---

# WordCount
per `man wc`,
```bash
wc – word, line, character, and byte count

# ...more...
 The following options are available:

     -c      The number of bytes in each input file is written to the standard output.  This will cancel out any prior usage of the -m option.

     -l      The number of lines in each input file is written to the standard output.

     -m      The number of characters in each input file is written to the standard output.  If the current locale does not support multibyte
             characters, this is equivalent to the -c option.  This will cancel out any prior usage of the -c option.

     -w      The number of words in each input file is written to the standard output.

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

# words
wc -w testfile.txt
      13 testfile.txt

# bytes
wc -m testfile.txt 
      65 testfile.txt

# lines
# HM?!
wc -l testfile.txt 
      2 testfile.txt
```

## Piping
```bash
# note: npm outdated includes a "header", so the number may be 1 greater than the total number of outdated modules
npm outdated | wc -l
      34
```