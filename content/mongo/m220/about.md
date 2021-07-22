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
