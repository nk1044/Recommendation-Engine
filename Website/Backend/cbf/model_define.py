import pickle
import os
import numpy as np
import pandas as pd

## Ensure that you are under "naive_bayes_pickle" directory if you are running the code in terminal

import os

base_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(base_dir, "movie_recommender_model.pkl")

with open(file_path, "rb") as f:
    model_data = pickle.load(f)

df = model_data["df"]
feature_matrix = model_data["feature_matrix"]

############### Defining Naive Bayes Model AND recommend_movies function #########################

class MultinomialNaiveBayes:
    def fit(self, X, y, alpha=0.00000000000000000001):
        self.classes = np.unique(y)
        self.alpha = alpha
        self.class_log_prior = {}
        self.feature_log_prob = {}

        for c in self.classes:
            X_c = X[y == c]
            total_count = X_c.sum()
            feature_count = X_c.sum(axis=0)
            
            # Apply Laplace smoothing
            smoothed_fc = feature_count + alpha
            smoothed_total = total_count + alpha * X.shape[1]

            self.feature_log_prob[c] = np.log(smoothed_fc / smoothed_total)
            self.class_log_prior[c] = np.log(X_c.shape[0] / X.shape[0])

    def predict_log_proba(self, X):
        log_probs = []
        for x in X:
            class_log_prob = {}
            for c in self.classes:
                logp = self.class_log_prior[c] + np.sum(x * self.feature_log_prob[c])
                class_log_prob[c] = logp
            log_probs.append(class_log_prob)
        return log_probs

def recommend_movies(favorite_movie, df, X, top_n = 10):

    if(isinstance(X, pd.DataFrame)):
        X = X.to_numpy()

    index = df[df["title"].str.lower() == favorite_movie.lower()].index[0]

    # Binary classification: 1 if it's the favorite movie, 0 otherwise
    y = np.zeros(len(df))
    y[index] = 1

    model = MultinomialNaiveBayes()
    model.fit(X, y)

    log_probs = model.predict_log_proba(X)

    probs = [np.exp(lp[1.0]) for lp in log_probs]

    df['probability'] = probs
    
    recommended_movies = df[df.index != index].sort_values(by="probability", ascending=False)
    
    return recommended_movies["title"].head(top_n).to_numpy()

