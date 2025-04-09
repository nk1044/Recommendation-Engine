# 🎬 Movie Recommendation Engine

## 📌 Overview
This project is a **Movie Recommendation Engine** that provides personalized suggestions using six different machine learning algorithms. Each model uses structured movie metadata to learn what the user likes and predict similar content.

👉 [Live Demo](https://recommendation-engine-eight.vercel.app/)

---

## 🧭 Workflow

---

### 1️⃣ Data Preprocessing – Movie Vector Creation

We start by converting raw movie metadata into a fixed 800-dimensional vector representation.

#### Steps:
- Extract features from: `genres`, `cast`, `overview`, `keywords`, `director`
- Use **TF-IDF** vectorization on text-based columns.
- Reduce dimensionality (e.g., via **PCA** or **Truncated SVD**) to form 800-D vectors.

#### Formula:
- **TF-IDF Score**:  
  `TF-IDF(t, d) = TF(t, d) × log(N / DF(t))`  
  where `t` = term, `d` = document, `N` = total documents, `DF(t)` = document frequency

➡️ Each movie becomes a numeric vector in ℝ⁸⁰⁰  
➡️ These vectors are the basis for all models.

---

### 2️⃣ K-Nearest Neighbors (KNN)

Finds the most similar movies based on vector distances from liked movies.

#### Used for:
- Recommending movies close to user's liked history in feature space.

#### Metrics:
- **Cosine Similarity**:  
  `sim(A, B) = (A · B) / (||A|| × ||B||)`  
- **Euclidean Distance**:  
  `dist(A, B) = √Σ (Ai - Bi)²`

---

### 3️⃣ Clustering (K-Means / Hierarchical)

Groups movies into clusters of similar content.

#### Used for:
- Recommending movies from the same cluster as liked ones.

#### Core Concept:
- **K-Means Objective**:  
  Minimize total within-cluster variance:  
  `∑ᵢ ∑ₓ ∈ Cᵢ ||x - μᵢ||²`  
  where `μᵢ` is cluster centroid

- **Linkages in Hierarchical Clustering**:
  - Single-link: min distance
  - Complete-link: max distance
  - Average-link: average pairwise distance

---

### 4️⃣ Perceptron (Neural Network)

A shallow neural net that classifies whether a movie will be liked.

#### Used for:
- Binary classification (like/dislike) from past data.

#### Model:
- Input → Dense Layer → ReLU → Dense Layer → Sigmoid Output

#### Core Formula:
- **Output**:  
  `y = sigmoid(Wx + b)`  
  where sigmoid(z) = `1 / (1 + e⁻ᶻ)`

- **Loss Function**: Binary Cross-Entropy  
  `L = -[y·log(p) + (1-y)·log(1-p)]`

---

### 5️⃣ Bayesian Recommendation (Naïve Bayes)

Classifies based on conditional probabilities assuming feature independence.

#### Used for:
- Probabilistic prediction of movie preference.

#### Core Formula:
- **Bayes Theorem**:  
  `P(A | B) = (P(B | A) × P(A)) / P(B)`

- We predict the class (like/dislike) with the highest posterior.

---

### 6️⃣ Content-Based Filtering

Recommends movies that are textually or semantically similar to user's liked movies.

#### Used for:
- Matching metadata (genres, plot, actors) using vector space models.

#### Similarity:
- Same as cosine similarity:  
  `sim(A, B) = (A · B) / (||A|| × ||B||)`

---

## 🧠 Summary of Models

| Model                  | Type               | Formula / Key Concept                         |
|-----------------------|--------------------|-----------------------------------------------|
| TF-IDF + Vectors      | Preprocessing      | TF-IDF(t, d) = TF × log(N / DF)               |
| KNN                   | Similarity-based   | Cosine / Euclidean distance                   |
| K-Means Clustering    | Unsupervised       | Minimize ∑ ||x - μ||²                         |
| Perceptron            | Neural Network     | y = sigmoid(Wx + b)                           |
| Naïve Bayes           | Probabilistic      | P(A|B) = (P(B|A) × P(A)) / P(B)               |
| Content-Based         | Metadata Matching  | Cosine similarity on text-based features      |

---

## 📊 Dataset

- TMDB or similar movie dataset.
- Features include: Title, Genres, Cast, Overview, Keywords, Ratings, Popularity, etc.

---
