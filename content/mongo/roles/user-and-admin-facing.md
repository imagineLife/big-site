# Some Roles to begin with
connect to mongo using an existing user, the root user
```bash
mongo --username myroot --password mypwd --authenticationDatabase admin
```

## the userAdmin role
create a new user on the admin table. 
**This is the first user that should be created.** This user will be able to do user management. This user can not do data management or data modification. They can't create, write, list dbs... only can create/update/review db users. 

```bash
use admin
db.createUser({
  user: "user_administrator",
  pwd: "i_admin_users",
  roles: [
    { db: "admin", role: "userAdmin" }
  ]
})

# should return

Successfully added user: {
  "user" : "user_administrator",
  "roles" : [
    {
      "db" : "admin",
      "role" : "userAdmin"
    }
  ]
}

```

## create the dbAdmin
This user has _many_ privileges: get stats, mod collections, etc.  
This user can not read user data or write data.  
DDL is do-able.  
DML, data mods, can not be done.  
Create this role for a/many specific dbs, here with a db called 'specific'
```bash
use admin
db.createUser({
  user: 'db_admin',
  pwd: 'i_admin_dbs',
  roles: [
    { db: 'specific', role: 'dbAdmin' }
  ]
})
```
