export type PathObj = {
  path: string;
  title: string;
  description?: string;
  excerpt?: string;
}
export default function getAiPaths(rootDir: string): PathObj[]{
  const pathsLookup = {
    'python-for-data-science': [
      {
        "path": "mean-median-mode",
        "title": "Mean, Median, & Mode",
        "tags": ["statistics", "descriptive statistics", "mean calculation", "median formula", "mode in Python", "data analysis tutorial"],
        "excerpt": "Learn the fundamentals of mean, median, and mode in statistics. This guide covers their calculations, differences, and practical applications in data analysis."
      },
      {
        "path": "std-dev-variance",
        "title": "Standard Deviation & Variance",
        "tags": ["statistics", "variance formula", "standard deviation Python", "data spread analysis", "data distribution tutorial"],
        "excerpt": "Understand standard deviation and variance, two essential concepts in statistics for measuring data dispersion and distribution in datasets."
      },
      {
        "path": "data-distribution",
        "title": "A Look At Data Distribution",
        "tags": ["statistics", "data distribution", "histogram tutorial", "normal distribution", "skewness and kurtosis", "data science visualization"],
        "excerpt": "Explore different types of data distributions, including normal, skewed, and uniform distributions, with visualizations and real-world examples."
      },
      {
        "path": "percentiles",
        "title": "Percentiles",
        "tags": ["statistics", "percentiles explained", "quartiles in data", "cumulative distribution function", "percentile calculation Python"],
        "excerpt": "Learn about percentiles, quartiles, and their role in summarizing and analyzing datasets, including how to calculate them using Python."
      },
      {
        "path": "moments",
        "title": "Moments",
        "tags": ["statistics", "moments in statistics", "skewness measure", "kurtosis interpretation", "data science math"],
        "excerpt": "Understand moments in statistics, including mean, variance, skewness, and kurtosis, and their significance in data analysis."
      },
      {
        "path": "filtering-outliers",
        "title": "Filtering Outliers",
        "tags": ["statistics", "outlier detection", "data cleaning methods", "IQR method", "Z-score filtering", "Python outlier removal"],
        "excerpt": "Learn methods for detecting and removing outliers from datasets, including the IQR method, Z-score filtering, and practical Python examples."
      },
      {
        "path": "covariance-correlation",
        "title": "Covariance and Correlation",
        "tags": ["statistics", "correlation coefficient", "covariance formula", "Pearson correlation", "linear relationship analysis"],
        "excerpt": "Discover the relationship between covariance and correlation and how they help analyze linear relationships between variables in statistics."
      },
      {
        "path": "conditional-probability",
        "title": "Conditional Probability",
        "tags": ["probability theory", "Bayes theorem explained", "conditional probability example", "independent events", "Python probability calculations"],
        "excerpt": "Understand conditional probability, Bayes' theorem, and their applications in real-world decision-making and probability modeling."
      },
      {
        "path": "linear-regression",
        "title": "Linear Regression",
        "tags": ["machine learning", "linear regression tutorial", "predictive modeling", "Python regression example", "scikit-learn regression", "data science", "regression model"],
        "excerpt": "Learn linear regression, a fundamental machine learning technique for predictive modeling, with step-by-step Python examples using scikit-learn."
      },
      {
        "path": "polynomial-regression",
        "title": "Polynomial Regression",
        "tags": ["machine learning", "polynomial regression Python", "curve fitting tutorial", "overfitting in regression", "scikit-learn regression"],
        "excerpt": "Explore polynomial regression, an extension of linear regression used for curve fitting, and understand how to implement it in Python."
      },
      {
        "path": "multiple-regression",
        "title": "Multiple Regression",
        "tags": ["machine learning", "multiple regression tutorial", "feature selection", "predictive modeling", "scikit-learn regression example"],
        "excerpt": "Learn about multiple regression, a statistical technique for modeling relationships between multiple independent variables and a dependent variable."
      },
      {
        "path": "train-test",
        "title": "Train & Test",
        "tags": ["machine learning", "train-test split Python", "model evaluation tutorial", "cross-validation techniques", "data science workflow"],
        "excerpt": "Understand the train-test split method in machine learning for model evaluation and how cross-validation improves model performance."
      },
      {
        "path": "naive-bayes",
        "title": "Naive Bayes",
        "tags": ["machine learning", "naive Bayes classification", "probabilistic models", "scikit-learn classifier", "text classification example"],
        "excerpt": "Explore the Naive Bayes algorithm, a probabilistic classification technique widely used in spam filtering, text classification, and sentiment analysis."
      },
      {
        "path": "k-means",
        "title": "K-Means Clustering",
        "tags": ["machine learning", "K-Means clustering tutorial", "unsupervised learning", "data segmentation Python", "scikit-learn clustering"],
        "excerpt": "Learn K-Means clustering, an unsupervised learning algorithm used for grouping similar data points in machine learning applications."
      },
      {
        "path": "xgboost",
        "title": "XGBoost & Ensemble Learning",
        "tags": ["machine learning", "XGBoost tutorial", "ensemble learning methods", "gradient boosting explained", "Python boosting models"],
        "excerpt": "Discover XGBoost, a powerful gradient boosting algorithm, and how ensemble learning improves machine learning model performance."
      },
      {
        "path": "support-vector-machines",
        "title": "Support Vector Machines",
        "tags": ["machine learning", "SVM classification", "support vector machines Python", "kernel methods", "scikit-learn SVM"],
        "excerpt": "Learn about Support Vector Machines (SVMs), a powerful classification algorithm in machine learning, including kernel methods and implementation in Python."
      },
      {
        "path": "similar-movies",
        "title": "Finding Similar Movies with Python",
        "tags": ["machine learning", "movie recommendation system", "similarity measures tutorial", "collaborative filtering", "Python movie recommendations"],
        "excerpt": "Build a movie recommendation system using similarity measures in Python, exploring collaborative filtering techniques."
      },
      {
        "path": "similar-movies-with-genres",
        "title": "Finding More-Specific Similar Movies using Python",
        "tags": ["machine learning", "content-based recommendation", "movie genres similarity", "Python recommendation system", "data science"],
        "excerpt": "Enhance movie recommendations using content-based filtering by analyzing genre similarity in Python."
      },
      {
        "path": "similar-movies-with-knn",
        "title": "Using KNN to Find Similar Movies",
        "tags": ["machine learning", "KNN algorithm tutorial", "nearest neighbors recommendation", "Python recommendation systems"],
        "excerpt": "Use the K-Nearest Neighbors (KNN) algorithm to build a movie recommendation system and find similar movies based on user preferences."
      },
      {
        "path": "pca",
        "title": "Dimensional Reduction with Principal Component Analysis",
        "tags": ["machine learning", "PCA tutorial", "dimensionality reduction Python", "feature extraction", "data compression techniques"],
        "excerpt": "Learn about Principal Component Analysis (PCA), a technique for reducing high-dimensional data while preserving essential features."
      },
      {
        "path": "reinforcement-learning",
        "title": "Reinforcement Learning",
        "tags": ["machine learning", "reinforcement learning tutorial", "Q-learning explained", "deep reinforcement learning", "policy optimization"],
        "excerpt": "Explore reinforcement learning, including Q-learning and policy optimization techniques, and how they are used in AI decision-making."
      },
      {
        "path": "k-fold-cross-validation",
        "title": "K-Fold Cross-Validation",
        "tags": ["machine learning", "cross-validation techniques", "model evaluation methods", "bias-variance tradeoff", "scikit-learn cross-validation"],
        "excerpt": "Understand K-Fold Cross-Validation, a model evaluation technique that helps balance bias and variance for better predictive performance."
      }
    ],
    'eda': [
      {
        "path": "honey-production",
        "title": "Exploratory Data Analysis with Python: Analyzing Honey Production",
        "tags": ["data analysis", "exploratory data analysis", "EDA tutorial", "honey production statistics", "Python data visualization", "seaborn", "pandas analysis"],
        "excerpt": "Learn how to perform exploratory data analysis (EDA) using Python by analyzing honey production data. Discover trends, visualize insights with Seaborn, and explore data manipulation techniques using Pandas."
      }
    ],
    'intro-to-ml': [
        {
          "path": "predicting-boston-housing-prices",
          "title": "Predicting Boston Housing Prices: Linear Regression Modeling",
          "tags": ["machine learning", "Boston housing prices", "linear regression modeling", "real estate prediction", "scikit-learn regression"],
          "excerpt": "Build a linear regression model using scikit-learn to predict Boston housing prices. Learn how to analyze real estate data, explore key features, and evaluate model performance."
        },
        {
          "path": "loan-default-prediction",
          "title": "Predicting Loan-Defaulting: Bagging Modeling",
          "tags": ["machine learning", "loan default prediction", "bagging ensemble method", "financial risk modeling", "scikit-learn classifiers"],
          "excerpt": "Explore how to predict loan defaults using bagging ensemble methods in scikit-learn. Learn about financial risk modeling and improve model accuracy with ensemble learning techniques."
        }
      ]
  }
  return pathsLookup[rootDir]
}