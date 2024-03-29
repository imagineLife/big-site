---
title: Project Setup - Populate an HTML file
slug: fwebs/populate-html
parentDir: febs
order: 99999
tags: ["tooling", "frontend"]
---

## A Goal and A Strategy

_I have an empty html file and I need some boilerplate content for a frontend build system._

_As a developer I'd like to populate an HTML file with appropriate 'boilerplate' content for a frontend build system._

Here, some boilerplate content for an html file. There are great boilerplate options that can be found across the world wide web.

### Describe the doctype in an html file

At the top of this new html file, declare the doc type with

```html
<!DOCTYPE html>
```

### Set the HTML element

Next, add an opening `<html>` tag. Make two line-breaks and add the closing `</html>` tag.

### Begin Building the document head

Between the html tags, ad an opening `<head>` and closing `</head>` tags. Make an empty line between the head tags.
Add a charset declaration with `<meta charset='utf-8'/>`,
Add a document title with `<title>Frontend Boilerplate</title>`,
Add a document description with `<meta name='description' content='A Frontend boilerplate leveraging webpack, babel, and react.'>`,
add a viewport declaration with `<meta name='viewport' content='width=device-width, initial-scale=1'/>`.  
Here's what the head will look like:

```html
<head>
  <meta charset="utf-8" />
  <title>Frontend Boilerplate</title>
  <meta
    name="description"
    content="A Frontend boilerplate leveraging webpack, babel, and react."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
```

### Build and fill the body

Build the Body with an opening and closing `<body>` and `</body>`. Include an empty line between the two elements.
Between the body tags, add 1 div with an id, using `<div id='root'></div>`. Here is where we will make react leverage the dom.

## All Together

```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8" />
  <title>Frontend Boilerplate</title>
  <meta
    name="description"
    content="A Frontend boilerplate leveraging webpack, babel, and react."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <div id="root"></div>
</body>
```
