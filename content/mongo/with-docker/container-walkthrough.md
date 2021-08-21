# Mongo And Docker

- [The First Mongo Box](#the-first-mongo-container)
- [Moving The Data out of The Container](#moving-data-out)

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
