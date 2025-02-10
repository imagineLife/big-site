---
title: Learn about evaluating & printing code from the CLI with node
slug: node/using-the-cli/code-evaluation
parentDir: node/using-the-cli
author: Jake Laursen
excerpt: Use the CLI to handle, evaluate, and run a program
tags: ['NodeJS', 'Terminal', 'cmd']
order: 2
---

# Evaluating Code

The`-e` or `--evaluate` flag can be used to check code.

```bash
node --eval "2 * 4"
# this will show no output


node -e "console.log(14+7)"
# 21

```

## Print Rather Than Evaluate

```bash
node --print "4 * 5"
# 20

node -p "console.log(3 * 7)"
# 21
# undefined
```

- `-p` prints undefined after the console.log because the console.log does not return anything other than _undefined_

## Importing node modules

- node "modules" come with the library/binary (_fs, http, etc_)
- these modules can be required directly from cmd input
- **this can be useful because the core node modules are cross-platform!!**

### using the print flag with modules

```bash
node -p "Object.keys(require('fs'))"

# will return...
[
  'appendFile',       'appendFileSync',    'access',
  'accessSync',       'chown',             'chownSync',
  'chmod',            'chmodSync',         'close',
  'closeSync',        'copyFile',          'copyFileSync',
  'createReadStream', 'createWriteStream', 'exists',
  'existsSync',       'fchown',            'fchownSync',
  'fchmod',           'fchmodSync',        'fdatasync',
  'fdatasyncSync',    'fstat',             'fstatSync',
  'fsync',            'fsyncSync',         'ftruncate',
  'ftruncateSync',    'futimes',           'futimesSync',
  'lchown',           'lchownSync',        'lchmod',
  'lchmodSync',       'link',              'linkSync',
  'lstat',            'lstatSync',         'lutimes',
  'lutimesSync',      'mkdir',             'mkdirSync',
  'mkdtemp',          'mkdtempSync',       'open',
  'openSync',         'opendir',           'opendirSync',
  'readdir',          'readdirSync',       'read',
  'readSync',         'readv',             'readvSync',
  'readFile',         'readFileSync',      'readlink',
  'readlinkSync',     'realpath',          'realpathSync',
  'rename',           'renameSync',        'rm',
  'rmSync',           'rmdir',             'rmdirSync',
  'stat',             'statSync',          'symlink',
  'symlinkSync',      'truncate',          'truncateSync',
  'unwatchFile',      'unlink',            'unlinkSync',
  'utimes',           'utimesSync',        'watch',
  'watchFile',        'writeFile',         'writeFileSync',
  'write',            'writeSync',         'writev',
  'writevSync',       'Dir',               'Dirent',
  'Stats',            'ReadStream',        'WriteStream',
  'FileReadStream',   'FileWriteStream',   '_toUnixTimestamp',
  'F_OK',             'R_OK',              'W_OK',
  'X_OK',             'constants',         'promises'
]
```
