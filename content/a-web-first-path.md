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
There are a lot of nuances in a lot of technologies involved in building web-based tools, though.

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

%%  HTTP server sub-graph
%% nodes SG1, A, B
    subgraph SG1[HTTP Server Setup]
      direction LR
      A[Build an HTTP Server] --> B[Serving First UI Content];
    end;

%% HTTP sub-graph to options
%% nodes C
    SG1 --> C{Some Options};

%% Server-Curious SubGraph
%% nodes SG2, D, E
    subgraph SG2[Dig In to the Server]
      direction TB

      D[serve RESTful API];
      E[serve graphed data]
    end;


    C --> |Server-Curious| SG2[RESTful APIs];
    C --> |Browser-Curious| F[HTML];

```
