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

```bash
docker run --name dataless-mongo -v /my/own/datadir:/data/db -d mongo
```
