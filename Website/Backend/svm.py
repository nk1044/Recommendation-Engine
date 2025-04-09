import pandas as pd
import numpy as np

# Load cleaned data
df = pd.read_csv("movies_data.csv")

# Extract titles and features
titles = df["title"].reset_index(drop=True)
X = df.drop(columns=["title", "imdb_id"]).values
title_to_index = {title: i for i, title in enumerate(titles)}

# Standardize the features manually
X_mean = X.mean(axis=0)
X_std = X.std(axis=0)
X_std[X_std == 0] = 1
X_standardized = (X - X_mean) / X_std

def pca_svd(X, n_components=100):
    U, S, Vt = np.linalg.svd(X, full_matrices=False)
    return np.dot(X, Vt.T[:, :n_components])  # Projected X

X_reduced = pca_svd(X_standardized, n_components=100)

def recommend_svm_optimized(input_title, top_n=10, lr=0.01, reg_lambda=0.01, max_iter=300):
    if input_title not in title_to_index:
        return f"'{input_title}' not found in dataset."

    idx = title_to_index[input_title]

    y = np.zeros(X_reduced.shape[0])
    y[idx] = 1

    weights = np.zeros(X_reduced.shape[1])
    bias = 0

    for i in range(max_iter):
        # Vectorized hinge loss gradient
        margin = y * (np.dot(X_reduced, weights) + bias)
        misclassified = margin < 1

        dw = 2 * reg_lambda * weights - np.dot(X_reduced[misclassified].T, y[misclassified])
        db = -np.sum(y[misclassified])

        # Update weights and bias
        weights -= lr * dw
        bias -= lr * db

        # Early stopping if small updates
        if np.linalg.norm(dw) < 1e-4:
            break

    # Scoring
    scores = np.dot(X_reduced, weights) + bias
    scores[idx] = -np.inf
    recommended_indices = np.argsort(scores)[::-1][:top_n]
    return titles.iloc[recommended_indices].tolist()

# if __name__ == "__main__":
#     input_title = input("Enter a movie title: ")
#     recommendations = recommend_svm_optimized(input_title)

#     print("\nTop 10 movie recommendations (Optimized SVM + PCA):")
#     if isinstance(recommendations, list):
#         for i, title in enumerate(recommendations, 1):
#             print(f"{i}. {title}")
#     else:
#         print(recommendations)