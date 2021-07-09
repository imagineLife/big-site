# Mongo and Authorization
## Reviewing Config File
the config includes a `security` section
```yaml
security:
  authorization: enabled
```
- this enables RBAC on the cluster
- implicitly enables auth
- NO users to start

## The Localhost exception
This is a "backdoor" that mongo gives for authenticated dbs.  
- no configured users to auth with
- must access mongod from a cli shell from the same host as the mongod server
- this exception **stops being available** after creating the first db user
- **use this to create a user with admin priveleges as the first user**  

## Creating a MongoDB Superuser
connect with 
```bash
mongo --host 127.0.0.1:27017
```
```bash 
use admin
```
create the user
```bash
db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: ["root"]
  }
)
```