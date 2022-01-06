# Some Local Setup Examples

Setup a running container with data living on the machine:

```js
//start docker if it is not running

// pull docker image into local docker image repo
docker pull mongo:4

// create a dir to store "persistent" data
mkdir data

// spin up a container to save data to that data dir
docker run --rm --name asdf -p 27017:27017 -v /$(pwd)/data:/data/db mongo:4

/*
  docker run cli notes
  - --rm will remove the container when it gets killed later
  - --name asdf names the container 'asdf' as a 'friendly' name
  -p 27017:27017 "maps" the container port to the host port
  -v /$(pwd)/data:/data/db "maps" the default data dir storage of mongo from inside the container to the hose data dir
  - mongo:4 is the image to source the container from

  the above will start a container in the current terminal, with container logs printing to the console.
  To interact with that mongo instance, open a new terminal.
*/





// import some data, in this example 'humans.json' is the data file
// in a new terminal run
mongoimport -d mydb -c people --drop humans.json

/*
  cli
*/
```
