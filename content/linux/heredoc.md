---
parentDir: linux
title: Use Multi-Line Text Blocks in combination with other commands using heredoc
slug: linux/heredoc
author: Jake Laursen
excerpt: Need A Text Block To
tags: linux, bash, command, heredoc, text, redirect
order: 23
---

## Sending A code-block to a command
An Example...
```bash
# dummy variable for illustration
$ thisVar="made this var in bash"

# Command: cat
# code block: 2-lines, 1 using a variable!
cat <<EOF
this is a dummy text block.
$thisVar
EOF
```

## Using a loop to do some math
```bash
for num in $(seq 1 6)
do 
cat <<EOF
MATH
---
12 * $num = $((12 * $num))
--- --- ---
EOF
done
```
The above will return:
```bash
MATH
---
12 * 1 = 12
--- --- ---
MATH
---
12 * 2 = 24
--- --- ---
MATH
---
12 * 3 = 36
--- --- ---
MATH
---
12 * 4 = 48
--- --- ---
MATH
---
12 * 5 = 60
--- --- ---
MATH
---
12 * 6 = 72
--- --- ---
```