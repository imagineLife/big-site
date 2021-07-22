# mongo and js
- Create db connections
- SHare db connections to servers
- write data with multiple levels of durability
- handle errors from the `mongodb` driver (_node_module_)
- develop a backend app using mongo
- MERN stack

## The URI
Uniform Resource Identifier.  
Defines connections between apps && Mongodb instances.  

The `srv` string tidbit tells mongo it is the address of the `srv` record.  
`mongodb+srv://<username>:<pw>@<host>/<database>`  

The host is the hostname of the srv record. The host only holds the srv records, not the hosts of the actual databases.

`mongodb+srv://<username>:<pw>@<host>/<database>?retryWrites=true` - retry on connection error

m220student
m220password

## Some User-Facing Goals
- setup the mongo driver to connect to the db
- write data to mongoDB
  - different write-durability
- app funcitonality
  - join site
  - update prefs
  - add/edit reviews
  - read about movies
  - create a community on the site

### Review of cursor methods and agg pipelines
can do cursor methods in an agg pipeline. Converting cursor methods to agg pipeline stages moves energy/calculation logic from our api to the db.  

```js
/*
  cursors can
  - sort, .sort()
  - skip, .skip()
  - limit, .limit() : here, won't limit in the pipe

*/
const aPipeline = [
  {$match: {directors: "Sam Raimi"}},
  {$project: {_id:0, title:1, cast:1 }},
  {$sort: {year: 1}},
  {$skip: 5}
]
```
