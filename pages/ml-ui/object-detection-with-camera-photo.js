import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useEffect, useRef, useState, useCallback } from 'react';

// components
import Layout from './../../components/Layout';
import Seo from './../../components/Seo';
import TagList from './../../components/TagList';

const IMAGE_SIZE = 224;

async function loadCoco() {
  let res = await cocoSsd.load();
  return res;
}

export default function ObjectDetectionPage() {
  const [cameraStarted, setCameraStarted] = useState(false);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  const predictionsRef = useRef();
  useEffect(() => {
    loadCoco().then(setModel);
  }, []);

  async function startCamera() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          height: 185,
        },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
      });
  }

  async function predict() {
    const res = await model.detect(canvasRef.current);
    setPredictions(res);
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

  return (
    <Layout fullHeight>
      <Seo
        title={'Detecting Objects in Uploaded Images'}
        excerpt={
          'Using Machine Learning with tensorflow js and the coco-ssd model to detect objects in images uploaded to the web'
        }
        slug={`/ml-ui/object-detection-with-uploaded-images`}
        tags={tags}
      />
      <h1>Object Detection In An Webcam-Captured Image</h1>
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
              onClick={(e) => {
                e.preventDefault();
                startCamera();
              }}
            >
              Enable Webcam
            </button>
            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              id="pause"
              onClick={(e) => {
                e.preventDefault();
                const canvasCtx = canvasRef.current.getContext('2d');
                canvasCtx.drawImage(videoRef.current, 0, 0, 224, 224);
                predictionsRef.current.appendChild(canvasRef.current);
              }}
            >
              Capture Photo
            </button>
            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              id="predict"
              onClick={(e) => {
                predict();
              }}
            >
              Predict
            </button>
          </section>

          <section id="displays" className="flex justify-between">
            <video
              style={{ height: '185px', width: '320px' }}
              ref={videoRef}
            ></video>
            <canvas id="canvas" ref={canvasRef}></canvas>
            <section id="predictions" ref={predictionsRef}></section>
          </section>

          {predictions?.length > 0 && (
            <p>
              coco-ssd is about{' '}
              <span className="text-3xl font-bold">
                {Math.round(predictions[0].score * 100)}% confident
              </span>{' '}
              that the image contains a{' '}
              <span className="text-3xl font-bold">{predictions[0].class}</span>
            </p>
          )}

          {/* 
            {predictions && (
              <button
                className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
                onClick={() => {
                  setPredictions(null);
                  setUploadedImg(null);
                }}
              >
                Reset
              </button>
            )} */}
        </section>
      )}
      <footer className="flex flex-wrap w-full absolute bottom-0">
        {<TagList tags={tags} hideTitle />}
      </footer>
    </Layout>
  );
}
