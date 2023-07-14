---
title: Learn The Basics Of Duplex Streams
slug: node/streams/duplex
author: Jake Laursen
excerpt: Streams That Allow For Reading And Writing
tags: ["node", "streams", "core"]
parentDir: node/streams
order: 4
---


# Duplex Streams for Reading And Writing
[duplex streams](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#duplex-and-transform-streams) implement both the [readable](/node/streams/readable) and [writable](/node/streams/writable) streams in one interface.  
Duplex streams can both "listen" for `data` events, like a readStream, and can also `write()` to the stream, like writeStreams.

- [Duplex Streams for Reading And Writing](#duplex-streams-for-reading-and-writing)
  - [An Example Of A Duplex Stream with the net module](#an-example-of-a-duplex-stream-with-the-net-module)
  - [An Example Of A Duplex Stream with the native gzip module](#an-example-of-a-duplex-stream-with-the-native-gzip-module)
  - [An Example of A Duplex Stream with the native crypto module](#an-example-of-a-duplex-stream-with-the-native-crypto-module)
  - [An Example using the finished utility](#an-example-using-the-finished-utility)


## An Example Of A Duplex Stream with the net module
Here, the [`net`](https://nodejs.org/dist/latest-v18.x/docs/api/net.html) module is used as a quick example of a duplex stream.  
The server: 
- built with `createServer`
- listens for connections
- on an interval writes `server beat`
- calls the [`end`](https://nodejs.org/dist/latest-v18.x/docs/api/net.html#event-end) internally when the client disconnects

The client
- written with the `connect` method
- includes the `write` method, essentially writing to itself
- listens for `data`, here from the server, and logs a string with the data
- after 2 intervals will signal to itself `all done`, then call the `.end()` method, signaling to the server that this client instance is done connecting to the server


```js
const { createServer, connect } = require('net');

const TIMEOUTS = {
  serverBeat: 1000,
  client: {
    allDone: 3250,
    end: 250
  },
};

// SERVER
createServer((socket) => {
  
  const interval = setInterval(() => {
    console.log('server writing beat')
    
    socket.write('server beat');
  }, TIMEOUTS.serverBeat);

  socket.on('data', (data) => {
    socket.write(data.toString().toUpperCase());
  });
  
  socket.on('end', () => {
    console.log('server socket ended!')
    
    clearInterval(interval);
  });
})
  .listen(3000);


// CLIENT
const netClient = connect(3000)

netClient.on('data', (data) => {
  console.log('client received data:', data.toString());
});
netClient.write('starting client');

setTimeout(() => {
  netClient.write('all done');
  setTimeout(() => {
    console.log('client .end() here')
    
    netClient.end();
  }, TIMEOUTS.client.end);
}, TIMEOUTS.client.allDone);
```
Running the above will output...
```bash
client received data: STARTING CLIENT
server writing beat
client received data: server beat
server writing beat
client received data: server beat
server writing beat
client received data: server beat
client received data: ALL DONE
client .end() here
server socket ended!
```

## An Example Of A Duplex Stream with the native gzip module 
```js
const { createGzip } = require('zlib');

const gzipStream = createGzip();

function onData(data) {
  const base64Data = data.toString('base64');
  console.log('base64Data :', base64Data);
  
}

gzipStream.on('data', onData);
gzipStream.write('a string here');
setTimeout(() => {
  gzipStream.end('another string here');
}, 500);
```
Running the above will output: 
```bash
base64Data : H4sIAAAAAAAAEw==
base64Data : S1QoLinKzEtXyEgtSk3Myy8B0shCAA8rMZwgAAAA
```


## An Example of A Duplex Stream with the native crypto module
```js
const { Transform } = require('stream');
const { scrypt } = require('crypto');
const CRYPTO_SALT = 'random-string-here'
const dataToWrite = ['first string', 'second string', 'third string'];

const createTransformStream = () => {
  return new Transform({
    decodeStrings: false,
    encoding: 'hex',
    transform(chunk, enc, next) {
      scrypt(chunk, CRYPTO_SALT, 32, (err, key) => {
        if (err) {
          next(err);
          return;
        }
        next(null, key);
      });
    },
  });
};
const transformStream = createTransformStream();

transformStream.on('data', (data) => {
  console.log('got data:', data);
});

dataToWrite.forEach((str, itmIdx) => {
  if (itmIdx !== dataToWrite.length - 1) {
    transformStream.write(str);
  } else {
    transformStream.end(str);
  }
});
```

## An Example using the finished utility
This is a minor adjustment of the above [net server example](#an-example-of-a-duplex-stream-with-the-net-module)
```js
const { createServer, connect } = require('net');
const { finished } = require('stream')
const TIMEOUTS = {
  serverBeat: 1000,
  client: {
    allDone: 3250,
    end: 250
  },
};

// SERVER
createServer((socket) => {
  
  const interval = setInterval(() => {
    console.log('server writing beat')
    
    socket.write('server beat');
  }, TIMEOUTS.serverBeat);

  socket.on('data', (data) => {
    socket.write(data.toString().toUpperCase());
  });
  
  // instead of using...
  // socket.on('end', () => {
  //   console.log('server socket ended!') 
  //   clearInterval(interval);
  // });

  // here is the 'finished' function in action
  finished(socket, (err) => {
    if (err) {
      console.error('there was a socket error', err)
    }
    clearInterval(interval) 
  })
})
  .listen(3000);
```