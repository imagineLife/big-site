export type PathObj = {
  path: string;
  title: string;
}
export default function getAiPaths(rootDir: string): PathObj[]{
  const pathsLookup = {
    'python-for-data-science': [
      {
        path: 'mean-median-mode',
        title: 'Mean, Median, & Mode',
        tags: ['statistics', 'descriptive statistics', 'mean calculation', 'median formula', 'mode in Python', 'data analysis tutorial']
      },
      {
        path: 'std-dev-variance',
        title: 'Standard Deviation & Variance',
        tags: ['statistics', 'variance formula', 'standard deviation Python', 'data spread analysis', 'data distribution tutorial']
      },
      {
        path: 'data-distribution',
        title: 'A Look At Data Distribution',
        tags: ['statistics', 'data distribution', 'histogram tutorial', 'normal distribution', 'skewness and kurtosis', 'data science visualization']
      },
      {
        path: 'percentiles',
        title: 'Percentiles',
        tags: ['statistics', 'percentiles explained', 'quartiles in data', 'cumulative distribution function', 'percentile calculation Python']
      },
      {
        path: 'moments',
        title: 'Moments',
        tags: ['statistics', 'moments in statistics', 'skewness measure', 'kurtosis interpretation', 'data science math']
      },
      {
        path: 'filtering-outliers',
        title: 'Filtering Outliers',
        tags: ['statistics', 'outlier detection', 'data cleaning methods', 'IQR method', 'Z-score filtering', 'Python outlier removal']
      },
      {
        path: 'covariance-correlation',
        title: 'Covariance and Correlation',
        tags: ['statistics', 'correlation coefficient', 'covariance formula', 'Pearson correlation', 'linear relationship analysis']
      },
      {
        path: 'conditional-probability',
        title: 'Conditional Probability',
        tags: ['probability theory', 'Bayes theorem explained', 'conditional probability example', 'independent events', 'Python probability calculations']
      },
      {
        path: 'linear-regression',
        title: 'Linear Regression',
        tags: ['machine learning', 'linear regression tutorial', 'predictive modeling', 'Python regression example', 'scikit-learn regression', 'data science', 'regression model']
      },
      {
        path: 'polynomial-regression',
        title: 'Polynomial Regression',
        tags: ['machine learning', 'polynomial regression Python', 'curve fitting tutorial', 'overfitting in regression', 'scikit-learn regression']
      },
      {
        path: 'multiple-regression',
        title: 'Multiple Regression',
        tags: ['machine learning', 'multiple regression tutorial', 'feature selection', 'predictive modeling', 'scikit-learn regression example']
      },
      {
        path: 'train-test',
        title: 'Train & Test',
        tags: ['machine learning', 'train-test split Python', 'model evaluation tutorial', 'cross-validation techniques', 'data science workflow']
      },
      {
        path: 'naive-bayes',
        title: 'Naive Bayes',
        tags: ['machine learning', 'naive Bayes classification', 'probabilistic models', 'scikit-learn classifier', 'text classification example']
      },
      {
        path: 'k-means',
        title: 'K-Means Clustering',
        tags: ['machine learning', 'K-Means clustering tutorial', 'unsupervised learning', 'data segmentation Python', 'scikit-learn clustering']
      },
      {
        path: 'xgboost',
        title: 'XGBoost & Ensemble Learning',
        tags: ['machine learning', 'XGBoost tutorial', 'ensemble learning methods', 'gradient boosting explained', 'Python boosting models']
      },
      {
        path: 'support-vector-machines',
        title: 'Support Vector Machines',
        tags: ['machine learning', 'SVM classification', 'support vector machines Python', 'kernel methods', 'scikit-learn SVM']
      },
      {
        path: 'similar-movies',
        title: 'Finding Similar Movies with Python',
        tags: ['machine learning', 'movie recommendation system', 'similarity measures tutorial', 'collaborative filtering', 'Python movie recommendations']
      },
      {
        path: 'similar-movies-with-genres',
        title: 'Finding More-Specific Similar Movies using Python',
        tags: ['machine learning', 'content-based recommendation', 'movie genres similarity', 'Python recommendation system', 'data science']
      },
      {
        path: 'similar-movies-with-knn',
        title: 'Using KNN to Find Similar Movies',
        tags: ['machine learning', 'KNN algorithm tutorial', 'nearest neighbors recommendation', 'Python recommendation systems']
      },
      {
        path: 'pca',
        title: 'Dimensional Reduction with Principal Component Analysis',
        tags: ['machine learning', 'PCA tutorial', 'dimensionality reduction Python', 'feature extraction', 'data compression techniques']
      },
      {
        path: 'reinforcement-learning',
        title: 'Reinforcement Learning',
        tags: ['machine learning', 'reinforcement learning tutorial', 'Q-learning explained', 'deep reinforcement learning', 'policy optimization']
      },
      {
        path: 'k-fold-cross-validation',
        title: 'K-Fold Cross-Validation',
        tags: ['machine learning', 'cross-validation techniques', 'model evaluation methods', 'bias-variance tradeoff', 'scikit-learn cross-validation']
      }
    ],
    'eda': [
      {
        path: 'honey-production',
        title: 'Exploratory Data Analysis with Python: Analyzing Honey Production',
        tags: ['data analysis', 'exploratory data analysis', 'EDA tutorial', 'honey production statistics', 'Python data visualization', 'seaborn', 'pandas analysis']
      }
    ],
    'intro-to-ml': [
      {
        path: 'predicting-boston-housing-prices',
        title: 'Predicting Boston Housing Prices: Linear Regression Modeling',
        tags: ['machine learning', 'Boston housing prices', 'linear regression modeling', 'real estate prediction', 'scikit-learn regression']
      },
      {
        path: 'loan-default-prediction',
        title: 'Predicting Loan-Defaulting: Bagging Modeling',
        tags: ['machine learning', 'loan default prediction', 'bagging ensemble method', 'financial risk modeling', 'scikit-learn classifiers']
      }
    ]
  }
  return pathsLookup[rootDir]
}