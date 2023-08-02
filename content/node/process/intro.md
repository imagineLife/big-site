---
title: Learn Processes and Operating System Interactions
slug: node/process
author: Jake Laursen
excerpt: Standard IO, Process details, and os details
tags: ["node", "stdio", "process", "os", "core", "args", "streams"]
parentDir: node
order: 1
---

# Processes
Node includes the [process](https://nodejs.org/dist/latest-v18.x/docs/api/process.html) object, which contains a bunch of properties and details about the current running process.  

- [Processes](#processes)
  - [Interact with the terminal using stdio](#interact-with-the-terminal-using-stdio)
    - [stdin for process input](#stdin-for-process-input)
    - [A Trivial script to print to stdout](#a-trivial-script-to-print-to-stdout)
    - [Using stdin in a node script](#using-stdin-in-a-node-script)
    - [Putting It All Together](#putting-it-all-together)
  - [Interact With the terminal using stdout](#interact-with-the-terminal-using-stdout)
  - [Determine If A Process Started From The Terminal](#determine-if-a-process-started-from-the-terminal)
  - [Use Bash To Send Output Somewhere Using '\>'](#use-bash-to-send-output-somewhere-using-)
  - [Use Bash To Separate stdout and stderr outputs](#use-bash-to-separate-stdout-and-stderr-outputs)
  - [Parse Command-Line Arguments](#parse-command-line-arguments)
  - [Force A Process to Exit (or quit)](#force-a-process-to-exit-or-quit)
    - [Use exit(1) To Exit With An Error](#use-exit1-to-exit-with-an-error)
    - [Use exitCode To Exit With An Error](#use-exitcode-to-exit-with-an-error)

## Interact with the terminal using stdio
the process object contains a few [streams](/node/streams): stdin, stdout, and stderr.  

### stdin for process input
[process.stdin](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processstdin) can be used to interact with process input.  

### A Trivial script to print to stdout
In most node development use-cases, `process.stdin` means handling process input.  
Take for example, as a start, this command that can be run in [bash](/linux/script-writing/) on a machine that has node installed: `node -e "console.log('this is a string')";`. This uses node to [evaluate](https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#-e---eval-script), with the `-e` flag, the subsequent text of the `console.log` message. Running this will print `this is a string` to the terminal.  

### Using stdin in a node script
The above bash script can be passed to a `|` pipe onto _yet another script_.  Here's a script that will _consume the stdin_ from above:  
```js
// myStdin.js
console.log('inside stdin.js');
process.stdin.on('data', d => {
  console.log(d.toString())
})
```

### Putting It All Together
```bash
node -e "console.log('this is a string');" | node myStdin.js 
inside myStdin.js
this is a string
```

## Interact With the terminal using stdout
The `myStdin.js` file can be adusted to leverage the `process.stdout` stream, which is somewhat like `console.log`:
```js
// myStdin.js
console.log('inside stdin.js');
process.stdin.pipe(process.stdout)
```
This uses the [pipe method](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#readablepipedestination-options) of the stdin readable stream and passes along the writable stream that is `process.stdout`.  

## Determine If A Process Started From The Terminal
Node includes [a detail](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#a-note-on-process-io) that allows us as developers to "check" how a node process was started.   
A node process can be started directly from the command line (terminal) with something like `node <file-name>.js`.  
A node process can be piped to from the terminal with something like `node -e "console.log('this is a string');" | node <file-name>.js`.  
There are also other ways that a node process can be started.  
To determine, in code, whether or not the code was ran from the command-line (terminal), a variable can be used: `process.stdin.isTTY`.  
Let's add a line to the `myStdin.js` file above:  
```js
// myStdin.js file
console.log('inside stdin.js from',process.stdin.isTTY ?'terminal' : 'pipe');
process.stdin.pipe(process.stdout);
```
Now, running the file with `node myStdin.js` will output 
```
inside stdin.js from terminal
``` 
and keep the process "open". Running the file via `node -e "console.log('this is a string');" | node stdin.js ` will output 
```bash
inside stdin.js from pipe 
this is a string
```

## Use Bash To Send Output Somewhere Using '>'
Let's Run the same process as above and include a bit to send the output to a file called `filled-via-bash.txt`:
```bash
node -e "console.log('this is a string');" | node stdin.js > filled-via-bash.txt
```
The new piece is `> filled-via-bash.txt`, which "takes" the "data" from the previous command(s), which will be the text seen [above](#determine-if-a-process-started-from-the-terminal), and "sends" the data to where we write next. In our case, this is a file called `filled-via-bash.txt`.  
Perhaps an interesting detail here is that the file, `filled-via-bash.txt`, doesn't even exist. The file might not NEED to exist, necessarily.

## Use Bash To Separate stdout and stderr outputs
Let's update our trivial toy process to include a stdout via `process.stdout` and a stderr via `console.error`:
```js
// myStdin.js
console.error('inside stdin.js from',process.stdin.isTTY ?'terminal' : 'pipe');
process.stdin.pipe(process.stderr);
```
Now, we can update the line we use to run the process to instruct bash to send error output to a separate location than the stdout:
`node -e "console.log('this is a string');" | node stdin.js > filled-via-bash.txt 2> filled-via-bash-err.txt`. After running that version of the process, which now includes the `2> filled-via-bash-err.txt` detail, there will be two files: one with the `console.log` output and one with the `stderr` output.  

## Parse Command-Line Arguments
Running the `myStdin.js` file, and any js-for-node file for that matter, can also leverage command-line arguments.  
Node [includes a detail](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processargv) for devs to read command-line arguments.  
Let's update the `myStdin.js` file and how it gets run to leverage a command-line argument.  


## Force A Process to Exit (or quit)
Node includes [a detail to exit a process](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processexitcode).  
Let's add this to the `myStdin.js` file so that when the process is run from the command-line, directly, the process does not "hang" and quits after logging:  
```js
// myStdin.js
console.error('inside stdin.js from', process.stdin.isTTY ? 'terminal' : 'pipe');
process.stdin.pipe(process.stderr);
if (process.stdin.isTTY) {
  process.exit();
}
```
This will exit the process when the the process is run from the terminal (_node myStdin.js_) and not via a pipe.

### Use exit(1) To Exit With An Error
The `process.exit` can take a code number as a parameter, with something like `process.exit(1)`.  
Let's update the `myStdin.js` process to exit with code `1` when it is run directly from the cli and not piped to:
```js
// myStdin.js
if (process.stdin.isTTY) {
  console.error('Error: stdin not intended to run from tty');
  process.exit(1);
}
console.log('stdin ran')
process.stdin.pipe(process.stderr);
```
Now, running `node myStdin.js`will print the error text to the terminal output, but `node -e "console.log('this is a string');" | node stdin.js > filled-via-bash.txt 2> filled-via-bash-err.txt` will send content to the two output files ([mentioned above](#use-bash-to-separate-stdout-and-stderr-outputs))

### Use exitCode To Exit With An Error
```js
// myStdin.js
if (process.stdin.isTTY) {
  console.error('Error: stdin not intended to run from tty');
  process.exitCode = 1;
  process.exit();
}
console.log('stdin ran')
process.stdin.pipe(process.stderr);
```