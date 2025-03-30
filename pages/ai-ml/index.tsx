import Link from 'next/link'
import GenericPost from './../../components/GenericPost'

export default function AiPage() { 
  const titleText = 'An Introduction to Artificial Intelligence & Machine Learning'
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
        
        {/* <Link href="/ai-ml/face-detection" className="no-underline hover:underline"><h2>In-Browser Real-Tiem Face Detection</h2></Link>
        <p>Try it out!</p>
        <p>A Machine-learning model recognizes your face from your webcam video stream & overlays a "mesh" of recognized points across your face.</p> */}
        
        {/* <Link href="/ai-ml/training-head-gestures" className="no-underline hover:underline"><h2>In-Browser Real-Tiem Head-Tilt Training & Recognition</h2></Link>
        <p>Try it out!</p>
        <p>Train a machine-learning model on your own face and head gestures. Using your webcam, train a machine-learning model to recognize when your head is tilted to the left & to the right.</p> */}

        <Link href="/ai-ml/python-for-data-science" className="no-underline hover:underline"><h2>Python for Data Science</h2></Link>
        <p>using python & common python libraries to explore & analyze data: statistics, probabiliy, Percentiles, Moments, Covariance, Correlation, Conditional Probability, & Bayes&apos; Theorem. Also, an introduction to tensorflow.</p>

        <Link href="/ai-ml/intro-to-ml" className="no-underline hover:underline"><h2>Intro to Machine Learning</h2></Link>
        <p>Linear Regressions, Decision Trees, K-Means clustering, Ensemble learning (bagging & boosting), & building models.</p>
        
        <h2>Intro to Neural Networks</h2>
        <p>What they are, & how to create & fine-tune them.</p>

        <h2>Natural Language Processing (NLP)</h2>
        <p>Focusing on language and words: word embeddings, transformers, LLMs, prompt engineering, Retrieval Augmented Generation (RAG).</p>

        <h2>Computer Vision</h2>
        <p>Processing images, using convolutional neural networks (CNNs).</p>

        <h2>Deploying models to the world</h2>
        
      </GenericPost>)
}