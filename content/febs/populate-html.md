---
title: Project Setup - Populate an HTML file
slug: febs/populate-html
parentDir: febs
order: 4
---

## A Gap

I have an empty html file and I need some boilerplate content for a frontend build system.

## A Hope

As a developer I'd like to populate an HTML file with appropriate 'boilerplate' content for a frontend build system.

## A Practice

Here, some boilerplate content for an html file. There are great boilerplates that can be found across the world wide web. This includes bits that appear in several boilerplates.

### Start an html file

create a new file, enter into a the terminal in the root of the project

```bash
touch index.html
```

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
