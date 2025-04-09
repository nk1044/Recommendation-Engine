# 🎬 Movie Recommendation Engine

## 📌 Overview
This project is a **Movie Recommendation Engine** that suggests movies using multiple machine learning and statistical models. The system covers:
- Feature extraction from movie metadata
- Six powerful ML algorithms for recommendations
- Personalized predictions based on user preferences and similarity scoring

Explore the web interface:  
🌐 [Live Website](https://recommendation-engine-eight.vercel.app/)

---

## 🧹 1️⃣ Preprocessing

The dataset is preprocessed to extract **800-dimensional feature vectors** per movie. These features are constructed using:
- **TF-IDF Vectorization** on genres, keywords, overview, and cast
- **Dimensionality Reduction** (e.g., PCA or TruncatedSVD)
- **Normalization** of numerical values like rating, popularity

**TF-IDF Formula:**
\[
\text{TF-IDF}(t, d) = \text{TF}(t, d) \times \log\left(\frac{N}{\text{DF}(t)}\right)
\]

Each movie becomes:
\[
\text{Movie Vector} \in \mathbb{R}^{800}
\]

---

## 🧠 2️⃣ Algorithms Used

### 🟦 A. K-Nearest Neighbors (KNN)

- Compares movies based on Euclidean or Cosine distance.
- Predicts preference using weighted vote from nearest neighbors.

**Cosine Similarity:**
\[
\cos(\theta) = \frac{\vec{A} \cdot \vec{B}}{||\vec{A}|| \times ||\vec{B}||}
\]

**Euclidean Distance:**
\[
d(\vec{A}, \vec{B}) = \sqrt{\sum_{i=1}^{n}(A_i - B_i)^2}
\]

---

### 🟨 B. Clustering (K-Means, Hierarchical)

- Groups movies with similar features using centroid-based or tree-based clustering.
- Recommendations are drawn from the same cluster as user-liked movies.

**K-Means Objective:**
\[
\min \sum_{i=1}^{k} \sum_{x \in C_i} \|\mathbf{x} - \mu_i\|^2
\]

**Hierarchical Distance Linkages:**  
- Single Link: min distance  
- Complete Link: max distance  
- Average Link: mean distance

---

### 🟥 C. Perceptron (Neural Network)

- Binary classification of liked vs disliked movies using a shallow feed-forward neural network.
- Uses **Sigmoid activation** in the output layer.

**Perceptron Activation:**
\[
y = \sigma(\mathbf{w} \cdot \mathbf{x} + b)
\]

**Sigmoid Function:**
\[
\sigma(z) = \frac{1}{1 + e^{-z}}
\]

---

### 🟩 D. Bayesian Methods (Naïve Bayes)

- Probabilistic classifier assuming independence among features.
- Predicts preference by computing maximum a posteriori probability.

**Bayes Theorem:**
\[
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
\]

---

### 🟫 E. Content-Based Filtering

- Computes similarity based on metadata like genre, director, actors.
- Uses **Cosine Similarity** between movie vectors for ranking.

Same formula as KNN's cosine similarity.

---

### 🟧 F. Matrix Factorization (Optional Extension)

*(Can be added if implemented)*  
- Decomposes user-movie interaction matrix into latent factors.

**SVD Factorization:**
\[
R \approx U \Sigma V^T
\]

---

## 🗂️ Project Structure (Suggested)
