# Mongo And Docker

- [The First Mongo Box](#the-first-mongo-container)
- [Moving The Data out of The Container](#moving-data-out)
- [Allow cli access from the host machine](#allow-cli-access-from-the-host-machine)

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

## Including a db admin user

THE PROBLEM: Setting up mongo _without a root user_ means that any connection to the db can make any changes to the db. Since dbs hold super sensitive data, creating users that have explicit permission will be an effective way to restrict connections to the db from making undesired changes.  
A SOLUTION: Here, a root user to the db is created. This is a first layer of protection against unwanted connections to the db.  
Here, a user is created in the default `admin` db with the `root` role. This is the most authorized user that mongo offers as a [default user/role combo](https://docs.mongodb.com/manual/reference/built-in-roles/).  
Also, the friendly name of the container is being adjusted to `mongo-box`.  
**NOTE**: This first method of creating an admin user will only work on db creation. This will not work once the db has already been created. In order to create an admin user with an already-running database, the 2nd option will work.

### On Database Creation

```bash
docker run --name mongo-box -v mongo-data:/data/db -p 27017:27017 -d -e MONGO_INITDB_ROOT_USERNAME=apple -e MONGO_INITDB_ROOT_PASSWORD=pie mongo:5.0.2
```

Now, in order to connect as this new root user, a new set of params is needed from the mongo cli

```bash
mongo --username rootuser --password rootuserpassword --authenticationDatabase admin
```

### With a Database already existing
