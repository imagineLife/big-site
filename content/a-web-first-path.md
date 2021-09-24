---
title: A Web-First Path
slug: a-web-first-path
author: Jake Laursen
excerpt: Developing competence for building web-based tech
tags: http, web, node, react, html, css, js, pedagogy, path
order: 1
---

# A Web-First Path

The UI of a website and a web "app" are visually rewarding to work on - changing item colors, shapes, functionalities for the end-user...  
There are a lot of nuances in a lot of technologies involved in building web-based tools, though. This is the beginning of a set of tech to

## Frontend

- html
- css
- js
- [the browser & its APIs](https://developer.mozilla.org/en-US/docs/Web/API)

## The HTTP Server

- Building an http server using node & express

### Serving content

HTTP(s) server can serve many "types" of content:

- serving data through restful data endpoints
  - getting data to serve
    - from the server host machine file-system
    - from another db server
  - building restful endpoints
    - considering resources & sub-resources
    - leveraging http methods for performing several "actions" on a resource

### Serving Pages and Docs

- Serving a Single-Page App from an api
- Serving Server-Side Render

### Vertical Scaling

Node provides some handy apis for scaling node.

## A Visual Path

Starting From the Http Server

```mermaid
  flowchart TB
%% List of nodes at top
%% Composition of nodes into Sub-Graphs & flow layout in graph below

%% NODES
  HTTPSERVER[Build an HTTP Server];
  FIRSTUI[Serving First UI Content];
  OPTS{Some Options}

%% server nodes
  REST-API[RESTful API];
  GRAPH-DATA[graphed data];

%% client nodes
  HTML[HTML]
  CSS[CSS]
  JS[JavaScript]
  BROWSER-APIS[Browser APIs]


%%  HTTP server sub-graph

  subgraph SG1[HTTP Server Setup]
    direction LR
    HTTPSERVER --> FIRSTUI;
  end;

%% HTTP sub-graph to options
    SG1 --> OPTS;

%% Server-Curious SubGraph
  subgraph SG2[Dig In to the Server]
    direction TB
    REST-API;
    GRAPH-DATA;
  end;

%% Client-Curious SubGraph
  subgraph SG3[Dig In to the Client]
    direction TB
    HTML;
    CSS;
    JS;
    BROWSER-APIS;
  end;

%%
  OPTS --> |Server-Curious| SG2;
  OPTS --> |Browser-Curious| SG3;

```
