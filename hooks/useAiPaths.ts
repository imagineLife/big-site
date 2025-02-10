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
      },
      {
        path: 'std-dev-variance',
        title: 'Standard Deviation & Variance',
      },
      {
        path: 'data-distribution',
        title: 'A Look At Data Distribution',
      },
      {
        path: 'percentiles',
        title: 'Percentiles',
      },
      {
        path: 'moments',
        title: 'Moments',
      },
      {
        path: 'filtering-outliers',
        title: "Filtering Outliers"
      },
      {
        path: 'covariance-correlation',
        title: 'Covariance and Correlation',
      },
      {
        path: 'conditional-probability',
        title: 'Conditional Probability',
      },
      {
        path: 'linear-regression',
        title: 'Linear Regression',
      },
      {
        path: 'polynomial-regression',
        title: 'Polynomial Regression',
      },
      {
        path: 'multiple-regression',
        title: 'Multiple Regression',
      },
      {
        path: 'train-test',
        title: 'Train & Test',
      },
      {
        path: 'naive-bayes',
        title: 'Naive Bayes',
      },
      {
        path: 'k-means',
        title: 'K-Means Clustering',
      },
      {
        path: 'xgboost',
        title: 'XGBoost & Ensemble Learning',
      },
      {
        path: 'support-vector-machines',
        title: 'Support Vector Machines',
      },
      {
        path: 'similar-movies',
        title: 'Finding Similar Movies with Python',
      },
      {
        path: 'similar-movies-with-genres',
        title: 'Finding More-Specific Similar Movies using Python',
      },
      {
        path: 'similar-movies-with-knn',
        title: 'Using KNN to Find Similar Movies',
      },
      {
        path: 'pca',
        title: 'Dimensional Reduction with Principal Component Analysis',
      },
      {
        path: 'reinforcement-learning',
        title: 'Reinforcement Learning'
      },
      {
        path: 'k-fold-cross-validation',
        title: 'K-Fold Cross-Validation'
      }
    ]
  }
  return pathsLookup[rootDir]
}