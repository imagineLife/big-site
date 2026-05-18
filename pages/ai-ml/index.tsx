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
        slug: '/ai-ml',
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

        <h2>AI/ML System Design Case Studies</h2>
        <Link
          href="/ai-ml/system-design-case-studies/harmful-content-detection"
          className="no-underline hover:underline"
        >
          <h3>Harmful Content Detection (Text-only, Pre-Publish Moderation)</h3>
        </Link>

        <p>
          A principal-level ML system design case study for proactive, pre-publish harmful
          content detection on a social platform. Covers requirements and latency SLOs, a
          rules-to-ML inference cascade, threshold-driven enforcement via a decoupled policy
          engine, model/version auditability, monitoring and drift detection, and feedback
          loops for continuous improvement—with extensibility notes for future image/video
          moderation.
        </p>

        <TagList
          hideTitle
          tags={[
            "ai",
            "ml systems",
            "system design",
            "machine learning",
            "content moderation",
            "trust and safety",
            "text classification",
            "multi label classification",
            "policy engine",
            "thresholding",
            "calibration",
            "model serving",
            "low latency",
            "monitoring",
            "data drift",
            "human in the loop",
            "security",
            "privacy",
            "architecture",
            "case study",
            "portfolio",
          ]}
        />


        <h2>Projects</h2>
        
        <p>Here are my applied AI and machine learning projects, focused on real datasets, model comparison, experimentation, and performance tradeoffs. These use tools like pytorch, tensorflow, scikit, and are written in jupyter notebook format.</p>

        <Link href="/ai-ml/projects/handwritten-digit-recognition" className="no-underline hover:underline"><h3>MNIST Handwritten Digit Classifier</h3></Link>
        <p>A full end-to-end notebook demonstrating data preprocessing, model training, optimization tuning, and performance comparison between an MLP and CNN using the MNIST dataset.</p>
        <TagList hideTitle tags={["ai", "cnn", "classification", "computer vision", "dataviz", "deeplearning", "experiments", "gpu", "hyperparameters", "machinelearning", "mnist", "modeling", "mps", "mlp", "notebook", "optimization", "python", "pytorch", "training", "tutorial"]}></TagList>

          <Link href="/ai-ml/projects/imdb-sentiment-prediction" 
            className="no-underline hover:underline"
          >
            <h3>IMDB Sentiment Analysis: From Bag-of-Words to Mini-Transformer</h3>
          </Link>

          <p>
            An end-to-end NLP notebook that loads the IMDB dataset with Hugging Face,
            builds a Bag-of-Words MLP baseline, and then trains a custom Mini-Transformer
            for text classification. Includes preprocessing, tokenization, training
            loops, optimization experiments, LR range testing, and a full comparison
            between classical and modern architectures for sentiment prediction.
          </p>

          <TagList 
            hideTitle 
            tags={[
              "ai",
              "nlp",
              "transformers",
              "huggingface",
              "sentiment analysis",
              "imdb",
              "text classification",
              "bag-of-words",
              "deeplearning",
              "experiments",
              "gpu",
              "hyperparameters",
              "machinelearning",
              "modeling",
              "mps",
              "mlp",
              "optimization",
              "python",
              "pytorch",
              "training",
              "tutorial"
            ]}
          />

          <Link
            href="/ai-ml/projects/breast-cancer-wisconsin"
            className="no-underline hover:underline"
          >
            <h3>Breast Cancer Classification (Wisconsin Dataset)</h3>
          </Link>

          <p>
            An end-to-end tabular machine learning notebook using scikit-learn to classify
            malignant vs benign tumors from diagnostic features. Covers data inspection,
            stratified splitting, baseline modeling, model comparison, decision-threshold
            tuning based on domain tradeoffs, probability calibration, and a final
            held-out test evaluation.
          </p>

          <TagList
            hideTitle
            tags={[
              "ai",
              "binary classification",
              "calibration",
              "clinical ml",
              "confusion matrix",
              "cross validation",
              "decision thresholds",
              "evaluation",
              "experiments",
              "interpretability",
              "logistic regression",
              "machine learning",
              "model comparison",
              "notebook",
              "precision recall",
              "probability modeling",
              "python",
              "scikit learn",
              "tabular data",
              "threshold tuning",
              "validation",
            ]}
          />

          <Link
            href="/ai-ml/projects/urbansound8k-audio-classification"
            className="no-underline hover:underline"
          >
            <h3>UrbanSound8K Environmental Sound Classification</h3>
          </Link>

          <p>
            An end-to-end deep learning notebook using PyTorch to classify urban
            environmental sounds from raw audio. Covers audio decoding and resampling,
            log-mel spectrogram feature extraction, CNN baselines, controlled experiments
            (baseline vs SpecAugment-lite), and detailed evaluation with confusion
            matrices, class-pair analysis, confidence inspection, and spectrogram-based
            error analysis.
          </p>

          <TagList
            hideTitle
            tags={[
              "ai",
              "audio",
              "audio classification",
              "cnn",
              "deep learning",
              "error analysis",
              "experiments",
              "feature extraction",
              "log mel spectrogram",
              "machine learning",
              "model evaluation",
              "notebook",
              "pytorch",
              "signal processing",
              "specaugment",
              "spectrogram",
              "training loops",
              "urban sound",
            ]}
          />



{/* 

*/}
        <h2>An Introduction</h2>
        <Link href="/ai-ml/python-for-data-science" className="no-underline hover:underline"><h3>Python for Data Science</h3></Link>
        <p>using python & common python libraries to explore & analyze data: statistics, probabiliy, Percentiles, Moments, Covariance, Correlation, Conditional Probability, & Bayes&apos; Theorem. Also, an introduction to tensorflow.</p>
        

        <Link href="/ai-ml/intro-to-ml" className="no-underline hover:underline"><h3>Intro to Machine Learning</h3></Link>
        <p>Linear Regressions, Decision Trees, K-Means clustering, Ensemble learning (bagging & boosting), & building models.</p>
        
        {/* <h3>Intro to Neural Networks</h3>
        <p>What they are, & how to create & fine-tune them.</p>

        <h3>Natural Language Processing (NLP)</h3>
        <p>Focusing on language and words: word embeddings, transformers, LLMs, prompt engineering, Retrieval Augmented Generation (RAG).</p>

        <h3>Computer Vision</h3>
        <p>Processing images, using convolutional neural networks (CNNs).</p>

        <h3>Deploying models to the world</h3> */}
        
      </GenericPost>)
}
