# Some Roles to begin with
connect to mongo using an existing user, the root user
```bash
mongo --username myroot --password mypwd --authenticationDatabase admin
```

## the userAdmin role
create a new user on the admin table
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
