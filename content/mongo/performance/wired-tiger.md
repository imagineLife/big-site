# A Bit About Wired Tiger

Wired Tiger is the `default storage engine` since Mongo v3.2.

## Config a different storage enging

```bash
# through the cli
--storageEngine

# through a config file
storage.engine
```

## Concurrent Document Writes

WiredTiger leverages `document-level concurrency`.  
This means multiple clients can edit _different documents within the same collection at the same time._
