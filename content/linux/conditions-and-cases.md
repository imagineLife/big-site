---
parentDir: linux
title: Conditions And Cases
slug: linux/conditions-and-cases
author: Jake Laursen
excerpt: More on Conditional Logic and Case Statements
tags: linux, bash, scripts, conditions, cases
order: 21
---

# More on Conditions
A brief intro into bash conditional details are covered in the [more-scripts](/more-scripts) page. Here is some more on making bash do conditional logic.    

- [More on Conditions](#more-on-conditions)
  - [Conditions and Test](#conditions-and-test)
    - [Testing That a String has a length](#testing-that-a-string-has-a-length)

## Conditions and Test
`test`, according to `man test` says...
```bash
SYNOPSIS
       test EXPRESSION
       test
       [ EXPRESSION ]
       [ ]
       [ OPTION

DESCRIPTION
       Exit with the status determined by EXPRESSION.
```
The result here is an exit code based on an expression.

### Testing That a String has a length
A `-z` flag can be added to the `test` command that tells test to check if a string has a length that is not zero:
```bash
ubuntu@primary:~$ test -z ""
ubuntu@primary:~$ echo $?
0
ubuntu@primary:~$ test -z "asdf"
ubuntu@primary:~$ echo $?
1
```