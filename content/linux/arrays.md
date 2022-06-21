---
parentDir: linux
title: Arrays and Loops
slug: linux/arrays
author: Jake Laursen
excerpt: arrays and looping through items
tags: linux, bash, arrays, loops, lists
order: 22
---

# Arrays

## intro
An array is a list of items.  
Make a file `friends.sh`
```bash
#!/bin/bash

# the array
hobbies=(coding reading learning writing "hanging with dena")

# get itme by 0-based-index
echo My third hobby is ${hobbies[2]}

# loop with for-in
for h in ${hobbies[*]}
  do
	  echo hobby: $h
  done
  
echo "I have ${#hobbies[*]} hobbies"
```
Run the file with `. friends.sh`  

## A While Loop
make a file `guess-it.sh`:
```bash
# let syntax
# let "NUM_TO_GUESS = ${RANDOM} % 10 + 1"
# shorthand, note the $(())
# NUM_TO_GUESS=$(( $RANDOM % 10 + 1 ))
NUM_TO_GUESS=$(( $RANDOM % 10 + 1 ))
GUESSED_NUM=0

echo "guess a number between 1 and 10"

while [ $NUM_TO_GUESS -ne $GUESSED_NUM ]
do
  read -p "your guess: " GUESSED_NUM
done

echo "you got it!"
```

run it like this...
```bash
ubuntu@primary:~$ . guess-it.sh 
guess a number between 1 and 10
your guess: 3
your guess: 8
your guess: 2
you got it!
```