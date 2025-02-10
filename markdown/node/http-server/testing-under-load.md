---
title: Testing An Http Server Under Load
slug: node/http-server/testing-under-load
author: Jake Laursen
excerpt: 
tags: ["server", "node", "javascript", "http", "testing"]
parentDir: http-server
order: 6
---

# Load Testing
It can be a common practice to put an http server "under siege" in order to test the amount of requests and responses the server can "handle". Lets do it.

## Siege As Load Tester
Check out [Siege's github](https://github.com/JoeDog/siege) or [Siege's website](https://www.joedog.org/siege-home/).  
Siege is a great cli tool for load testing against an http server. The webpage reads ["_It was designed to let web developers measure their code under duress, to see how it will stand up to load on the internet._"](https://www.joedog.org/siege-home/).   

I will not go over _how to install it_ - check out the docs.  
The goals here will be to test an http server that is running on your personal machine (laptop, desktop):
- have an http server running (_see [trivial servers](/node/http-server/trivial-servers) for a few small examples_)
- have siege also downloaded on the machine
- run siege commands "against" the http server


### Running Siege Against An Http Server
Run the http server locally. In this example, an http server is running and listening for requests on path `/` on port `3000`:
```js
const expressObj = e();
const port = 3000;
const HELLO_STRING = 'Hello from the express server!'
const ROOT_ROUTE = '/'


function helloHandler(req, res){
  return res.send(HELLO_STRING)
}

// register a "handler" to listen at endpoint "/"
expressObj.get(ROOT_ROUTE, helloHandler)

// start server, register listener callback
expressObj.listen(port, serverListeningCallback)
```

In a terminal run a siege command:
```bash
siege -c 10 -t 5s -b http://localhost:3000
```
That command will...
- mimic 10 concurrent (`-c`) requests, a stressor on the server
- run for 5 seconds `-t 5s`


The _output_ of running that command will be more than can be consumable. A BUNCH of text will get output in the terminal.  
At the end, though, is a summary:
```bash
Lifting the server siege...
Transactions:		       10568 hits
Availability:		      100.00 %
Elapsed time:		        4.80 secs
Data transferred:	        0.30 MB
Response time:		        0.00 secs
Transaction rate:	     2201.67 trans/sec
Throughput:		        0.06 MB/sec
Concurrency:		        3.75
Successful transactions:       10568
Failed transactions:	           0
Longest transaction:	        0.41
Shortest transaction:	        0.00
```

This reveals a bit about how much traffic the web server can "handle".  
There are also several ways to scale a node server (_post coming soon_)

(_this is just to get started_)