'use client';

import React, { useEffect, useRef, useState } from 'react';

// components
import Layout from './../../components/Layout';
import Seo from '../../components/Seo';
import TagList from './../../components/TagList';

export default function ObjectDetectionPage() {
  const [loading, setLoading] = useState(true);
  const [detector, setDetector] = useState(null);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const snapshotCanvasRef = useRef(null);
  const predictionsRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setLoading(true);

        // Lazy-load TFJS + backend + model ONLY in the browser
        const tf = await import('@tensorflow/tfjs');
        await import('@tensorflow/tfjs-core');
        await import('@tensorflow/tfjs-backend-webgl');

        // Make sure WebGL backend is ready before creating detector
        await tf.setBackend('webgl');
        await tf.ready();

        const faceDetection = await import('@tensorflow-models/face-detection');

        const model = faceDetection.SupportedModels.MediaPipeFaceDetector;

        const d = await faceDetection.createDetector(model, {
          runtime: 'tfjs',
          // You can add modelType if you want:
          // modelType: 'short', // or 'full'
        });

        if (!cancelled) setDetector(d);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
      // Optional: free resources
      try {
        detector?.dispose?.();
      } catch {}
    };
    // NOTE: don't include `detector` in deps; we don't want to re-init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { height: 240 },
    });

    videoRef.current.srcObject = stream;
    videoRef.current.onloadedmetadata = () => videoRef.current.play();
  }

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
    const canvas = snapshotCanvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw current frame into canvas
    ctx.drawImage(videoRef.current, 0, 0, 320, 240, 0, 0, 304, 150);
    predictionsRef.current.appendChild(canvas);
  }

  async function predictFaces(e) {
    e?.preventDefault?.();
    if (!detector) return;

    const canvas = snapshotCanvasRef.current;
    const ctx = canvas.getContext('2d');

    const faces = await detector.estimateFaces(canvas, {
      flipHorizontal: false,
    });

    if (faces?.length) {
      drawFaceOutline(ctx, faces[0]);
    }
  }

  const tags = [
    'javascript',
    'tensorflowjs',
    'machine learning',
    'react',
    'nextjs',
    'tailwind',
    'face detection',
    'webcam',
  ];

  return (
    <Layout fullHeight>
      <Seo
        title={'Face Detection with a Webcam Photo'}
        excerpt={
          'Using TensorFlow.js to detect a face from a webcam snapshot in the browser.'
        }
        slug={`/ml-ui/face-detection-with-webcamera`}
        tags={tags}
      />

      <h1>Face Detection with a Webcam Photo</h1>

      {loading && <span>Loading TensorFlow + model…</span>}

      {error && (
        <div className="p-4 border rounded">
          <strong>Model failed to load.</strong>
          <div className="mt-2 text-sm opacity-80">
            {String(error?.message || error)}
          </div>
        </div>
      )}

      {!loading && !error && (
        <section className="flex flex-col gap-8 align-middle">
          <p>Enable the webcam, capture a photo, then run face detection.</p>

          <section id="input" className="flex justify-between">
            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              onClick={clickEnable}
            >
              Enable Webcam
            </button>

            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              onClick={clickCapture}
            >
              Capture Photo
            </button>

            <button
              className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
              onClick={predictFaces}
              disabled={!detector}
            >
              Predict
            </button>
          </section>

          <section id="displays" className="flex justify-between">
            <video style={{ width: '320px' }} ref={videoRef} />
            <canvas
              id="snapshot-canvas"
              ref={snapshotCanvasRef}
              style={{ height: '240px', width: '320px' }}
            />
            <section id="predictions" ref={predictionsRef} />
          </section>
        </section>
      )}

      <footer className="flex flex-wrap w-full absolute bottom-0">
        <TagList tags={tags} hideTitle />
      </footer>
    </Layout>
  );
}
