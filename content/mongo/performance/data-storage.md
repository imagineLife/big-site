# Storage Engines 
Storage engines write data using storage engines: MMAPv1, Wired Tiger or other.  

There are data-management objects:
- **dbs**, logical groups of collections
- collections, operational units grouping docs together
- indexes on collections, on fields in docs
- documents, atomic units of info, fields & values

## dbpath content
Mongodb stores a bunch of docs on startup.  
**_mdb_catalog.wt**  
Contains catalogue of collections & indexes that a particular mongod contains.  
**indexes**  
For each index, a new file exists.  

can add a cli flag to change data storage 
```bash
mongod --dbpath /my/db/path --logpath /my-db/logpath/mongodb.log --directoryperdb
```
Notice the `--directoryperdb` flag.  
