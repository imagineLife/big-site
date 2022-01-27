---
title: Comparing Development and Production
slug: febs/dev-prod-comparison
parentDir: febs
excerpt: How a Frontend Build System can work differently across environments
order: 2
---

# Comparing Development and Production Setups

- [Comparing Development and Production Setups](#comparing-development-and-production-setups)
  - [The need for a Dev Setup](#the-need-for-a-dev-setup)
  - [The Production Setup](#the-production-setup)
  - [Webpack Dev Server For Local Development](#webpack-dev-server-for-local-development)
  - [Webpack For Preparing Code for Production](#webpack-for-preparing-code-for-production)
  - [Comparing Dev to Production](#comparing-dev-to-production)

## The need for a Dev Setup

Frontend engineers who spend most time in HTML, JS, CSS, Browser APIs, Consuming data over network traffic, and React (_the frontend UI library of choice here_) are accustom to having a "hot-reloading" environment for fast development workflows:

- make changes in code editor
- auto-save or press save
- go to browser
- see auto-updated ui details or refresh for new details

## The Production Setup

A production web-app server does not have the need to serve the above "hot-reloading" style app.  
A Production node http server can be setup to serve static frontend assets - HTML, JS, and CSS.

## Webpack Dev Server For Local Development

[Webpack Dev Server](https://github.com/webpack/webpack-dev-server#with-the-cli) is a tool to use for local development. WDS does the work of

- taking react & frontend dev code as input
- spinning up a node server (_under the hood_)
- making available browser-ready content
- built-in hot-reloading for quick dev iteration

## Webpack For Preparing Code for Production

[Webpack](https://webpack.js.org/#bundle-it) is a tool to use to transform local development code to production-ready code. Webpack does the work of

- taking react & frontend dev code as input (_similar to the local dev env_)
- Making available browser-ready content
- Producing the browser-ready content as static files

## Comparing Dev to Production

**The dev setup** leverages webpack-dev-server for hot-reloading. While working on a project that _also leverages an in-house API_, it is not uncommon to rely on a locally-served API through _another server instance_.  
**The prod setup** leverages a node server to serve static contents. The prod setup leverages webpack as a code transformer to make react developer code readable by the browser.
