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
Against a running mongo instance,
```bash
use admin
```  
then
```bash
db.adminCommand({"getLog": "global"})
```