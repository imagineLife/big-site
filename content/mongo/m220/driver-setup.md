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