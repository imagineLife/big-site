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
## Updating
updateOne, updateMany, upsert 
### updateOne
- will only update 1 doc via a query: if multiple objects match the query, the FIRST will be updated
- can do multiple operations. Below, 3 field values get updated
```js
theaters.updateOne({
    theaterID: 8
  },
  {
    $set: {"location.address.street1": "123 New Address"},
    $inc: {
      "location.geo.coordinates.0": -10,
      "location.geo.coordinates.1": -25,
    }
  },
)
```

### updateMany
- multiple docs in a collection

### upsert
- want to update a doc, not sure if the doc already exists
  - insert if not present
  - update if present
- JUST LIKE updateOne, but with an `{upsert: true}` added after the update obj:
```js
theaters.updateOne(
  {
    theaterID: 8
  },
  {
    $set: {"location.address.street1": "123 New Address"},
    $inc: {
      "location.geo.coordinates.0": -10,
      "location.geo.coordinates.1": -25,
    }
  },
  {upsert: true}
)
```


## Joins
Example: 2 collections, movies && comments.  
How many comments are associated with each movie?  
using `$lookup`.  
NOTE: the `let` field stores temp variables from the _source db_ so the variable can be used later in the pipeline: `id` is used as `$$id`.  
```js
db.movies.aggregate([
  {
    $lookup: {
      from: 'comments',
      let: {id: '$_id'},
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$movie_id', '$$id'] }
          }
        },
        {
          $count: 'count'
        }
      ],
      as: 'movie_comments'
    }
  }
])
```


## Delete
deleteOne, deleteMany.  
delete is WRITE in db world.  
Collection is changed.  
Indexes are changed.  
Entries need to be added to the oplog (_for the cluster references_).  

### deleteOne  
searches the collection.  
Deletes the first doc found in the `natural order`.  
With a query obj, the deleteOne will delete the first match of the query obj.  

### deleteMany
```js
let res = collection.deleteMany({year: {$lt: 1980}})
expect(res.result.n).toBe(4)
```
NOTICE the result has sub-values that are valuable for result inspection.  


## more complex content
- read concerns
- join collections with `$lookup`
- perform bulk operations
- clean data

### Read Concerns  
Affect the data returned by a read op.  
Reads can be isolated from other nodes in a set.  
Reads can also be confirmed to have been on _x_ number of nodes.  
- default is 'local'
- 'majority' is a good choice for stronger read validation

### Bulk Writes  
Sometimes, many writes need to happen at once.  
Sometimes, these writes may affect the following write.  
```js
  db.collection.bulkWrite([...arrOfObjects])
```
Ends on first failure.  
Assumes the incoming array is in an order that is desired for the write order.  
Can take a flag
```js
{ordered: false}
```
This executes the writes in parallel, non-blocking.  
A single failure does not prevent the writing of the remaining docs.  

Sharded collection ordered bulkWrites take a little longer due to the sharded nature of collections.  

