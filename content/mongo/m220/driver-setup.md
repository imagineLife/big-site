# npm module notes
Create a connection object.  
Create a `Database Handle` by initializing the db(s) of interest.  


```js
let dbConnection;
let connectionOpts = {useNewUrlParser: true}
let DB_VAR = 'mflix'
let URI_VAL = 'mongodb+srv://stringhere'
try{
  // create the connection object
  dbConnection
 = await MongoClient.connect(URI_VAR,connectionOpts)

//  Connect to specific db 
// a DB Handle
const db = dbConnection.db(DB_VAR)

}catch(e){
  console.error(e)
}finally{
  // do something with the client
}
```

## Async And Node Driver
- the driver returns promises or callbacks

## basic reads
### Use the next method
`.next`  
```js
// get a query
let dbRes = await movies.find({cast: {$all: [/Hayek/, /Depp/]}})
expect(dbRes).not.toBeNull();

// .next in action
let { title, year, cast } = dbRes.next()

/*
  the dbRes, above, returns a cursor object containing
  - a readableStream (with many keys)
  - _events, _eventsCount, _maxListeners, operation,
*/
```

### projection
Projection is a little syntactically different in the mongo npm module
```js
cursor = await movies.find(
  {countries: {$in : [...countries]}},
  {projection: {title:1}}
)

// NOTICE the {projection: vals}
// in the mongo cli for mongo, the projection is JUST the val obj
```

### Notes on write concerns and durability
explicitly naming which fields get written to increases reliability in data-writing.
```js
// DEFAULT: concerned with 1 node
{writeConcern: {w:1}}

/*
  Get confirmation from majority of nodes
  - takes a little longer
  - no additional load on the server
  - guarantees the client that no rollbacks on failure
    - ex. new user on a website is CRITICAL
*/ 
{writeConcern: {w:'majority'}}

/*
  none of the nodes even need to APPLY the write before responding to request
  - "FIRE AND FORGET"
  - the acknowledgement CAN still contain data about network
  - FAST
  - less durable
*/
{writeConcern: {w:0}}

```
