import Link from 'next/link'
import GenericPost from './../../components/GenericPost'
import TagList from '../../components/TagList'

export default function AiPage() { 
  const titleText = 'Artificial Intelligence & Machine Learning'
  return (<GenericPost {...{
        title: titleText,
        globalData: {
          name: titleText,
        },
        slug: '/work',
        tags: [
          'ai',
          'artificial intelligence',
          'machine learning',
          'python',
          'jupyter notebooks',
          'tensorflow'
        ],
        slugArr: ['ai'],
      }}>
        
        {/* <Link href="/ai-ml/face-detection" className="no-underline hover:underline"><h3>In-Browser Real-Tiem Face Detection</h3></Link>
        <p>Try it out!</p>
        <p>A Machine-learning model recognizes your face from your webcam video stream & overlays a "mesh" of recognized points across your face.</p> */}
        
        {/* <Link href="/ai-ml/training-head-gestures" className="no-underline hover:underline"><h3>In-Browser Real-Tiem Head-Tilt Training & Recognition</h3></Link>
        <p>Try it out!</p>
        <p>Train a machine-learning model on your own face and head gestures. Using your webcam, train a machine-learning model to recognize when your head is tilted to the left & to the right.</p> */}

        <h2>Projects</h2>
        <Link href="/ai-ml/projects/handwritten-digit-recognition" className="no-underline hover:underline"><h3>MNIST Handwritten Digit Classifier</h3></Link>
        <p>A full end-to-end notebook demonstrating data preprocessing, model training, optimization tuning, and performance comparison between an MLP and CNN using the MNIST dataset.</p>
        <TagList hideTitle tags={["ai", "cnn", "classification", "computer vision", "dataviz", "deeplearning", "experiments", "gpu", "hyperparameters", "machinelearning", "mnist", "modeling", "mps", "mlp", "notebook", "optimization", "python", "pytorch", "training", "tutorial"]}></TagList>

{/* 

*/}
        <h2>An Introduction</h2>
        <Link href="/ai-ml/python-for-data-science" className="no-underline hover:underline"><h3>Python for Data Science</h3></Link>
        <p>using python & common python libraries to explore & analyze data: statistics, probabiliy, Percentiles, Moments, Covariance, Correlation, Conditional Probability, & Bayes&apos; Theorem. Also, an introduction to tensorflow.</p>
        

        <Link href="/ai-ml/intro-to-ml" className="no-underline hover:underline"><h3>Intro to Machine Learning</h3></Link>
        <p>Linear Regressions, Decision Trees, K-Means clustering, Ensemble learning (bagging & boosting), & building models.</p>
        
        <h3>Intro to Neural Networks</h3>
        <p>What they are, & how to create & fine-tune them.</p>

        <h3>Natural Language Processing (NLP)</h3>
        <p>Focusing on language and words: word embeddings, transformers, LLMs, prompt engineering, Retrieval Augmented Generation (RAG).</p>

        <h3>Computer Vision</h3>
        <p>Processing images, using convolutional neural networks (CNNs).</p>

        <h3>Deploying models to the world</h3>
        
      </GenericPost>)
}