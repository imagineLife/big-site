const path = require('path');

const NOTEBOOK_BASE_ROUTE = '/ml/notebooks';
const NOTEBOOKS_DIR = path.join(process.cwd(), 'public', 'notebooks');

const curatedMlNotebooks = [
  {
    slug: 'pizza-steak-classifier',
    sourceFilename: 'pizza-steak-classifier.ipynb',
    title: 'Pizza Steak Image Classifier',
    description:
      'Build and evaluate a TensorFlow image classifier that distinguishes pizza and steak photos using a Food-101 subset.',
    excerpt:
      'Binary image classification walkthrough using a Food-101 pizza and steak dataset, TensorFlow data loading, model training, and performance review.',
    tags: ['machine learning', 'tensorflow', 'computer vision', 'image classification'],
    legacySlugs: ['pizza-steak-classifier'],
  },
  {
    slug: 'fine-tuning-experiments',
    sourceFilename: 'fine-tuning-experiments.ipynb',
    title: 'Transfer Learning Fine-Tuning Experiments',
    description:
      'Compare transfer learning experiments across different training data sizes, augmentation strategies, and fine-tuning choices.',
    excerpt:
      'Experiment log for transfer learning models trained with different data volumes, augmentation, and fine-tuning setups.',
    tags: ['machine learning', 'tensorflow', 'transfer learning', 'fine tuning'],
    legacySlugs: ['fine-tuning-experiments'],
  },
  {
    slug: 'classification-intro',
    sourceFilename: 'classification-intro.ipynb',
    title: 'Classification Intro',
    description:
      'Introduce binary, multiclass, and multilabel classification with TensorFlow examples and model evaluation notes.',
    excerpt:
      'Foundational classification notebook covering common classification types, neural network shapes, model runs, and evaluation.',
    tags: ['machine learning', 'tensorflow', 'classification', 'neural networks'],
    legacySlugs: ['classification-intro'],
  },
  {
    slug: 'transfer-learning-i',
    sourceFilename: 'transfer-learning-I.ipynb',
    title: 'Transfer Learning With TensorFlow',
    description:
      'Use TensorFlow transfer learning, feature extraction, and TensorBoard callbacks to train and analyze an image classifier.',
    excerpt:
      'Transfer learning walkthrough covering feature extraction, fine tuning concepts, Food-101 data prep, and TensorBoard logging.',
    tags: ['machine learning', 'tensorflow', 'transfer learning', 'computer vision'],
    legacySlugs: ['transfer-learning-I', 'transfer-learning-i'],
  },
  {
    slug: 'multi-class-cnn',
    sourceFilename: 'Multi-Class-cnn.ipynb',
    title: 'Multi-Class Convolutional Neural Network',
    description:
      'Build and evaluate a multiclass convolutional neural network for image classification, with notes on overfitting and regularization.',
    excerpt:
      'Applied CNN notebook for ten-class image classification, including data inspection, model training, and overfitting checks.',
    tags: ['machine learning', 'tensorflow', 'cnn', 'image classification'],
    legacySlugs: ['Multi-Class-cnn', 'multi-class-cnn'],
  },
  {
    slug: 'transfer-learning-fine-tuning',
    sourceFilename: 'Transfer-learning-fine-tuning.ipynb',
    title: 'Transfer Learning Fine Tuning',
    description:
      'Fine tune a pretrained TensorFlow model by adjusting model layers and comparing transfer learning workflows.',
    excerpt:
      'Fine-tuning notebook that contrasts sequential and functional model-building approaches with TensorFlow image datasets.',
    tags: ['machine learning', 'tensorflow', 'transfer learning', 'fine tuning'],
    legacySlugs: ['Transfer-learning-fine-tuning', 'transfer-learning-fine-tuning'],
  },
  {
    slug: 'transfer-learning-101-classes',
    sourceFilename: 'transfer-learning-101-classes.ipynb',
    title: 'Transfer Learning With 101 Food Classes',
    description:
      'Train and evaluate transfer learning models against a 101-class food image classification problem.',
    excerpt:
      'Food-101 transfer learning notebook covering data preparation, dataset conversion, training, and loss-curve analysis.',
    tags: ['machine learning', 'tensorflow', 'transfer learning', 'food-101'],
    legacySlugs: ['transfer-learning-101-classes'],
  },
  {
    slug: 'model-analysis-in-depth',
    sourceFilename: 'Model-Analysis-In-Depth.ipynb',
    title: 'Model Analysis In Depth',
    description:
      'Analyze a pretrained image classification model with test data evaluation, prediction inspection, and class comparison.',
    excerpt:
      'Model analysis notebook focused on evaluating a 101-class classifier, inspecting predictions, and comparing predicted labels.',
    tags: ['machine learning', 'tensorflow', 'model evaluation', 'image classification'],
    legacySlugs: ['Model-Analysis-In-Depth', 'model-analysis-in-depth'],
  },
  {
    slug: 'modeling-with-transformations',
    sourceFilename: 'Modeling-with-transformations.ipynb',
    title: 'Modeling With Transformations',
    description:
      'Use column transformers, one-hot encoding, normalization, and model comparison in a practical machine learning workflow.',
    excerpt:
      'Tabular modeling workflow showing data transforms, normalization, model training, and comparison with an earlier baseline.',
    tags: ['machine learning', 'tensorflow', 'data preprocessing', 'normalization'],
    legacySlugs: ['Modeling-with-transformations', 'modeling-with-transformations'],
  },
  {
    slug: 'modeling-and-wrangling',
    sourceFilename: 'modeling-and-wrangling.ipynb',
    title: 'Modeling And Wrangling',
    description:
      'Wrangle tabular data with pandas, create encoded features, train a model, and inspect model error and loss curves.',
    excerpt:
      'Data wrangling and modeling notebook covering CSV loading, one-hot encoding, train/test splits, model fitting, and MAE review.',
    tags: ['machine learning', 'tensorflow', 'pandas', 'data wrangling'],
    legacySlugs: ['modeling-and-wrangling'],
  },
];

const notebooksBySlug = new Map(
  curatedMlNotebooks.map((notebook) => [notebook.slug, notebook])
);

const notebooksBySourceFilename = new Map(
  curatedMlNotebooks.map((notebook) => [notebook.sourceFilename, notebook])
);

const notebooksBySourceStem = new Map(
  curatedMlNotebooks.map((notebook) => [
    notebook.sourceFilename.replace(/\.ipynb$/i, ''),
    notebook,
  ])
);

const notebooksByLegacySlug = new Map(
  curatedMlNotebooks.flatMap((notebook) =>
    notebook.legacySlugs.map((legacySlug) => [legacySlug, notebook])
  )
);

function getCuratedMlNotebooks() {
  return curatedMlNotebooks;
}

function getCuratedMlNotebookBySlug(slug) {
  return notebooksBySlug.get(String(slug || '')) || null;
}

function getCuratedMlNotebookBySourceFilename(sourceFilename) {
  return notebooksBySourceFilename.get(String(sourceFilename || '')) || null;
}

function getCuratedMlNotebookByOriginalFilenameOrLegacySlug(value) {
  const lookupValue = String(value || '');
  const sourceFilename = lookupValue.endsWith('.ipynb')
    ? lookupValue
    : `${lookupValue}.ipynb`;

  return (
    notebooksBySourceFilename.get(sourceFilename) ||
    notebooksBySourceStem.get(lookupValue) ||
    notebooksByLegacySlug.get(lookupValue) ||
    notebooksBySlug.get(lookupValue) ||
    null
  );
}

function getCuratedMlNotebookRoute(notebookOrSlug) {
  const slug =
    typeof notebookOrSlug === 'string' ? notebookOrSlug : notebookOrSlug?.slug;

  if (!slug) {
    return NOTEBOOK_BASE_ROUTE;
  }

  return `${NOTEBOOK_BASE_ROUTE}/${slug}`;
}

function getCuratedMlNotebookRoutes() {
  return curatedMlNotebooks.map((notebook) => getCuratedMlNotebookRoute(notebook));
}

function getCuratedMlNotebookSourcePath(notebookOrSlug) {
  const notebook =
    typeof notebookOrSlug === 'string'
      ? getCuratedMlNotebookBySlug(notebookOrSlug)
      : notebookOrSlug;

  if (!notebook?.sourceFilename) {
    return null;
  }

  return path.join(NOTEBOOKS_DIR, notebook.sourceFilename);
}

const getMlNotebookRoute = getCuratedMlNotebookRoute;
const getMlNotebookSourcePath = getCuratedMlNotebookSourcePath;

module.exports = {
  curatedMlNotebooks,
  getCuratedMlNotebooks,
  getCuratedMlNotebookBySlug,
  getCuratedMlNotebookBySourceFilename,
  getCuratedMlNotebookByOriginalFilenameOrLegacySlug,
  getCuratedMlNotebookRoute,
  getCuratedMlNotebookRoutes,
  getCuratedMlNotebookSourcePath,
  getMlNotebookRoute,
  getMlNotebookSourcePath,
};
