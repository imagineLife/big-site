---
parentDir: linux
title: CLI Tools
slug: linux/cli-tools
author: Jake Laursen
excerpt: Using Wildcards and Expansions for shorthand processing
tags: ["linux", "kernel", "cli"]
order: 8
---

# Linux CLI Shorthand Commands
- [Linux CLI Shorthand Commands](#linux-cli-shorthand-commands)
  - [Wildcards](#wildcards)
    - [Finding Any Character matches with The Asterisk](#finding-any-character-matches-with-the-asterisk)
    - [Finding Specific Count on Character Matches with the Question Mark](#finding-specific-count-on-character-matches-with-the-question-mark)
  - [Creating Many Things with Curly Braces](#creating-many-things-with-curly-braces)
    - [Duplication](#duplication)
    - [Nested Duplication](#nested-duplication)
    - [Spread Syntax Duplication](#spread-syntax-duplication)
## Wildcards
Wildcards are special characters that linux uses to "replace" a wildcard character with....anything...?!  
To start messing with wildcards, create a few files in the current directory -
```bash
touch abcd.txt abce.txt abcf.txt abcg.txt abch.txt abcdd.txt abcee.txt
```


### Finding Any Character matches with The Asterisk
Asterisk `*` are used to find characters that appear 0-or-more times.  
Considering the above files, this wildcard will find _all files_:

```bash  
# ls on all files that start with 'abc' and end with '.txt'
ubuntu@primary:~$ ls abc*.txt

# should return 7 file names
abcd.txt  abcdd.txt  abce.txt  abcee.txt  abcf.txt  abcg.txt  abch.txt
```
### Finding Specific Count on Character Matches with the Question Mark
Question marks `?` are used to find characters that appear 1x per question mark.  

```bash  
# ls on all files that start with 'abc' and end with '.txt'
# where ONLY ONE CHARACTER is after the 'c' and before the '.'
ubuntu@primary:~$ ls abc?.txt

# should return 5 filenames
abcd.txt  abce.txt  abcf.txt  abcg.txt  abch.txt
```  

## Creating Many Things with Curly Braces
### Duplication
```bash
ubuntu@primary:~$ echo this-{one,two,three,four}

#...should return
this-one this-two this-three this-four


# can be useful for something like "bulk" file creation
ubuntu@primary:~$ touch Dockerfile.{dev.,qa.,}yaml

# should return...
Dockerfile.dev.yaml  Dockerfile.qa.yaml  Dockerfile.yaml

# or something like
ubuntu@primary:~$ touch index{.scss,.js,.test.js}
# see the results
ubuntu@primary:~$ ls index*
# should return...
index.js  index.scss  index.test.js

```

### Nested Duplication
```bash
ubuntu@primary:~$ touch Dockerfile.{dev{.blue,.green}.,qa{.blue,.green}.,}yaml

ubuntu@primary:~$ ls 
# should show...
Dockerfile.dev.blue.yaml   Dockerfile.qa.blue.yaml   Dockerfile.yaml
Dockerfile.dev.green.yaml  Dockerfile.qa.green.yaml
```

### Spread Syntax Duplication
For those more familiar with javascript spread, `{...val}`,  
the bash spread has 2 dots instead of 3 dots AND fills in values from the first-to-last spread elements
```bash
ubuntu@primary:~$ echo Dockerfile.{A..D}.yml
# should return 
Dockerfile.A.yml Dockerfile.B.yml Dockerfile.C.yml Dockerfile.D.yml

ubuntu@primary:~$ echo Dockerfile.{5..12}.yml
# should return
Dockerfile.5.yml Dockerfile.6.yml Dockerfile.7.yml Dockerfile.8.yml Dockerfile.9.yml Dockerfile.10.yml Dockerfile.11.yml Dockerfile.12.yml
```