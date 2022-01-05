# Mongo And Docker

- [Mongo And Docker](#mongo-and-docker)
  - [The First Mongo Container](#the-first-mongo-container)
  - [Moving Data Out](#moving-data-out)
  - [Allow cli access from the host machine](#allow-cli-access-from-the-host-machine)
  - [Including some db users and roles](#including-some-db-users-and-roles)
    - [A db admin user](#a-db-admin-user)
      - [On Database Creation](#on-database-creation)
      - [With a Database already existing](#with-a-database-already-existing)
    - [Including a UserAdmin User](#including-a-useradmin-user)
    - [Building Custom Roles](#building-custom-roles)
      - [A Business Analytics Role](#a-business-analytics-role)
    - [Giving a user this role](#giving-a-user-this-role)
  - [Leveraging A Config File](#leveraging-a-config-file)
    - [Config and CLI Overview](#config-and-cli-overview)

## The First Mongo Container

Here, a container that holds the db and the data.  
An introductory Mongo Container.  
This container will run in the background.  
This container will have a friendly name of `mongo-box`.

```bash
docker run --name mongo-box -d mongo:5.0.2
```

Here, the `mongo` image from docker hub, with specified version of `5.0.2`, was probably pulled from dockerhub, the online docker image repo.  
The image was pulled, then started.  
The image is running on my laptop.  
One way to USE this is to navigate INTO the container shell, and use the mongo cli to run commands against the mongo instance.

```bash
docker exec -it mongo-box bash
```

## Moving Data Out

Here, the mongo container will leverage data outside of itself.
By default, mongo looks to a specific directory on whatever machine it is running on to store data on: `/data/db`.

- Pick a data directory on the host machine (_the laptop_)
- get the absolute path to the directory
- ensure the permissions are such that the directory is accessible by docker (_this won't cover the directory permissioning & assumes the directory is allowed to be read/written by docker_)

```bash
docker run --name dataless-mongo -v /my/own/datadir:/data/db -d mongo:5.0.2
```

- the `-v` flag is telling the container to `use /my/own/datadir where the internals of the container references /data/db`.

docker run --name dataless-mongo -v mongo-data:/data/db -d mongo:5.0.2

## Allow cli access from the host machine

With a host machine running a "closed" instance of mongo, the container inner mongo instance is not currently accessible through the host machine cli directly.  
Here, The mongo container will be accessible from the host machine by adding a flag to the docker cli start command.  
port `27017` is the default port that mongo uses. Here, we are mapping the container port to the host machine port to match, so that the mongo cli on the host, which ALSO is looking to use the default port, gains access to the mongod in the container through the default port.

```bash
docker run --name dataless-and-accessible-mongo -v mongo-data:/data/db -p 27017:27017 -d mongo:5.0.2
```

## Including some db users and roles

### A db admin user

THE PROBLEM: Setting up mongo _without a root user_ means that any connection to the db can make any changes to the db. Since dbs hold super sensitive data, creating users that have explicit permission will be an effective way to restrict connections to the db from making undesired changes.  
A SOLUTION: Here, a root user to the db is created. This is a first layer of protection against unwanted connections to the db.  
Here, a user is created in the default `admin` db with the `root` role. This is the most authorized user that mongo offers as a [default user/role combo](https://docs.mongodb.com/manual/reference/built-in-roles/).  
Also, the friendly name of the container is being adjusted to `mongo-box`.  
**NOTE**: This first method of creating an admin user will only work on db creation. This will not work once the db has already been created. In order to create an admin user with an already-running database, the 2nd option will work.

#### On Database Creation

```bash
docker run --name mongo-box -v ${PWD}/mongo-data:/data/db -p 27017:27017 -d -e MONGO_INITDB_ROOT_USERNAME=apple -e MONGO_INITDB_ROOT_PASSWORD=pie mongo:5.0.2
```

Now, in order to connect as this new root user, a new set of params is needed from the mongo cli

```bash
mongo --username apple --password pie --authenticationDatabase admin
```

#### With a Database already existing

**The Problem**: Mongo db already setup with no admin user.  
**A Solution**: Add an admin user with the db already up && running.  
Here, a container will be started without the admin username + password:

```bash
docker run --name mongo-box -v ${PWD}/mongo-data:/data/db -p 27017:27017 -d mongo:5.0.2
```

Once the container is up, connect to the container using the mongo cli from the host machine -

```bash
mongo
```

Once connected, use the `admin` db to create an admin user with `root` role -

```bash
use admin

# switches to admin db

db.createUser({
  user: 'adminroot',
  pwd: 'adminrootpw',
  roles: [
    { role: 'root', db: 'admin' }
  ]
})

```

### Including a UserAdmin User

As the [Mongo Docs say](https://docs.mongodb.com/manual/reference/built-in-roles/), this built-in `userAdmin` role

- gives ability to CRUD roles + users on the given db
- grants ANY privilege to ANY user (..._including themselves!_), practically giving `superuser` access to the given db
- when this `userAdmin` role is scoped to the `admin` db, this user has the `superuser` access to a CLUSTER

```bash
use admin

db.createUser({
  user: "user_administrator",
  pwd: "i_admin_users",
  roles: [
    { db: "admin", role: "userAdmin" }
  ]
})
```

See the [Mongo Docs](https://docs.mongodb.com/manual/reference/built-in-roles/#mongodb-authrole-userAdmin) for the permissions that this role is given!

### Building Custom Roles

Custom roles can be built for more fine-tuned use cases, scoped particularly to specific db instances.

#### A Business Analytics Role

Perhaps an application is built to provide business analytics to internal stakeholders. A role can be built specifically for this use-case, with limited read-only type permissions on specific database(s).

```bash
use admin

db.createRole(
  {
    role: "businessAnalytics",
    privileges: [
      { resource: { db: "realworldDataDb", collection: "" }, actions: [ "find", "aggregate","count","distinct","listIndexes" ] }
    ],
    roles: []
  },
  { w: "majority" , wtimeout: 10000 }
)

```

### Giving a user this role

Here, take the `businessAnalytics` role && assign it to a user. Here, the user will be named `ba_application`:

```bash
db.grantRolesToUser('ba_application', ["businessAnalytics"])
```

## Leveraging A Config File

This will take a few steps.  
Prereq: run this from a directory path where a directory exists in the same directory path called `mongo-data`. inside `mongo-data` store another directory called `mongodOne`. inside `mongodOne` add a file called `mongod.log`

- create a config file
- mount the config file to the default config file location of the mongo instance
  - mongo looks, as a default, to `/etc/mongod.conf` for the configuration file to use, so below mounts a host-machine config file to that directory

an example mongo config file could be

```yaml
systemLog:
  destination: file
  path: /mongod.log
  logAppend: true
```

```bash
docker run -d --name mongo-box-one -v ${PWD}/node1.conf:/etc/mongod.conf -v ${PWD}/mongo-data/mongod.log:/mongod.log -v ${PWD}/mongo-data/mongodOne:/data/db -e MONGO_INITDB_ROOT_USERNAME=apple -e MONGO_INITDB_ROOT_PASSWORD=pie -p 27000:27017 mongo:5.0.2 --config /etc/mongod.conf
```

### Config and CLI Overview

Here's a command-by-command breakdown of the docker run command

- `-d` flag runs in the bg
- `--name mongo-box-one` assigns mongo-box-one as the friendly name of the docker container
- `-v ${PWD}/node1.conf:/etc/mongod.conf` maps a config file from outside the container, named `node1.conf`, to the default config file inside the container at `/etc/mongod.conf`. Now, the mongod instance uses the config file from outside the container as its config.
- `-v ${PWD}/mongo-data/mongod.log:/mongod.log` maps a logfile on the host to a logfile in the container. Note, the logfile path in the container is different than the default location && is adjusted in the yaml config file
- `-v ${PWD}/mongo-data/mongodOne:/data/db` maps a data storage file, at `${PWD}/mongo-data/mongodOne` to the default data directory in the container. Now, the mongod instance uses an external directory to hold the data, rather than holding the data in the container.
- `-e MONGO_INITDB_ROOT_USERNAME=apple -e MONGO_INITDB_ROOT_PASSWORD=pie` enables auth on the admin db with a root user, with username `apple` and pw `pie`
- `-p 27000:27017` tells docker to take the default port that mongod uses to serve the mongod instance in the container, `27017`, and map that port to a port in the host at `27000`. This makes mongo accessible from the host machine on port 27000
- `mongo:5.0.2` tells docker to run a container that is tagged as `mongo:5.0.2`. Here, a mongo container with a specific version is used
- `--config /etc/mongod.conf` tells mongod to use a config file at the path of `/etc/mongod.conf`. This tells the mongod instance inside the docker container to use this config file. this works in combination with one of the volume mount commands noted above, telling docker to mount an external config file to the in-container config file location, effectively leveraging a config file outside of the container.
