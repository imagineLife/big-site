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
    - [Testing that 2 numbers equal](#testing-that-2-numbers-equal)
    - [Test that 2 Strings are Equal](#test-that-2-strings-are-equal)

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
# test wont print the output - here's a 2-line approach:
ubuntu@primary:~$ test -z ""
ubuntu@primary:~$ echo $?
0
ubuntu@primary:~$ test -z "asdf"
ubuntu@primary:~$ echo $?
1

# here's a one-line approach
ubuntu@primary:~$ test -z ""; echo $?
0
ubuntu@primary:~$ test -z "water"; echo $?
1
```

### Testing that 2 numbers equal
```bash
ubuntu@primary:~$ test 15 -eq 2 ; echo $?
1
ubuntu@primary:~$ test 15 -eq 15 ; echo $?
0
```

### Test that 2 Strings are Equal
```bash
ubuntu@primary:~$ test horse = horse; echo $?
0
ubuntu@primary:~$ test horse = dog; echo $?
1
```