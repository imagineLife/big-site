'use client';

import '@tensorflow/tfjs';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';
import React, { useEffect, useRef, useState } from 'react';

// components
import Layout from './../../components/Layout';
import Seo from '../../components/Seo';
import TagList from './../../components/TagList';

const IMAGE_SIZE = 224;

export default function ObjectDetectionPage() {
  const [model, setModel] = useState(null);
  const [detector, setDetector] = useState(null);
  const [predictions, setPredictions] = useState(null);
  // const [faces, setFaces] = useState(null);
  const [predictionBoxDetails, setPredictionBoxDetails] = useState(null);
  const videoRef = useRef();
  const snapshotCanvasRef = useRef();
  const predictionsRef = useRef();

  async function loadModel() {
    let model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    let detector = await faceDetection.createDetector(model, {
      runtime: 'tfjs',
    });
    return { model, detector };
  }

  //
  // load the model on start
  //
  useEffect(() => {
    loadModel().then((obj) => {
      setModel(obj.model);
      setDetector(obj.detector);
    });
  }, []);

  async function startCamera() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          height: 240,
        },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
      });
  }

  const tags = [
    'javascript',
    'tensorflowjs',
    'machine learning',
    'coco-ssd',
    'react',
    'nextjs',
    'tailwind',
    'object detection',
    'FileReader',
  ];

  function clickEnable(e) {
    e.preventDefault();
    startCamera();
  }

  function drawFaceOutline(ctx, faceBox) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(
      faceBox.box.xMin,
      faceBox.box.yMin,
      faceBox.box.width,
      faceBox.box.height
    );
  }

  async function clickCapture(e) {
    e.preventDefault();
    const canvasCtx = snapshotCanvasRef.current.getContext('2d');
    // canvasCtx.drawImage(videoRef.current, 0, 0, 320, 240);
    // drawImage(videoRef.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    // canvasCtx.drawImage(videoRef.current, 0, 0, 320, 240, 0, 0, 320, 240);
    canvasCtx.drawImage(videoRef.current, 0, 0, 320, 240, 0, 0, 304, 150); //288
    predictionsRef.current.appendChild(snapshotCanvasRef.current);
  }

  async function predictFaces() {
    // use the captured photo & the estimated faces
    let estimatedFaces = await detector.estimateFaces(
      snapshotCanvasRef.current,
      {
        flipHorizontal: false,
      }
    );

    //
    // drawing red face-box
    //
    drawFaceOutline(
      snapshotCanvasRef.current.getContext('2d'),
      estimatedFaces[0]
    );
  }

  return (
    <Layout fullHeight>
      <Seo
        title={'Face Detection with a Webcam Photo'}
        excerpt={
          'Using Machine Learning with tensorflow js and the coco-ssd model to detect objects in images uploaded to the web'
        }
        slug={`/ml-ui/object-detection-with-uploaded-images`}
        tags={tags}
      />
      <h1>Face Detection with a Webcam Photo</h1>
      {!model && (
        <span>
          Preparing an object-detection machine-learning setup for you...
        </span>
      )}
      {model && (
        <section className="flex flex-col gap-8 align-middle">
          <p>
            Take a photo & see the machine-learning model detect an object in
            your real space!
          </p>
          <section id="input" className="flex justify-between">
            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              id="webcam"
              onClick={clickEnable}
            >
              Enable Webcam
            </button>
            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              id="pause"
              onClick={clickCapture}
            >
              Capture Photo
            </button>
            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              id="predict"
              onClick={(e) => {
                predictFaces();
              }}
            >
              Predict
            </button>
          </section>

          <section id="displays" className="flex justify-between">
            <video style={{ width: '320px' }} ref={videoRef}></video>
            <canvas
              id="snapshot-canvas"
              ref={snapshotCanvasRef}
              style={{ height: '240px', width: '320px' }}
            ></canvas>
            <section id="predictions" ref={predictionsRef}></section>
          </section>
        </section>
      )}
      <footer className="flex flex-wrap w-full absolute bottom-0">
        {<TagList tags={tags} hideTitle />}
      </footer>
    </Layout>
  );
}
