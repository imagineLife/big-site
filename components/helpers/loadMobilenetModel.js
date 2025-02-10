import * as tf from '@tensorflow/tfjs';
const mobileNetModelUrl =
  'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

async function loadMobilenetModel() {
  // load a pre-existing model with loadLayersModel
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#loadLayersModel
  const mobilenet = await tf.loadLayersModel(mobileNetModelUrl);

  // get a single layer from a model with getLayer
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#tf.LayersModel.getLayer
  const layer = mobilenet.getLayer('conv_pw_13_relu');

  // create a "new" model with tf.model
  //https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#model
  return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
}

export { loadMobilenetModel };
