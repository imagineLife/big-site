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