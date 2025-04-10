 Movie Recommender System (Optimized SVM + PCA):

This project implements a content-based movie recommendation system using:
-  PCA (Principal Component Analysis) via Singular Value Decomposition (SVD) for dimensionality reduction
- (Support Vector Machine) using a custom fast vectorized implementation

All done from scratch using NumPy and Pandas — no scikit-learn  required.

---

 Dataset :

The input dataset is a file named `cleaned_data.csv`, which includes:
- title: Title of the movie
- imdb_id: Movie ID (not used)
- Other numerical columns representing metadata (genres, language, keywords, etc.)


How It Works :

Functions Overview :

| Function Name             | Role                                                                 |
|---------------------------|----------------------------------------------------------------------|
 pca_svd(X, n_components)   |  Reduces the number of dimensions in `X` using SVD to `n_components
 recommend_svm_optimized(...) |  Trains a linear SVM from scratch to identify similar movies 
 main block         |       Accepts user input, runs PCA, trains SVM, and outputs top results   

---

Execution Flow :

1. Load Data:
   - Reads the `cleaned_data.csv`
   - Extracts features and movie titles

2. **Standardize Data:
   - Normalizes each feature to have zero mean and unit variance

3. Apply PCA:
   - Uses SVD to reduce features to the top `100` principal components

4. Train Linear SVM (One-vs-All):
   - Assigns label `1` to input movie, `0` to all others
   - Trains linear SVM using hinge loss and gradient descent

5. Score & Recommend:
   - Calculates similarity scores for all movies
   - Recommends top `10` similar titles, excluding the input itself

---


Requirements :

Only basic libraries:
```bash
pip install numpy pandas

