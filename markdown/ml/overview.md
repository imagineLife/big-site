---
title: 'Machine Learning Overview'
parentDir: ml
slug: ml/overview
author: Jake Laursen
excerpt: A brief intro to ML
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

## Machine Learning

- [Machine Learning](#machine-learning)
  - [Common Terminology](#common-terminology)
    - [Machine Learning Training Terms](#machine-learning-training-terms)
- [Machine Learning System Workflows](#machine-learning-system-workflows)
  - [From "Scratch"](#from-scratch)
    - [Figure out a problem to solve](#figure-out-a-problem-to-solve)
    - [Gather some training and testing data](#gather-some-training-and-testing-data)
    - [Label the data](#label-the-data)
    - [Use Node + tf to build and train a model](#use-node--tf-to-build-and-train-a-model)

### Common Terminology

**Model**: a function. The function takes input, which is the data we want the machine to learn about. The model runs computations on the data and produces an output with probabilities.

**Weights**: How important each feature is, of the input dataset. Weights get adjusted throughout the training process by the machine.

**Labels**: A description, typically one-word, given to each piece of data that is fed to the model. Photos might be labeled "dog", "cat", "Joe", "GarbageTruck", etc.

**Deep Learning**: a "sub-category" of Machine learning, more specifically leveraging neural networks (containing layers etc). Deep learning is used for things like recommendation FileSystemWritableFileStream, sequence-to-sequence (translations, speech recognition), computer vision (detecting objects in images), and classification/regression ( spam-or-not, applying "outlines" to objects in images).

**Machine Learning Algorithms**: Specific computation types to the machine-learning world: CNN (convolutional neural-networks), Naive Bayse, LSTM (Long Short Term Memory), and more.

**Overfitting**: Training the model to predict with "too high" a certainty. This is bad because the model will only learn the data from the input, and not perform well with "new" input that is not 100% like the input.

**Supervised Learning**: Giving a machine a "labeled" dataset & the machine correlates labeled input to the labels. We the people building machine learning are supervising the learning that the machine is doing by instructing the machine what labels should be deducted from the input.

**Unsupervised Learning** Giving a machine a dataset without labels & having the machine "figure out" its own labels and learnings.

**Semi-Supervised Learning** is when some of the data given to the machine is labeled and other data given to the machine is not labeled.

**Pre-Trained Models**: Many models are already trained and available for free use. [kaggle](https://www.kaggle.com/models), [tensorflow](https://github.com/tensorflow/tfjs-models) and [huggingface](https://huggingface.co/models) are three places to start to checkout some pre-trained models. Machine learning is significantly more common in python environments than javascript at the moment: there are likely significantly more models for a python env than a js env.

**Transfer Learning**: Using a pre-trained model for NEW trained details. Check out [teachable machine](https://teachablemachine.withgoogle.com/train) for an in-browser GUI-driven approach to using pre-trained models to try out some transfer learning!  
Also check out [tiny motion trainer](https://experiments.withgoogle.com/tiny-motion-trainer), which is a GUI-driven tool for setting up a little arduino with tensorflow to recognize motion.

#### Machine Learning Training Terms

**Epochs**: Number-of-times though a set of training data.  
**Activation**: a function to help a neural network learn more complex patterns in the data.  
**Batch Size**: How many training examples are being fed to the neural network.  
**Learning Rate**: a "hyper paramater", that instructs the machine learning model to change after each time weights are updated.  
**Tensor**: A math object. An array of numbers or functions that change accortain to rules. The tensorflow docs explain a tensor as ["multi-dimensional arrays with a uniform type"](https://www.tensorflow.org/guide/tensor).
**Optimizer**: a function that updates attributes (weights, learning rates) of a neural network.

## Machine Learning System Workflows

### From "Scratch"

Consider building an ai saas app that tells you wether or not you drew a circle or a square. This will also be assuming a node+tensorflow+extras environment will be setup.

#### Figure out a problem to solve

Maybe you need a machine to be able to detect the difference between a hand-written circle and a hand-written square.  
Maybe you are working on controlling parts of a website using hand gestures or facial movements.  
Maybe you are updating your d.i.y home automation system to tell you when and what delivery vehicle and/or people are arriving to your house. Maybe your diy home-automation system is being updated to prep the house temperature to your desired state when your car pulls into your driveway.

#### Gather some training and testing data

Get data that represents the "success" of your system: pictures of your car pulling into your driveway, handwritten circles and triangles, photos of delivery people pulling into your driveway.  
The data you gather should/will be broken into "training" data "testing" data - some (most?!) data to train the machine-learning model, and more data to test the results of the machine-learning model to ensure the model can "predict" with some desired level of likelyhood the expected outcome.

#### Label the data

#### Use Node + tf to build and train a model

Convert the images + labels into tensor data.  
Convert the tensor data into a model:

- decide on a model type: tensorflow provides perhaps the most commonly-used [sequential model method](https://js.tensorflow.org/api/latest/?_gl=1*3wlan3*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxMzcxMzk4OC4yNC4xLjE3MTM3MTM5ODguMC4wLjA.#sequential) as well as a more generic "model" creator
- [build some layers](https://js.tensorflow.org/api/latest/?_gl=1*3wlan3*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxMzcxMzk4OC4yNC4xLjE3MTM3MTM5ODguMC4wLjA.#Layers) for the model to use
- use an [optimizer](https://js.tensorflow.org/api/latest/?_gl=1*3wlan3*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxMzcxMzk4OC4yNC4xLjE3MTM3MTM5ODguMC4wLjA.#Training-Optimizers) to update weights & biases throughout the model training
- [compile](https://js.tensorflow.org/api/latest/?_gl=1*3wlan3*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxMzcxMzk4OC4yNC4xLjE3MTM3MTM5ODguMC4wLjA.#tf.LayersModel.compile) the model with the optimizer, a loss function, and some metrics to be evaluated by the model

<!-- ---
title: 'Machine Learning: An Overview'
parentDir: ml
slug: ml/overview
author: Jake Laursen
excerpt: Common Terms & System Workflows
tags: ['machine learning', 'models', 'overview', 'ai']
order: 1
--- -->
