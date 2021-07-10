# Tooling
Overview
- mongodump
- mongos
- mongoldap
- mongorestore 
- mogoexport
- mongostat
- mongoperf
- mongofiles
- mongod
- mongodecrypt
- mongo
- mongotop
- mongoimport

## Focusing on a few
- mongostat
- mongodump
- mongorestore
- mongoexport
- mongoimport

### Mongostat
Gives stats on a running mongod or mongos process
where mongod is running, from a terminal run the following
```bash
mongostat --port 27017 -u=myadmin -p=myrootpw --authenticationDatabase=admin
```
the output may look similar to
```bash
insert query update delete getmore command dirty used flushes vsize res qrw arw net_in net_out conn time
*0 *0 *0 *0 0 0|0 0.0% 0.0% 0 1.44G 97.0M 0|0 1|0 111b 42.0k 3 Jul 10 13:18:11.502
*0 *0 *0 *0 0 1|0 0.0% 0.0% 0 1.44G 97.0M 0|0 1|0 112b 42.6k 3 Jul 10 13:18:12.495
*0 *0 *0 *0 0 0|0 0.0% 0.0% 0 1.44G 97.0M 0|0 1|0 110b 41.9k 3 Jul 10 13:18:13.505
*0 *0 *0 *0 0 1|0 0.0% 0.0% 0 1.44G 97.0M 0|0 1|0 112b 42.6k 3 Jul 10 13:18:14.497
*0 *0 *0 *0 0 0|0 0.0% 0.0% 0 1.44G 97.0M 0|0 1|0 111b 41.9k 3 Jul 10 13:18:15.506
```
#### mongostat output overview
Mongo stat output can be broken into sections. The first (6) handful of fields are about operations-per-seconds. The next fields are about memory stats: dirty bites in cache, used bytes in cache, vmem used by process, redient mem by the process, etc. Net covers network traffic a bit.

### mongorestore, mongodump
#### mongodump
exports data as jsonb format
```bash
mongodump --port 12017 -u "myadmin" -p "myrootpw" --authenticationDatabase "admin" --db dbnamehere --collection collectionnamehere
```
running mongodump from a mongo atlas cluster can be done with
```bash
mongodump --uri mongodb+srv://<USERNAME>:<PASSWORD>@sandbox.complexurl.mongodb.net/<DATABASE>
```
**Inspecting the output**  
mongodump will store the output in a `dump` directory.  
The output contains 3 files:
- a **bson file**, which is the bson data
- a **metadata json file**, which describes the collection that was dumped

#### mongorestore
```bash
# on an authenticated db
mongorestore --drop --port 12017 -u "usernameHere" -p "pwHere" --authenticationDatabase "admin" dump/
```
NOTE: the drop flag will drop the collection && replace it with the jsonb that is being restored


### mongoexport, mongoimport
#### mongoexport
exporting from an authentication db
**To stdout**
```bash
mongoexport --port 12017 -u "usernameHere" -p "pwHere" --authenticationDatabase "admin" --db dbnamehere --collection collectionnamehere
```

**To a file**
```bash
mongoexport --port 12017 -u "usernameHere" -p "pwHere" --authenticationDatabase "admin" --db dbnamehere --collection collectionnamehere -o exportFileName.json
```
**Note** the `-o` flag, for the `output`. This creates a json representation of the mongo collection. 

#### mongoimport
```bash
mongoimport --drop --port 12017 -u "usernameHere" -p "pwHere" --authenticationDatabase "admin" jsonDataFileName.json
```
**NOTE** the import didnt `know` where to put the data. mongoimport defaults to db named `test` && the name of the json file `jsonDataFileName` becomes the collection name.  