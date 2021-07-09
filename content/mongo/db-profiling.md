# Db Profiling
A Profiler can be enabled on dbs. This profiler provides different insights than a log file contents. The profile stores operational data in a collection called `system.profile`. The profiler is default to level 0.  

The profiler stores 3 types of events:
- CRUD
- Admin ops
- Config Ops

The profiler has 3 level settings:
- 0: off
- 1: on, collects "slow" data, default to $gte 100ms
- 2: on, collects ALL data: _can generate a bunch of load on the system_  

## Setting up the profiler on a db
```bash
use whateverDB

# will return 0, the default profiling level - no profiling data will be stored
db.getProfilingLevel() 

# start recording "slow" data
db.setProfilingLevel(1) 
# the above line will return
# { "was":0, "slowms": 100, "sampleRate":1, "ok":1 }

#see the new profiling collection
show collections
```

### Getting a log into the profiler
```bash
#decrease the slowMS
db.setProfilingLevel(1, {"slowms": 0})

# insert a small doc, triggering the profile to capture some data
db.whatever_collection.insert({"small":"object"})

# should return 
# WriteResult({ "nInserted" : 1 })

#inspect the profiler collection
db.system.profile.find().pretty()
```

an example profiler message for inserting `{"a": "obj"}` into a collection:
```bash
{
  "op" : "insert",
  "ns" : "mockdb.mock_collection",
  "command" : {
    "insert" : "mock_collection",
    "ordered" : true,
    "lsid" : {
      "id" : UUID("9e761354-71e9-49d8-a85c-4156aa46bb16")
    },
    "$db" : "mockdb"
  },
  "ninserted" : 1,
  "keysInserted" : 1,
  "numYield" : 0,
  "locks" : {
    "ParallelBatchWriterMode" : {
      "acquireCount" : {
        "r" : NumberLong(1)
      }
    },
    "ReplicationStateTransition" : {
      "acquireCount" : {
        "w" : NumberLong(2)
      }
    },
    "Global" : {
      "acquireCount" : {
        "r" : NumberLong(1),
        "w" : NumberLong(1)
      }
    },
    "Database" : {
      "acquireCount" : {
        "w" : NumberLong(1)
      }
    },
    "Collection" : {
      "acquireCount" : {
        "w" : NumberLong(1)
      }
    },
    "Mutex" : {
      "acquireCount" : {
        "r" : NumberLong(1)
      }
    }
  },
  "flowControl" : {
    "acquireCount" : NumberLong(1),
    "timeAcquiringMicros" : NumberLong(3)
  },
  "storage" : {
  },
  "responseLength" : 45,
  "protocol" : "op_msg",
  "millis" : 0,
  "ts" : ISODate("2021-07-09T11:30:04.216Z"),
  "client" : "127.0.0.1",
  "appName" : "MongoDB Shell",
  "allUsers" : [ ],
  "user" : ""
}
```