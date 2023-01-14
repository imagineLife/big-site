---
title: Logging DB Components
slug: mongo/logging-db-components
author: Jake Laursen
excerpt: A single command to show some logs about a db instance
tags: ["database", "javascript", "blogpost", "overview", "tech"]
order: 4
---

# Logging with Mongo

There are 2 logging parts. The **Process Log** collects activities into messages and 'parts'.

## Process Log Parts

Messages containing details that relate to...

**Access**

- Access Control (_auth, etc_)

**Command**

- db commands

**Control**

- control activities (_init, etc_)

**FTDC**

- diagnostic data collection mechanism

**Geo**

- parsing of geospatial shapes

**Index**

- Indexing operations

**Network**

- Network activities (_accepting connections etc_)

**Query**

- Query details like planning

**REPL**

- replica set details (_initial sync, heartbeats, etc_)

**Rollback**

- Rollback operations

**Sharding**

- sharding operations

**Storage**

- storage operations

**Journal**

- journaling operations

**Write**

- write operations (_update commands, etc_)

## Previewing Log Details

Connect to a mongo instance

```bash
mongo "mongodb+srv://<username>:<password>@<cluster-name>/"
```

Try using a db of your choosing - here this will use the admin db

```bash
use admin
```

Get log components from the db (_this command will show details of the db in "use" from the above command_).  
**This won't always work**

- with a free atlas tier, this is not allowed, and will return an error.
- with a db that has no activity, this will not return anything helpful

```bash
db.getLogComponents()
```

In a free atlas tier where this is not allowed the result may look something like...

```bash
uncaught exception: Error: getLogComponents failed:{
  "ok" : 0,
  "errmsg" : "{
    getParameter: 1, logComponentVerbosity: \"\"} not allowed in this atlas tier",
  "code" : 8000,
  "codeName" : "AtlasError"
} :
\_getErrorWithCode@src/mongo/shell/utils.js:25:13
Mongo.prototype.getLogComponents@src/mongo/shell/mongo.js:163:15
DB.prototype.getLogComponents@src/mongo/shell/db.js:1796:12

```

In a db that has activity and privileges to do this, running `db.getLogComponents()` should return something like the following:

```bash
{
  "verbosity" : 0,
  "accessControl" : {
    "verbosity" : -1
  },
  "command" : {
    "verbosity" : -1
  },
  "control" : {
    "verbosity" : -1
  },
  "executor" : {
    "verbosity" : -1
  },
  "geo" : {
    "verbosity" : -1
  },
  "index" : {
    "verbosity" : -1
  },
  "network" : {
    "verbosity" : -1,
    "asio" : {
      "verbosity" : -1
    },
    "bridge" : {
      "verbosity" : -1
    },
    "connectionPool" : {
      "verbosity" : -1
    }
  },
  "query" : {
    "verbosity" : -1
  },
  "replication" : {
    "verbosity" : -1,
    "election" : {
      "verbosity" : -1
    },
    "heartbeats" : {
      "verbosity" : -1
    },
    "initialSync" : {
      "verbosity" : -1
    },
    "rollback" : {
      "verbosity" : -1
    }
  },
  "sharding" : {
    "verbosity" : -1,
    "rangeDeleter" : {
      "verbosity" : -1
    },
    "shardingCatalogRefresh" : {
      "verbosity" : -1
    },
    "migration" : {
      "verbosity" : -1
    }
  },
  "storage" : {
    "verbosity" : -1,
    "recovery" : {
      "verbosity" : -1
    },
    "journal" : {
      "verbosity" : -1
    }
  },
  "write" : {
    "verbosity" : -1
  },
  "ftdc" : {
    "verbosity" : -1
  },
  "tracking" : {
    "verbosity" : -1
  },
  "transaction" : {
    "verbosity" : -1
  },
  "test" : {
    "verbosity" : -1
  }
}
```

### Log Component Analysis

**verbosity field**  
The verbosity field is a default verbosity level. This field value can be inherited by all other fields.

**log verbosity values**  
Log levels traverse from -1 to 5:

- -1 show inheritance
- 0 is default, info only: helpful for monitoring
- 1-5 means more in-depth details

## Looking at logs

- getLogsDb
- use a utility

### GetLogs command

[mongo docs on the topic](https://docs.mongodb.com/manual/reference/command/getLog/)

Against a running mongo instance,

```bash
use admin
```

then

```bash
db.adminCommand({"getLog": "global"})
```

Here's a snapshot of some example logs.  
**NOTE** that [Starting in MongoDB 4.4, getLog returns log data in escaped Relaxed Extended JSON v2.0 format. Previously, log data was returned as plaintext.
](https://docs.mongodb.com/manual/reference/command/getLog/#mongodb-dbcommand-dbcmd.getLog)

```bash
    	"{\"t\":{\"$date\":\"2021-07-09T10:34:12.822+00:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1625826852:822777][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 45, snapshot max: 45 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}",
    	"{\"t\":{\"$date\":\"2021-07-09T10:35:12.842+00:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1625826912:841997][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 46, snapshot max: 46 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}",
    	"{\"t\":{\"$date\":\"2021-07-09T10:36:12.850+00:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1625826972:850134][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 47, snapshot max: 47 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}",
    	"{\"t\":{\"$date\":\"2021-07-09T10:37:12.863+00:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1625827032:863817][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 48, snapshot max: 48 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}",
    	"{\"t\":{\"$date\":\"2021-07-09T10:38:12.872+00:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1625827092:872345][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 49, snapshot max: 49 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}",
    	"{\"t\":{\"$date\":\"2021-07-09T10:39:12.888+00:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1625827152:888965][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 50, snapshot max: 50 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}",
    	"{\"t\":{\"$date\":\"2021-07-09T10:40:12.900+00:00\"},\"s\":\"I\",  \"c\":\"STORAGE\",  \"id\":22430,   \"ctx\":\"WTCheckpointThread\",\"msg\":\"WiredTiger message\",\"attr\":{\"message\":\"[1625827212:899955][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 51, snapshot max: 51 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)\"}}"
    ],
    "ok" : 1
}
```

Each single log can be formatted with javascript using `JSON.parse` and the output will look like the following:

```bash
{
  t: {
    '\$date': '2021-07-09T10:39:12.888+00:00'
  },
  s: 'I',
  c: 'STORAGE',
  id: 22430,
  ctx: 'WTCheckpointThread',
  msg: 'WiredTiger message',
  attr: {
    message: '[1625827152:888965][1:0xffff99ea9ed0], WT_SESSION.checkpoint: [WT_VERB_CHECKPOINT_PROGRESS] saving checkpoint snapshot min: 50, snapshot max: 50 snapshot count: 0, oldest timestamp: (0, 0) , meta checkpoint timestamp: (0, 0)'
  }
}
```

### Changing Verbosity of a log, the index

```bash
db.setLogLevel(0, "index")
```

Check that the change took

```bash
db.getLogComponents()
```

The output here will be the complete verbosity levels of all logs, but looking at _just the index log component_ shows that the log value is now 0

```bash
"index" : {
  "verbosity" : 0
}
```

### Analyzing a log

With an example log for reference, here are some thoughts on the log details:

```bash
{
  t: { '\$date': '2021-07-09T10:52:53.655+00:00' },
  s: 'I',
  c: 'COMMAND',
  id: 23435,
  ctx: 'conn4',
  msg: 'Successfully set parameter to new value',
  attr: {
    parameterName: 'logComponentVerbosity',
    newValue: '{ index: { verbosity: 0.0 } }',
    oldValue: '{ verbosity: 0, accessControl: { verbosity: -1 }, command: { verbosity: -1 }, control: { verbosity: -1 }, executor: { verbosity: -1 }, geo: { verbosity: -1 }, index: { verbosity: -1 }, network: { verbosity: -1, asio: { verbosity: -1 }, bridge: { verbosity: -1 }, connectionPool: { verbosity: -1 } }, query: { verbosity: -1 }, replication: { verbosity: -1, election: { verbosity: -1 }, heartbeats: { verbosity: -1 }, initialSync: { verbosity: -1 }, rollback: { verbosity: -1 } }, sharding: { verbosity: -1, rangeDeleter: { verbosity: -1 }, shardingCatalogRefresh: { verbosity: -1 }, migration: { verbosity: -1 } }, storage: { verbosity: -1, recovery: { verbosity: -1 }, journal: { verbosity: -1 } }, write: { verbosity: -1 }, ftdc: { verbosity: -1 }, tracking: { verbosity: -1 }, transaction: { verbosity: -1 }, test: { verbosity: -1 } }'
  }
}

```

t - the date of the event
s - severity: has a few options, here they are

- F: fatal
- E: error
- W: warning
- I: Informational
  - this coincides with verbosity level 0
- D - Debug - this coincides with verbosity levels 1-5
  id: - the log id
  c: the category of the logged event: has a few options, here's a few of them...
- ACCESS: access control
- COMMAND: db commands
- CONTROL: things like init
- ELECTION: replica set election
- FTDC
- GEO
- INDEX
  ... there's a bunch more, [check out the mongo docs on this](https://docs.mongodb.com/manual/reference/log-messages/#std-label-log-message-field-types)
