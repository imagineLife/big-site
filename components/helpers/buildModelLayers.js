import * as tf from '@tensorflow/tfjs';

function buildModelLayers(inputModel, imagesByIndex) {
  const denseUnitCount = 100;
  // LAYERS
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#Layers

  // flatten
  // flattens each batch in its inputs to 1D (making the output 2D)
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#layers.flatten
  const l1 = tf.layers.flatten({
    inputShape: inputModel.outputs[0].shape.slice(1),
  });

  // dense
  /*
    This layer implements the operation: output = activation(dot(input, kernel) + bias)
    - activation is the element-wise activation function passed as the activation argument.
    - kernel is a weights matrix created by the layer.
    - bias is a bias vector created by the layer (only applicable if useBias is true).
  */
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#layers.dense
  const l2 = tf.layers.dense({
    units: denseUnitCount,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
    useBias: true,
  });

  const l3 = tf.layers.dense({
    units: imagesByIndex.length,
    kernelInitializer: 'varianceScaling',
    useBias: true,
    activation: 'softmax',
  });

  return [l1, l2, l3];
}

export { buildModelLayers };
