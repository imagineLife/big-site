# npm module notes
Create a connection object.  


```js
let dbConnection;
let connectionOpts = {useNewUrlParser: true}
try{
  // create the connection object
  dbConnection
 = await MongoClient.connect(URI_VAR,connectionOpts)
}catch(e){
  console.error(e)
}finally{
  // do something with the client
}
```