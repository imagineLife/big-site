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
db.createUser({user:'specific_admin',pwd:'specific_admin_pwd',roles: [{ db: 'specific', role: 'dbAdmin' }]})

# should return... 
Successfully added user: {
  "user" : "specific_admin",
  "roles" : [
    {
      "db" : "specific",
      "role" : "dbAdmin"
    }
  ]
}

```
**NOTE**
Use the admin db to create users.  
In the admin table, the user definition contains which db(s) each user has permissions over.  

## grant more roles to existing user
Multiple roles can be had across multiple dbs.  
Here, the specific_admin user, with the dbAdmin role over the `specific` db, will be granted dbOwner role over `another` db.
```bash
use admin
db.grantRolesToUser('specific_admin', [{db: 'another', role: 'dbOwner'}])
```
**dbOwner review**  
This role combines `readWrite`, `dbAdmin` and `userAdmin` roles over a db. A huge role over a db.  

## review role info on a db
Here, use the cli to review what the `dbOwner` role is over the `another` db, and reveal all the privileges that the role has on the db.
```bash
use admin
db.runCommand({
  rolesInfo: {
    role: 'dbOwner',
    dbOwner: 'another'
  },
  showPrivileges: true
})
```

## review users setup on the dbs
```bash
use admin
db.getUsers()
```
This lists all users and some data about them. Here, the `specific_admin` user as an example: 
```bash
...
{
  "\_id" : "admin.specific_admin",
  "userId" : UUID("54feaffc-c0dd-4dfc-bb3e-0047aeaa3951"),
  "user" : "specific_admin",
  "db" : "admin",
  "roles" : [
    {
      "role" : "dbOwner",
      "db" : "another"
    },
    {
      "role" : "dbAdmin",
      "db" : "specific"
    }
  ],
  "mechanisms" : [
    "SCRAM-SHA-1",
    "SCRAM-SHA-256"
  ]
}
...
```
See that this single user, `specific_admin`, is created in the `admin` db, and has 2 roles: the `dbOwner` on the `another` db and the `dbAdmin` on the `specific` db.