# connection pooling
Reusing database connections.  
The connection pool is a cache of db connections.  
COULD make a new connection on every request to the db, and destroy the connection when done with each request.  

## Cost of Frequent Connections
- take computing energy
- takes time
- requires a handshake

## Help with Connection pooling
- Default driver makes 100 connection in a connection pool
- poll connections get allocated to a request

NOTES
- Connection pools do not persist when the client is terminated
- Multiple clients can not share a connection pool

**ALWAYS USE CONNECTION POOLING**  

## Always Set Write Timeouts
with majority writes.  
We should always expect outside-application dependencies to take longer than planned.  
When writes are not being acknowledged, gridlock is coming.  
Use `majority`.  

## Always handle server selection timeout errors
`serverSelectionTimeout`  
This helps passively monitor the service.  
The response of a downed server can give info on what happened.  
DEFAULT is 30s.  

## Write with error handling
**Distributed** systems are more prone to network errors.  
**Concurrent** systems are prone to duplicate key errors.  

### Duplicate Key Error Handling
Duplicate Keys happen when trying to add a new doc to a collection with a unique field that already exists.  
Use a catch block to catch the error.
```js
let one = await collectionlinsertOne({
  _id:0, title: 'water'
})

try{
  let two = await collectionlinsertOne({
    _id:0, title: 'melon'
    })
}catch(e){
  console.error(e)
}
```

### Timeout Error Handling
Use a try/catch, again, to catch an error. Forcing an err here with the 1ms wait time...
```js
try{
  let longWait = await collection.insertOne({
    _id: 12,
  },
  {wrimeoutMS: 1})
}
```
Try increasing the wtimeout val.  

## Write Concern Error
When the replica set does not confirm the write, or some other error.  
Write concern errors will output details about why the write concern was not fulfilled.  
Try lowering the write concern value.  

## Principle of Least Privilege  
People and software should only have least privilege needed to get the job done.  

Mongo makes user privileges at the db level.  
Should the app be able to create indexes? Drop DBs?  
Think about what action the app should have!  
