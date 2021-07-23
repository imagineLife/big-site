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