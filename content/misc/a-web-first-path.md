---
title: An Http-Server Approach to Web Development
author: Jake Laursen
excerpt: Developing competence for building web-based tech
tags: ["http", "web", "node", "react", "html", "css", "js", "pedagogy", "path"]
parentDir: misc
slug: misc/a-web-first-path
order: 4
---

# Some Tech Involved in Building A Web App

- [Some Tech Involved in Building A Web App](#some-tech-involved-in-building-a-web-app)
  - [A Visual](#a-visual)
  - [Starting with A WebServer](#starting-with-a-webserver)
  - [Browser-Curious](#browser-curious)
  - [Server-Curious](#server-curious)
  - [Data-Curious](#data-curious)
  - [Architecture Curious](#architecture-curious)

The UI of a website and a web "app" are visually rewarding to work on - changing item colors, shapes, functionalities for the end-user...  
There are a lot of nuances in a lot of technologies involved in building web-based tools, though.  
Here are a bunch of technologies that may or may not be involved in a web-app.

## A Visual

```myMermaid
  flowchart TB
%% List of nodes at top
%% Composition of nodes into Sub-Graphs & flow layout in graph below





%%
%% NODES
%%

%% initial nodes
  HTTPSERVER[Build an HTTP Server];
  FIRSTUI[Serving First UI Content];
  OPTS{Some Next Step Options}

%% server nodes
  REST-API[RESTful API];
  GRAPH-DATA[graphed data];
  WEBSOCKETS[Websockets];
  NODE[node];
  DOCKER[Containerizing Servers with Docker];
  LINUX[OS with Linux];

%% system design nodes;
  AUTH[Authentication];
  DATA-CACHE-LAYER[Data-Caching API Layer];


%% Database nodes;
  MONGODB[NoSQL and MongoDB];
  DATA-MODELING[Modeling Data];

%% Data-Modeling Nodes;
  AAPROX[Approximation];
  ATTR[Attribute];
  BUCKET[Bucket];
  COMPUTED[Computed];
  DOC-VER[Document Versioning];
  SCHEM-VER[Schema Versioning];
  EXT-REF[Extended Reference];
  OUTLIER[Outlier];
  PRE-ALLOC[Pre-Allocation];
  POLYMORPH[Polymorphic];
  SUBSET[Subset];
  TREE[Tree];

%% nodeJS nodes
  SCALING-NODE[scaling an HTTP Server];
  STREAMS[streams];
  EVENTS[events];
  DEBUGGING[debugging];
  BUFFERS[buffers];
  ERRORS[Errors];

%% scaling nodeJS nodes
  MULTI-CORE-CLUSTERING[Cluster for multi-core];
  CHILD-PROCESS[Child Processes for spawning long-running processes];


%% client nodes
  HTML[HTML]
  CSS[CSS]
  JS[JavaScript*]
  BROWSER-APIS[Browser APIs]
  WEBPACK[Webpack]
  BABEL[Babel]
  LIBRARIES[JS Libraries like react, vue, angular]

%% JS nodes
  ASYNC[async];
  INHER[protoypical inheritance];
  BIND-CALL[Bind,Call,Apply];
  DATA-STRUCTS[Data Structures with Objects and Arrays];

%% Browser nodes
  LOCAL-STORAGE[Local Storage];
  SESSION-STORAGE[Session Storage];
  FETCH[Fetch];
  CLIPBOARD[Clipboard];
  GEOLOC[GeoLocation];

%% Docker nodes
  IMAGES[Image Management ]
  CONTAINERS[Container Management]
  CONTAINER-NETWORKS[Networking]
  MULTI-CONTAINER[Multi-Container Projects with Compose]
  VOLUMES[Extracting State with Volumes]




%%
%% Sub-Graph Groupings
%%

%%  HTTP server sub-graph
  subgraph HTTP_SERVER_SETUP[HTTP Server Setup]
    direction LR;
    HTTPSERVER --> FIRSTUI;
  end;

%% Server-Curious SubGraph
  subgraph SERVER_CURIOUS[Serving Content]
    direction TB;
    REST-API;
    GRAPH-DATA;
    WEBSOCKETS;
    NODE;
    DOCKER;
    LINUX;
  end;

%% DB-Curious
  subgraph DATABASE_CURIOUS[Dealing with Data];
    direction TB;
      MONGODB;
      DATA-MODELING;
    end;

%% Modeling Data
  subgraph MODELING_DATA_SG[Data Modeling];
    direction LR;
      AAPROX;
      ATTR;
      BUCKET;
      COMPUTED;
      DOC-VER;
      SCHEM-VER;
      EXT-REF;
      OUTLIER;
      PRE-ALLOC;
      POLYMORPH;
      SUBSET;
      TREE;
    end;

%% Networking & System-Design
  subgraph SYSTEM_DESIGN[System Design]
    direction TB;
  end;

%% Client-Curious SubGraph
  subgraph BROWSER_CURIOUS[Dig In to the Client]
      direction TB;
      HTML;
      CSS;
      JS;
      BROWSER-APIS;
      WEBPACK;
      BABEL;
      LIBRARIES;
  end;

%% Node Sub-Categories
  subgraph NODE-SUBGRAPH[NodeJS Details];
    direction LR;
      SCALING-NODE;
      STREAMS;
      EVENTS;
      DEBUGGING;
      BUFFERS;
      ERRORS;
    end;

%% Node Scaling
  subgraph NODE-SCALING-SUBGRAPH[Scaling an HTTP Server]
      direction TB;
      MULTI-CORE-CLUSTERING;
      CHILD-PROCESS;
  end;


%% JS
  subgraph JS-SUBGRAPH[JavaScript In Depth]
    direction LR;
      ASYNC;
      INHER;
      BIND-CALL;
      DATA-STRUCTS;
  end;

%% Browser
  subgraph BROWSER-SUBGRAPH[Brower APIs]
    direction LR;
    LOCAL-STORAGE;
    SESSION-STORAGE;
    FETCH;
    CLIPBOARD;
    GEOLOC;
  end;

%% Docker
  subgraph DOCKER-SUBGRAPH[Docker Details];
    direction LR;
    CONTAINERS;
    VOLUMES;
    IMAGES;
    CONTAINER-NETWORKS;
    MULTI-CONTAINER;
  end;


%%
%%  Putting It All Together
%%
  HTTP_SERVER_SETUP --> OPTS;
  OPTS --> |Browser-Curious|BROWSER_CURIOUS;
  OPTS --> |Server-Curious|SERVER_CURIOUS;
  OPTS --> |Data-Curious|DATABASE_CURIOUS;
  NODE --> |Node-Deets|NODE-SUBGRAPH;
  JS --> |In Depth| JS-SUBGRAPH;

  %% NOTE: single-node-to-section
  SCALING-NODE --> |Server Scaling| NODE-SCALING-SUBGRAPH;
  BROWSER-APIS --> |Deets| BROWSER-SUBGRAPH;
  DOCKER --> |In-Depth| DOCKER-SUBGRAPH;
  DATA-MODELING --> |Data Design Patterns| MODELING_DATA_SG;

```

## Starting with A WebServer

A quick achievement can be to put together a simple http server and serve some text when a url is hit from a browser.  
With an http server up && serving text to a request, several "directions" can be navigated:

- a frontend focus - check out html, javascript, css, browser apis, frontend javascript libraries/frameworks, frontend "build" systems, etc.
- a server focus - chec out REST APIs, websockets, node itself, containers with Docker, leveraging an OS like linux, etc.
- a data-curious focus - noSQL & MongoDB & document data storage, sql & relational data, data modeling patterns, etc.

## Browser-Curious

The browser is the tool that we as website users use to see websites: Safari, Chrome, Firefox, Opera, IE, Brave, Tor...  
These are [web browsers](https://www.mozilla.org/en-US/firefox/browsers/what-is-a-browser/).  
Browsers have bunch of tech included in them, and handle some types of content:

- **HTML**: Documents, document elements, element attributes... web browsers can most commonly display some HTML to you.
- **CSS**: CSS is about styling, and styling can be written in a stylesheet. These stylesheets cascade in nature. These are referred to as cascading style sheets (CSS), and involve selectors, the box model, positioning, layout mechanisms, pseudo-selectors and more
- **JavaScript**: Javascript is most often used to alter the HTML & CSS, ass well as trigger asynchronous events in and from the browser.
  - JavaScript has a slew of details to learn, some more "under the hood" than others: [Prototypal Inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain), [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [concurrency and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)....there's even a [spec available](https://262.ecma-international.org/12.0/) to get into the nitty gritty of JS
  - JavaScript is also the coding langauge of NodeJS, the server-side runtime noted in other parts of this page - learning "ins and outs" of JS can be hugeley impactful on a "full stack" engineer's abilities
- **Browser APIs**: [Draging & Dropping](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent), [fetching data](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent), [Handing Files](https://developer.mozilla.org/en-US/docs/Web/API/File), [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)
- **A Frontend Build System**: React, Webppack, Babel, scss - a handful of "modern" tools that are used to build a single-page-application system that gets "bundled" before releasing to a production environment

## Server-Curious

A server is a computer. Servers, in website and web application development, "serve" data for a browser & the data can be website pages, data, &/or other details...

- **REST APIs**: Manage Data for the web through http methods & C.R.U.D (_create,read,update,delete_) operations
- **Websockets**: Open Web-Traffic for bi-directional communication in a single connection, helpful for "real-time" data-transfer
- **Containerizing Servers with Docker**: Change the root "knowledge" of a directory, isolate resources with cGroups, and manage unique "subtrees" of process in Linux - use Docker to do all this with an easier interface
- **OS with Linux**: The CLI, text editors in the command line, file manipulation, streams, pipes, permissions, networking, package management, shell scripting, automation...
- **Node**: Deep dive into JS on a server with streams, events, files, paths, scaling, process management, & more

## Data-Curious

Data is the meat & bones of data-driven applications: e-commerce stores data might include all inventory. Weather apps data might include temperature readings. A trucking delivery system might store details about packages, drivers, & delivery stats.

- **NoSql and MongoDB**: interact with js object (_document_) styled data persisted to disk
- **Modeling the Data**: Data needs change and the shapes of data can change to suit consuming applications

## Architecture Curious

An Overview of some project architectures
