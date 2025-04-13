
# 🎬 Movie Recommendation System

**GitHub Repository**: [Recommendation-Engine](https://github.com/Levi477/Recommendation-Engine)

## 📘 Project Overview

This project implements a comprehensive **Movie Recommendation System** using **seven different methods**, designed to provide movie suggestions either based on a selected movie or through user interaction data. The algorithms used in this project are:

- K-Nearest Neighbors (KNN)
- Gaussian Mixture Models (GMM)
- Content-Based Filtering
- Clustering (K-Means)
- Support Vector Machines (SVM)
- Artificial Neural Networks (ANN)
- Bayesian Recommendation Method

Each method is implemented independently and demonstrates a unique approach to personalization and filtering of movie content.
# Preprocessing Steps

![flowchart](https://i.postimg.cc/Y2XWz1Ys/pre-processing.png)

The preprocessing pipeline of the movie recommendation system involved the following steps:

---

### Step 1: Original Dataset

- Original dataset contained $24$ columns and more than $700,\!000$ rows.
  
$$
\text{Original Size} = 700,\!000 \text{ rows} \times 24 \text{ columns}
$$

---

### Step 2: Null Value Cleaning

- Removed all rows or entries with missing/null values.

Let:
- $D$ be the original dataset.
- $D_{\text{cleaned}}$ be the dataset after cleaning nulls.

Then:
$$
D_{\text{cleaned}} = D \setminus \{ \text{rows with nulls} \}
$$

---

### Step 3: Sampling

- To reduce computational load, kept only the top $5000$ rows.

Let:
- $D_{\text{sampled}}$ be the dataset after sampling.

Then:
$$
D_{\text{sampled}} = \text{Top } 5000 \text{ rows of } D_{\text{cleaned}}
$$

---

### Step 4: Feature Encoding

#### a) One-Hot Encoding for Categorical Columns

- Converted categorical data (e.g., genres, tags) to binary vector format.

For a feature with $n$ categories:
$$
x_i \in \{c_1, c_2, \dots, c_n\} \Rightarrow \text{OneHot}(x_i) = [0, 0, \dots, 1, \dots, 0]
$$

- Dropped categorical columns with too few entries (low cardinality).

#### b) TF-IDF for Textual Columns

- Applied TF-IDF vectorization to string data (e.g., overview, tagline).

Let:
- $tf(t,d)$ = term frequency of term $t$ in document $d$
- $idf(t)$ = inverse document frequency of term $t$

Then:
$$
\text{TF-IDF}(t,d) = tf(t,d) \cdot \log\left( \frac{N}{df(t)} \right)
$$

Where:
- $N$ is the total number of documents
- $df(t)$ is the number of documents containing term $t$

- Dropped textual columns with insufficient data.

---

### Step 5: Final Feature Vector Creation

- After all transformations, each movie is represented as a vector of $800$ dimensions:

$$
\vec{v}_{\text{movie}} \in \mathbb{R}^{800}
$$

These vectors are then used as input for all recommendation algorithms.

---
---



## 🧠 1. K-Nearest Neighbors (KNN)
![enter image description here](https://i.postimg.cc/hts3m6wN/Whats-App-Image-2025-04-13-at-14-45-29.jpg)
**Purpose**: Recommend movies that are similar to a selected movie using proximity in feature space.

### 📐 Mathematical Foundation

Given:
- A movie query vector $q$
- A set of movie vectors $x_1, x_2, ..., x_n$

We compute the **Euclidean distance**:

$$
d(q, x_i) = \sqrt{\sum_{j=1}^{m}(q_j - x_{ij})^2}
$$

We then select the $k$ smallest distances and recommend the corresponding movies.

Alternatively, **cosine similarity** can be used:

$$
\text{sim}(A, B) = \frac{A \cdot B}{\|A\| \|B\|}
$$

---

## 📈 2. Gaussian Mixture Model (GMM)

![flowchart](https://i.postimg.cc/CKsbk9w3/gmm.png)

**Purpose**: Probabilistic clustering of movies based on their features and recommending from similar distributions.

### 📐 Mathematical Foundation

GMM assumes data points are generated from a mixture of several Gaussian distributions:

$$
p(x) = \sum_{k=1}^{K} \pi_k \mathcal{N}(x \mid \mu_k, \Sigma_k)
$$

Where:
- $\pi_k$ = weight of the $k^{\text{th}}$ component  
- $\mu_k$ = mean of the $k^{\text{th}}$ component  
- $\Sigma_k$ = covariance matrix of the $k^{\text{th}}$ component  
- $\mathcal{N}(x|\mu_k,\Sigma_k)$ = multivariate normal distribution

---

## 📚 3. Content-Based Filtering
![flowchart](https://i.postimg.cc/cLdTmTGY/Screenshot-2025-04-13-at-2-48-31-PM.png)
**Purpose**: Recommend movies similar to the selected movie based on descriptive features (genre, tags, cast, etc.).

### 📐 Mathematical Foundation

Content features are typically vectorized using TF-IDF or embeddings. Then similarity is measured using **cosine similarity**:

$$
\text{sim}(A, B) = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \cdot \sqrt{\sum_{i=1}^{n} B_i^2}}
$$

Recommendations are sorted by similarity score.

### Analysis 
![similarity distribution](https://i.postimg.cc/Y9zGRcKB/Screenshot-2025-04-13-at-3-00-37-PM.png)

![genre importance matrix](https://i.postimg.cc/3NrybLY4/Screenshot-2025-04-13-at-3-01-03-PM.png)
---

## 4. Clustering (K-Means)

![flowchart](https://i.postimg.cc/0jHK5s9s/clustering.png)

###  Purpose

Group similar movies together based on features. This enables the system to recommend movies from the same cluster, assuming that users might enjoy other items within a group of similar ones.

### Mathematical Foundation

K-Means aims to partition `n` data points into `k` clusters in which each data point belongs to the cluster with the nearest mean (centroid), minimizing intra-cluster variance.


### Working :-

1. **Choose the number of clusters (k)**
2. **Randomly initialize k centroids**
3. **Assign each point to the nearest cluster centroid**
4. **Recalculate cluster centroids as the mean of assigned points**
5. **Repeat steps 3-4 until convergence (or until reach max epoch)**

### Use in Recommendation

After clustering movies:
- For a given user’s liked movie, find the cluster it belongs to
- Recommend other movies from the same cluster

This helps in:
- Discovering niche patterns in data
- Making content-based or collaborative recommendations more effective
- 
![distribution of data](https://i.postimg.cc/vByRPZDV/Screenshot-2025-04-10-at-11-23-55-PM.png)


![distribution in reduced dimension-2d](https://i.postimg.cc/fLfG1Q0g/Screenshot-2025-04-10-at-11-15-26-PM.png)
---

## 5. Support Vector Machine (SVM)
![flowchart](https://i.postimg.cc/xT9hmNL8/svm.png)

**Purpose**: Classify user-preferred genres or features to recommend movies falling within the same classification boundaries.

### 📐 Mathematical Foundation

SVM aims to find a hyperplane:

$$
\min_{\mathbf{w}, b} \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{subject to } y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1
$$

Where:
- $\mathbf{w}$ = weight vector  
- $b$ = bias  
- $\mathbf{x}_i$ = feature vector of movie  
- $y_i$ = user label (+1 for like, -1 for dislike)

With kernels:

$$
K(x_i, x_j) = \phi(x_i) \cdot \phi(x_j)
$$

---

## 🤖 6. Artificial Neural Network (ANN)

![flowchart](https://i.postimg.cc/KzfgVTV4/ann.png)

**Purpose**: Learn from user interactions (ratings, clicks, etc.) to recommend personalized content.

### 📐 Mathematical Foundation

A basic feedforward ANN:

**Layer Transformations**:

$$
Z^{(1)} = W^{(1)}X + b^{(1)}
$$
$$
A^{(1)} = \text{ReLU}(Z^{(1)})
$$
$$
Z^{(2)} = W^{(2)}A^{(1)} + b^{(2)}
$$
$$
\hat{Y} = \text{softmax}(Z^{(2)})
$$

**Loss Function (Cross-Entropy)**:

$$
\mathcal{L} = -\sum_{i=1}^{n} y_i \log(\hat{y}_i)
$$

**Backpropagation Update**:

$$
W = W - \alpha \cdot \frac{\partial \mathcal{L}}{\partial W}
$$

Where:
- $\alpha$ is the learning rate  
- $\hat{y}_i$ is predicted probability

---

## 📊 7. Bayesian Recommendation Method
![flowchart](https://i.postimg.cc/265Hbp6D/Screenshot-2025-04-13-at-2-51-03-PM.png)
**Purpose**: Probabilistically recommend movies based on prior user behavior and item features.

### 📐 Mathematical Foundation

Using **Bayes’ Theorem**:

$$
P(\text{Movie} | \text{User}) = \frac{P(\text{User} | \text{Movie}) \cdot P(\text{Movie})}{P(\text{User})}
$$

Let:
- $M$ be a movie  
- $U$ be user preferences

Then:

$$
P(M | U) \propto P(U | M) \cdot P(M)
$$

With Naive Bayes:

$$
P(M | U) \propto P(M) \prod_{i=1}^{n} P(F_i | M)
$$

Where $F_i$ are user’s observed features (genre preferences, past ratings, etc.)

### Analysis

![confidence grid](https://i.postimg.cc/25tK2JYy/Screenshot-2025-04-13-at-2-56-35-PM.png)

![probability scores](https://i.postimg.cc/9MqNSpXp/Screenshot-2025-04-13-at-2-57-02-PM.png)

![Genre Importance Matrix](https://i.postimg.cc/C5GrMxqn/Screenshot-2025-04-13-at-2-57-15-PM.png)

---

## 📦 Dataset and Feature Engineering (Preprocessing)

We utilized the following for preprocessing and feature engineering:

- **Movie Metadata**: genres, tags, cast, director
- **User Interaction Data**: ratings, watch history, favorites
- **Textual Features**:
  - Cleaned and lowercased text
  - Removed stopwords and punctuations
  - Tokenized, then used TF-IDF vectorization
- **Numerical Features**:
  - Normalization using min-max scaling
  - PCA for dimensionality reduction
- **Categorical Features**:
  - One-hot encoding for genres, directors, and cast

---

## 🔍 Model Comparison

| Method              | Type         | User Input Based | Model Type       | Strengths                            | Weaknesses                          |
|---------------------|--------------|------------------|------------------|---------------------------------------|-------------------------------------|
| KNN                 | Unsupervised | No               | Memory-based     | Simple, no training                   | Inefficient at scale                |
| GMM                 | Unsupervised | No               | Probabilistic    | Soft clustering                       | Sensitive to parameters             |
| Content-Based       | Unsupervised | No               | Metadata-based   | No cold-start issue for users         | Limited diversity                   |
| K-Means Clustering  | Unsupervised | No               | Hard clustering  | Fast and scalable                     | Assumes spherical clusters          |
| SVM                 | Supervised   | No              | Classification   | Works with high-dimensional data      | Needs labeled data                  |
| ANN                 | Supervised   | Yes              | Deep learning    | Captures nonlinear relationships      | Needs large dataset                 |
| Bayesian            | Probabilistic| No              | Probabilistic    | Works well with sparse data           | Assumes independence of features    |

---

## 🚀 Future Work

- Implement hybrid recommender systems combining collaborative + content-based filtering
- Use Transformer-based architectures for sequence-aware recommendations
- Incorporate temporal dynamics and trends in user behavior
- Deploy on cloud with scalable APIs and dashboards

---

## 🧩 Dependencies

- Python
- NumPy, Pandas
- Scikit-learn
- TensorFlow / PyTorch
- Matplotlib / Seaborn