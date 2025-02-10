---
title: 'Image Object Detection: Part I'
parentDir: ml
slug: ml/image-object-detection-I
author: Jake Laursen
excerpt: Goals of an Image object-detection app
tags:
  [
    'machine learning',
    'models',
    'overview',
    'ai',
    'js',
    'javascript',
    'tensorflow',
  ]
order: 1
---

# Building An Object Image Detector

- [Building An Object Image Detector](#building-an-object-image-detector)
  - [Goals](#goals)
    - [Tech Involved](#tech-involved)
  - [Building It](#building-it)
    - [The Layout \& Components](#the-layout--components)
    - [The Frontend "State"](#the-frontend-state)

## Goals

As a User, I can upload an image and see a detected image in one-word.

### Tech Involved

- [tensorflowJS](https://www.tensorflow.org/js) (_one of my personal primary motivators here_), for machine learning
- [react](https://react.dev/) for UI component-ization
- [nextjs](https://nextjs.org/) for encapsulating server-side rendering, project architecture, and a "batteries-included" dev setup
- [tailwind](https://tailwindcss.com/) as a styling framework
- markdown, git, && toying with mdx
- [coco-ssd](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd), a pre-built machine learning model that can detect objects in images (_80 classes of objects_)
- [FileReader browser API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

## Building It

This is an entirely "UI-only" project.

### The Layout & Components

The function UI elements...

- a page layout
- an `<ImageDropzone />` component: the drag-n-drop part where the user can either drag-n-drop an image or upload through the browser's file-browsing gui
- an `<ImagePreview />` component: after the user uploads the image, the image will display in the preview box
- a `<Prediction />` component: showing the "guessed" object in the image and the likelyhood that the object is, indeed, what coco-ssd estimated

### The Frontend "State"

- The "page" component is setup with some state:
  - `uploadedImage`, storing the uploaded image
  - `model`, storing the coco-ssd model
  - `predictions`, storing the predicted objects (_by the model_) found in the uploaded image
