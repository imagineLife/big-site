---
parentDir: linux
title: Doing More With Bash
slug: linux/more-scripts
author: Jake Laursen
excerpt: Conditional logic, collecting variable input, and more
tags: ["linux", "bash", "scripts", "variables"]
order: 20
---

# Beefing Up Bash Programs
Bash programs (_scripts_) can be "flexible".  
**A common "problem"** with this type of code is its static content. In order to do something _subtly different_, a "copy-paste-edit" appraoch is overly common.  

As a review of a simple bash program, here's an example stored in `~/bin/file-creator`:  

```bash
#! /bin/bash

# make and enter a new dir
mkdir -p ~/script-created
cd ~/script-created

# create 10 files *.txt
touch file{1..10}.txt

# back out & notify
cd ..
echo "done creating files in script-created"
```


- [Beefing Up Bash Programs](#beefing-up-bash-programs)
  - [Add Flexibility through Reading Parameters](#add-flexibility-through-reading-parameters)
    - [Prompt for User Input with the Prompt Flag](#prompt-for-user-input-with-the-prompt-flag)
    - [Making File-Names Flexible through Reading Parameters](#making-file-names-flexible-through-reading-parameters)
  - [Adding Defaults](#adding-defaults)
  - [Collecting User Input at Start](#collecting-user-input-at-start)
  - [Conditionally set a Default Directory with If](#conditionally-set-a-default-directory-with-if)
    - [If Syntax](#if-syntax)
## Add Flexibility through Reading Parameters
`read` is a program that takes "user input" parameters: `read` will wait till you, the person in from of the terminal in this case, enter something _after running a program_. Then, read will "use" the input you've entered in the rest of the program. 

Here's a 1-line program that uses `read`:
```bash
# the program
ubuntu@primary:~$ echo "here's a program, write a person you'd like to say hello to!" && read person && echo "hello "$person
here's a program, write a person you'd like to say hello to!

# terminal "waits" for some input by you!
# write a name, press enter
george

# returns...
hello george
```
This program...
- has a one-line "explanation of itself (_here's a program...._)
- waits for some input from you with `read`
- prints a string with the value you entered

### Prompt for User Input with the Prompt Flag  
With one flag, the above program can use a proper "prompt" flag to promt the user for input. Also, instead of `echo` this is using another similar command `printf`:
```bash
# the program
ubuntu@primary:~$ read -p "here's a program, write a person you'd like to say hello to: " person && printf "\nhello "$person
here's a program, write a person you'd like to say hello to: frank

hello frankubuntu@primary:~$ 
```

### Making File-Names Flexible through Reading Parameters
This `file-creator` program can be updated with `read` to take some params and make the program more flexible:  

```bash
ubuntu@primary:~$ cat ~/bin/file-creator

#! /bin/bash
mkdir -p ~/script-created
cd ~/script-created
touch file{1..10}.txt
cd ..
echo "done creating files in script-created"
```

Lets set the filenames to be based on a prompted user-input variable with `read`:
```bash
#! /bin/bash

read -p "enter a file-name prefix for your new files: " FILENAME_PREFIX

mkdir -p ~/script-created
cd ~/script-created
touch ${FILENAME_PREFIX}{1..10}.txt
cd ..
echo "done creating files in script-created"
```

Try it out - here's I'll prefix each file with "horse":  
```bash
ubuntu@primary:~$ file-creator 
enter a file-name prefix for your new files: horse
done creating files in script-created

ubuntu@primary:~$ ls ~/script-created/
horse1.txt   horse2.txt  horse4.txt  horse6.txt  horse8.txt
horse10.txt  horse3.txt  horse5.txt  horse7.txt  horse9.txt
```
## Adding Defaults
Perhaps a "default" value is required when creating a file, in our example. If/when the user does NOT enter a file-name prefix but you want your `file-creator` program to _use a default file-prefix name_, that is do-able.    
Lets update the above script again:  
```bash
#! /bin/bash

read -p "enter a file-name prefix for your new files: " FILENAME_PREFIX

F_OR_THIS="${FILENAME_PREFIX:-default}"

mkdir -p ~/script-created
cd ~/script-created

touch ${F_OR_THIS}{1..10}.txt

cd ..
echo "done creating files in script-created"
```
When setting a default here
- get the user input in a var called `FILENAME_PREFIX`
- create a new var called `F_OR_THIS`
- set the value of `F_OR_THIS` to either the user input OR `default`

Running this with no user input will add a bunch of files with new `default` names:
```bash
ubuntu@primary:~$ ls ~/script-created/
default1.txt   default2.txt  default4.txt  default6.txt  default8.txt
default10.txt  default3.txt  default5.txt  default7.txt  default9.txt
```

## Collecting User Input at Start
In the above example, the `read` program is used _during the program_ to collect user input to affect what the program does.  
User input can also be collected at the same time of "calling" or running the program, like `file-creator this-dir` could be used to name the directory where the new files go.  
In the `file-creator` file, the "hard-coded" destination directory of `script-created` will be replaced with a variable. User-Input "arguments" of a program are referenced by the order they are entered, referenced by number, starting with 1, as `$1`, `$2`, etc.  

Here's the adjusted `file-creator` file:  
```bash
#! /bin/bash

DEST=$1

read -p "enter a file-name prefix for your new files: " FILENAME_PREFIX
F_OR_THIS="${FILENAME_PREFIX:-default}"

mkdir -p ~/$DEST
cd ~/$DEST

touch ${F_OR_THIS}{1..10}.txt

cd ..
echo "done creating files in ~/${DEST}"
```

give that a run-through:
```bash
ubuntu@primary:~$ file-creator custom-dir
enter a file-name prefix for your new files: qwer
done creating files in ~/custom-dir

ubuntu@primary:~$ ls ~/custom-dir/
qwer1.txt   qwer2.txt  qwer4.txt  qwer6.txt  qwer8.txt
qwer10.txt  qwer3.txt  qwer5.txt  qwer7.txt  qwer9.txt
```

## Conditionally set a Default Directory with If
Perhaps the user of the program, you in this moment, does not provide a directory to store the new files.  
Bash can be used to help simplify this by looking for user input and running a _condition_, where `if the user did not give a value` for the directory path, the bash program will use something we tell it to - lets call it `new-dir`.  
### If Syntax
```bash
# if not there
if [ -z $THE_VALUE_HERE ]; then
  echo "do something here"
fi
```
- `if` starts the conditional logic
- `[];` is where the conditional "test" lives, the meat of the condition
- `-z` is a zero-length string (_not there in our case_)
- `then` leaves room for what the program should do when the if condition is true
- `fi` finishes the if condition and what-to-do when the `if [];` condition is true: everything after the `fi` runs regardless of the `if [];` condition truthyness

Here, the creat-file program will be adjusted to conditionally set a default destination directory:
```bash
#! /bin/bash

DEST=$1

read -p "enter a file-name prefix for your new files: " FILENAME_PREFIX

if [ -z $DEST ]; then
  echo "no destination dir provided, defaulting to new-files"
fi

F_OR_THIS="${FILENAME_PREFIX:-default}"
mkdir -p ~/$DEST
cd ~/$DEST
touch ${F_OR_THIS}{1..10}.txt
cd ..
echo "done creating files in ~/${DEST}"
```