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
        
        <Link href="/ai-ml/python-for-data-science" className="no-underline hover:underline"><h2>Python for Data Science</h2></Link>
        <p>using python & common python libraries to explore & analyze data: statistics, probabiliy, Percentiles, Moments, Covariance, Correlation, Conditional Probability, & Bayes&apos; Theorem. Also, an introduction to tensorflow.</p>

        <h2>Intro to Machine Learning</h2>
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