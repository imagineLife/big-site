import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
// components
import Layout from './../../components/Layout';
import Seo from './../../components/Seo';
import TagList from './../../components/TagList';

const IMAGE_SIZE = 224;

function ImageDropzone({ fileUploadedCallback }) {
  function onFileChange(e) {
    const { files } = e.target;
    const uploadedFile = files[0];
    if (!uploadedFile.type.match('image.*')) {
      console.error('use an image file');
      return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
      let img = document.createElement('img');
      img.src = e.target.result;
      // img.width = IMAGE_SIZE;
      // img.height = IMAGE_SIZE;
      img.onload = () => {
        fileUploadedCallback(img);
      };
    };
    reader.readAsDataURL(uploadedFile);
  }
  return (
    <div
      className="relative border-2 border-gray-300 border-dashed rounded-lg p-6"
      id="dropzone"
    >
      <input
        type="file"
        id="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onChange={(e) => {
          onFileChange(e);
          e.target.value = '';
        }}
      />
      <div className="text-center">
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600 cursor-pointer"> or browse</span>
            <span>to upload</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>

      {/* <Image
        src=""
        className="mt-4 mx-auto max-h-40 hidden"
        id="preview"
        layout="fill"
        alt="preview"
      /> */}
    </div>
  );
}

async function loadCoco() {
  let res = await cocoSsd.load();
  return res;
}

export default function ObjectDetectionPage() {
  const [uploadedImg, setUploadedImg] = useState(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState(null);
  useEffect(() => {
    loadCoco().then(setModel);
  }, []);

  const predictFn = useCallback(
    async function innerPredict(image) {
      const predictionFromModel = await model.detect(image);
      setPredictions(predictionFromModel);
    },
    [model]
  );

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
    <Layout>
      <Seo
        title={'Detecting Objects in Uploaded Images'}
        excerpt={
          'Using Machine Learning with tensorflow js and the coco-ssd model to detect objects in images uploaded to the web'
        }
        slug={`/ml-ui/object-detection-with-uploaded-images`}
        tags={tags}
      />
      <h1>Object Detection In An Uploaded Image</h1>
      {!model && (
        <span>
          Preparing an object-detection machine-learning setup for you...
        </span>
      )}
      {model && (
        <section className="flex flex-col gap-8 align-middle">
          <p>
            Upload an image to see the coco-ssd model detech one of 80
            pre-trained objects in the image!
          </p>
          <section id="input">
            <div id="file-container">
              <ImageDropzone
                fileUploadedCallback={(img) => {
                  predictFn(img);
                  setUploadedImg(img);
                }}
              />
            </div>

            <div id="loaded-image">
              {uploadedImg && (
                <Image
                  src={uploadedImg}
                  alt="uploaded-image"
                  width="200"
                  height="200"
                />
              )}
            </div>
          </section>

          <section id="predictions">
            {predictions?.length === 0 && (
              <p>
                coco-ssd couldn&apos;t recognize an object in this photo based
                on its 80 classes.
              </p>
            )}
            {predictions?.length > 0 && (
              <>
                <p>
                  coco-ssd is about{' '}
                  <span className="text-3xl font-bold">
                    {Math.round(predictions[0].score * 100)}% confident
                  </span>{' '}
                  that the image contains a{' '}
                  <span className="text-3xl font-bold">
                    {predictions[0].class}
                  </span>
                </p>
              </>
            )}
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
            )}
          </section>
        </section>
      )}
      <footer className="flex flex-wrap w-full">
        {<TagList tags={tags} hideTitle />}
      </footer>
    </Layout>
  );
}
