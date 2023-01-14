---
title: The Mongo Config File
slug: mongo/a-config-file
author: Jake Laursen
excerpt: Setting up Mongo using a config file
tags: ["database", "javascript", "blogpost", "overview", "config"]
order: 6
---

# Mongo Config

Here, `mongod` is the main executable. This can have _many_ cli args...

- dbpath
- logpath
- fork
- replSet
- keyFile
- bindPort

## CLI Config Options

- dbpath
  - where the data lives
- logpath
  - where the log files live
- bind_ip
  - can only accept connection on the same host without this
- replSet
- keyFile
  - replSet && keyFile start mongod in replication mode with basic intra-cluster auth security && auth enabled
- sslPEMKey
- sslCAKey
  - for security content
- fork
  - run mongod as a daemon, not tied to a terminal window

## Config File Keys

[some](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) [references](https://docs.mongodb.com/manual/reference/configuration-options/)

```yaml
storage:
  dbPath: '/data/db'
systemLog:
  path: 'data/log/mongod.log'
  destination: 'file' # file-type
net:
  bind_ip: '127.0.0.1, 192.168.0.10'
  ssl:
    mode: 'requireSSL'
    PEMKeyFile: '/etc/ssl/ssl.pem'
    CAFile: '/etc/ssl/SSLCA.pem'
security:
  keyFile: '/data/keyfile'
processManagement:
  fork: true
```

### Using config file in cli

```bash
mongod --config "/etc/mongod.conf" # also the default config file
```
